import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { MenuController } from '@ionic/angular';
import { CredentialsDTO } from '../../../models/credentials.dto';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage {
  submitted = false;

  creds : CredentialsDTO = {
    email: "",
    password: ""
  };

  constructor(
    public userData: UserData,
    public router: Router,
    public menu: MenuController,
    public auth: AuthService
  ) { }

  onLogin(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      //this.userData.login(this.creds.email);
      this.auth.authenticate(this.creds)
        .subscribe(response => {
          this.auth.successfulLogin(response.headers.get('Authorization'));
          this.router.navigateByUrl('/games');
        },
        error => {});
        
    }
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }

  ionViewWillEnter() {
    this.menu.enable(false);
  }

}
