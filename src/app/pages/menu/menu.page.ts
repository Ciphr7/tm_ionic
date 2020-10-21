import { HttpService } from './../../http.service';
import { Component, Input, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { MenuController, Platform } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  paneEnabled = true;
  loc1: any ="";

  locSearch : string='';
  locs: object;
  results: Observable<any>;

  constructor(private http: HttpService, private menu: MenuController, private geolocation:Geolocation, private plt:Platform) { }

  openFirst(){
    this.menu.enable(true, 'first');
    this.menu.open( 'first');
   
  }
  openEnd(){
    this.menu.enable(true, 'second');
    this.menu.open('second');
  }
  //on Checkbox change function
  onMyBooleanChange(){
    this.setOrg();
  }; 
  
  setOrg(){
    
    this.loc1 = !this.loc1;
    
    if (!this.loc1) {
      
      this.loc1=("")
    } else this.loadUserPosition()
  }
  
  loadUserPosition(){
    this.plt.ready().then(() => {
      this.geolocation.getCurrentPosition().then(resp => {
        const lat = resp.coords.latitude;
        const lng = resp.coords.longitude;
        this.loc1 = (lat + ':' + lng); 
      });
    });
  }
  
  //Location lookup function
  
  
  ngOnInit() {
    //this._http.getPSDCLocs();

   
  }  
  searchChanged() {
    // Call our service function which returns an Observable
    this.results = this.http.getPSDCLocs(this.locSearch);
  }

  locSelected(val){

    this.loc1 = val;
    this.results = null;
  }


}
  
