import { HttpErrorResponse } from '@angular/common/http';
//import { throwError } from 'rxjs/operators';
import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { NotificationService } from './shared/messages/notification.service';
import { LoginService } from './security/login/login.service';


@Injectable()

export class ApplicationErrorHandler extends ErrorHandler {

    constructor(private notification: NotificationService,
        private injector: Injector,
        private zone: NgZone) {
        super();
    }

    handleError(errorResponse: HttpErrorResponse | any) {

        if (errorResponse instanceof HttpErrorResponse) {
            const message = errorResponse.error.message;
            this.zone.run(() => {
                switch (errorResponse.status) {
                    case 401:
                        this.injector.get(LoginService).handleLogin();
                        break;
                    case 403:
                        this.notification.notificar(message || "Não autorizado.");
                        break;
                    case 404:
                        this.notification.notificar(message || "Não encontrado.");
                        break;
                }
            })

        }
        super.handleError(errorResponse);
    }

}