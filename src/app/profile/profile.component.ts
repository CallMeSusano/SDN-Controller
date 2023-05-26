import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

interface Profile {
  name: string;
  mode: string;
  ['authentication-types']: string;
  ['wpa-pre-shared-key']: string;
  ['wpa2-pre-shared-key']: string;
  ['supplicant-identity']: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  name: string = '';
  mode: string = 'none';
  type: string = '';
  key: string = '';

  bridgeId: string | null = null;
  isEditing: boolean = false;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.bridgeId = params.get('id');
      if (this.bridgeId) {
        this.isEditing = true;
        this.http.get<Profile>(`/api/rest/interface/wireless/security-profiles/${this.bridgeId}`)
          .subscribe(data => {
            this.name = data.name;
            this.mode = data.mode;
            this.type = data?.['authentication-types'];
            if(data?.['authentication-types'] == 'wpa-psk'){
              this.key = data?.['wpa-pre-shared-key'];
            }
            if(data?.['authentication-types'] == 'wpa2-psk'){
              this.key = data?.['wpa2-pre-shared-key'];
            }
            if(data?.['authentication-types'] == ('wpa-eap' || 'wpa2-eap')){
              this.key = data?.['supplicant-identity'];
            }
          }, error => {
            console.error('HTTP GET error', error);
          });
      }
    });
  }

  submitForm() {
    const data: Profile = {
      
      name: this.name,
      mode: this.mode,
      ['authentication-types']: this.type,
      ['wpa-pre-shared-key']: this.key,
      ['wpa2-pre-shared-key']: this.key,
      ['supplicant-identity']: this.key
    };
    if (this.isEditing && this.bridgeId) {
      this.http.patch(`/api/rest/interface/wireless/security-profiles/${this.bridgeId}`, data)
        .subscribe(response => {
          console.log('HTTP PUT response', response);
          this.router.navigate(['/security']);
        }, error => {
          console.error('HTTP PUT error', error);
        });
    } else {
      this.http.put('/api/rest/interface/wireless/security-profiles', data)
        .subscribe(response => {
          console.log('HTTP POST response', response);
          this.router.navigate(['/security']);
        }, error => {
          console.error('HTTP POST error', error);
        });
    }
  }
}