import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../core/auth-guard/auth.guard";
import { DefaultLayoutComponent } from "./default-layout/default-layout.component";
import { MainLayoutComponent } from "./main-layout/main-layout.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: '/users',
        pathMatch: 'full'
    },
    { 
        path: '',
        component: MainLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'users', loadChildren: () => import('../main/users/users.module').then(m => m.UsersModule)},
            { path: 'products', loadChildren: () => import('../main/products/products.module').then(m => m.ProductsModule)}
        ]
    },
    {
        path: '',
        component: DefaultLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', loadChildren: () => import('../authentication/authentication.module').then(m => m.AuthenticationModule)},
            { path: '**', loadChildren: () => import('../error/error.module').then(m => m.ErrorModule)},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }