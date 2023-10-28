import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {News} from '../types/news';
import {Observable, Subscriber} from 'rxjs';
import {UserInfo} from '../types/user-info';
import {CLIENTS} from '../consts/clients';

interface NewsFeedResponseItem {
  id: bigint,
  uid: bigint,
  text: string,
  createdAt: Date,
}

@Injectable({
  providedIn: 'root',
})
export class NewsFeedProviderService {
  constructor(private readonly httpClient: HttpClient) {
  }

  public getNewsFeed(id: bigint): Observable<News> {
    const newsObservable = (observer: Subscriber<News>, newsFeed: News[]) => {
      if (newsFeed.length === 0) {
        observer.complete();
        return;
      }

      const authorIds = newsFeed.map((news) => news.uid);
      const uniqueAuthorIds = [...new Set(authorIds)];

      this.httpClient.get<UserInfo[]>(CLIENTS.USER_REPOSITORY.GET_USERS_INFO(uniqueAuthorIds))
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
    };

    const getNewsFeed = (observer: Subscriber<News>) => {
      this.httpClient.get<NewsFeedResponseItem[]>(CLIENTS.NEWS_FEED.GET_NEWS_FEED(id))
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

            newsObservable(observer, newsFeed);
          },
          error: (e) => observer.error(e),
        });
    };

    return new Observable(getNewsFeed);
  }
}
