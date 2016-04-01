import 'angular2/bundles/angular2-polyfills';
import {Component} from 'angular2/core';

@Component({
  selector: 'server-only-app',
  template: `
  <footer>{{ seo }}</footer>
  `
})
export class ServerOnlyApp {
  seo = 'Angular 2 Universal';
}
