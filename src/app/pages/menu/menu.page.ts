import { Component, Input, OnInit } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';
import { HomePage } from '../home/home.page';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  paneEnabled = true;
  value: string ="";

  constructor(private menu: MenuController, private geolocation: Geolocation, private ptl:Platform ){ }

  openFirst(){
    this.menu.enable(true, 'first');
    this.menu.open( 'first');
   
  }
  openEnd(){
    this.menu.enable(true, 'second');
    this.menu.open('second');
  }
  ngOnInit() {
  }
//public tOrg : string;
  onMyBooleanChange(){
   this.setOrg();
   }; 

   setOrg(){

     this.value=!this.value;
     
     if (!this.value) {

       this.value=("")
     } else loadPosition() {
      this.plt.ready().then(() => {
        this.geolocation.getCurrentPosition().then(resp => {
          const lat = resp.coords.latitude;
          const lng = resp.coords.longitude;
          this.value = (lat, lng);
          
        )} 
