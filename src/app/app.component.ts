import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { WeatherService } from './weather.service';
import { HttpClient } from '@angular/common/http';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/typeahead-match.class';
import cityList from './../assets/cityList.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WeatherAppAngular';
  // location$: Observable<string>;
  location: string = 'Pune, IN';
  cities: string[] = cityList;
  showTab = 1;
  currentWeather: any = <any>{};
  currentForecast: any = <any>{};
  msg: string;

  constructor(private _weatherService: WeatherService, private http: HttpClient) {
  }

  ngOnInit() {
    this.searchWeather(this.location);
  }

  searchWeather(location: string) {
    this.msg = '';
    this.currentWeather = {};
    this._weatherService.getWeather(location)
      .subscribe(res => {
        this.currentWeather = res;
        this.searchForecast(location);
      }, err => {
        if (err.error && err.error.message) {
          this.msg = err.error.message;
          return;
        }
      }, () => {
      });
  }

  searchForecast(location: string) {
    this.msg = '';
    this.currentForecast = {};
    this._weatherService.getForecast(location)
      .subscribe(res => {
        this.currentForecast = res;
      });
  }

  tabToggle(index) {
    this.showTab = index;
  }

  onSelect(event: TypeaheadMatch): void {
    this.searchWeather(event.item);
  }

  resultFound() {
    return Object.keys(this.currentWeather).length > 0;
  }

}
