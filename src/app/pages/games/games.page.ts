import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { API_CONFIG } from '../../../config/api.config';
import { GamesDTO } from '../../../models/games.dto';
import { GamesService } from '../../../services/domain/games.service';
import { LoadingService } from '../../../services/loadingService';

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
    public menu : MenuController,
    public loading: LoadingService) { }

  async ngOnInit() {
    await this.loading.present('gamesPage.ngOnInit', 'Please wait...');
    this.gamesService.findAll()
    .subscribe(response => {
      this.items = response;
      this.loading.dismiss('gamesPage.ngOnInit');
    },
    error => {
      this.loading.dismiss('gamesPage.ngOnInit');
    });
  }

  ionViewWillEnter() {
    this.menu.enable(true);
  }

}
