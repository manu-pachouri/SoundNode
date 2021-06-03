import { AuthorizationService } from './../../services/authorization.service';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private authService: AuthorizationService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(this.authService.getAccessToken
            && req.url.startsWith('https://api.spotify.com')){
            req = req.clone({
                headers: new HttpHeaders().set('Authorization', 'Bearer '+this.authService.getAccessToken)
            });
        }
        return next.handle(req);
    }
}