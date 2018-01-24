import { Component, OnInit } from '@angular/core';
import {FirebaseService} from "../../services/firebase.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-nodes',
  templateUrl: './nodes.component.html',
  styleUrls: ['./nodes.component.css']
})
export class NodesComponent implements OnInit {

  nodes: Observable<any[]>;



  constructor(public firebase: FirebaseService) { }

  dateFromTimestamp(ts){
    let dt =  new Date(ts)
    return dt.getDate() + '/' + dt.getMonth() + '/' + dt.getFullYear()
  }


  removeNode(){

  }

  ngOnInit() {
  }

}
