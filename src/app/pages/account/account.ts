import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserData } from '../../providers/user-data';


@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
  styleUrls: ['./account.scss'],
})
export class AccountPage implements AfterViewInit {
  email: string;

  constructor(
    public alertCtrl: AlertController,
    public router: Router,
    public userData: UserData
  ) { }

  ngAfterViewInit() {
    console.log('ngAfterViewInit')
    this.getEmail();
  }

  updatePicture() {
    console.log('Clicked to update picture');
  }

  // Present an alert with the current username populated
  // clicking OK will update the username and display it
  // clicking Cancel will close the alert and do nothing
  async changeUsername() {
    const alert = await this.alertCtrl.create({
      header: 'Change Username',
      buttons: [
        'Cancel',
        {
          text: 'Ok',
          handler: (data: any) => {
            this.email = data.email;
            //this.userData.setEmail(data.email);
            //this.getEmail();
          }
        }
      ],
      inputs: [
        {
          type: 'text',
          name: 'email',
          value: this.email,
          placeholder: 'email'
        }
      ]
    });
    await alert.present();
  }

  getEmail() {
    this.userData.getEmail().then((email) => {
      this.email = email;
    });
  }

  changePassword() {
    console.log('Clicked to change password');
  }

  logout() {
    this.userData.logout();
    this.router.navigateByUrl('/login');
  }

  support() {
    this.router.navigateByUrl('/support');
  }
}
