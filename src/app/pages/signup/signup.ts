import { error } from '@angular/compiler/src/util';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { ClientDTO } from '../../../models/client.dto';
import { ClientService } from '../../../services/domain/client.service';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  styleUrls: ['./signup.scss'],
})
export class SignupPage {

  client: ClientDTO = {
          name : '',
          birthday : '',
          gender : '',
          email : '',
          password : '',
          username : 'user'
  }

  submitted = false;

  constructor(
    public router: Router,
    public userData: UserData,
    public menu: MenuController,
    public clientService: ClientService,
    public alertController: AlertController
  ) {}

  onSignup(form: NgForm) {
    this.submitted = true;

    if (form.valid) {      
      this.clientService.insert(this.client)
        .subscribe(response => {
          this.router.navigateByUrl('/login');
        },
        error => {});
    }
  }

  teste(event: { srcElement: { firstElementChild: { value: any; }; }; }){
    console.log(event.srcElement.firstElementChild.value);
    console.log(this.client.birthday);
  }

  ionViewWillEnter() {
    this.menu.enable(false);
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: '',
      message: 'Email already registered.',
      buttons: ['OK']
    });

    await alert.present();
  }

  validateEmail(event: { srcElement: { firstElementChild: { value: any; }; }; }) {
    this.clientService.findEmail(event.srcElement.firstElementChild.value)
      .subscribe(response => {
        if(response){
          this.presentAlert();
          this.client.email = '';
        }
      },
      error => {});
 }

}
