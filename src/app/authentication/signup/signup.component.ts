import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PreloginService } from 'src/app/core/services/prelogin.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public regForm!: FormGroup;
  private _isSubmitFlag!: boolean;

  constructor(private _fb: FormBuilder,
    private _preloginService: PreloginService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    console.log('signin worked!')
    this.createLoginForm();
  }

  private createLoginForm() {
    this.regForm = this._fb.group({
      fName: ['', Validators.required],
      lName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      phone: ['', Validators.required],
      gender: ['male', Validators.required],
      role: ['user'],
      password: ['', Validators.required]
    });
  }

  public isFieldInvalid(field: string) {
    return (
      !this.regForm.get(field)?.valid && this.regForm.get(field)?.touched ||
      this.regForm.get(field)?.untouched && this._isSubmitFlag
    );
  }

  public register() {
    console.log(this.regForm.value);
    if(this.regForm.valid) {
      this._isSubmitFlag = false;
      this._preloginService.signup(this.regForm.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          this._snackBar.open('User register successfully', 'Done', {duration: 2000});
          this.regForm.reset();
        },
        error: (error) => {
          this._snackBar.open('Error while register', 'Done', {duration: 2000});
        }
      }
      )
    } else {
      this._isSubmitFlag = true;
    }
  }

}
