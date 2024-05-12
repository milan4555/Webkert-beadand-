import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {getAuth, provideAuth} from "@angular/fire/auth";
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {AuthGuardService} from "./shared/auth-guard.service";


const firebaseConfig = {
  apiKey: "AIzaSyCeH6_yoxg3IIuopqMSIy-kpoWCRJ5cmsA",
  authDomain: "rep-recorder-12563.firebaseapp.com",
  databaseURL: "https://rep-recorder-12563-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "rep-recorder-12563",
  storageBucket: "rep-recorder-12563.appspot.com",
  messagingSenderId: "917984238897",
  appId: "1:917984238897:web:ccd913cca08ba448e6a410"
};

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: firebaseConfig },
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideAuth(() => getAuth())
    ]), provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync()
  ]
};
