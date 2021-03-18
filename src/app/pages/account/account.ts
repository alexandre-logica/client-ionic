import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { API_CONFIG } from '../../../config/api.config';
import { ClientDTO } from '../../../models/client.dto';
import { LocalUser } from '../../../models/local_user';
import { ClientService } from '../../../services/domain/client.service';
import { StorageService } from '../../../services/storage.service';


@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
  styleUrls: ['./account.scss'],
})
export class AccountPage implements AfterViewInit {
  
  client : ClientDTO;
  username : String;

  constructor(
    public alertCtrl: AlertController,
    public router: Router,
    public storageService : StorageService,
    public clientService : ClientService
  ) { }

  ngAfterViewInit() {
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
            this.client.username = data.username;
            console.log('changeUsername');
            console.log(data.username);
            this.updateUsername();
          }
        }
      ],
      inputs: [
        {
          type: 'text',
          name: 'username',
          value: this.client.username,
          placeholder: 'username'
        }
      ]
    });
    await alert.present();
  }

  async accountDeletedAlert() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: '',
      message: 'Account deleted.',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.logout();
          }
        }]
    });

    await alert.present();
  }

  async userNameUpdatedAlert() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: '',
      message: 'Username update.',
      buttons: ['Ok']
    });

    await alert.present();
  }

  getEmail() {
    let user : LocalUser = this.storageService.getLocalUser();
    if(user && user.email){
      this.clientService.findByEmail(user.email)
      .subscribe(response => {
        this.client = response;
        console.log(this.client);
        this.username = this.client.username;
        this.getImageIfExists();
      },
      error => {
        if(error.status == 403){
          this.router.navigateByUrl('/login');
        }
      });
    }
    else {
      this.router.navigateByUrl('/login');
    }

  }

  getImageIfExists(){
    this.clientService.getImageFromBucket(this.client.id)
      .subscribe(response => {
        this.client.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.client.id}.jpg`;
      },
      error => {});
  }

  changePassword() {
    console.log('Clicked to change password');
  }

  updateUsername(){
    this.clientService.update(this.client)
    .then((response) => {
      this.username = this.client.username;
      //this.userNameUpdatedAlert();
    })
    .catch((error) => {});
  }

  logout() {
    this.storageService.logout();
    this.router.navigateByUrl('/login');
  }

  support() {
    this.router.navigateByUrl('/support');
  }

  delete(){
    this.clientService.inactivate(this.client)
    .then((response) => {
      this.accountDeletedAlert();
    })
    .catch((error) => {});
  }
}
