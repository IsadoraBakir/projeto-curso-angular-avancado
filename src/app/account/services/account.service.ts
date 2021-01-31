import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { User } from './../models/user';
import { BaseService } from 'src/app/services/base.service';

@Injectable()
export class AccountService extends BaseService {

    constructor(private http: HttpClient) { super(); }

    registerUser(user: User): Observable<User> {
      const response = this.http
        .post(this.UrlServiceV1 + 'new-account', user, this.GetHeaderJson())
        .pipe(
          map(this.extractData),
          catchError(this.serviceError)
        );
      return response;
    }

    login(user: User) {

    }

}
