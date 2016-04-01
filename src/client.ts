import {bootstrap} from 'angular2/platform/browser';
import {prebootComplete} from "angular2-universal-preview/dist/typings";
import {ROUTER_PROVIDERS} from "angular2/router";
import {App} from "./client/app/app.component";

bootstrap(App, [
  ...ROUTER_PROVIDERS
])
.then(prebootComplete)
