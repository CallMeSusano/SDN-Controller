import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + btoa('admin' + ':' + 'projeto'),
  })
};


@Component({
  selector: 'app-router-list',
  templateUrl: './router-list.component.html',
  styleUrls: ['./router-list.component.css']
})
export class RouterListComponent {

  constructor(private http: HttpClient) { }
  value: any;

  

  ngOnInit() {      
    
    // Simple GET request with response type <any>
    this.http.get<any>('/api/rest/system/resource', httpOptions).subscribe(data => {
        this.value = data;
        console.log(data)
    })}
}
