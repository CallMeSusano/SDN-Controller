import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

interface Wireguard {
  name: string;
  ['listen-port']: string;
  disabled: string;
}

@Component({
  selector: 'app-wireguard',
  templateUrl: './wireguard.component.html',
  styleUrls: ['./wireguard.component.css']

})
export class WireguardComponent {
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}
  bridgeId: string | null = null;
  isEditing: boolean = false;

  name: string = '';
  port: string = '';
  disabled: string = '';

  wireguard: any;

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.bridgeId = params.get('id');
      if (this.bridgeId) {
        this.isEditing = true;
        this.http.get<Wireguard>(`/api/rest/interface/wireguard/${this.bridgeId}`)
          .subscribe(data => {
            this.name = data.name;
            this.port = data?.['listen-port'];
            this.disabled = data.disabled;
          }, error => {
            console.error('HTTP GET error', error);
          });
      }
    });

  }

  submitForm() {
    const data: Wireguard = {
      
      name: this.name,
      ['listen-port']: this.port,
      disabled: this.disabled,
    };
    if (this.isEditing && this.bridgeId) {
      this.http.patch(`/api/rest/interface/wireguard/${this.bridgeId}`, data)
        .subscribe(response => {
          console.log('HTTP PUT response', response);
          this.router.navigate(['/vpn']);
        }, error => {
          console.error('HTTP PUT error', error);
        });
    } else {
      this.http.put('/api/rest/interface/wireguard', data)
        .subscribe(response => {
          console.log('HTTP POST response', response);
          this.router.navigate(['/vpn']);
        }, error => {
          console.error('HTTP POST error', error);
        });
    }
  }
}
