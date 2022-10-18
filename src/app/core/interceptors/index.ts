import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HTTPConfigInterceptor } from "./http-config-interceptor";
import { JwtInterceptor } from "./jwt-interceptor";
import { LoaderInterceptor } from "./loader-interceptor";


export const HttpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: HTTPConfigInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
]