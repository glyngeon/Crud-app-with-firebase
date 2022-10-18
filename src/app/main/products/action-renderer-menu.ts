import { Component } from "@angular/core";
import { ICellRendererParams } from "ag-grid-community";
import { AuthService } from "src/app/core/services/auth.service";


@Component({
    selector: 'app-action-menu',
    template:`
    <ng-container>
        <button mat-icon-button [matMenuTriggerFor]="menu" aria-label="Example icon-button with a menu">
            <mat-icon>more_vert</mat-icon>
        </button>
        <mat-menu #menu="matMenu" >
            <button mat-menu-item (click)="editProduct()">
                <mat-icon>edit</mat-icon>
                <span>Edit</span>
            </button>
            <button mat-menu-item (click)="deleteProduct()">
                <mat-icon>delete</mat-icon>
                <span>Delete</span>
            </button>
        </mat-menu>
    </ng-container>
    `,
    styles: [

    ]
})

export class ActionRendererMenu {
    public params: any;
    constructor(public authService: AuthService) {

    }

    agInit(params: ICellRendererParams<any, any>): void {
        this.params = params;
    }

    refresh(params: ICellRendererParams) {
        return false;
    }

    editProduct() {
        this.params.context.componentParent.editProduct(this.params.node.data, this.params.node.rowIndex);
    }

    deleteProduct() {
        this.params.context.componentParent.deleteProduct(this.params.node.data, this.params.node.rowIndex);
    }
}