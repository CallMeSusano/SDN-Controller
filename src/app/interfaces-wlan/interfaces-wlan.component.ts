import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + btoa('admin' + ':' + 'projeto'),
  })
};


@Component({
  selector: 'app-interfaces-wlan',
  templateUrl: './interfaces-wlan.component.html',
  styleUrls: ['./interfaces-wlan.component.css']
})
export class InterfacesWlanComponent {
  constructor(private http: HttpClient, private router: Router) { }
  wireless: any;



  ngOnInit() {

    // Simple GET request with response type <any>
    this.http.get<any>('/api/rest/interface/wireless', httpOptions).subscribe(data => {
      this.wireless = data;
      console.log(data)
    })
  }
  editWireless(id: string) {
    this.router.navigateByUrl(`/wlan/${id}`);
  }
  changeState(id: string) {
    this.http.patch<any>(`/api/rest/interface/wireless/${id}`, httpOptions).subscribe(data => {
      this.wireless = data;
      console.log(data)
    })
  }
}
