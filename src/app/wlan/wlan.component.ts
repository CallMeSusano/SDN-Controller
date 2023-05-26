import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + btoa('admin' + ':' + 'projeto'),
  })
};

interface WLAN {
  ssid: string;
  mode: string;
  band: string;
  frequency: string;
  disabled: string;
  ['security-profile']: string;
}


@Component({
  selector: 'app-wlan',
  templateUrl: './wlan.component.html',
  styleUrls: ['./wlan.component.css']
})
export class WlanComponent {
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}
  bridgeId: string | null = null;
  isEditing: boolean = false;

  ssid: string = '';
  mode: string = 'none';
  band: string = '';
  frequency: string = '';
  security: string = '';
  disabled: string = '';

  secprofs: any;

  ngOnInit() {
    this.http.get<any>('/api/rest/interface/wireless/security-profiles', httpOptions).subscribe(data => {
      this.secprofs = data;
      console.log(data)
    })

    this.route.paramMap.subscribe(params => {
      this.bridgeId = params.get('id');
      if (this.bridgeId) {
        this.isEditing = true;
        this.http.get<WLAN>(`/api/rest/interface/wireless/${this.bridgeId}`)
          .subscribe(data => {
            this.ssid = data.ssid;
            this.mode = data.mode;
            this.band = data.band;
            this.frequency = data.frequency;
            this.disabled = data.disabled;
            this.security = data?.['security-profile'];
          }, error => {
            console.error('HTTP GET error', error);
          });
      }
    });

  }
  submitForm() {
    const data: WLAN = {
      
      ssid: this.ssid,
      mode: this.mode,
      band: this.band,
      frequency: this.frequency,
      ['security-profile']: this.security,
      disabled: this.disabled
    };
      this.http.patch(`/api/rest/interface/wireless/${this.bridgeId}`, data)
        .subscribe(response => {
          console.log('HTTP PUT response', response);
          this.router.navigate(['/interfacesWlan']);
        }, error => {
          console.error('HTTP PUT error', error);
        });
    
  }

}

