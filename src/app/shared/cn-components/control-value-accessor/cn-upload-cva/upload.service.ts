import { ApiServicesUrl } from './../../../constants/api-services';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  baseUrlApi = ApiServicesUrl.get(true).upload;

  constructor(private _http: HttpClient) {}
  upload(arquivos: any[]): Observable<string[]> {
    const data = new FormData();
    for (let index = 0; index < arquivos.length; index++) {
      const imagem = arquivos[index];
      data.append('arquivo', imagem);
    }
    return this._http.post<string[]>(this.baseUrlApi + 'storage', data);
  }
}
