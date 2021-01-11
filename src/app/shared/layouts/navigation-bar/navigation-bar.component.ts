import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { AuthenticationService } from '../../../core/services/authentication.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})

export class NavigationBarComponent implements OnInit {
  authUser: any;
  constructor(private authenticate: AuthenticationService) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo(): void{
    this.authUser = JSON.parse(localStorage.getItem('user') || '{}');
  }

  logout(): void {
    this.authenticate.LogOut();
  }

}
