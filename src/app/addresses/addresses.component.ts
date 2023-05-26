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
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent {
  constructor(private http: HttpClient, private router: Router) { }
  addresses: any;

  ngOnInit() {      
    
    // Simple GET request with response type <any>
    this.http.get<any>('/api/rest/ip/address', httpOptions).subscribe(data => {
        this.addresses = data;
        console.log(data)
    })}

    editAddress(id: string) {
      this.router.navigateByUrl(`/address/${id}`);
    }
    deleteAddress(id: string){
      this.http.delete<any>(`/api/rest/ip/address/${id}`, httpOptions).subscribe(data => {
        this.addresses = data;
        console.log(data)
      })
    }
  
}
