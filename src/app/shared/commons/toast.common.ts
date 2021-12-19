import { Injectable } from "@angular/core";
import { ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})

export class ToastCommon{
    constructor(
        private toast: ToastController
    ){}

    successToast = async (
        header: string,
        message: string,
        position: 'top' | 'middle' | 'bottom' = 'top'
    ) => {
        const toast = await this.toast.create({
            header: header,
            message: message,
            duration: 3000,
            cssClass: 'successToast',
            position: position
        });
        toast.present();
    }
}