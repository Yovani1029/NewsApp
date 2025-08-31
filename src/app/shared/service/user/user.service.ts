import { Injectable } from '@angular/core';
import { User } from '../../../interfaces/user.interface';
import { v4 as uuidv4 } from 'uuid';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersKey = 'users';
  private secretKey = environment.secretKey;

  constructor() {}

  private encryptPassword(password: string): string {
    return CryptoJS.AES.encrypt(password, this.secretKey).toString();
  }

  private decryptPassword(cipherText: string): string {
    const bytes = CryptoJS.AES.decrypt(cipherText, this.secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  register(user: Omit<User, 'id' | 'password'> & { password: string }): boolean {
    let users: User[] = JSON.parse(localStorage.getItem(this.usersKey) || '[]');

    if (users.find(u => u.email === user.email)) {
      return false; 
    }

    const newUser: User = {
      id: uuidv4(),
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      password: this.encryptPassword(user.password), // cifrada
      country: user.country
    };

    users.push(newUser);
    localStorage.setItem(this.usersKey, JSON.stringify(users));
    return true;
  }

  login(email: string, password: string): boolean {
    const users: User[] = JSON.parse(localStorage.getItem(this.usersKey) || '[]');
    const user = users.find(u => u.email === email);

    if (!user) return false;

    const decryptedPwd = this.decryptPassword(user.password);
    return password === decryptedPwd;
  }

  getAll(): User[] {
    return JSON.parse(localStorage.getItem(this.usersKey) || '[]');
  }
}
