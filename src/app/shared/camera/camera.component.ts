import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Camera, CameraResultType, ImageOptions } from '@capacitor/camera';
import { ModalController } from '@ionic/angular';

const camera = Camera;

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class CameraComponent implements OnInit {

  @Input('image') image: string;
  photo: string = 'false';

  constructor(
    private modal: ModalController,
  ) {}

  ngOnInit() {
  }

  public takePicture = async () => {
    const options: ImageOptions = {
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64
    }
    const image = await camera.getPhoto(options)
    
    this.image = `data:image/jpeg;base64,${image.base64String}`;
  }

  close = () => this.modal.dismiss({ 'dismissed': true })
  savePicture = () => 
    this.modal.dismiss({ result: this.image });
}
