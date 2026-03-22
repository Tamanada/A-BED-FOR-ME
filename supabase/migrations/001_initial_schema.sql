-- A Bed For Me - Initial Schema
-- Run this in your Supabase SQL editor

-- Users profile table (extends auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text not null,
  email text not null,
  referral_code text unique not null,
  referred_by text,
  created_at timestamptz default now() not null
);

-- Hotels table
create table public.hotels (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  country text not null,
  city text not null,
  booking_url text,
  airbnb_url text,
  num_rooms integer not null,
  price_range text not null check (price_range in ('budget', 'mid', 'premium', 'luxury')),
  contact_email text not null,
  contact_phone text,
  extracted_data jsonb,
  status text default 'pending' not null check (status in ('pending', 'validated', 'rejected')),
  created_at timestamptz default now() not null
);

-- Survey answers table
create table public.survey_answers (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete set null,
  satisfaction_level integer not null check (satisfaction_level between 1 and 5),
  current_commission text not null,
  biggest_frustration text not null,
  interest_level integer not null check (interest_level between 1 and 10),
  would_join_if_profitable boolean not null,
  created_at timestamptz default now() not null
);

-- Referrals table
create table public.referrals (
  id uuid default gen_random_uuid() primary key,
  referrer_id uuid references public.profiles(id) on delete cascade not null,
  referred_id uuid references public.profiles(id) on delete cascade not null,
  created_at timestamptz default now() not null,
  unique(referrer_id, referred_id)
);

-- Row Level Security
alter table public.profiles enable row level security;
alter table public.hotels enable row level security;
alter table public.survey_answers enable row level security;
alter table public.referrals enable row level security;

-- Profiles: users can read/update their own profile
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);
create policy "Users can insert own profile" on public.profiles
  for insert with check (auth.uid() = id);

-- Hotels: users can CRUD their own hotels
create policy "Users can view own hotels" on public.hotels
  for select using (auth.uid() = user_id);
create policy "Users can insert own hotels" on public.hotels
  for insert with check (auth.uid() = user_id);
create policy "Users can update own hotels" on public.hotels
  for update using (auth.uid() = user_id);

-- Survey: anyone can insert, users can view their own
create policy "Anyone can submit survey" on public.survey_answers
  for insert with check (true);
create policy "Users can view own surveys" on public.survey_answers
  for select using (auth.uid() = user_id);

-- Referrals: users can view their own referrals
create policy "Users can view own referrals" on public.referrals
  for select using (auth.uid() = referrer_id or auth.uid() = referred_id);
create policy "System can insert referrals" on public.referrals
  for insert with check (true);

-- Function to generate a unique referral code
create or replace function generate_referral_code()
returns text as $$
declare
  code text;
  exists_check boolean;
begin
  loop
    code := upper(substr(md5(random()::text), 1, 8));
    select exists(select 1 from public.profiles where referral_code = code) into exists_check;
    exit when not exists_check;
  end loop;
  return code;
end;
$$ language plpgsql;

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, email, referral_code)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    new.email,
    generate_referral_code()
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger on auth.users insert
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
