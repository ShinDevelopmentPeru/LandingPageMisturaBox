import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CheckoutService } from '../../../../services/checkout.service';
import { StripeService } from '../../../../services/stripe.service';

@Component({
  selector: 'app-step-pago',
  imports: [
    CommonModule, 
    ReactiveFormsModule
  ],
  templateUrl: './step-pago.component.html',
  styleUrl: './step-pago.component.css',
})

export class StepPagoComponent implements OnInit, OnDestroy {
  protected checkout = inject(CheckoutService);
  protected stripeService = inject(StripeService);
  private fb = inject(FormBuilder);

  procesando = signal(false);
  errorPago = signal<string | null>(null);

  form = this.fb.group({
    nombreTarjeta: ['', [Validators.required, Validators.minLength(3)]],
  });

  async ngOnInit(): Promise<void> {
    await this.stripeService.inicializar();
    this.stripeService.montarCardElement('stripe-card');
  }

  ngOnDestroy(): void {
    this.stripeService.destruirCardElement();
  }
  isInvalid(campo: string): boolean {
    const control = this.form.get(campo);
    return !!(control?.invalid && control?.touched);
  }

  async pagar(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (!this.stripeService.cardMontado()) {
      this.errorPago.set('Por favor completa los datos de tu tarjeta.');
      return;
    }
this.procesando.set(true);
    this.errorPago.set(null);

    const nombreTarjeta = this.form.get('nombreTarjeta')?.value ?? '';
    const token = await this.stripeService.crearToken(nombreTarjeta);

    if (!token) {
      this.errorPago.set(this.stripeService.errorTarjeta() ?? 'Error al procesar la tarjeta.');
      this.procesando.set(false);
      return;
    }

    // Token generado exitosamente
    // Aquí iría la llamada al backend con el token
    // Por ahora simulamos el éxito
    console.log('Token de Stripe generado:', token);
    this.checkout.setPagoExitoso();
    this.checkout.avanzarStep();

    this.procesando.set(false);
  }

  volver(): void {
    this.checkout.retrocederStep();
  }
}
