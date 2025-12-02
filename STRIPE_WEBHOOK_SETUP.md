# Configuración de Webhooks de Stripe para Producción

Este documento explica cómo configurar los webhooks de Stripe para recibir notificaciones automáticas cuando alguien cancela su suscripción y para activar automáticamente su cuenta cuando realiza un pago.

## ¿Por qué necesito webhooks?

**Sin webhooks:** Después de pagar en Stripe, los usuarios deben hacer clic manualmente en "I just completed payment - Activate Pro" para activar su cuenta.

**Con webhooks:** Todo es automático - el usuario paga y su cuenta se actualiza inmediatamente a Pro sin intervención manual.

## Paso 1: Obtener la URL del Webhook

Tu endpoint de webhook está en:
\`\`\`
https://tu-dominio.vercel.app/api/stripe/webhook
\`\`\`

Para desarrollo local, puedes usar Stripe CLI o ngrok para probar.

## Paso 2: Configurar el Webhook en Stripe Dashboard

1. Ve a https://dashboard.stripe.com/webhooks
2. Haz clic en "Add endpoint"
3. Ingresa la URL: `https://tu-dominio.vercel.app/api/stripe/webhook`
4. Selecciona los siguientes eventos:
   - `customer.subscription.created` - **IMPORTANTE: Necesario para activación automática**
   - `customer.subscription.deleted` - Cuando se cancela una suscripción
   - `customer.subscription.updated` - Cuando se actualiza una suscripción
   - `invoice.payment_succeeded` - Cuando un pago es exitoso
   - `invoice.payment_failed` - Cuando un pago falla

5. Haz clic en "Add endpoint"
6. Copia el "Signing secret" (comienza con `whsec_...`)

## Paso 3: Agregar el Signing Secret a las Variables de Entorno

Agrega esta variable de entorno a tu proyecto:

\`\`\`
STRIPE_WEBHOOK_SECRET=whsec_tu_secret_aqui
\`\`\`

En Vercel:
1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega `STRIPE_WEBHOOK_SECRET` con el valor del signing secret

## Paso 4: Verificar que Funciona

1. Ve a tu dashboard de Stripe
2. Encuentra el webhook que creaste
3. Haz clic en "Send test webhook"
4. Selecciona el evento `customer.subscription.deleted`
5. Verifica que recibas un status 200 OK

## Cómo Funciona el Flujo de Pago

### Con Webhooks Configurados (RECOMENDADO):
1. Usuario completa el pago en Stripe
2. Stripe envía evento `customer.subscription.created` a tu webhook
3. **Tu servidor actualiza automáticamente el tier del usuario a "pro"**
4. Usuario hace clic en "Return to website" en Stripe
5. Ve su cuenta Pro ya activada ✅

### Sin Webhooks (Requiere acción manual):
1. Usuario completa el pago en Stripe
2. Usuario hace clic en "Return to website"
3. **Usuario debe hacer clic en "I just completed payment - Activate Pro"**
4. El sistema verifica el pago con Stripe
5. Cuenta se actualiza a Pro ✅

### Botón de Respaldo:
En `/account` hay un botón "I just completed payment - Activate Pro" que funciona como respaldo si los webhooks fallan o no están configurados.

## ¿Cómo Saber si Alguien Canceló su Suscripción?

### Opción 1: Logs en Vercel
Los webhooks escriben logs con `console.log`. Verifica los logs en:
- Vercel Dashboard → Tu Proyecto → Logs

Busca mensajes como:
\`\`\`
[v0] Subscription canceled: sub_xxxxx
[v0] User downgraded to free tier: usuario@email.com
\`\`\`

### Opción 2: Revisar la Base de Datos
Consulta la tabla `subscriptions` en Supabase:
\`\`\`sql
SELECT 
  s.*,
  p.email,
  p.full_name
FROM subscriptions s
JOIN profiles p ON s.user_id = p.id
WHERE s.status = 'canceled'
ORDER BY s.updated_at DESC;
\`\`\`

### Opción 3: Dashboard de Stripe
1. Ve a https://dashboard.stripe.com/subscriptions
2. Filtra por status: "Canceled"
3. Verás todas las suscripciones canceladas

## Eventos que Recibirás

### `customer.subscription.created` ⭐ IMPORTANTE
- Se dispara cuando alguien completa un pago y crea una suscripción
- El sistema automáticamente:
  - Cambia el tier del usuario a "pro"
  - Crea un registro en la tabla `subscriptions`
  - **Esto permite la activación automática sin clicks manuales**

### `customer.subscription.deleted`
- Se dispara cuando una suscripción se cancela completamente
- El sistema automáticamente:
  - Cambia el tier del usuario a "free"
  - Actualiza el status de la suscripción a "canceled"

### `customer.subscription.updated`
- Se dispara cuando cambia el estado de una suscripción
- Ejemplo: de "active" a "past_due" cuando falla un pago

### `invoice.payment_failed`
- Se dispara cuando falla un pago recurrente
- El sistema registra el pago fallido en `payment_history`

## Desarrollo Local con Stripe CLI

Para probar webhooks localmente:

\`\`\`bash
# Instalar Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Escuchar webhooks
stripe listen --forward-to localhost:3000/api/stripe/webhook

# En otra terminal, enviar un evento de prueba
stripe trigger customer.subscription.created
stripe trigger customer.subscription.deleted
stripe trigger customer.subscription.updated
stripe trigger invoice.payment_succeeded
stripe trigger invoice.payment_failed
\`\`\`

## Notas Importantes

- **Para activación automática, DEBES configurar webhooks con el evento `customer.subscription.created`**
- Los webhooks son la manera más confiable de actualizar cuentas automáticamente
- Sin webhooks, los usuarios deben verificar manualmente su pago
- Stripe reintenta automáticamente si tu endpoint falla
- Siempre verifica la firma del webhook para seguridad
