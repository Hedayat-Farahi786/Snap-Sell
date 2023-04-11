import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../api/user.service';
import { AlertsService } from '../api/alerts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showLanguages: boolean = false;
  loginForm!: FormGroup;

  constructor(private userService: UserService, private alertService: AlertsService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, this.emailValidator]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  emailValidator(control: FormControl) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
    
    if (!emailPattern.test(control.value)) {
      return { email: true };
    }
    
    return null;
  }


  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }


  login() {
    this.userService.userLogin(this.loginForm.value).subscribe(
      (res: any) => {
        let token = res.token;
        localStorage.setItem('token', token);
        this.router.navigateByUrl("/home");
      },
      (err: any) => {
        if(err.error.message === "User not found"){
          this.loginForm.controls['email'].setErrors({notFound:true})
        } else if(err.error.message === "Password is incorrect"){
          this.loginForm.controls['password'].setErrors({incorrect:true})
        } else {
          this.alertService.displayErrorAlert("Error", err.error.message);
        }
      }
    )
  }



  selectLanguage() {
    this.showLanguages = !this.showLanguages;
  }


}
