import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + btoa('admin' + ':' + 'projeto'),
  })
};

interface DHCP {
  name: string;
  interface: string;
  ['lease-time']: string;
}


@Component({
  selector: 'app-dhcp-detail',
  templateUrl: './dhcp-detail.component.html',
  styleUrls: ['./dhcp-detail.component.css']
})
export class DhcpDetailComponent {
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}
  bridgeId: string | null = null;
  isEditing: boolean = false;

  name: string = '';
  interface: string = 'ether1';
  lease: string = '';

  interfaces: any;
  bridges: any;

  ngOnInit() {
    this.http.get<any>('/api/rest/interface', httpOptions).subscribe(data => {
      this.interfaces = data;
      console.log(data)
    })
    this.http.get<any>('/api/rest/interface/bridge', httpOptions).subscribe(data => {
      this.bridges = data;
      console.log(data)
    })

    this.route.paramMap.subscribe(params => {
      this.bridgeId = params.get('id');
      if (this.bridgeId) {
        this.isEditing = true;
        this.http.get<DHCP>(`/api/rest/ip/dhcp-server/${this.bridgeId}`)
          .subscribe(data => {
            this.name = data.name;
            this.interface = data.interface;
            this.lease = data?.['lease-time'];
          }, error => {
            console.error('HTTP GET error', error);
          });
      }
    });

  }

  submitForm() {
    const data: DHCP = {
      
      name: this.name,
      interface: this.interface,
      ['lease-time']: this.lease
    };
    if (this.isEditing && this.bridgeId) {
      this.http.patch(`/api/rest/ip/dhcp-server/${this.bridgeId}`, data)
        .subscribe(response => {
          console.log('HTTP PUT response', response);
          this.router.navigate(['/dhcp']);
        }, error => {
          console.error('HTTP PUT error', error);
        });
    } else {
      this.http.put('/api/rest/ip/dhcp-server', data)
        .subscribe(response => {
          console.log('HTTP POST response', response);
          this.router.navigate(['/dhcp']);
        }, error => {
          console.error('HTTP POST error', error);
        });
    }
  }


}
