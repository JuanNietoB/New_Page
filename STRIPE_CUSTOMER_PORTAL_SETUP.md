# Configuración del Customer Portal de Stripe

## Problema Actual
El botón "Update Payment Method" redirige a una página bloqueada porque **el Customer Portal de Stripe no está activado** en tu cuenta.

## Solución: Activar el Customer Portal

### Paso 1: Ir al Dashboard de Stripe
1. Ve a [https://dashboard.stripe.com](https://dashboard.stripe.com)
2. Inicia sesión con tu cuenta de Stripe

### Paso 2: Activar el Customer Portal
1. En el menú lateral, busca **"Settings"** (Configuración)
2. Haz clic en **"Billing"** (Facturación)
3. Encuentra **"Customer portal"** (Portal de clientes)
4. Haz clic en **"Activate"** (Activar) o **"Configure"** (Configurar)

### Paso 3: Configurar el Portal
Una vez activado, configura las opciones:

**Opciones recomendadas:**
- ✅ **Allow customers to update their payment methods** (Permitir actualizar métodos de pago)
- ✅ **Allow customers to cancel subscriptions** (Permitir cancelar suscripciones)
- ✅ **Allow customers to view their invoice history** (Ver historial de facturas)

**URL de retorno:**
- Configura: `https://tu-dominio.com/account` (o tu URL de producción)
- Para desarrollo: `http://localhost:3000/account`

### Paso 4: Guardar Cambios
1. Haz clic en **"Save"** (Guardar)
2. El portal estará activo inmediatamente

### Paso 5: Probar
1. Vuelve a tu aplicación
2. Haz clic en "Update Payment Method"
3. Ahora deberías ver el portal de Stripe correctamente

## Verificación
Para verificar que está activado:
1. Ve a: https://dashboard.stripe.com/settings/billing/portal
2. Deberías ver el estado como "Active" (Activo)

## Modo Test vs Live
- **Test mode**: Configura el portal en modo test primero
- **Live mode**: Una vez que funcione en test, actívalo también en live mode

## Documentación Oficial
Para más información: https://stripe.com/docs/billing/subscriptions/integrating-customer-portal
