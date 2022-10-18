import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private _authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(this._authService.getUser()) {
            const aToken = this._authService.getEncodedToken();
            req = req.clone({
                // setParams: {
                //     token: aToken
                // }
            })
        }
        return next.handle(req);
    }
}