import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ColDef, ColumnApi, GridReadyEvent, SideBarDef } from 'ag-grid-community';
import { AuthService } from 'src/app/core/services/auth.service';
import { PostloginService } from 'src/app/core/services/postlogin.service';
import { ActionRendererMenu } from './action-renderer-menu';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @ViewChild('openEditUserDialog', {static: false}) openEditUser: any;
  @ViewChild('openDeleteUserDialog', {static: false}) openDeleteUser: any;

	private gridColumnApi!: ColumnApi;

  public columnDefs: ColDef[] = [];
  public context: any;
  public frameworkComponents: any = {}
  // public defaultColDef: ColDef = {
  //   sortable: true,
  //   resizable: true,
  //   width: 100,
  //   enableRowGroup: true,
  //   enablePivot: true,
  //   enableValue: true,
  // };
  public sideBar: SideBarDef | string | string[] | boolean | null = {
    toolPanels: ['columns'],
  };
  public rowGroupPanelShow = 'always';
  public pivotPanelShow = 'always';
  public rowData!: any[];

  public userForm!: FormGroup;
  private _isSubmitFlag!: boolean;
  private _ids:any = [];
  private _selectedIndex!: number;
  public actionButton!: string;
  public adminFlag!: string;

  constructor(
    private _snackBar: MatSnackBar,
    private _fb: FormBuilder,
    private _postloginServie: PostloginService,
    private _dialog: MatDialog,
    private _authService: AuthService) { 
      this.setTableCols();
    }

  ngOnInit(): void {
    console.log('users component');
    this.adminFlag = this._authService.getAdminRole() as string;
  }

  private setTableCols() {
    this.columnDefs = [
      { field: 'fName', sortable: true, resizable: true, width:140 },
      { field: 'lName', sortable: true, resizable: true, width:140 },
      { field: 'email', sortable: true, resizable: true, width:200 },
      { field: 'role', sortable: true, resizable: true, width:100 },
      { field: 'dob', sortable: true, resizable: true, width:140 },
      { field: 'gender', sortable: true, resizable: true, width:100 },
      { field: 'phone', sortable: true, resizable: true, width:160 },
      { field: 'action', cellRenderer: 'actionRendererMenu', pinned: 'right', lockPinned: true, width:100, cellClass: 'lock-pinned' },
    ];
    this.context = { componentParent: this };
    this.frameworkComponents = {
      actionRendererMenu: ActionRendererMenu
    }
  }
  
  onGridReady(params: GridReadyEvent<any>) {
    this.gridColumnApi = params.columnApi;
    this.getUsersList();
  }

  getUsersList() {
    this._postloginServie.getUserList()
    .subscribe({
      next: (res) => {
        this._ids = Object.keys(res);
        this.rowData = Object.values(res);
        this._snackBar.open('User list successfully fetch', 'Done', {duration: 2000});
      },
      error: (error) => {
        this._snackBar.open('Error while fetching user list', 'Close', {duration: 2000});
      }
    });
  }

  editUser(cell: any, index: number) {
    this._selectedIndex = index;
    console.log(cell);
    this.createLoginForm();
    this.openEditUserDialog();
    this.actionButton = 'Update User';
    this.userForm.controls['fName'].setValue(cell.fName);
    this.userForm.controls['lName'].setValue(cell.lName);
    this.userForm.controls['email'].setValue(cell.email);
    this.userForm.controls['dob'].setValue(cell.dob);
    this.userForm.controls['phone'].setValue(cell.phone);
    this.userForm.controls['gender'].setValue(cell.gender);
    this.userForm.controls['role'].setValue(cell?.role ? cell.role: 'user');
    this.userForm.controls['password'].setValue(cell.password);
  }

  addUser(choice: string) {
    if (choice === 'new') {
      this.actionButton = 'Add User';
    } else {
      this.actionButton = 'Update User';
    }
    this.openEditUserDialog();
    this.createLoginForm();
  }

  openEditUserDialog() {
    this._dialog.open(this.openEditUser, {
      width: '26%'
    });
  }


  private createLoginForm() {
    this.userForm = this._fb.group({
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
      !this.userForm.get(field)?.valid && this.userForm.get(field)?.touched ||
      this.userForm.get(field)?.untouched && this._isSubmitFlag
    );
  }

  public updateUser() {

    console.log(this.userForm.value);
    if(this.userForm.valid) {
      this._isSubmitFlag = false;
      if (this._authService.getAdminRole() && this.actionButton === 'Update User') {
        this._postloginServie.updateUser(this.userForm.value, this._ids[this._selectedIndex])
        .subscribe({
          next: (res) => {
            console.log(res);
            this._snackBar.open('User updated successfully', 'Done', {duration: 2000});
            this.userForm.reset();
            this.getUsersList();
            this._selectedIndex = 0;
          },
          error: (error) => {
            this._snackBar.open('Error while updating', 'Close', {duration: 2000});
          }
        })
      } else {
        this._postloginServie.addNewUser(this.userForm.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            this._snackBar.open('User added successfully', 'Done', {duration: 2000});
            this.userForm.reset();
            this.getUsersList();
          },
          error: (error) => {
            this._snackBar.open('Error while adding', 'Close', {duration: 2000});
          }
        })
      }
    } else {
      this._isSubmitFlag = true;
    }
  }

  deleteUser(cell: any, index: number) {
    this._selectedIndex = index;
    this.openDeleteUserDialog();
    
  }

  openDeleteUserDialog() {
    this._dialog.open(this.openDeleteUser, {
      width: '26%'
    });
  }

  deleteUserCall() {
    this._postloginServie.deleteUser(this._ids[this._selectedIndex])
    .subscribe({
      next: (res) => {
        console.log(res);
        this._snackBar.open('User deleted successfully', 'Done', {duration: 2000});
        this.getUsersList();
        this._selectedIndex = 0;
      },
      error: (error) => {
        this._snackBar.open('Error while deleting', 'Close', {duration: 2000});
      }
    })
  }

}
