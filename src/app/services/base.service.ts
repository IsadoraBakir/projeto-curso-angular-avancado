import { LocalStorageUtils } from './../utils/localstorage';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';

export abstract class BaseService {

    public LocalStorage = new LocalStorageUtils();
    protected UrlServiceV1 = ' http://localhost:3000/';

    protected GetHeaderJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
    }

    protected extractData(response: any) {
        return response.data || {};
    }

    protected serviceError(response: Response | any) {
        const customError: string[] = [];

        if (response instanceof HttpErrorResponse) {

            if (response.statusText === 'Unknown Error') {
                customError.push('An unknown error has occurred');
                response.error.errors = customError;
            }
        }

        console.error(response);
        return throwError(response);
    }
}
