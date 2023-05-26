import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

interface BridgeInterface {
  name: string;
  arp: string;
  ['ageing-time']: string;
  ['igmp-snooping']: boolean;
  ['dhcp-snooping']: boolean;
  ['fast-forward']: boolean;
}

@Component({
  selector: 'app-interfaces-bridge',
  templateUrl: './interfaces-bridge.component.html',
  styleUrls: ['./interfaces-bridge.component.css']
})
export class InterfacesBridgeComponent {
  name: string = '';
  arp: string = 'enabled';
  ageing: string = '';
  igmp: boolean = false;
  dhcp: boolean = false;
  fastforward: boolean = true;

  bridgeId: string | null = null;
  isEditing: boolean = false;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.bridgeId = params.get('id');
      if (this.bridgeId) {
        this.isEditing = true;
        this.http.get<BridgeInterface>(`/api/rest/interface/bridge/${this.bridgeId}`)
          .subscribe(data => {
            this.name = data.name;
            this.arp = data.arp;
            this.ageing = data['ageing-time'];
            this.igmp = data['igmp-snooping'];
            this.dhcp = data['dhcp-snooping'];
            this.fastforward = data['fast-forward'];
          }, error => {
            console.error('HTTP GET error', error);
          });
      }
    });
  }

  submitForm() {
    const data: BridgeInterface = {
      name: this.name,
      arp: this.arp,
      ['ageing-time']: this.ageing,
      ['igmp-snooping']: this.igmp,
      ['dhcp-snooping']: this.dhcp,
      ['fast-forward']: this.fastforward
    };
    if (this.isEditing && this.bridgeId) {
      this.http.patch(`/api/rest/interface/bridge/${this.bridgeId}`, data)
        .subscribe(response => {
          console.log('HTTP PUT response', response);
          this.router.navigate(['/interfaces']);
        }, error => {
          console.error('HTTP PUT error', error);
        });
    } else {
      this.http.put('/api/rest/interface/bridge', data)
        .subscribe(response => {
          console.log('HTTP POST response', response);
          this.router.navigate(['/interfaces']);
        }, error => {
          console.error('HTTP POST error', error);
        });
    }
  }
}