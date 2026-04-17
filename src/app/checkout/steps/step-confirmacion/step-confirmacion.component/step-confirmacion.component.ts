import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CheckoutService } from '../../../../services/checkout.service';

@Component({
  selector: 'app-step-confirmacion',
  imports: [
    RouterLink
  ],
  templateUrl: './step-confirmacion.component.html',
  styleUrl: './step-confirmacion.component.css',
})
export class StepConfirmacionComponent {

  protected checkout = inject(CheckoutService);

  volverAlInicio(): void {
    this.checkout.resetear();
  }

}
