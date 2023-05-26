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
  selector: 'app-vpn',
  templateUrl: './vpn.component.html',
  styleUrls: ['./vpn.component.css']
})
export class VpnComponent {
  constructor(private http: HttpClient, private router: Router) { }
  vpns: any;
  peers: any;



  ngOnInit() {

    // Simple GET request with response type <any>
    this.http.get<any>('/api/rest/interface/wireguard', httpOptions).subscribe(data => {
      this.vpns = data;
      console.log(data)
    })
    this.http.get<any>('/api/rest/interface/wireguard/peers', httpOptions).subscribe(data => {
      this.peers = data;
      console.log(data)
    })
  }


  editWireguard(id: string) {
    this.router.navigateByUrl(`/wireguard/${id}`);
  }
  deleteWireguard(id: string) {
    this.http.delete<any>(`/api/rest/interface/wireguard/${id}`, httpOptions).subscribe(data => {
      this.vpns = data;
      console.log(data)
    })
  }

  editPeer(id: string) {
    this.router.navigateByUrl(`/peer/${id}`);
  }
  deletePeer(id: string) {
    this.http.delete<any>(`/api/rest/interface/wireguard/peers/${id}`, httpOptions).subscribe(data => {
      this.peers = data;
      console.log(data)
    })
  }
}
