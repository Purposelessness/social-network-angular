import {Component, OnInit} from '@angular/core';

import {News} from '../types/news';

import {NewsFeedProviderService} from '../services/news-feed-provider.service';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.scss'],
})
export class NewsFeedComponent implements OnInit {
  public newsFeed: News[] = [];

  constructor(private readonly newsFeedProvider: NewsFeedProviderService) {
  }

  public ngOnInit(): void {
    this.getNewsFeed();
  }

  getNewsFeed() {
    const id = 0n;
    this.newsFeedProvider.getNewsFeed(id).subscribe({
      next: (news) => this.newsFeed.push(news),
      error: (e) => console.error(e),
    });
  }
}
