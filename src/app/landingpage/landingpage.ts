import { Component } from '@angular/core';
import { Profile } from './profile';
import { Router } from '@angular/router';
import { AuthGooleService } from '../services/auth-goole-service';

@Component({
  selector: 'app-landingpage',
  standalone: false,
  templateUrl: './landingpage.html',
  styleUrl: './landingpage.scss',
})
export class Landingpage {
  profile: Profile | undefined;

  constructor(private router: Router, private loginService: AuthGooleService) {}

  navegar() {
    this.router.navigate(['/paginas/galeria']);
  }

  logarComGoogle() {
    this.loginService.login();
  }

  isLoggedIn() {
    this.profile = this.loginService.getLoggedProfile();
    return !!this.profile;
  }
}
