import { Component, Input, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { MenuController, Platform } from '@ionic/angular';
import { HomePage } from '../home/home.page';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  paneEnabled = true;
  value: string ="";

  constructor(private menu: MenuController, private geolocation:Geolocation, private plt:Platform) { }

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
     } else this.loadUserPosition()
   }
         
  loadUserPosition(){
    this.plt.ready().then(() => {
      this.geolocation.getCurrentPosition().then(resp => {
        const lat = resp.coords.latitude;
        const lng = resp.coords.longitude;
        this.value = (lat + ':' + lng); 
           });
    });
  }
     
   }

  //  setOrg(){
  //   let b = Boolean;
  //   if (!b) {
  //     this.value=("");

  //   } else this.value=("hello");
  // };


//   setGPSHome(){
//     let b = ("setGPShome").slice("checked");
//     if (!b) {
//       $("#origin").val("");

//   } else if (navigator.geolocation) {
//       var options = {
//           maximumAge: 0,
//           timeout:30000,
//           enableHighAccuracy: true};
//       navigator.geolocation.getCurrentPosition(success, error, [options]);

//   } else {
//       alert("HTML5 Not supported");
//   }
// }
//   error(err) {
//     console.warn(`ERROR(${err.code}): ${err.message}`);
//   }
//   success(position) {
//     var lat = position.coords.latitude;
//     var lon = position.coords.longitude;
//     $("#origin").val(lat + ':' + lon);

//   }
//}
