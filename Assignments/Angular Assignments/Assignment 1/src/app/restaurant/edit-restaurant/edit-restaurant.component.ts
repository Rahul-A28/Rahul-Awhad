import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-edit-restaurant',
  templateUrl: './edit-restaurant.component.html',
  styleUrls: ['./edit-restaurant.component.css']
})
export class EditRestaurantComponent implements OnInit {

  constructor(private route: ActivatedRoute,private _dataService:DataService) { }

  resname:any;

  ngOnInit(): void {
    this.resname = this.route.snapshot.paramMap.get('name');
  }

  updateRestaurantName(name:any,newname:any){
    this._dataService.updateRestaurantName(name,newname);
  }

}
