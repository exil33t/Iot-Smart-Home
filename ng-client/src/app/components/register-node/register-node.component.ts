import { Component, OnInit } from '@angular/core';
import {FirebaseService} from "../../services/firebase.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-node',
  templateUrl: './register-node.component.html',
  styleUrls: ['./register-node.component.css']
})
export class RegisterNodeComponent implements OnInit {

  deviceId
  location
  formText = ''

  constructor(private firebase: FirebaseService, private router: Router) {

  }

  registerNode(){
      this.firebase.registerNode({
        'deviceId': this.deviceId,
        'location': this.location,
        'timestamp': +new Date()
      }).then(()=>{
        this.formText = 'Node added to system, redirecting to nodes..'
        setTimeout(()=>{
          this.router.navigate(['/nodes'])
        }, 2000)
      }).catch((err)=>{
        this.formText = JSON.stringify(err)
      })
  }

  checkForm(){
    return !(this.deviceId == '' || this.location == '') ? false : true
  }

  ngOnInit() {
  }



}
