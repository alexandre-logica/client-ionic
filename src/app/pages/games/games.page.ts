import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { API_CONFIG } from '../../../config/api.config';
import { GamesDTO } from '../../../models/games.dto';
import { GamesService } from '../../../services/domain/games.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.scss'],
})
export class GamesPage implements OnInit {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;
  
  items: GamesDTO[];

  constructor(
    public gamesService: GamesService,
    public menu : MenuController) { }

  ngOnInit() {
    this.gamesService.findAll()
    .subscribe(response => {
      this.items = response;
      console.log(this.items);
    },
    error => {});
  }

  ionViewWillEnter() {
    this.menu.enable(true);
  }

}
