import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private meta: Meta) {
    this.meta.addTags([
      {name: 'title', content: 'Fortnite Stats Leaderboard PC/XBOX/PS4'},
      {name: 'description', content: 'Fortnite Stats Leaderboard PC/XBOX/PS4'},
      {name: 'robots', content: 'INDEX, FOLLOW'},
      {name: 'author', content: 'JiHo CHoi'},
      {name: 'keywords', content: 'Fortnite, Leaderboard, Stats'},
      {httpEquiv: 'Content-Type', content: 'text/html'},
      {property: 'og:title', content: 'Fortnite Stats Leaderboard PC/XBOX/PS4'},
      {property: 'og:type', content: 'website'},
      {property: 'og:description', content: 'Fortnite Stats Leaderboard PC/XBOX/PS4'},
      {property: 'og:image', content: 'assets/fortnite.jpg'},
      {charset: 'UTF-8'}
   ]);
  }
}
