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
  selector: 'app-static-routes',
  templateUrl: './static-routes.component.html',
  styleUrls: ['./static-routes.component.css']
})
export class StaticRoutesComponent {
  constructor(private http: HttpClient, private router: Router) { }
  staticRoutes: any;

  

  ngOnInit() {      
    
    // Simple GET request with response type <any>
    this.http.get<any>('/api/rest/ip/route', httpOptions).subscribe(data => {
        this.staticRoutes = data;
        console.log(data)
    })}

    editRoute(id: string) {
      this.router.navigateByUrl(`/route/${id}`);
    }
    deleteRoute(id: string){
      this.http.delete<any>(`/api/rest/ip/route/${id}`, httpOptions).subscribe(data => {
        this.staticRoutes = data;
        console.log(data)
      })
    }
}
