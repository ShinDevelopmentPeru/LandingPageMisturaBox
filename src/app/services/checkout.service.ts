import { Injectable, signal } from '@angular/core';

export type Plan = {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  tag: string;
};

export type DatosPersonales = {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  direccion: string;
  distrito: string;
};

export type EstadoPago = 'pendiente' | 'procesando' | 'exitoso' | 'error';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  
  readonly planes: Plan[] = [
    {
      id: 'exploradora',
      nombre: 'Caja Exploradora',
      descripcion: '6-8 productos seleccionados. Perfecta para probar nuevos sabores cada mes.',
      precio: 49,
      tag: 'Clásica',
    },
    {
      id: 'gourmet',
      nombre: 'Caja Gourmet',
      descripcion: '10-12 productos premium. Incluye una sorpresa especial cada mes.',
      precio: 79,
      tag: 'Más popular',
    },
    {
      id: 'coleccion',
      nombre: 'Caja Colección',
      descripcion: '14+ productos. Una región peruana diferente cada mes, al detalle.',
      precio: 119,
      tag: 'Nueva',
    },
  ];

  planSeleccionado = signal<Plan | null>(null);
  datosPersonales = signal<DatosPersonales | null>(null);
  estadoPago = signal<EstadoPago>('pendiente');
  stepActual = signal<number>(1);

  seleccionarPlan(plan: Plan): void {
    this.planSeleccionado.set(plan);
  }

  guardarDatos(datos: DatosPersonales): void {
    this.datosPersonales.set(datos);
  }

  avanzarStep(): void {
    this.stepActual.update(s => s + 1);
  }

  retrocederStep(): void {
    this.stepActual.update(s => s - 1);
  }

  setProcesando(): void {
    this.estadoPago.set('procesando');
  }

  setPagoExitoso(): void {
    this.estadoPago.set('exitoso');
  }

  setPagoError(): void {
    this.estadoPago.set('error');
  }

  resetear(): void {
    this.planSeleccionado.set(null);
    this.datosPersonales.set(null);
    this.estadoPago.set('pendiente');
    this.stepActual.set(1);
  }
}
