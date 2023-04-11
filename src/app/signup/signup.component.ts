import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';
import { AlertsService } from '../api/alerts.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  showLanguages: boolean = false;
  signupForm!: FormGroup;

  constructor(private userService: UserService, private alertService: AlertsService, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, this.emailValidator]),
      storeName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      gtc: new FormControl(false, [Validators.requiredTrue])
    }, {
      validators: this.passwordMatchingValidatior
    });
  }

  emailValidator(control: FormControl) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
    
    if (!emailPattern.test(control.value)) {
      return { email: true };
    }
    
    return null;
  }

  passwordMatchingValidatior: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (!password || !confirmPassword) { // if the password or confirmation has not been inserted ignore
      return null;
    }
    
    if (confirmPassword.length > 0 && confirmPassword !== password) {
      this.signupForm.controls['confirmPassword'].setErrors({ missMatch: true }); // set the error in the confirmation input/control
    }
  
    return null;
  };


  get email() {
    return this.signupForm.get('email');
  }

  get storeName() {
    return this.signupForm.get('storeName');
  }
  get password() {
    return this.signupForm.get('password');
  }
  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }
  get gtc() {
    return this.signupForm.get('gtc');
  }


  signup() {
    this.userService.userSignup(this.signupForm.value).subscribe(
      (res: any) => {
        this.alertService.displaySuccessAlert("Success", "User registered successfully!");
        this.router.navigateByUrl("/login");
      },
      (err: any) => {
        this.alertService.displayErrorAlert("Error", err.error.message);
      }
    );
  }

  selectLanguage(){
    this.showLanguages = !this.showLanguages;
  }
}
