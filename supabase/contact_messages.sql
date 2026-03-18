create extension if not exists pgcrypto;

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) >= 2),
  email text not null,
  subject text not null,
  message text not null,
  source text not null default 'portfolio-site',
  user_agent text,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

drop policy if exists "allow_public_insert_messages" on public.contact_messages;

drop policy if exists "allow_authenticated_read_messages" on public.contact_messages;
create policy "allow_authenticated_read_messages"
on public.contact_messages
for select
to authenticated
using (true);

create index if not exists contact_messages_created_at_idx
on public.contact_messages (created_at desc);
