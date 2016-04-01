import 'angular2/bundles/angular2-polyfills';
import {Component} from 'angular2/core';

// WIP: see issue https://github.com/angular/angular/pull/7455 and https://github.com/angular/universal/issues/309
import {App} from '../app/app.component';
import {Home} from "../app/home.component";
import {About} from "../app/about.component";
import {RouteConfig} from 'angular2/router';
import {Title} from "./title.component.ts";
import {ServerOnlyApp} from "./server-only-app.component";


@Component({
  selector: 'html',
  directives: [
    Title,
    App,
    ServerOnlyApp
  ],
  providers: [

  ],
  template: `
  <head>
    <meta charset="UTF-8">
    <meta name="description" content="Angular 2 Universal">
    <meta name="keywords" content="Angular 2,Universal">
    <meta name="author" content="PatrickJS">
    <title>Angular 2 Universal Starter</title>
    <link rel="icon" href="data:;base64,iVBORw0KGgo=">
    <base href="/">
  </head>
  <body>

    <app>
      Loading...
    </app>
    <server-only-app>
      Loading...
    </server-only-app>

    <script async src="/dist/client/bundle.js"></script>
  </body>
  `
})
@RouteConfig([
  { path: '/', component: Home, name: 'Home', useAsDefault: true },
  { path: '/home', component: Home, name: 'Home' },
  { path: '/about', component: About, name: 'About' },
  { path: '/**', redirectTo: ['Home'] }
])
export class Html {
  seo = 'Angular 2 Universal Starter - this component replaces the <title> element';
}
