import { Component } from "@angular/core";
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from "ag-grid-community";
import { AuthService } from "src/app/core/services/auth.service";


@Component({
    selector: 'app-action-menu',
    template:`
    <ng-container *ngIf="authService.getAdminRole(); else disableButton">
        <button mat-icon-button [matMenuTriggerFor]="menu" aria-label="Example icon-button with a menu">
            <mat-icon>more_vert</mat-icon>
        </button>
        <mat-menu #menu="matMenu" >
            <button mat-menu-item (click)="editUser()">
                <mat-icon>edit</mat-icon>
                <span>Edit</span>
            </button>
            <button mat-menu-item (click)="deleteUser()">
                <mat-icon>delete</mat-icon>
                <span>Delete</span>
            </button>
        </mat-menu>
    </ng-container>
    <ng-template #disableButton>
        <button mat-icon-button aria-label="Example icon-button with a menu" disabled>
            <mat-icon>more_vert</mat-icon>
        </button>
    </ng-template>
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

    editUser() {
        this.params.context.componentParent.editUser(this.params.node.data, this.params.node.rowIndex);
    }

    deleteUser() {
        this.params.context.componentParent.deleteUser(this.params.node.data, this.params.node.rowIndex);
    }
}