import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NewsFeedComponent} from './news-feed/news-feed.component';
import {NewsItemComponent} from './news-item/news-item.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {UserCardComponent} from './user-card/user-card.component';
import {FriendListComponent} from './friend-list/friend-list.component';
import {AuthDialogComponent} from './auth-dialog/auth-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import {MatNativeDateModule} from '@angular/material/core';
import {MatTabsModule} from '@angular/material/tabs';
import {AuthPopupComponent} from './auth-popup/auth-popup.component';
import {RegistrationDialogComponent} from './registration-dialog/registration-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NewsFeedComponent,
    NewsItemComponent,
    UserProfileComponent,
    UserCardComponent,
    FriendListComponent,
    AuthDialogComponent,
    AuthPopupComponent,
    RegistrationDialogComponent,
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
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatTabsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
