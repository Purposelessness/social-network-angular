import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NewsFeedComponent} from './news-feed/news-feed.component';
import {NewsItemComponent} from './news-item/news-item.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { UserCardComponent } from './user-card/user-card.component';
import { FriendListComponent } from './friend-list/friend-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NewsFeedComponent,
    NewsItemComponent,
    UserProfileComponent,
    UserCardComponent,
    FriendListComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
