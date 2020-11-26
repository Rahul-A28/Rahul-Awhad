import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { DataService } from '../../data.service'; 

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  constructor(private _dataService: DataService, private route:ActivatedRoute) { }

  resName:any;
  itemName:any;
  ngOnInit(): void {
    this.resName = this.route.snapshot.paramMap.get('name');
    this.itemName = this.route.snapshot.paramMap.get('itemName');
  }

  editItem(resName:any,newItem:any,newPrice:any){
    this._dataService.editItem(resName,this.itemName,newItem,newPrice);
  }

}
