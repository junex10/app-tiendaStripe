import { LoadingController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SpinnerCommon {

    loader: any;

    constructor(
        private loading: LoadingController
    ) { }

    async loadingAuth(message: string = 'Cargando...') {
        this.loader = await this.loading.create({
            cssClass: 'loader',
            message: message
        });
        await this.loader.present();
    }
    dismissAuth = async () => await this.loader.dismiss();
}