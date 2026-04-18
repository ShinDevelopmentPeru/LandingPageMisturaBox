# Mistura Box — Landing Page

> Proyecto · Desarrollo web con Angular · Pasarela de pago con Stripe

**Mistura Box** es un servicio de suscripción mensual de productos gastronómicos peruanos. Este proyecto fue construido como parte de un portafolio de desarrollo web para diseñar y desarrollar una landing page comercial completa, con flujo de compra integrado.

🔗 **[Ver proyecto en vivo](https://shindevelopmentperu-landingpagemist.vercel.app/)**
📂 **[Ver código fuente](https://github.com/ShinDevelopmentPeru/LandingPageMisturaBox)**

---

## ¿Qué hace este proyecto?

Un visitante puede entrar a la página, conocer el producto, elegir un plan de suscripción y completar un proceso de pago paso a paso, todo con una experiencia fluida y diseño coherente.

El flujo completo incluye:

1. **Landing page** con secciones de presentación, planes, productos y testimonios
2. **Selección de plan** — Exploradora (S/ 49), Gourmet (S/ 79) o Colección (S/ 119)
3. **Formulario de datos** — nombre, dirección, distrito y contacto con validación en tiempo real
4. **Pago seguro** — integrado con Stripe en entorno de pruebas
5. **Confirmación** — resumen completo del pedido

---

## Tecnologías utilizadas

| Tecnología | Rol en el proyecto |
|---|---|
| **Angular 19** | Framework principal del frontend |
| **TypeScript** | Lenguaje de programación |
| **Stripe.js** | Tokenización segura de pagos |
| **Angular SSG** | Generación estática para mejor rendimiento |
| **Vercel** | Hosting y deploy continuo |
| **Google Fonts** | Tipografías Fraunces e Inter |

---

## Arquitectura del proyecto

El proyecto sigue una arquitectura de componentes standalone con separación de responsabilidades:

```
src/app/
├── landing/                    # Página principal
│   └── landingpage/
├── components/
│   ├── landing/                # Secciones de la landing
│   │   ├── intro/              # Hero principal
│   │   ├── howitworks/         # Cómo funciona
│   │   ├── boxes/              # Planes de suscripción
│   │   ├── products/           # Productos destacados
│   │   ├── testimonials/       # Testimonios
│   │   └── bannerfinal/        # CTA final
│   └── shared/                 # Componentes reutilizables
│       ├── navbar/
│       └── footer/
├── checkout/                   # Flujo de pago
│   ├── checkout.component/     # Contenedor principal
│   └── steps/
│       ├── step-plan/          # Paso 1 — Elegir plan
│       ├── step-datos/         # Paso 2 — Datos personales
│       ├── step-pago/          # Paso 3 — Pago con Stripe
│       └── step-confirmacion/  # Paso 4 — Confirmación
└── services/
    ├── checkout.service.ts     # Estado compartido entre pasos
    └── stripe.service.ts       # Integración con Stripe
```

### Estrategia de renderizado

El proyecto usa SSG híbrido — cada ruta usa el modo más adecuado:

```
/          →  Prerender (SSG)   HTML estático generado en build time
/checkout  →  Client            Renderizado en el navegador
```

---

## Probar el flujo de pago

El proyecto usa el entorno sandbox de Stripe — ninguna transacción es real. Puedes probar el flujo completo con estas tarjetas de prueba:

| Número de tarjeta | Resultado |
|---|---|
| `4242 4242 4242 4242` | ✅ Pago exitoso |
| `4000 0000 0000 0002` | ❌ Tarjeta declinada |

Usa cualquier fecha de vencimiento futura y cualquier CVV de 3 dígitos.

---

## Correr el proyecto localmente

### Requisitos previos
- Node.js 18 o superior
- npm 9 o superior

### Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-organizacion/landing.git
cd landing

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp src/environments/environment.example.ts src/environments/environment.ts
# Reemplaza pk_test_AQUI_TU_CLAVE_PUBLICA con tu clave de Stripe

# 4. Correr en modo desarrollo
ng serve
```

Abre `http://localhost:4200` en tu navegador.

### Build para producción

```bash
ng build
```

Los archivos estáticos se generan en `dist/LandingPageMisturaBox/browser`.

---

## Decisiones técnicas

**¿Por qué Angular con SSG?**
La landing page es contenido estático que beneficia del pre-renderizado para SEO y tiempo de carga. El checkout requiere estado dinámico, por lo que usa renderizado en el cliente.

**¿Por qué Stripe y no una pasarela local?**
Stripe tiene soporte oficial para TypeScript, buena documentación y sandbox gratuito sin requisitos fiscales. Posee integración con estándares internacionales de pago.

**¿Por qué signals en lugar de un store?**
Para una aplicación de este tamaño, los signals de Angular son suficientes para manejar el estado compartido entre los 4 pasos del checkout sin añadir complejidad innecesaria.

---

## Autor

Desarrollado por D. Mendoza como proyecto de portafolio.

- 💼 www.linkedin.com/in/dmendoza-6b8769259
- 🐙 https://github.com/ShinDevelopmentPeru

---

<p align="center">
  Construido con ❤️
</p>
