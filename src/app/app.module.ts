import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AuthComponent } from './auth/auth.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { BookComponent } from './book/book.component';
import { PageComponent } from './page/page.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { EditablePageComponent } from './editable-page/editable-page.component';
import { SuggestSentenceComponent } from './suggest-sentence/suggest-sentence.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    BookComponent,
    PageComponent,
    EditablePageComponent,
    SuggestSentenceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
