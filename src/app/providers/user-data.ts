import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { STORAGE_KEYS } from '../../config/storage_keys.config';
import { LocalUser } from '../../models/local_user';


@Injectable({
  providedIn: 'root'
})
export class UserData {
  favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';

  constructor(
    public storage: Storage
  ) { }

  hasFavorite(sessionName: string): boolean {
    return (this.favorites.indexOf(sessionName) > -1);
  }

  addFavorite(sessionName: string): void {
    this.favorites.push(sessionName);
  }

  removeFavorite(sessionName: string): void {
    const index = this.favorites.indexOf(sessionName);
    if (index > -1) {
      this.favorites.splice(index, 1);
    }
  }

/*   login(email: string): Promise<any> {
    return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
      this.setEmail(email);
      return window.dispatchEvent(new CustomEvent('user:login'));
    });
  } */

/*   signup(email: string): Promise<any> {
    return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
      this.setEmail(email);
      return window.dispatchEvent(new CustomEvent('user:signup'));
    });
  } */

  logout(): Promise<any> {
    return this.storage.remove(STORAGE_KEYS.localUser).then(() => {
    }).then(() => {
      window.dispatchEvent(new CustomEvent('user:logout'));
    });
  }

  getEmail(): Promise<string> {
    return this.storage.get(STORAGE_KEYS.localUser).then((value) => {
      let user: LocalUser = JSON.parse(value);
      return user.email;
    });
  }

  getLocalUser() : Promise<LocalUser> {
    return  this.storage.get(STORAGE_KEYS.localUser).then((value) => {
      return JSON.parse(value);
    });
  }

  setLocalUser(obj : LocalUser){
      if(obj == null) {
        this.storage.remove(STORAGE_KEYS.localUser);
      }
      else {
        this.storage.set(STORAGE_KEYS.localUser, JSON.stringify(obj));
      }
  }

  isLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  }

  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    });
  }
}
