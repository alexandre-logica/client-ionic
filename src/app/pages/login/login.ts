import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';
import { MenuController } from '@ionic/angular';
import { CredentialsDTO } from '../../../models/credentials.dto';
import { AuthService } from '../../../services/auth.service';




@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage {
  //login: UserOptions = { username: '', password: '' };
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
    //this.submitted = true;

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
/*     this.storage.get('ion_did_tutorial').then(res => {
      if (res === true) {
        this.router.navigateByUrl('/app/tabs/schedule', { replaceUrl: true });
      }
    }); */
    this.menu.enable(false);
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }
}
