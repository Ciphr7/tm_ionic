import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('map', {static: false}) mapElement: ElementRef;
  map: google.maps.Map;
  home: google.maps.Marker;

  constructor( private menu: MenuController, private geolocation: Geolocation, private plt: Platform){}

  ionViewWillEnter(){
   this.loadMap();
   this.loadUserPosition();
  }


  loadMap(){
    let latLng = new google.maps.LatLng(39.8282, -98.5795);
    let mapOptions: google.maps.MapOptions = {
      center: latLng,
      zoom: 4,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      // mapTypeId: google.maps.mapTypeId.ROADMap
    };
   this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  } 
  
  loadUserPosition(){
    this.plt.ready().then(() => {
      this.geolocation.getCurrentPosition().then(resp => {
        const lat = resp.coords.latitude;
        const lng = resp.coords.longitude;
        this.focusMap(lat, lng);
        this.addMarker(lat, lng, '<h1 color="red">Trucking Routes</h1> <b>by ProMiles</b> ');
      });
    });
  }

  focusMap(lat, lng){
    let latLng = new google.maps.LatLng(lat, lng);
    this.map.setCenter(latLng);
    this.map.setZoom(15);
  }

  addMarker(lat, lng, info){
    let latLng = new google.maps.LatLng(lat, lng);

    this.home = new google.maps.Marker({
      map: this.map,
      position: latLng,
      animation: google.maps.Animation.BOUNCE,
      icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/library_maps.png',
      label: 'ProMiles',
      title:"Truck Routes by ProMiles!",
    });

    let infoWindow = new google.maps.InfoWindow({
      content: info
    });
    this.home.addListener('click', () =>{
      infoWindow.open(this.map, this.home);
    });

  }

  removeMarker(){
    this.home.setMap(null);


  }

  toggleMarker(){
    if(this.home.getAnimation() !==null){
      this.home.setAnimation(null);
    } else{
      this.home.setAnimation(google.maps.Animation.BOUNCE);
    }

  }

  openFirstMenu(){
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openSecondMenu(){
    this.menu.open('end');
  }

}
