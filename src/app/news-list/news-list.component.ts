import {Component, Input, OnInit} from '@angular/core';

import {News} from '../types/news';
import {NewsProviderService} from '../services/news-provider.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss'],
})
export class NewsListComponent implements OnInit {
  @Input() newsIdList: bigint[] = [];

  public newsList: News[] = [];

  constructor(private readonly newsProvider: NewsProviderService) {
  }

  public ngOnInit(): void {
    this.getNewsList();
  }

  private getNewsList(): void {
    this.newsProvider.getNewsList(this.newsIdList).subscribe({
      next: (news) => this.newsList.push(news),
      error: (e) => console.error(e),
    });
  }
}
