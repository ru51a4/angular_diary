import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentLayoutComponent } from './layouts/content-layout/content-layout.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { PostComponent } from './pages/diary/post/post.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from "@angular/material/dialog";
import { StoreModule } from '@ngrx/store';
import { storeReducer } from './store/store.reducer';
import { EffectsModule } from '@ngrx/effects';
import { StoreEffects } from './store/store.effects';
import { DiaryResolver } from './pages/diary/diary.resolver';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { DashboardResolver } from './pages/dashboard/dashboard.resolver';


@NgModule({
  declarations: [
    AppComponent,
    ContentLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatProgressBarModule,
    StoreModule.forRoot({ user: storeReducer, posts: storeReducer, diarys: storeReducer }),
    EffectsModule.forRoot([StoreEffects]) 
  ],
  providers: [{ provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }, DiaryResolver, DashboardResolver],
  bootstrap: [AppComponent]
})
export class AppModule {
}
