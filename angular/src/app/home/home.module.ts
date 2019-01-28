import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http';
import { AdsenseModule } from 'ng2-adsense';

import { HomeMainComponent } from './home-main/home-main.component';
import { HomeDetailComponent } from './home-detail/home-detail.component';

import { HomeRoutes } from './home.routing';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HomeNotFoundComponent } from './home-not-found/home-not-found.component';

import { FortniteApiService } from '../services/fortnite-api.service';
import { HomeRankingComponent } from './home-ranking/home-ranking.component';

@NgModule({
  declarations: [HomeMainComponent, HomeDetailComponent, HomeNotFoundComponent, HomeRankingComponent],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    NgxChartsModule,
    HomeRoutes,
    NgSelectModule,
    HttpModule,
    AdsenseModule.forRoot({
      adClient: 'ca-pub-8739147803341265',
      adSlot: 9196284235,
    })
  ],
  providers: [FortniteApiService]
})
export class HomeModule { }
