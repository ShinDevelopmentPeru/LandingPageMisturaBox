import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutService, Plan } from '../../../../services/checkout.service';

@Component({
  selector: 'app-step-plan',
  imports: [
    CommonModule
  ],
  templateUrl: './step-plan.component.html',
  styleUrl: './step-plan.component.css',
})
export class StepPlanComponent {

   protected checkout = inject(CheckoutService);

  seleccionar(plan: Plan): void {
    this.checkout.seleccionarPlan(plan);
  }

  continuar(): void {
    if (this.checkout.planSeleccionado()) {
      this.checkout.avanzarStep();
    }
  }
  
}
