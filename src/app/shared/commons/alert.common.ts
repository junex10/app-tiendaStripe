import { Injectable } from "@angular/core";
import { AlertController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class AlertCommon {
    constructor(
        private alert: AlertController
    ) { }

    invalidFormAlert = async (title: string, message: string) => {
        const alert = await this.alert.create({
            cssClass: 'formInvalid',
            header: title,
            message: message,
            buttons: ['Entendido'],
            animated: true
        });

        await alert.present();
        //const { role } = await alert.onDidDismiss();
    }

    conectionError = async () => {
        const alert = await this.alert.create({
            cssClass: 'formInvalid',
            header: 'Error de conexión',
            message: 'Ocurrió un error inesperado',
            buttons: ['Entendido'],
            animated: true
        });

        await alert.present();
        //const { role } = await alert.onDidDismiss();
    }

    alertPersonalized = async (
        cssClass: string,
        header: string,
        message: string,
        buttons
    ) => {
        const alert = await this.alert.create({
            cssClass: cssClass,
            header: header,
            message: message,
            buttons: buttons,
            animated: true
        });

        await alert.present();
        //const { role } = await alert.onDidDismiss();
    }
    successAlert = async (
        header: string,
        message: string
    ) => {
        const alert = await this.alert.create({
            cssClass: 'successAlert',
            header: header,
            message: message,
            animated: true
        });
        await alert.present();
        //const { role } = await alert.onDidDismiss();
    }
}