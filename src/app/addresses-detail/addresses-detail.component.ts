import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + btoa('admin' + ':' + 'projeto'),
  })
};

interface Address {
  address: string;
  interface: string;
}

@Component({
  selector: 'app-addresses-detail',
  templateUrl: './addresses-detail.component.html',
  styleUrls: ['./addresses-detail.component.css']
})
export class AddressesDetailComponent {
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}
  bridgeId: string | null = null;
  isEditing: boolean = false;

  address: string = '0.0.0.0';
  interface: string = 'ether1';

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
        this.http.get<Address>(`/api/rest/ip/address/${this.bridgeId}`)
          .subscribe(data => {
            this.address = data.address;
            this.interface = data.interface;
          }, error => {
            console.error('HTTP GET error', error);
          });
      }
    });

  }

  submitForm() {
    const data: Address = {
      
      address: this.address,
      interface: this.interface
    };
    if (this.isEditing && this.bridgeId) {
      this.http.patch(`/api/rest/ip/address/${this.bridgeId}`, data)
        .subscribe(response => {
          console.log('HTTP PUT response', response);
          this.router.navigate(['/addresses']);
        }, error => {
          console.error('HTTP PUT error', error);
        });
    } else {
      this.http.put('/api/rest/ip/address', data)
        .subscribe(response => {
          console.log('HTTP POST response', response);
          this.router.navigate(['/addresses']);
        }, error => {
          console.error('HTTP POST error', error);
        });
    }
  }
}
