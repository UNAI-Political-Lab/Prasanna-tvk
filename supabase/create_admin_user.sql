-- Enable the pgcrypto extension if it's not already enabled (required for password hashing)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

DO $$
DECLARE
  new_user_id UUID := gen_random_uuid();
  existing_user_id UUID;
BEGIN
  -- 1. Check if the user already exists
  SELECT id INTO existing_user_id FROM auth.users WHERE email = 'prasannatvkmla@gmail.com';

  IF existing_user_id IS NULL THEN
    -- 2. Create the user in auth.users
    INSERT INTO auth.users (
      id,
      instance_id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      created_at,
      updated_at,
      raw_app_meta_data,
      raw_user_meta_data
    )
    VALUES (
      new_user_id,
      '00000000-0000-0000-0000-000000000000',
      'authenticated',
      'authenticated',
      'prasannatvkmla@gmail.com',
      crypt('TVK@2026', gen_salt('bf')),
      now(),
      now(),
      now(),
      '{"provider":"email","providers":["email"]}',
      '{}'
    );
    existing_user_id := new_user_id;
  END IF;

  -- 3. Ensure this user is in the admin_users table
  INSERT INTO public.admin_users (id, email, role, display_name)
  VALUES (
    existing_user_id,
    'prasannatvkmla@gmail.com',
    'super_admin',
    'Prasanna TVK'
  )
  ON CONFLICT (id) DO UPDATE 
  SET role = 'super_admin';

END $$;
