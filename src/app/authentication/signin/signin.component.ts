import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { PreloginService } from 'src/app/core/services/prelogin.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  public loginForm!: FormGroup;
  private _isSubmitFlag!: boolean;
  
  private tempAdminUsers = ['admin@test.com'];
  constructor(private _fb: FormBuilder,
    private _preloginService: PreloginService,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _authService: AuthService) { }

  ngOnInit(): void {
    console.log('signin worked!')
    this.createLoginForm();
  }

  private createLoginForm() {
    this.loginForm = this._fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public isFieldInvalid(field: string) {
    return (
      !this.loginForm.get(field)?.valid && this.loginForm.get(field)?.touched ||
      this.loginForm.get(field)?.untouched && this._isSubmitFlag
    )
  }

  public login() {
    if(this.loginForm.valid) {
      this._isSubmitFlag = false;
      this._preloginService.login(this.loginForm.value)
      .subscribe({
        next: (res => {
          this._authService.setUser(res.idToken);
          if(this.tempAdminUsers.includes(this.loginForm.value.email)) {
            this._authService.setAdminRole();
          }
          this._router.navigate(['users']);
          this._snackBar.open('Successfully login', 'Done', {duration: 2000});
        }),
        error: (error => { 
          this._snackBar.open('Error while login', 'Close', {duration: 2000});
        })
      })
    } else {
      this._isSubmitFlag = true;
    }
  }

}
