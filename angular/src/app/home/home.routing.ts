import { Routes, RouterModule } from '@angular/router';
import { HomeMainComponent } from './home-main/home-main.component';
import { HomeDetailComponent } from './home-detail/home-detail.component';
import { HomeNotFoundComponent } from './home-not-found/home-not-found.component';
import { HomeRankingComponent } from './home-ranking/home-ranking.component';

const routes: Routes = [
  { path: '',
    component: HomeMainComponent,
    children: [
      {
        /* ranking component */
        path: '',
        component: HomeRankingComponent
      },
      {
        /* user stats component */
        path: 'detail',
        component: HomeDetailComponent,
        data: {animation: 'homeDetailPage'},
      },
      {
        /* not-found component */
        path: 'not-found',
        component: HomeNotFoundComponent
      },
  ], data: {animation: 'homeMainPage'},
  },
  {
    /* 404 component */
    path: '**', redirectTo: '/not-found'
  }
];

export const HomeRoutes = RouterModule.forChild(routes);
