import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + btoa('admin' + ':' + 'projeto'),
  })
};

@Component({
  selector: 'app-interfaces',
  templateUrl: './interfaces.component.html',
  styleUrls: ['./interfaces.component.css']
})
export class InterfacesComponent {
  constructor(private http: HttpClient, private router: Router) {}

  interfaces: any;
  bridges: any;

  selectedType: string = "all";

  ngOnInit() {      
    this.http.get<any>('/api/rest/interface', httpOptions).subscribe(data => {
      this.interfaces = data.filter((iface: { type: string; }) => iface.type === 'wlan' || iface.type === 'ether');
      console.log(data)
    })
    this.http.get<any>('/api/rest/interface/bridge', httpOptions).subscribe(data => {
      this.bridges = data;
      console.log(data)
    })
  }

  applyFilter(selectedType: string) {
    this.selectedType = selectedType;
  }

  getFilteredInterfaces(): any[] {
    if (this.selectedType === "all") {
      return this.interfaces.concat(this.bridges);
    } else if (this.selectedType === "wlan") {
      return this.interfaces.filter((iface: any) => iface.type === "wlan");
    } else if (this.selectedType === "bridge") {
      return this.bridges;
    } else {
      return [];
    }
  }

  editBridge(id: string) {
    this.router.navigateByUrl(`/bridge/${id}`);
  }
  deleteBridge(id: string){
    this.http.delete<any>(`/api/rest/interface/bridge/${id}`, httpOptions).subscribe(data => {
      this.bridges = data;
      console.log(data)
    })
  }
}