import { AuthorizationService } from './../../services/authorization.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export class AuthInterceptor implements HttpInterceptor{
    constructor(private authService: AuthorizationService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(this.authService.GetAccessToken
            && req.url.startsWith('https://accounts.spotify.com/')){
            req.clone({
                setHeaders: {
                    'Authorization': 'Bearer '+this.authService.GetAccessToken
                }
            });
        }
        return next.handle(req);
    }
}