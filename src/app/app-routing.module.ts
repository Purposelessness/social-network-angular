import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {NewsFeedComponent} from './news-feed/news-feed.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {FriendListComponent} from './friend-list/friend-list.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'feed', component: NewsFeedComponent},
  {path: 'user/:id', component: UserProfileComponent},
  {path: 'friends', component: FriendListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
