# SyncTasks

<div style="display: flex; gap: 16px; flex-wrap: wrap; justify-content: center;">

<table align="center">
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/ec97ea90-1a03-4fc0-b9d9-144b2fe76026" width="250"
           style="background:#fff; padding:6px; border-radius:20px; box-shadow:0 0 8px rgba(0,0,0,0.2);" />
    </td>
    <td align="center">
       <img  width="250"
        <img width="1179" height="2556" alt="Simulator Screenshot - iPhone 16 - 2026-04-05 at 16 02 59" src="https://github.com/user-attachments/assets/df2e2f45-a58c-40a8-bf45-bee40c2e2fae" width="250"
           style="background:#fff; padding:6px; border-radius:20px; box-shadow:0 0 8px rgba(0,0,0,0.2);" />
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/da2d6787-8681-418f-a144-4f94acb396c0" width="250"
           style="background:#fff; padding:6px; border-radius:20px; box-shadow:0 0 8px rgba(0,0,0,0.2);" />
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/d4639f3d-2d35-4e78-9cc6-02304620b247" width="250"
           style="background:#fff; padding:6px; border-radius:20px; box-shadow:0 0 8px rgba(0,0,0,0.2);" />
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/53275cfd-cd18-47cb-aba2-02eaa087a80a" width="250"
           style="background:#fff; padding:6px; border-radius:20px; box-shadow:0 0 8px rgba(0,0,0,0.2);" />
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/29a08770-b953-4035-97d2-11e77a5f19ae" width="250"
           style="background:#fff; padding:6px; border-radius:20px; box-shadow:0 0 8px rgba(0,0,0,0.2);" />
    </td>
  </tr>
</table>


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
