import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Provider } from "@angular/core";
import { EMPTY, Observable, catchError, tap } from "rxjs";
import { environment } from "src/environments/environment";

const { apiUrl } = environment;

@Injectable()

export class AppInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.startsWith('/')) {
            req = req.clone({
                url: req.url.replace('/api', apiUrl),
                withCredentials: true
            })
        }

        return next.handle(req).pipe(
          tap((req) => {
              console.log(req);
          }),
          catchError((err) => {
            if (err.status === 401) {
              console.error('You are not authorized');
              return EMPTY;
            }

            return [err];
          })
        );
    }

}

export const appInterceptorProvider: Provider = {
    multi: true,
    useClass: AppInterceptor,
    provide: HTTP_INTERCEPTORS
}