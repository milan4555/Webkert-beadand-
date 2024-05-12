import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AuthService} from "./shared/auth.service";
import {MatBadge} from "@angular/material/badge";
import {GymsessionService} from "./shared/gymsession.service";
import {MatIcon, MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatBadge, MatIcon],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'rep-recorder';
  ownGymSessions = 0;

  constructor(private authService: AuthService,
              private gymSessionService: GymsessionService,
              private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer)
  {
    this.matIconRegistry.addSvgIcon(
      "dumbbell",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/dumbbell.svg")
    );
    this.countGymSessions()
  }

  logOut() {
    this.authService.logout();
  }

  countGymSessions() {
    this.gymSessionService.getAllGymSession()
      .snapshotChanges()
      .subscribe({
        next: result => {
          this.ownGymSessions = 0;
          result.forEach(item => {
            this.ownGymSessions++;
          })
        }
      })
  }

  protected readonly localStorage = localStorage;
}
