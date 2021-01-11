import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  loggedIn = true;

  constructor(
    private authenticate: AuthenticationService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    const loginStatus = localStorage.getItem('loggingIn') || 'false';
    if (loginStatus === 'true') this.spinner.show();
  }

  login(): void {
    localStorage.setItem('loggingIn', 'true');
    this.spinner.show();
    this.authenticate.authenitcateUser().subscribe((loginStatus) => {
      if (!loginStatus) localStorage.removeItem('loggingIn');
    });
  }

}
