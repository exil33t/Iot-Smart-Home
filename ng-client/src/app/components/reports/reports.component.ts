import { Component, OnInit } from '@angular/core';
import {FirebaseService} from "../../services/firebase.service";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {


  nodes

  constructor(private firebase: FirebaseService) { }

  ngOnInit() {
    this.nodes = this.firebase.getNodeStates()
  }

  dateFromTimestamp(ts){
    let dt =  new Date(ts)
    return dt.getDate() + '/' + dt.getMonth() + '/' + dt.getFullYear()
  }


}
