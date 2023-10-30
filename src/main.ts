import {enableProdMode} from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import * as sentry from "@sentry/angular-ivy";

import { AppModule } from './app/app.module';

sentry.init({
  dsn: "https://05cfc0d993cb190a487650092dc7229a@o4506138257981440.ingest.sentry.io/4506138260930560",
  integrations: [
    new sentry.BrowserTracing({
      routingInstrumentation: sentry.routingInstrumentation,
    }),
    new sentry.Replay(),
  ],
  // Performance monitoring
  tracesSampleRate: 1.0,
  // Session replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

enableProdMode();

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then((success) => console.log('Bootstrap success'))
  .catch(err => console.error(err));
