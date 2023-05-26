
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
  selector: 'app-firewall',
  templateUrl: './firewall.component.html',
  styleUrls: ['./firewall.component.css']
})
export class FirewallComponent {
  constructor(private http: HttpClient, private router: Router) { }
  firewalls: any;

  

  ngOnInit() {      
    
    // Simple GET request with response type <any>
    this.http.get<any>('/api/rest/ip/firewall/filter', httpOptions).subscribe(data => {
        this.firewalls = data;
        console.log(data)
    })}

    editFirewall(id: string) {
      this.router.navigateByUrl(`/firewallDetail/${id}`);
    }
    deleteFirewall(id: string){
      this.http.delete<any>(`/api/rest/ip/firewall/filter/${id}`, httpOptions).subscribe(data => {
        this.firewalls = data;
        console.log(data)
      })
    }
}
