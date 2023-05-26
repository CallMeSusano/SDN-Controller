import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + btoa('admin' + ':' + 'projeto'),
  })
};

interface Route {
  gateway: string;
  ['dst-address']: string;
  ['vrf-interface']: string;
}

@Component({
  selector: 'app-routes-detail',
  templateUrl: './routes-detail.component.html',
  styleUrls: ['./routes-detail.component.css']
})
export class RoutesDetailComponent {
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}
  bridgeId: string | null = null;
  isEditing: boolean = false;

  dstadd: string = '0.0.0.0/0';
  lcladd: string = '192.168.1.1';
  vrf: string = 'ether1';

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
        this.http.get<Route>(`/api/rest/ip/route/${this.bridgeId}`)
          .subscribe(data => {
            this.dstadd = data?.['dst-address'];
            this.lcladd = data.gateway;
            this.vrf = data?.['vrf-interface'];
          }, error => {
            console.error('HTTP GET error', error);
          });
      }
    });

  }

  submitForm() {
    const data: Route = {
      
      ['dst-address']: this.dstadd,
      gateway: this.lcladd,
      ['vrf-interface']: this.vrf
    };
    if (this.isEditing && this.bridgeId) {
      this.http.patch(`/api/rest/ip/route/${this.bridgeId}`, data)
        .subscribe(response => {
          console.log('HTTP PUT response', response);
          this.router.navigate(['/staticRoutes']);
        }, error => {
          console.error('HTTP PUT error', error);
        });
    } else {
      this.http.put('/api/rest/ip/route', data)
        .subscribe(response => {
          console.log('HTTP POST response', response);
          this.router.navigate(['/staticRoutes']);
        }, error => {
          console.error('HTTP POST error', error);
        });
    }
  }
}
