import { esbuildPlugin } from '@web/dev-server-esbuild';
import { importMapsPlugin } from '@web/dev-server-import-maps';
import { playwrightLauncher } from '@web/test-runner-playwright';

export default {
  nodeResolve: true,
  plugins: [
    importMapsPlugin({
      inject: {
        importMap: {
          imports: {
            '/test/': '/packages/mux-audio/test/',
          },
        },
      },
    }),
    esbuildPlugin({
      ts: true,
      json: true,
      loaders: { '.css': 'text', '.svg': 'text' },
    }),
  ],
  coverageConfig: {
    report: true,
    include: ['src/**/*'],
  },
  browsers: [
    playwrightLauncher({
      product: 'chromium',
      launchOptions: {
        channel: 'chrome',
      },
    }),
  ],
  filterBrowserLogs: ({ args }) => !args[0]?.startsWith?.('Lit is in dev mode'),
};
