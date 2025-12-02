-- Script para actualizar contact@storagelatam.com a tier Pro
-- Este script actualiza el tier del usuario y extiende su periodo de acceso

UPDATE profiles
SET 
  tier = 'pro',
  trial_end_date = (CURRENT_TIMESTAMP + INTERVAL '365 days'),
  updated_at = CURRENT_TIMESTAMP
WHERE email = 'contact@storagelatam.com';

-- Verificar que se actualizó correctamente
SELECT id, email, tier, trial_end_date
FROM profiles
WHERE email = 'contact@storagelatam.com';
