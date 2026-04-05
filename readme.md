# SyncTasks

Offline-first task app with local SQLite persistence and direct Supabase sync.

## English

### Overview

SyncTasks is a React Native (Expo) app using MVVM.

Current behavior:
- Works offline (local first)
- Saves tasks in SQLite
- Syncs tasks with Supabase on app start and after create/update/delete actions
- Uses Last Write Wins (LWW) with `updated_at`

### Implemented Features

- Create task
- Toggle task completion
- Delete task (soft delete via `deleted` flag)
- Local sync control with `synced` flag in SQLite


### Sync Strategy (Current)

1. Read remote tasks from Supabase
2. Merge remote -> local when remote `updated_at` is newer
3. Push local -> remote when local `updated_at` is newer or remote row is missing
4. Mark local rows as synced after successful push

Conflict resolution: **Last Write Wins (LWW)** based on `updated_at`.

### Tech Stack

- React Native + Expo
- TypeScript
- NativeWind
- expo-sqlite (local database)
- Supabase (`@supabase/supabase-js`)

### Current Project Structure

```txt
src/
├── components/
├── database/
├── model/
├── services/
├── view/
└── viewmodel/
```

### Supabase Setup

Create table:

```sql
create table if not exists public.tasks (
  id text primary key,
  title text not null,
  completed boolean not null default false,
  updated_at bigint not null,
  deleted boolean not null default false
);
```

If RLS is enabled, allow access for development:

```sql
alter table public.tasks enable row level security;

create policy "Allow anon read tasks"
on public.tasks for select
to anon
using (true);

create policy "Allow anon write tasks"
on public.tasks for all
to anon
using (true)
with check (true);
```

`.env`:

```bash
EXPO_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

Without these variables, the app still works offline and only cloud sync is disabled.

---

## Português

### Visão Geral

O SyncTasks é um app React Native (Expo) com arquitetura MVVM.

Comportamento atual:
- Funciona offline (local first)
- Salva tarefas no SQLite
- Sincroniza com Supabase na inicialização e após criar/atualizar/excluir tarefas
- Usa Last Write Wins (LWW) com `updated_at`

### Funcionalidades Implementadas

- Criar tarefa
- Marcar/desmarcar conclusão
- Excluir tarefa (soft delete com flag `deleted`)
- Controle local de sincronização com flag `synced` no SQLite


### Estratégia de Sync (Atual)

1. Busca tarefas remotas no Supabase
2. Faz merge remoto -> local quando `updated_at` remoto é mais novo
3. Envia local -> remoto quando `updated_at` local é mais novo ou o registro remoto não existe
4. Marca registros locais como sincronizados após envio com sucesso

Resolução de conflito: **Last Write Wins (LWW)** baseada em `updated_at`.

### Stack Atual

- React Native + Expo
- TypeScript
- NativeWind
- expo-sqlite (banco local)
- Supabase (`@supabase/supabase-js`)

### Estrutura Atual do Projeto

```txt
src/
├── components/
├── database/
├── model/
├── services/
├── view/
└── viewmodel/
```

### Configuração do Supabase

Criar tabela:

```sql
create table if not exists public.tasks (
  id text primary key,
  title text not null,
  completed boolean not null default false,
  updated_at bigint not null,
  deleted boolean not null default false
);
```

Se RLS estiver habilitado, liberar acesso para desenvolvimento:

```sql
alter table public.tasks enable row level security;

create policy "Allow anon read tasks"
on public.tasks for select
to anon
using (true);

create policy "Allow anon write tasks"
on public.tasks for all
to anon
using (true)
with check (true);
```

`.env`:

```bash
EXPO_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

Sem essas variáveis, o app continua funcionando offline e apenas a sincronização em nuvem é desativada.
