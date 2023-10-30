import {Component, Input, OnInit} from '@angular/core';

import {News} from '../types/news';

import {NewsProviderService} from '../services/news-provider.service';
import {HelperService} from '../services/helper.service';
import {AddNewsDialogComponent} from '../add-news-dialog/add-news-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {captureMessage} from '@sentry/angular-ivy';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.scss'],
})
export class NewsFeedComponent implements OnInit {
  @Input() uid?: bigint;

  public newsFeed: News[] = [];

  constructor(
    private readonly dialog: MatDialog,
    private readonly newsProvider: NewsProviderService,
    private readonly helper: HelperService,
  ) {
  }

  public ngOnInit(): void {
    this.getNewsFeed();
    this.newsProvider.getNewsStream().subscribe({
      next: (news) => {
        this.getNewsFeed();
      },
      error: (err) => captureMessage('Error when getting news stream', 'error'),
    })
  }

  private getNewsFeed() {
    this.newsProvider.getNewsFeed(this.helper.getUid()).subscribe({
      next: (news) => {
        this.newsFeed.push(news);
      },
      error: (e) => captureMessage('Error when getting news feed', 'error'),
    });
  }

  public openAddNewsPopup(): void {
    let dialogRef = this.dialog.open(AddNewsDialogComponent, {
      width: '400px',
    });
  }
}
