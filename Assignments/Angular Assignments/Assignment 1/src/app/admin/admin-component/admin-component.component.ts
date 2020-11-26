import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-admin-component',
  templateUrl: './admin-component.component.html',
  styleUrls: ['./admin-component.component.css']
})
export class AdminComponent implements OnInit {

  public resdata: Array<any> = [];

  constructor(private _dataService: DataService) { }

  ngOnInit(): void {
    this.resdata = this._dataService.getData();
  }

  addRestaurant(value:string){
    console.log(value);
    this._dataService.addRestaurant(value);
  }

}
