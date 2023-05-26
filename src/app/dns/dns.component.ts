import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + btoa('admin' + ':' + 'projeto'),
  })
};
@Component({
  selector: 'app-dns',
  templateUrl: './dns.component.html',
  styleUrls: ['./dns.component.css']
})
export class DnsComponent {
  constructor(private http: HttpClient) { }
  dnss: any;

  

  ngOnInit() {      
    
    // Simple GET request with response type <any>
    this.http.get<any>('/api/rest/ip/dns/static', httpOptions).subscribe(data => {
        this.dnss = data;
        console.log(data)
    })}
}
