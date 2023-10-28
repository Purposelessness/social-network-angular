import {Component, Input, OnInit} from '@angular/core';

import {News} from '../types/news';

import {NewsFeedProviderService} from '../services/news-feed-provider.service';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.scss'],
})
export class NewsFeedComponent implements OnInit {
  @Input() uid?: bigint;

  public newsFeed: News[] = [];

  constructor(private readonly newsFeedProvider: NewsFeedProviderService) {
  }

  public ngOnInit(): void {
    this.getNewsFeed();
  }

  getNewsFeed() {
    if (this.uid == null) {
      console.error('uid is not set');
      return;
    }
    this.newsFeedProvider.getNewsFeed(this.uid).subscribe({
      next: (news) => this.newsFeed.push(news),
      error: (e) => console.error(e),
    });
  }
}
