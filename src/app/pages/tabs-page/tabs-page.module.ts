import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs-page';
import { TabsPageRoutingModule } from './tabs-page-routing.module';

import { AboutModule } from '../about/about.module';
import { MapModule } from '../map/map.module';
import { GamesPageModule } from '../games/games.module';
import { SessionDetailModule } from '../session-detail/session-detail.module';

@NgModule({
  imports: [
    AboutModule,
    CommonModule,
    IonicModule,
    MapModule,
    SessionDetailModule,
    TabsPageRoutingModule,
    GamesPageModule
  ],
  declarations: [
    TabsPage,
  ]
})
export class TabsModule { }
