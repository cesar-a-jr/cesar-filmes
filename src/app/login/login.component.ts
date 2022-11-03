import { Component, OnInit } from '@angular/core';
import { FirebaseUISignInFailure, FirebaseUISignInSuccessWithAuthResult } from 'firebaseui-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  angularFireAuth: any;
  isLoggedIn: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  successCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult) {
    this.router.navigate(['/dashboard'])
  }

  errorCallback(errorData: FirebaseUISignInFailure) {
    console.warn(errorData);

  }

  uiShownCallback() {
  }

}
