import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {News} from '../types/news';
import {Observable, Subscriber} from 'rxjs';
import {UserInfo} from '../types/user-info';
import {CLIENTS} from '../consts/clients';

type NewsFeedResponseItem = {
  id: bigint,
  uid: bigint,
  text: string,
  createdAt: Date,
}

@Injectable({
  providedIn: 'root',
})
export class NewsProviderService {
  constructor(private readonly httpClient: HttpClient) {
  }

  public getNewsList(ids: bigint[]): Observable<News> {
    const getNews = (observer: Subscriber<News>) => {
      type NewsResponseItem = {
        id: bigint,
        uid: bigint,
        text: string,
        createdAt: Date,
      }

      this.httpClient.get<NewsResponseItem[]>(CLIENTS.NEWS_REPOSITORY.GET_NEWS(ids), {
        withCredentials: true,
      })
        .subscribe({
          next: (newsResponse) => {
            let news: News[] = [];

            newsResponse.map((newsResponseItem) => {
              news.push({
                uid: newsResponseItem.uid,
                authorName: 'unknown',
                text: newsResponseItem.text,
                createdAt: newsResponseItem.createdAt,
              });
            });

            this.fixAuthorNames(observer, news);
          },
          error: (e) => observer.error(e),
        });
    };

    return new Observable(getNews);
  }

  public getNewsFeed(id: bigint): Observable<News> {
    const getNewsFeed = (observer: Subscriber<News>) => {
      this.httpClient.get<NewsFeedResponseItem[]>(CLIENTS.NEWS_FEED.GET_NEWS_FEED(id), {
        withCredentials: true,
      })
        .subscribe({
          next: (newsFeedResponse) => {
            let newsFeed: News[] = [];

            newsFeedResponse.map((newsFeedResponseItem) => {
              newsFeed.push({
                uid: newsFeedResponseItem.uid,
                authorName: 'unknown',
                text: newsFeedResponseItem.text,
                createdAt: newsFeedResponseItem.createdAt,
              });
            });

            this.fixAuthorNames(observer, newsFeed);
          },
          error: (e) => observer.error(e),
        });
    };

    return new Observable(getNewsFeed);
  }

  private fixAuthorNames(observer: Subscriber<News>, newsFeed: News[]): void {
    if (newsFeed.length === 0) {
      observer.complete();
      return;
    }

    const authorIds = newsFeed.map((news) => news.uid);
    const uniqueAuthorIds = [...new Set(authorIds)];

    this.httpClient.get<UserInfo[]>(CLIENTS.USER_REPOSITORY.GET_USERS_INFO(uniqueAuthorIds), {
      withCredentials: true,
    })
      .subscribe({
        next: (authorNamesResponse) => {
          const authorNamesMap: Map<bigint, string> = new Map();
          authorNamesResponse.map((authorNameResponse) => {
            authorNamesMap.set(authorNameResponse.id, authorNameResponse.name);
          });

          for (let i = 0; i < newsFeed.length; i++) {
            newsFeed[i].authorName = authorNamesMap.get(newsFeed[i].uid) || 'unknown';
            observer.next(newsFeed[i]);
          }

          observer.complete();
        },
        error: (e) => observer.error(e),
      });
  }

}
