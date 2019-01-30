import { Component, OnInit } from '@angular/core';

import { d_top10 } from '../datas/d_top10';
import { IReturnTop10, ITop10 } from '../types/t_top10';

import { FortniteApiService } from '../../services/fortnite-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-ranking',
  templateUrl: './home-ranking.component.html',
  styleUrls: ['./home-ranking.component.css']
})
export class HomeRankingComponent implements OnInit {
  top10ApiDatas: IReturnTop10;
  top10ApiStatus: boolean;
  top10ApiValues: Array<ITop10>;

  constructor(private router: Router, private apiService: FortniteApiService) { }

  ngOnInit() {
    /* top10 api call */
    this.apiService.getTop10Data().subscribe((result) => {
      this.top10ApiDatas = result;
      this.top10ApiStatus = this.top10ApiDatas.status;
      this.top10ApiValues = this.top10ApiDatas.value.entries;
    });
  }

  searchUserStats(userData: ITop10) {
    const username = userData.username;
    let platform = userData.platform.toUpperCase();
    if (platform === 'XB1') {
      platform = 'XBOX';
    }
    this.router.navigate(['/detail'], {queryParams: {name: username, platform: platform}});
  }
}
