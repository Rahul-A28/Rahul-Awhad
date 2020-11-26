import { Component } from '@angular/core';
import { DataService } from './data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RestaurantChain';
  constructor(private _dataService: DataService) { }

  isAdmin(who:string){
    console.log(who);
    this._dataService.checkAdmin(who);
  }

}
