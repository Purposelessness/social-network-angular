import {Component, Input, OnInit} from '@angular/core';

import {News} from '../types/news';

import {NewsProviderService} from '../services/news-provider.service';
import {HelperService} from '../services/helper.service';
import {AddNewsDialogComponent} from '../add-news-dialog/add-news-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {WARN} from '@angular/compiler-cli/src/ngtsc/logging/src/console_logger';
import {error} from '@angular/compiler-cli/src/transformers/util';

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
      error: (err) => console.error(err),
    })
  }

  private getNewsFeed() {
    this.newsProvider.getNewsFeed(this.helper.getUid()).subscribe({
      next: (news) => {
        this.newsFeed.push(news);
      },
      error: (e) => console.error(e),
    });
  }

  public openAddNewsPopup(): void {
    let dialogRef = this.dialog.open(AddNewsDialogComponent, {
      width: '400px',
    });
  }
}
