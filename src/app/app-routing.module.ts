import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {NewsFeedComponent} from './news-feed/news-feed.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {FriendListComponent} from './friend-list/friend-list.component';
import {UserListComponent} from './user-list/user-list.component';
import {ChatListComponent} from './chat-list/chat-list.component';
import {ChatComponent} from './chat/chat.component';

const routes: Routes = [
  {path: 'feed', component: NewsFeedComponent},
  {path: 'friends', component: FriendListComponent},
  {path: 'user', component: UserProfileComponent},
  {path: 'user/:id', component: UserProfileComponent},
  {path: 'users', component: UserListComponent},
  {path: 'chat', component: ChatListComponent},
  {path: 'chat/:id', component: ChatComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
