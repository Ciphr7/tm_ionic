import { Component, Input, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { HomePage } from '../home/home.page';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  paneEnabled = true;
  value: string ="";

  constructor(private menu: MenuController) { }

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
     } else if (navigator.geolocation) {
      const options = {
                  maximumAge: 0,
                  timeout:30000,
                  enableHighAccuracy: true};
              this.navigator.geolocation.getCurrentPosition(this.success, this.error, [options]);
        
          } else {
              alert("HTML5 Not supported");
          }
        }
          error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
          }
          success(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            this.value = ("lat + ':' + lon");
        
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
