import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { DialogflowComponent } from './chat/dialogflow/dialogflow.component';

// import { crypting } from './model/crypting';
import { ChatService } from './service/chat/chat.service';
import { Http, HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    // crypting,
    DialogflowComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    // Http,
    HttpModule
    // AlertModule.forRoot(),
  ],
  providers: [ChatService, HttpModule, BrowserModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
