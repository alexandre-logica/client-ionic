import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { CredentialsDTO } from '../../../models/credentials.dto';

import { UserData } from '../../providers/user-data';



@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  styleUrls: ['./signup.scss'],
})
export class SignupPage {
  signup: CredentialsDTO = { email: '', password: '' };
  submitted = false;

  constructor(
    public router: Router,
    public userData: UserData,
    public menu: MenuController
  ) {}

  onSignup(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      //this.userData.signup(this.signup.email);
      this.router.navigateByUrl('/app/tabs/games');
    }
  }

  ionViewWillEnter() {
    this.menu.enable(false);
  }

  ionViewDidLeave() {
    this.menu.enable(true);
  }
}
