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
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent {
  constructor(private http: HttpClient, private router: Router) { }
  security: any;



  ngOnInit() {

    // Simple GET request with response type <any>
    this.http.get<any>('/api/rest/interface/wireless/security-profiles', httpOptions).subscribe(data => {
      this.security = data;
      console.log(data)
    })
  }


  editProfile(id: string) {
    this.router.navigateByUrl(`/profile/${id}`);
  }
  deleteProfile(id: string) {
    this.http.delete<any>(`/api/rest/interface/wireless/security-profiles/${id}`, httpOptions).subscribe(data => {
      this.security = data;
      console.log(data)
    })
  }
}
