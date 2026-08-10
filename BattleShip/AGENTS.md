Agent guidance for AI coding assistants
=====================================

Purpose
-------
This file gives minimal, actionable instructions to AI coding agents working in this repository. Keep edits small and focused.

Handle `@ollama explain the architecture of this TypeScript project`
----------------------------------------------------------------
1. Detect whether this repository is a TypeScript project:
   - Check for `tsconfig.json`, `package.json` with a `typescript` dependency, or `src/**/*.ts` / `src/**/*.tsx` files.

2. If it IS a TypeScript project, gather the following before explaining architecture:
   - `package.json` scripts (build/test/start).
   - `tsconfig.json` settings (module, target, paths, composite).
   - Top-level directories and entry points (e.g. `src/index.ts`, `src/main.tsx`).
   - Frameworks and tools (React, Next, Nest, Node, Vite, Webpack, etc.).
   - Key modules and their responsibilities (storage, API clients, UI, shared utils).
   - Data flow and boundaries (frontend vs backend, public API surface, message/event flows).
   - How to build, run and test (exact commands to run locally).

   Produce a concise answer containing:
   - One-line summary of the architecture.
   - Components list + responsibilities with key file links.
   - Data flows and important invariants.
   - Commands to reproduce builds/tests locally.
   - Suggested follow-ups or potential issues to watch for.

3. If it is NOT a TypeScript project:
   - Say so explicitly and then describe the actual project type (e.g. static HTML/JS) and its architecture.
   - Offer to (a) explain the current architecture, or (b) list steps to convert it to TypeScript.

4. Safety and permissions
   - Never run commands in the user's environment without explicit permission. Present commands clearly and request confirmation before executing.

Example answer structure (short):
 - Summary: 1-2 sentences.
 - Components: bullet list with file links.
 - Data flow: short paragraph or simple diagram.
 - Reproduce: exact `npm`/`yarn`/`pnpm` commands.
 - Next steps / questions.

Links
-----
- If a `README.md` exists, link to it for more context.

Keep responses concise and fact-backed; prefer linking to files rather than pasting large excerpts.
