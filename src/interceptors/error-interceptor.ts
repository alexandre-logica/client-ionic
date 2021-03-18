import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { Observable, throwError} from "rxjs";
import { catchError } from "rxjs/operators";
import { StorageService } from "../services/storage.service";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService, public alertCtrl: AlertController){
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {              
                let errorObj: any;
                if(error.error){
                    errorObj = error.error;
                    if(!errorObj.status){
                        errorObj = JSON.parse(errorObj);
                    }
                }else{
                    errorObj = error;
                }

                console.log('Erro original: ' + error);
                console.log("Erro detectado pelo interceptor");
                console.log('Erro api: ' + errorObj);

                switch(errorObj.status) {
                    case 401:
                        this.handle401();
                        break;
                    case 403:
                        this.handle403();
                        break;
                    default :
                        this.handleDefaultError(errorObj);
                        break;
                }
                return throwError(errorObj);
            }) 
        );
    }

    handle403(){
        this.storage.setLocalUser(null);
    }

    async handle401(){
        const alert = await this.alertCtrl.create({
            cssClass: 'my-custom-class',
            header: 'Error 401',
            subHeader: 'Authentication fail',
            message: 'Invalid email or password',
            backdropDismiss: false,
            buttons: ['OK']
        });
        await alert.present();
    }

    async handleDefaultError(errorObj : any){
        const alert = await this.alertCtrl.create({
            cssClass: 'my-custom-class',
            header: 'Error ' + errorObj.status,
            subHeader: errorObj.error,
            message: errorObj.message,
            backdropDismiss: false,
            buttons: ['OK']
        });
        await alert.present();
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
}
