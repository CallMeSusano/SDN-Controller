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
  selector: 'app-dhcp',
  templateUrl: './dhcp.component.html',
  styleUrls: ['./dhcp.component.css']
})
export class DhcpComponent {
  constructor(private http: HttpClient, private router: Router) { }
  dhcps: any;

  

  ngOnInit() {      
    
    // Simple GET request with response type <any>
    this.http.get<any>('/api/rest/ip/dhcp-server', httpOptions).subscribe(data => {
        this.dhcps = data;
        console.log(data)
    })}


    editDhcp(id: string) {
      this.router.navigateByUrl(`/dhcpDetail/${id}`);
    }
    deleteDhcp(id: string){
      this.http.delete<any>(`/api/rest/ip/dhcp-server/${id}`, httpOptions).subscribe(data => {
        this.dhcps = data;
        console.log(data)
      })
    }
}

