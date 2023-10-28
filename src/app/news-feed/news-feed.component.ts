import {Component, Input, OnInit} from '@angular/core';

import {News} from '../types/news';

import {NewsProviderService} from '../services/news-provider.service';
import {UserInfoProviderService} from '../services/user-info-provider.service';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.scss'],
})
export class NewsFeedComponent implements OnInit {
  @Input() uid?: bigint;

  public newsFeed: News[] = [];

  constructor(
    private readonly userInfoProvider: UserInfoProviderService,
    private readonly newsProvider: NewsProviderService,
  ) {
  }

  public ngOnInit(): void {
    this.getNewsFeed();
  }

  getNewsFeed() {
    this.userInfoProvider.getUserAuthInfo().subscribe({
      next: (info) => {
        this.newsProvider.getNewsFeed(info.uid).subscribe({
          next: (news) => {
            console.log(news);
            this.newsFeed.push(news)
          },
          error: (e) => console.error(e),
        });
      },
      error: (e) => console.error(e),
    });
  }
}
