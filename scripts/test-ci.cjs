const { build } = require('esbuild');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { JSDOM } = require('jsdom');
const jasmineCore = require('jasmine-core');

async function run() {
  const jasmine = jasmineCore.core(jasmineCore);
  const environment = jasmine.getEnv();
  Object.assign(globalThis, jasmineCore.interface(jasmine, environment));

  const dom = new JSDOM('', { url: 'http://localhost' });
  for (const key of ['window', 'document', 'localStorage', 'Node', 'HTMLElement', 'Event']) {
    globalThis[key] = key === 'window' ? dom.window : dom.window[key];
  }

  const files = fs.readdirSync('src/app', { recursive: true })
    .filter((name) => name.endsWith('.spec.ts'));
  const imports = files.map((name) => 'import "./src/app/' + name.replaceAll('\\', '/') + '";');
  const directory = fs.mkdtempSync(path.join(process.cwd(), '.test-ci-'));
  const outfile = path.join(directory, 'suite.mjs');

  environment.addReporter({
    specDone(result) {
      console.log(result.status + ' – ' + result.fullName);
      for (const failure of result.failedExpectations) console.error(failure.stack);
    },
    jasmineDone(result) {
      console.log(files.length + ' archivos de pruebas · ' + result.overallStatus);
      for (const failure of result.failedExpectations) console.error(failure.stack);
      process.exitCode = result.overallStatus === 'passed' ? 0 : 1;
    },
  });

  try {
    await build({
      stdin: {
        resolveDir: process.cwd(),
        contents: [
          'import "@angular/compiler";',
          'import { ɵresolveComponentResources as resolveResources } from "@angular/core";',
          'import { getTestBed } from "@angular/core/testing";',
          'import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from "@angular/platform-browser-dynamic/testing";',
          ...imports,
          'export async function init() { await resolveResources(() => Promise.resolve("")); getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting()); }',
        ].join('\n'),
      },
      bundle: true,
      platform: 'node',
      format: 'esm',
      outfile,
    });
    require('zone.js/node');
    for (const timer of ['setTimeout', 'clearTimeout', 'setInterval', 'clearInterval']) {
      dom.window[Zone.__symbol__(timer)] = globalThis[Zone.__symbol__(timer)];
    }
    require('zone.js/testing');
    await (await import(pathToFileURL(outfile).href)).init();
    await environment.execute();
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
    dom.window.close();
  }
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
