-- Add Pro access to Contact@storagelatam.com
-- This script checks if the user exists and updates their tier to 'pro'
-- If the user doesn't exist, you'll need to have them sign up first

-- First, check if user exists
DO $$
DECLARE
  user_exists boolean;
  user_id uuid;
BEGIN
  -- Check if profile exists for this email
  SELECT EXISTS (
    SELECT 1 FROM auth.users WHERE email = 'contact@storagelatam.com'
  ) INTO user_exists;

  IF user_exists THEN
    -- Get user ID
    SELECT id INTO user_id FROM auth.users WHERE email = 'contact@storagelatam.com';
    
    -- Update profile to Pro tier with extended trial
    UPDATE profiles 
    SET 
      tier = 'pro',
      trial_end_date = (NOW() + INTERVAL '365 days'),
      updated_at = NOW()
    WHERE id = user_id;
    
    RAISE NOTICE 'User contact@storagelatam.com upgraded to Pro successfully';
  ELSE
    RAISE NOTICE 'User contact@storagelatam.com does not exist. Please have them sign up first.';
  END IF;
END $$;

-- Verify the update
SELECT 
  email, 
  tier, 
  trial_end_date,
  updated_at
FROM profiles p
JOIN auth.users u ON p.id = u.id
WHERE u.email = 'contact@storagelatam.com';
