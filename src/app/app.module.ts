import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterComponent } from './router/router.component';
import { RouterListComponent } from './router-list/router-list.component';
import { InterfacesComponent } from './interfaces/interfaces.component';
import { InterfacesWlanComponent } from './interfaces-wlan/interfaces-wlan.component';
import { InterfacesBridgeComponent } from './interfaces-bridge/interfaces-bridge.component';
import { SecurityComponent } from './security/security.component';
import { WlanComponent } from './wlan/wlan.component';
import { StaticRoutesComponent } from './static-routes/static-routes.component';
import { AddressesComponent } from './addresses/addresses.component';
import { DhcpComponent } from './dhcp/dhcp.component';
import { DnsComponent } from './dns/dns.component';
import { FirewallComponent } from './firewall/firewall.component';
import { ForwardingComponent } from './forwarding/forwarding.component';
import { BridgeDetailComponent } from './bridge-detail/bridge-detail.component';
import { ProfileComponent } from './profile/profile.component';
import { RoutesDetailComponent } from './routes-detail/routes-detail.component';
import { AddressesDetailComponent } from './addresses-detail/addresses-detail.component';
import { DhcpDetailComponent } from './dhcp-detail/dhcp-detail.component';
import { FirewallDetailComponent } from './firewall-detail/firewall-detail.component';
import { VpnComponent } from './vpn/vpn.component';
import { WireguardComponent } from './wireguard/wireguard.component';
import { PeerComponent } from './peer/peer.component';


const routes: Routes = [
  {path: '', redirectTo: '/routerList', pathMatch: 'full'},
  { path: 'router', component: RouterComponent },
  { path: 'routerList', component: RouterListComponent },
  { path: 'interfaces', component: InterfacesComponent },
  { path: 'security', component: SecurityComponent },
  { path: 'interfacesWlan', component: InterfacesWlanComponent },
  { path: 'staticRoutes', component: StaticRoutesComponent },
  { path: 'addresses', component: AddressesComponent },
  { path: 'dhcp', component: DhcpComponent },
  { path: 'dns', component: DnsComponent },
  { path: 'firewall', component: FirewallComponent },
  { path: 'forwarding', component: ForwardingComponent },
  { path: 'bridge', component: InterfacesBridgeComponent },
  { path: 'bridge/:id', component: InterfacesBridgeComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'wlan/:id', component: WlanComponent },
  { path: 'route/:id', component: RoutesDetailComponent },
  { path: 'route', component: RoutesDetailComponent },
  { path: 'address/:id', component: AddressesDetailComponent },
  { path: 'address', component: AddressesDetailComponent },
  { path: 'dhcpDetail/:id', component: DhcpDetailComponent },
  { path: 'dhcpDetail', component: DhcpDetailComponent },
  { path: 'firewallDetail/:id', component: FirewallDetailComponent },
  { path: 'firewallDetail', component: FirewallDetailComponent },
  { path: 'vpn', component: VpnComponent },
  { path: 'wireguard/:id', component: WireguardComponent },
  { path: 'wireguard', component: WireguardComponent },
  { path: 'peer/:id', component: PeerComponent },
  { path: 'peer', component: PeerComponent },

  
];

@NgModule({
  declarations: [
    AppComponent,
    RouterComponent,
    RouterListComponent,
    InterfacesComponent,
    InterfacesWlanComponent,
    InterfacesBridgeComponent,
    SecurityComponent,
    WlanComponent,
    StaticRoutesComponent,
    AddressesComponent,
    DhcpComponent,
    DnsComponent,
    FirewallComponent,
    ForwardingComponent,
    BridgeDetailComponent,
    ProfileComponent,
    RoutesDetailComponent,
    AddressesDetailComponent,
    DhcpDetailComponent,
    FirewallDetailComponent,
    VpnComponent,
    WireguardComponent,
    PeerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
