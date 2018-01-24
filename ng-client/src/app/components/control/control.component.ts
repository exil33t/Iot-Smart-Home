import { Component, OnInit } from '@angular/core';
import {FirebaseService} from "../../services/firebase.service";
import {HttpService} from "../../services/http.service";
import {HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {



  nodes

  constructor(private firebase: FirebaseService, private httpService: HttpService) { }

  ngOnInit() {
    this.nodes = this.firebase.getNodeStates()
  }

  dateFromTimestamp(ts){
    let dt =  new Date(ts)
    return dt.getDate() + '/' + dt.getMonth() + '/' + dt.getFullYear()
  }

  turnOnLights(id){
    //adding an issued from field in case we'd like to scale it for more than one users
    this.httpService.issueCommand({command: 'turnOnLights', deviceId: id, issuedFrom: 'user01'})

  }

  turnOfLights(id){

  }


}
