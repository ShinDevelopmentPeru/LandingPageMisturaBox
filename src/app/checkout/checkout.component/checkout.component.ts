import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutService } from '../../services/checkout.service';
import { StepPlanComponent } from '../steps/step-plan/step-plan.component/step-plan.component';
import { StepDatosComponent } from '../steps/step-datos/step-datos.component/step-datos.component';
import { StepPagoComponent } from '../steps/step-pago/step-pago.component/step-pago.component';
import { StepConfirmacionComponent } from '../steps/step-confirmacion/step-confirmacion.component/step-confirmacion.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-checkout.component',
  imports: [
    CommonModule,
    RouterLink,
    StepPlanComponent,
    StepDatosComponent,
    StepPagoComponent,
    StepConfirmacionComponent,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  protected checkout = inject(CheckoutService);
}
