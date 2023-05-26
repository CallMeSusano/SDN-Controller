import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + btoa('admin' + ':' + 'projeto'),
  })
};

interface Firewall {
  action: string;
  chain: string;
  ['src-address']: string;
  ['dst-address']: string;
  protocol: string;
  ['src-port']: string;
  ['dst-port']: string;
}


@Component({
  selector: 'app-firewall-detail',
  templateUrl: './firewall-detail.component.html',
  styleUrls: ['./firewall-detail.component.css']
})
export class FirewallDetailComponent {
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}
  bridgeId: string | null = null;
  isEditing: boolean = false;

  action: string = '';
  chain: string = 'ether1';
  srcadd: string = '';
  dstadd: string = '';
  srcprt: string = '';
  dstprt: string = '';
  protocol: string = '';

  firewall: any;

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.bridgeId = params.get('id');
      if (this.bridgeId) {
        this.isEditing = true;
        this.http.get<Firewall>(`/api/rest/ip/firewall/filter/${this.bridgeId}`)
          .subscribe(data => {
            this.action = data.action;
            this.chain = data.chain;
            this.protocol = data.protocol;
            this.srcadd = data?.['src-address'];
            this.dstadd = data?.['dst-address'];
            this.srcprt = data?.['src-port'];
            this.dstprt = data?.['dst-port'];
          }, error => {
            console.error('HTTP GET error', error);
          });
      }
    });

  }

  submitForm() {
    const data: Firewall = {
      
      action: this.action,
      chain: this.chain,
      protocol: this.protocol,
      ['src-address']: this.srcadd,
      ['dst-address']: this.dstadd,
      ['src-port']: this.srcprt,
      ['dst-port']: this.dstprt,
    };
    if (this.isEditing && this.bridgeId) {
      this.http.patch(`/api/rest/ip/firewall/filter/${this.bridgeId}`, data)
        .subscribe(response => {
          console.log('HTTP PUT response', response);
          this.router.navigate(['/firewall']);
        }, error => {
          console.error('HTTP PUT error', error);
        });
    } else {
      this.http.put('/api/rest/ip/firewall/filter', data)
        .subscribe(response => {
          console.log('HTTP POST response', response);
          this.router.navigate(['/firewall']);
        }, error => {
          console.error('HTTP POST error', error);
        });
    }
  }
}
