create table if not exists public.shared_app_state (
  id smallint primary key default 1 check (id = 1),
  materials jsonb not null,
  spaces jsonb not null,
  updated_at timestamptz not null default pg_catalog.now()
);

alter table public.shared_app_state enable row level security;

grant usage on schema public to anon, authenticated;
grant select, insert, update on public.shared_app_state to anon, authenticated;

drop policy if exists "Anyone can read shared app state" on public.shared_app_state;
create policy "Anyone can read shared app state"
  on public.shared_app_state
  for select
  to anon, authenticated
  using (id = 1);

drop policy if exists "Anyone can create shared app state" on public.shared_app_state;
create policy "Anyone can create shared app state"
  on public.shared_app_state
  for insert
  to anon, authenticated
  with check (id = 1);

drop policy if exists "Anyone can update shared app state" on public.shared_app_state;
create policy "Anyone can update shared app state"
  on public.shared_app_state
  for update
  to anon, authenticated
  using (id = 1)
  with check (id = 1);

create or replace function public.touch_shared_app_state_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = pg_catalog.now();
  return new;
end;
$$;

drop trigger if exists shared_app_state_updated_at on public.shared_app_state;
create trigger shared_app_state_updated_at
  before update on public.shared_app_state
  for each row
  execute function public.touch_shared_app_state_updated_at();
