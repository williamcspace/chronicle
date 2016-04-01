// Angular 2
import 'angular2-universal-preview/polyfills';
import {REQUEST_URL, NODE_LOCATION_PROVIDERS} from 'angular2-universal-preview';
import {provide} from 'angular2/core';
import {APP_BASE_HREF, ROUTER_PROVIDERS} from 'angular2/router';

// Application
import {App} from '../../client/app/app.component';
import {Title} from "../../client/server-only-app/title.component";
import {ServerOnlyApp} from "../../client/server-only-app/server-only-app.component";

const ngApp = (req, res) => {
  let baseUrl = '/';
  let url = req.originalUrl || '/';
  res.render('index', {
    directives: [App, Title, ServerOnlyApp],
    providers: [
      provide(APP_BASE_HREF, {useValue: baseUrl}),
      provide(REQUEST_URL, {useValue: url}),
      ROUTER_PROVIDERS,
      NODE_LOCATION_PROVIDERS,
    ],
    preboot: false
  });
}

const routes = (app) => {
  // Routes
  app.use('/', ngApp);
  app.use('/about', ngApp);
  app.use('/home', ngApp);
  return app;
};

export {routes};
