import { Injectable } from '@angular/core';
import { requiredTrueValidatorExtension } from '@rxweb/reactive-form-validators/validators-extension';

@Injectable({
  providedIn: 'root'
})
export class NavBarServicesService {
  visible: boolean;


  constructor() { this.visible = false; }

  hide() { this.visible = false; }

  show() { this.visible = true; }

  toggle() { this.visible = !this.visible; }
}
