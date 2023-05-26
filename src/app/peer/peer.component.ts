import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + btoa('admin' + ':' + 'projeto'),
  })
};

interface Peer {
  interface: string;
  ['public-key']: string;
  ['allowed-address']: string;
}


@Component({
  selector: 'app-peer',
  templateUrl: './peer.component.html',
  styleUrls: ['./peer.component.css']
})
export class PeerComponent {
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}
  bridgeId: string | null = null;
  isEditing: boolean = false;

  int: string = 'wireguard1';
  key: string = '';
  addr: string = '0.0.0.0/0';

  interfaces: any;

  ngOnInit() {
    this.http.get<any>('/api/rest/interface/wireguard', httpOptions).subscribe(data => {
      this.interfaces = data;
      console.log(data)
    })

    this.route.paramMap.subscribe(params => {
      this.bridgeId = params.get('id');
      if (this.bridgeId) {
        this.isEditing = true;
        this.http.get<Peer>(`/api/rest/interface/wireguard/peers/${this.bridgeId}`)
          .subscribe(data => {
            this.key = data?.['public-key'];
            this.int = data.interface;
            this.addr = data?.['allowed-address'];
          }, error => {
            console.error('HTTP GET error', error);
          });
      }
    });

  }

  submitForm() {
    const data: Peer = {
      
      ['public-key']: this.key,
      interface: this.int,
      ['allowed-address']: this.addr
    };
    if (this.isEditing && this.bridgeId) {
      this.http.patch(`/api/rest/interface/wireguard/peers/${this.bridgeId}`, data)
        .subscribe(response => {
          console.log('HTTP PUT response', response);
          this.router.navigate(['/vpn']);
        }, error => {
          console.error('HTTP PUT error', error);
        });
    } else {
      this.http.put('/api/rest/interface/wireguard/peers', data)
        .subscribe(response => {
          console.log('HTTP POST response', response);
          this.router.navigate(['/vpn']);
        }, error => {
          console.error('HTTP POST error', error);
        });
    }
  }
}
