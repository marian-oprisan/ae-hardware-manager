import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ViewService {
  showsearch: boolean;
  showadd: boolean;
  title: string;
  constructor() {
  }

  showSearch() {
    this.showadd = false;
    this.showsearch = true;
    this.title = 'Search';
    console.log(11);
  }

  showAdd() {
    this.showsearch = false;
    this.showadd = true;
    this.title = 'Add Machine to Database';
    console.log(22);
  }

}
