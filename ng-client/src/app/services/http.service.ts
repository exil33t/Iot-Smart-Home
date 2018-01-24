import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) { }

    serverUrl = 'localhost:8000'

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin':'*',
    })
  };

  issueCommand(command) {
    return this.http.post(this.serverUrl + '/issueCommand', command )
      .subscribe((res) => console.log('result'));
  }

}
