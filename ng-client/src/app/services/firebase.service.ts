import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class FirebaseService {
  nodeStatesCollection: AngularFirestoreCollection<any>;
  nodeStates: Observable<any[]>;

  arduinoNodesCollection: AngularFirestoreCollection<any>;
  nodes: Observable<any[]>;

  constructor(private asf: AngularFirestore) {

    this.nodeStatesCollection = this.asf.collection<any>('nodeStates');
    this.nodeStates = this.nodeStatesCollection.valueChanges();

    this.arduinoNodesCollection = this.asf.collection<any>('nodes');
    this.nodes = this.arduinoNodesCollection.snapshotChanges().map((actions =>{
      return actions.map(a =>{
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, data}
      })
    }));
  }

  getNodeStates() {
    return this.nodeStates
  }


  nodeLastActive(id){
    return this.nodeStatesCollection.doc('node', )
  }

  getLatestState(deviceId){
    return this.asf.collection<any>('nodeStates', ref=>{
      return ref.where('deviceId', '==', deviceId)
    }).valueChanges();
  }


  getNodes(){
    return this.nodes;
  }

  registerNode(node) {
    return this.arduinoNodesCollection.add(node)
  }



}
