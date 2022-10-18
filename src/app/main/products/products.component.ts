import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ColDef, ColumnApi, GridReadyEvent, SideBarDef } from 'ag-grid-community';
import * as Highcharts from 'highcharts';
import  { Options } from 'highcharts';
import { Chart } from 'angular-highcharts';

import { AuthService } from 'src/app/core/services/auth.service';
import { PostloginService } from 'src/app/core/services/postlogin.service';
import { ActionRendererMenu } from './action-renderer-menu';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @ViewChild('openEditProductDialog', {static: false}) public openEditProduct: any;
  @ViewChild('openDeleteProductDialog', {static: false}) public openDeleteProduct: any;
  @ViewChild('charts') public chartEl!: any;

  public charts: any;
	private gridColumnApi!: ColumnApi;

  public columnDefs: ColDef[] = [];
  public context: any;
  public frameworkComponents: any = {};
  public sideBar: SideBarDef | string | string[] | boolean | null = {
    toolPanels: ['columns'],
  };
  public rowGroupPanelShow = 'always';
  public pivotPanelShow = 'always';
  public rowData!: any[];

  public productForm!: FormGroup;
  private _isSubmitFlag!: boolean;
  private _ids: any = [];
  private _selectedIndex!: number;
  public actionButton!: string;
  public adminFlag!: string;

  chartOptions: any = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Products column chart'
    },
    xAxis: {
      categories: []
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Total product quantity'
      }
    },
    legend: {
      reversed: true
    },
    plotOptions: {
      series: {
        stacking: 'normal'
      }
    },
    series: [{
      data: []
    }] as any
  };

  public chartType!: string;

  constructor(
    private _snackBar: MatSnackBar,
    private _fb: FormBuilder,
    private _postloginServie: PostloginService,
    private _dialog: MatDialog,
    private _authService: AuthService) { 
      this.setTableCols();
    }

  ngOnInit(): void {
    console.log('products component');
    this.adminFlag = this._authService.getAdminRole() as string;
    // this.chart.addPoint(Math.floor(Math.random() * 10));
  }

  changed(event: any) {
    console.log(event);
    this.chartOptions.chart.type = event;
    this.createHighCarts();
  }
  createHighCarts() {
    this.chartOptions.xAxis.categories = [];
    this.chartOptions.series[0].data = [];
    for (let value of this.rowData) {
      this.chartOptions.xAxis.categories.push(value.pName);
      this.chartOptions.series[0].data.push(value.quantity);
    }
    this.chartOptions['color'] =  ['#40E0D0', '#6495ED', '#FFBF00', '#FF7F50', '#DE3163', '#CCCCFF', '#DFFF00', '#9FE2BF'];
    this.charts = new Chart(this.chartOptions);
  }

  private setTableCols() {
    this.columnDefs = [
      { field: 'pName', sortable: true, resizable: true, width:140 },
      { field: 'quantity', sortable: true, resizable: true, width:140 },
      { field: 'category', sortable: true, resizable: true, width:200 },
      { field: 'date', sortable: true, resizable: true, width:100 },
      { field: 'freshness', sortable: true, resizable: true, width:140 },
      { field: 'price', sortable: true, resizable: true, width:100 },
      { field: 'comment', sortable: true, resizable: true, width:160 },
      { field: 'action', cellRenderer: 'actionRendererMenu', pinned: 'right', lockPinned: true, width:100, cellClass: 'lock-pinned' },
    ];
    this.context = { componentParent: this };
    this.frameworkComponents = {
      actionRendererMenu: ActionRendererMenu
    }
  }
  
  onGridReady(params: GridReadyEvent<any>) {
    this.gridColumnApi = params.columnApi;
    this.getProductsList();
  }

  getProductsList() {
    this._postloginServie.getProductList()
    .subscribe({
      next: (res) => {
        if(res && Object.keys(res).length) {
          this._ids = Object.keys(res);
          this.rowData = Object.values(res);
          this.createHighCarts();
          this._snackBar.open('Product list successfully fetch', 'Done', {duration: 2000});
        } else {
          this._snackBar.open('Data not available for this user', 'Done', {duration: 2000});
        }
      },
      error: (error) => {
        this._snackBar.open('Error while fetching product list', 'Close', {duration: 2000});
      }
    });
  }

  editProduct(cell: any, index: number) {
    this._selectedIndex = index;
    console.log(cell);
    this.createLoginForm();
    this.openEditProductDialog();
    this.actionButton = 'Update Product';
    this.productForm.controls['pName'].setValue(cell.pName);
    this.productForm.controls['quantity'].setValue(cell.quantity);
    this.productForm.controls['category'].setValue(cell.category);
    this.productForm.controls['date'].setValue(cell.date);
    this.productForm.controls['freshness'].setValue(cell.freshness);
    this.productForm.controls['price'].setValue(cell.price);
    this.productForm.controls['comment'].setValue(cell?.comment);
  }

  addProduct(choice: string) {
    if (choice === 'new') {
      this.actionButton = 'Add Product';
    } else {
      this.actionButton = 'Update Product';
    }
    this.openEditProductDialog();
    this.createLoginForm();
  }

  openEditProductDialog() {
    this._dialog.open(this.openEditProduct, {
      width: '26%'
    });
  }


  private createLoginForm() {
    this.productForm = this._fb.group({
      pName: ['', Validators.required],
      quantity: ['', Validators.required],
      category: ['', Validators.required],
      date: ['', Validators.required],
      freshness: ['new', Validators.required],
      price: ['', Validators.required],
      comment: ['This is product about'],
    });
  }


  public isFieldInvalid(field: string) {
    return (
      !this.productForm.get(field)?.valid && this.productForm.get(field)?.touched ||
      this.productForm.get(field)?.untouched && this._isSubmitFlag
    );
  }

  public updateProduct() {

    console.log(this.productForm.value);
    if(this.productForm.valid) {
      this._isSubmitFlag = false;
      if (this._authService.getAdminRole() && this.actionButton === 'Update Product') {
        this._postloginServie.updateProduct(this.productForm.value, this._ids[this._selectedIndex])
        .subscribe({
          next: (res) => {
            console.log(res);
            this._snackBar.open('Product updated successfully', 'Done', {duration: 2000});
            this.productForm.reset();
            this.getProductsList();
            this._selectedIndex = 0;
          },
          error: (error) => {
            this._snackBar.open('Error while updating', 'Close', {duration: 2000});
          }
        })
      } else {
        this._postloginServie.addNewProduct(this.productForm.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            this._snackBar.open('Product added successfully', 'Done', {duration: 2000});
            this.productForm.reset();
            this.getProductsList();
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

  deleteProduct(cell: any, index: number) {
    this._selectedIndex = index;
    this.openDeleteProductDialog();
    
  }

  openDeleteProductDialog() {
    this._dialog.open(this.openDeleteProduct, {
      width: '26%'
    });
  }

  deleteProductCall() {
    this._postloginServie.deleteProduct(this._ids[this._selectedIndex])
    .subscribe({
      next: (res) => {
        console.log(res);
        this._snackBar.open('Product deleted successfully', 'Done', {duration: 2000});
        this.getProductsList();
        this._selectedIndex = 0;
      },
      error: (error) => {
        this._snackBar.open('Error while deleting', 'Close', {duration: 2000});
      }
    })
  }

}
