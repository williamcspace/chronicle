import 'angular2/bundles/angular2-polyfills';
import {Component} from 'angular2/core';

@Component({
  selector: 'title',
  template: `{{ seo }}`
})
export class Title {
  seo = 'Angular 2 Universal Starter - this component replaces the <title> element';
}
