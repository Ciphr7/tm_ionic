import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  paneEnabled = true;

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

}
