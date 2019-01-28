import { Component, OnInit } from '@angular/core';

import { d_top10 } from '../datas/d_top10';
import { IReturnTop10, IGetTop10 } from '../types/t_top10';

import { FortniteApiService } from '../../services/fortnite-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-ranking',
  templateUrl: './home-ranking.component.html',
  styleUrls: ['./home-ranking.component.css']
})
export class HomeRankingComponent implements OnInit {
  top10Datas: IReturnTop10['value'] = d_top10.value;

  constructor(private router: Router) { }

  ngOnInit() {
    /* top10 api call */
  }

  searchUserStats(userData: IGetTop10) {
    const username = userData.username;
    let platform = userData.platform;
    if (platform === 'xb1') {
      platform = 'XBOX';
    }
    this.router.navigate(['/detail'], {queryParams: {name: username, platform: platform}});
  }
}
