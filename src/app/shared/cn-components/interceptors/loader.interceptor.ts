import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { CnCarregandoService } from '../cn-carregando/cn-carregando.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private carregandoService: CnCarregandoService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.carregandoService.abrir('http request');
    const observable = next.handle(request).pipe(
      tap({
        next: requestResult => {
          if (requestResult instanceof HttpResponse )
            setTimeout(() => {
              this.carregandoService.fechar();
            }, 300);
        }, error: (error) => {
          if (error instanceof HttpErrorResponse)
            setTimeout(() => {
              this.carregandoService.fechar();
            }, 300);
        }
    }));
    return observable;
  }
}
