import {Component, Input, OnInit} from '@angular/core';

import {News} from '../types/news';

import {NewsProviderService} from '../services/news-provider.service';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.scss'],
})
export class NewsFeedComponent implements OnInit {
  @Input() uid?: bigint;

  public newsFeed: News[] = [];

  constructor(private readonly newsProvider: NewsProviderService) {
  }

  public ngOnInit(): void {
    this.getNewsFeed();
  }

  getNewsFeed() {
    if (this.uid == null) {
      console.error('uid is not set');
      return;
    }
    this.newsProvider.getNewsFeed(this.uid).subscribe({
      next: (news) => this.newsFeed.push(news),
      error: (e) => console.error(e),
    });
  }
}
