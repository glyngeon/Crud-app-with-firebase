import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";


@Injectable()
export class HTTPConfigInterceptor implements HttpInterceptor {

    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let headers = req.headers.set('Content-Type', 'application/json');
        let updatedRequest = req.clone({ headers});
        // let updatedRequest = req.clone({ headers,
        //     params: req.params.append('auth', JSON.parse(localStorage.getItem('currentUser') as string))
        // });
        return next.handle(updatedRequest).pipe(
            tap((res: HttpEvent<any>) => {
                if(res instanceof HttpResponse && res.status === 200) {
                    console.log('response is http-interceptor = ', res.body);
                }
            })
        )
    }
}