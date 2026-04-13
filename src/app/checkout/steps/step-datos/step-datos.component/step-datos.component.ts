import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CheckoutService } from '../../../../services/checkout.service';

@Component({
  selector: 'app-step-datos',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './step-datos.component.html',
  styleUrl: './step-datos.component.css',
})
export class StepDatosComponent {

  protected checkout = inject(CheckoutService);
  private fb = inject(FormBuilder);

  form = this.fb.group({
    nombre:    ['', [Validators.required, Validators.minLength(2)]],
    apellido:  ['', [Validators.required, Validators.minLength(2)]],
    email:     ['', [Validators.required, Validators.email]],
    telefono:  ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
    direccion: ['', [Validators.required, Validators.minLength(5)]],
    distrito:  ['', Validators.required],
  });
  isInvalid(campo: string): boolean {
    const control = this.form.get(campo);
    return !!(control?.invalid && control?.touched);
  }

  continuar(): void {
    if (this.form.valid) {
      this.checkout.guardarDatos(this.form.value as any);
      this.checkout.avanzarStep();
    } else {
      this.form.markAllAsTouched();
    }
  }

  volver(): void {
    this.checkout.retrocederStep();
  }

}
