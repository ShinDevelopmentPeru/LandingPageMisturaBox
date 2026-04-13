import { Injectable, signal } from '@angular/core';
import { loadStripe, Stripe, StripeCardElement } from '@stripe/stripe-js';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class StripeService {
  
  private stripe: Stripe | null = null;
  private cardElement: StripeCardElement | null = null;

  cardMontado = signal(false);
  errorTarjeta = signal<string | null>(null);

  async inicializar(): Promise<void> {
    this.stripe = await loadStripe(environment.stripePublicKey);
  }

  montarCardElement(elementId: string): void {
    if (!this.stripe) return;

    const elements = this.stripe.elements();

    this.cardElement = elements.create('card', {
      style: {
        base: {
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px',
          color: '#1a1a1a',
          '::placeholder': { color: '#bbb' },
        },
        invalid: {
          color: '#E24B4A',
        },
      },
      hidePostalCode: true,
    });
    this.cardElement.mount(`#${elementId}`);

    this.cardElement.on('change', (event) => {
      if (event.error) {
        this.errorTarjeta.set(event.error.message);
      } else {
        this.errorTarjeta.set(null);
      }
      this.cardMontado.set(event.complete);
    });
  }
  async crearToken(nombreTarjeta: string): Promise<string | null> {
    if (!this.stripe || !this.cardElement) return null;

    const { token, error } = await this.stripe.createToken(this.cardElement, {
      name: nombreTarjeta,
    });

    if (error) {
      this.errorTarjeta.set(error.message ?? 'Error al procesar la tarjeta.');
      return null;
    }

    return token?.id ?? null;
  }

  destruirCardElement(): void {
    this.cardElement?.destroy();
    this.cardElement = null;
    this.cardMontado.set(false);
    this.errorTarjeta.set(null);
  }

}
