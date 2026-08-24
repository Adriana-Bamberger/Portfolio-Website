# UI Docs System — Build Plan

## What we're building (recap of decisions)

- **Docs-as-code**: markdown files live in the repo, versioned with git.
- **Two document types, grouped into two files per item**: every page/component/fragment gets exactly one `requirements.md` and one `decisions.md` — not one file per individual requirement. Each file holds multiple numbered sections (`## REQ-00031: Sizing`, `## REQ-00044: Debounce input`, etc). This trades a small amount of scripting complexity for much faster reading and writing — one file to open shows everything true about that item.
  - **Requirements** (`REQ-#####` headings within `requirements.md`) — living specs, the "what must be true." Updated as understanding evolves.
  - **Decisions** (`DEC-#####` headings within `decisions.md`) — append-only log entries, the "why we did it this way." Reference one or more requirements, never edited after the fact.
  - IDs are still found via MkDocs' search even though they're headings inside a shared file, not standalone files — search results link straight to the matching section, not just the top of the page.
- **IDs are flat, global, and 5 digits** (`REQ-00001`, not segmented like `REQ-024-003`). No component/team info is encoded in the ID itself — that lives in the folder path and frontmatter tags instead. This keeps an ID permanently stable even if a component is renamed, split, merged, or moved between folders; only the doc's *location* changes, never its *identity*. 5 digits gives 99,999 of headroom per type, which comfortably outlasts the 4-digit version given the volume of new and reworked code expected.
- **Three content categories, each a top-level folder**: `pages/`, `components/`, `fragments/` — siblings, not nested inside one another, since fragments are typically shared across many components rather than owned by one.
  - **Fragment** — smallest reusable piece, rarely useful standalone (icon, label, avatar, badge, input field, divider).
  - **Component** — a functional unit made of one or more fragments, sometimes other components (search bar, modal, card, navbar). Test: would this ever ship alone, doing something meaningful? If yes, it's a component.
  - **Page** — made of multiple components (checkout page, product listing).
- **Components are grouped by type** (`components/modals/`, `components/buttons/`, `components/forms/`) to mirror however Storybook already groups the component library, so the two systems share one mental model.
- **Renderer**: MkDocs + Material theme, built to static HTML, hosted free (e.g. GitHub Pages).
- **IDs are the universal shared key** — not deep links — connecting:
  - Code comments (`// see REQ-00031`)
  - Figma layer names (`Search bar [REQ-00031]`)
  - Storybook story metadata
- **CI check**: any `REQ-#####` / `DEC-#####` referenced in code must resolve to a real heading inside a `requirements.md`/`decisions.md`, or the build fails.
- **Storybook integration**:
  - **Phase 1 (now)**: a custom addon panel showing linked requirement/decision IDs as clickable links to the docs site.
  - **Phase 2 (later, optional)**: live iframe embeds of stories inside requirement docs. Deferred — adds a build-ordering dependency (Storybook must be built before docs), a CORS/hosting consideration, and page weight, for a payoff (interactive preview) that isn't essential yet.

---

## Phase 0 — Foundations (do this once, regardless of greenfield or retrofit)

### 1. Repo structure

```
docs/
  index.md
  about-this-system.md   # permanent reference for future team members — read this first
  pages/
    checkout/
      requirements.md
      decisions.md
  components/
    modals/
      confirm-delete/
        requirements.md
        decisions.md
    buttons/
      primary-button/
        requirements.md
        decisions.md
    forms/
      payment-form/
        requirements.md
        decisions.md
  fragments/
    search-bar/
      requirements.md   # contains REQ-00031, REQ-00044, etc as sections
      decisions.md       # contains DEC-00042, etc as sections
    icon/
      requirements.md
      decisions.md
mkdocs.yml
templates/
  requirements-file.md    # header used when a requirements.md doesn't exist yet
  decisions-file.md       # header used when a decisions.md doesn't exist yet
  requirement-section.md  # section appended for each new REQ
  decision-section.md     # section appended for each new DEC
scripts/
  next-id.js          # assigns the next free REQ-##### or DEC-##### and appends it
  check-references.js # CI check, see Phase 0.6
```

Note: `search-bar` is filed under `fragments/` here as a small reusable piece — if in your codebase it's actually composed of smaller fragments (icon + input + button) and used as a self-contained feature elsewhere, file it under `components/` instead. The category is about role, not size alone.

> ⚠️ **TODO before treating this doc as final**: `search-bar` is used as the running example throughout this plan, but per the fragment vs. component test above (icon + input + button composing into a self-contained unit), it likely belongs under `components/` rather than `fragments/` in the real codebase. Confirm this once real categorization begins, and update the example paths in this doc (folder tree, Storybook section) accordingly if it moves.

**What a grouped file actually looks like** — `docs/fragments/search-bar/requirements.md`:
```markdown
---
name: search-bar
---

# Search Bar — requirements

## REQ-00031: Sizing
**Status:** approved · **Tags:** responsive

Auto-adjusts to small and large container widths without truncating placeholder text.

## REQ-00044: Debounce input
**Status:** approved · **Tags:** performance

Input is debounced 300ms before firing a search request.
```

And `docs/fragments/search-bar/decisions.md`:
```markdown
---
name: search-bar
---

# Search Bar — decisions

## DEC-00042: Debounce search input
**Date:** 2026-08-20 · **Status:** accepted · **Relates to:** REQ-00044

### Context
Search fired an API call on every keystroke, causing rate-limit errors on slow connections.

### Decision
Debounce input by 300ms before firing the search request.

### Consequences
Slight perceived lag on very fast typers; acceptable trade-off given the API cost.
```

### 2. ID numbering convention

- One global sequential counter per type, zero-padded to 5 digits: `REQ-00001`, `REQ-00002`... and separately `DEC-00001`, `DEC-00002`...
- Don't reset per-component, per-page, or per-category — a single global sequence per type means an ID is never ambiguous no matter where it's mentioned, and never needs renumbering if something moves categories later.
- Write a tiny script (`scripts/next-id.js`) that scans all existing `REQ-*.md` / `DEC-*.md` files, finds the highest number, and prints the next one (padded). Run it manually when creating a new doc — no need to fully automate this yet.

### 3. Templates

Four small templates. The two "file" templates are used once, the first time a requirements.md/decisions.md is created for an item. The two "section" templates are used every time a new requirement or decision is added — `next-id.js` appends them automatically (see 6.3), but they're documented here so you know exactly what's being inserted.

`templates/requirements-file.md` (the header for a brand-new `requirements.md`):
```markdown
---
name: 
---

# {ComponentName} — requirements
```

`templates/decisions-file.md` (the header for a brand-new `decisions.md`):
```markdown
---
name: 
---

# {ComponentName} — decisions
```

`templates/requirement-section.md` (appended for each new requirement):
```markdown

## {ID}: {Title}
**Status:** draft · **Tags:** 

```

`templates/decision-section.md` (appended for each new decision):
```markdown

## {ID}: {Title}
**Date:** {date} · **Status:** accepted · **Relates to:** 

### Context

### Decision

### Consequences
```

`{ComponentName}`, `{ID}`, `{Title}`, and `{date}` are placeholders `next-id.js` fills in automatically — you never need to type them by hand.

### 4. `mkdocs.yml`

```yaml
site_name: UI Docs
theme:
  name: material
  features:
    - search.suggest
    - navigation.sections
    - navigation.indexes
plugins:
  - search
  - awesome-pages   # lets folder structure define nav automatically
markdown_extensions:
  - admonition
  - tables
  - toc:
      permalink: true
```

Install locally:
```bash
pip install mkdocs-material mkdocs-awesome-pages-plugin
mkdocs serve   # preview at localhost:8000
```

### 5. Hosting

- Add a GitHub Actions workflow that runs `mkdocs gh-deploy` on merge to main. Free, static, no server to maintain.

### 6. The two helper scripts — full build & usage guide

This section assumes no prior experience writing or running scripts. Both scripts are plain **Node.js** files — Node is just a program that lets JavaScript run outside a browser, directly from your terminal.

#### 6.1 One-time setup: installing Node.js

1. Go to [nodejs.org](https://nodejs.org) and download the **LTS** version (the stable one, not "Current").
2. Run the installer, accepting the defaults.
3. Confirm it worked by opening a terminal (Terminal on Mac, Command Prompt or PowerShell on Windows) and typing:
   ```bash
   node -v
   ```
   You should see a version number like `v20.11.0`. If you get "command not found," restart your terminal (Node adds itself to your system PATH during install, which sometimes needs a fresh terminal window to take effect) — if it still fails, redo the installer.

You only need to do this once per computer, not once per project.

#### 6.2 Adding the scripts to the repo

1. In your project's root folder (the same level as `docs/` and `mkdocs.yml`), create a folder called `scripts` if it doesn't already exist.
2. Save the two script files provided into it:
   - `scripts/next-id.js`
   - `scripts/check-references.js`
3. Also make sure all four templates from section 3 above exist in `templates/` — `next-id.js`'s `--create` option depends on them (though it has built-in fallback text if a template is somehow missing, so it won't crash, just produce plainer output).
4. Save `about-this-system.md` (provided alongside this plan) directly into `docs/` — this is the permanent reference page for anyone new to the team, so it should render as part of the live site, not just sit in this planning doc. Link to it from `docs/index.md` so it's easy to find, e.g.:
   ```markdown
   See [about this system](about-this-system.md) for how requirements, decisions, and IDs work here.
   ```

Your root folder should now look like:
```
your-project/
  docs/
  scripts/
    next-id.js
    check-references.js
  templates/
    requirement.md
    decision.md
  mkdocs.yml
  package.json
```

#### 6.3 Running `next-id.js` manually

Open a terminal, navigate into your project's root folder (`cd path/to/your-project`), then:

```bash
# Just find out the next free requirement id — doesn't create anything
node scripts/next-id.js REQ
```
Expected output: a single line like `REQ-00032`.

```bash
# Append a new requirement section directly, using the next free id
node scripts/next-id.js REQ --create "Search bar sizing" fragments/search-bar
```
Expected output:
```
Appended REQ-00032 to docs/fragments/search-bar/requirements.md
ID assigned: REQ-00032
```
Note the folder path here is the **item's own folder** (`fragments/search-bar`), not a requirements/decisions subfolder — the script decides which file to touch (`requirements.md` vs `decisions.md`) based on whether you passed `REQ` or `DEC`. If `requirements.md` doesn't exist yet for this item, the script creates it first (using the file template from section 3) and then appends the section — you don't need a separate step for "first requirement ever" versus "tenth requirement."

Open the file afterward and fill in the actual requirement text under the new heading — the script only inserts the id, title, and placeholder status/tags line.

Same pattern for decisions, just swap `REQ` for `DEC` — it writes to `decisions.md` instead:
```bash
node scripts/next-id.js DEC --create "Debounce search input" fragments/search-bar
```

**Note:** the folder itself (`docs/fragments/search-bar`) must already exist — the script deliberately won't guess whether something is a page, component, or fragment for you. Create the folder first, then run the command.

#### 6.4 Running `check-references.js` manually

From the same project root:
```bash
node scripts/check-references.js
```

If everything's fine, you'll see something like:
```
All 2 REQ/DEC reference(s) found in code resolve to a real doc heading. (3 doc id(s) exist in total.)
```

If something's broken (a code comment cites an id with no matching heading anywhere in `docs/`), you'll see something like:
```
Found references to requirement/decision IDs with no matching heading in docs/:

  REQ-77777  referenced in src/components/Broken.jsx:1

1 orphaned reference(s) found.
Fix by either adding a "## REQ-77777: ..." section to the relevant requirements.md/decisions.md, or correcting the typo in the code comment.
```
and the command will exit with a non-zero status — this is what makes it possible to use as an automated CI check (see 6.6 below), since CI systems treat a non-zero exit as "this check failed."

#### 6.5 Making them easier to run (optional but recommended)

Add these to the `"scripts"` section of your `package.json` so the team can run them with a shorter, memorable command instead of typing the full `node scripts/...` path:

```json
"scripts": {
  "new-req": "node scripts/next-id.js REQ --create",
  "new-dec": "node scripts/next-id.js DEC --create",
  "check-refs": "node scripts/check-references.js"
}
```

Then anyone can run, from the project root:
```bash
npm run check-refs
npm run new-req -- "Search bar sizing" fragments/search-bar
```
(The extra `--` before the arguments is required by npm when passing arguments through to the underlying script — it's not a typo.)

#### 6.6 Wiring `check-references.js` into CI (GitHub Actions example)

This makes the check run automatically on every pull request, so a broken reference gets caught before it merges rather than relying on someone remembering to run it manually.

Create `.github/workflows/check-references.yml` in your repo:

```yaml
name: Check requirement/decision references

on:
  pull_request:
    branches: [main]

jobs:
  check-references:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: node scripts/check-references.js
```

Once this file is committed, GitHub will automatically run the check on every new pull request and show a red — or green — on the PR based on the script's exit code. In your repo's branch protection settings, you can mark this check as **required**, which blocks merging until it passes — this is what turns "we should remember to check this" into "it's physically impossible to merge a broken reference."

If you're using a different CI provider (GitLab CI, CircleCI, Azure Pipelines, Bitbucket Pipelines), the underlying command is identical — only the YAML wrapper differs. Ask me and I can write the equivalent config for whichever one your company actually uses.

#### 6.7 Troubleshooting

- **"command not found: node"** — Node isn't installed or your terminal needs restarting after install (see 6.1).
- **"Cannot find module" error** — you're probably running the command from the wrong folder. Both scripts expect to be run from the project root (the folder containing `docs/`), not from inside `scripts/` itself.
- **`--create` says the target folder doesn't exist** — that's intentional (see 6.3); create the destination folder under `docs/` first.
- **CI check passes locally but fails in the pipeline** — almost always means a file was created locally but never committed/pushed. Run `git status` to check for untracked files.
- **CI check fails on an id that looks made up or clearly illustrative** — you've hit the known gotcha: never use a real-looking 5-digit `REQ-#####`/`DEC-#####` in example code or comments unless that id genuinely exists — the checker can't tell an intentional example from a real broken reference. Use `REQ-XXXXX` as a placeholder instead. This is documented permanently in `docs/about-this-system.md` for exactly this reason — check there first, and point anyone confused by this at that page rather than re-explaining it each time.

---

## Phase 1 — Storybook button (this round)

1. Add requirement/decision IDs to story metadata:
   ```jsx
   export default {
     title: 'Fragments/SearchBar',
     component: SearchBar,
     parameters: {
       requirements: ['REQ-00031', 'REQ-00044'],
     },
   };
   ```
2. Scaffold a Storybook addon (Storybook's addon-kit gives you a starter — a panel is ~30–40 lines of React).
3. The panel reads `parameters.requirements` off the current story and renders each as a button/link pointing to `https://your-docs-url/fragments/search-bar/requirements/#req-00031` — MkDocs Material auto-generates an anchor id from each heading, so the link lands directly on that requirement's section rather than the top of the page.
4. That's it for this phase — no iframe, no reverse embedding, just a visible, clickable pointer from "I'm looking at this component in Storybook" to "here's the spec it's built against."

## Phase 2 — Storybook iframe embeds (later, optional)

Notes for when you're ready:
- Storybook serves each story at a predictable URL: `iframe.html?id=<story-id>&viewMode=story`.
- Embed that in the requirement doc via `<iframe>` to show a live, interactive component instead of a screenshot.
- Adds a build-order dependency: Storybook must be deployed before the docs build references it, and it's another URL that can go stale if a story is renamed — extend the CI reference-check script to also validate embed URLs resolve.
- Worth doing once the base system is running smoothly and stable — not a blocker for launch.

---

## Path A — Greenfield rollout (empty system)

1. Set up Phase 0 in full before writing any component.
2. For each new page, component, or fragment, write the requirement doc **first** — it's your build checklist. Decide its category (page/component/fragment) and, if a component, its type grouping (modal/button/form/etc.) before filing it — this determines where it lives, not the ID.
3. Build the component against it.
4. If you deviate from the obvious approach, write a decision doc referencing the requirement.
5. Tag the Storybook story with the relevant IDs (Phase 1).
6. Reference the ID in any non-obvious code comment.
7. CI enforces the reference check from day one — cheap to enforce now, much harder to retrofit onto a large history later.

## Path B — Retrofit onto an existing system

Don't try to backfill everything at once — that's a guaranteed stall.

1. **Audit, don't backfill blind**: list existing pages, components, and fragments, and sort each into a category/type as you go. Don't write requirement docs for all of them up front — the audit is just a map, not a to-do list to clear immediately.
2. **Backfill lazily, triggered by touch**: whenever you're about to modify an existing component for real work, that's the trigger to write its requirement doc first (reverse-engineered from current behavior) before changing it. This naturally prioritizes the components that actually see churn.
3. **Decisions**: only write decision docs retroactively for genuinely surprising existing code — the ones a new dev would ask "wait, why is this like this?" Don't try to reconstruct history for boring, obvious code.
4. **Turn on the CI reference check immediately**, even with near-zero docs written yet — it only blocks new *broken* references, so it costs nothing until someone writes a bad reference, and it prevents new debt while the backfill is still catching up.
5. **Storybook tagging**: add `parameters.requirements` to stories only as you touch them, same lazy-backfill principle.

---

## Appendix — script files

The full source for both scripts is provided as standalone files alongside this plan (not duplicated here, to avoid the two copies drifting out of sync):

- `next-id.js` — assigns the next free `REQ-#####`/`DEC-#####` and optionally scaffolds the doc file (see section 6.3).
- `check-references.js` — the CI check that fails the build on any orphaned reference (see section 6.4–6.6).

Both were tested against a mock `docs/` + code folder using the grouped-file model before being added here: `next-id.js` correctly created a fresh `requirements.md` on the first call, correctly appended a second section to the same file on the next call rather than creating a new file, and correctly created `decisions.md` separately. `check-references.js` correctly caught a deliberately-broken reference (wrong id, file, and line number reported) and correctly passed once the reference was fixed — including catching a subtle false-positive risk where the scripts' own example comments looked like real ids, which is why the example ids in both scripts' comments use a non-numeric placeholder (`REQ-XXXXX`) rather than a real-looking number.

---

## Suggested first milestone (2–3 weeks)

- [ ] `docs/about-this-system.md` created and linked from the site's homepage/nav, so it's the first thing a new team member finds
- [ ] Node.js installed on your machine, confirmed with `node -v`
- [ ] `next-id.js` and `check-references.js` saved into `scripts/`, both run successfully from the terminal
- [ ] `.github/workflows/check-references.yml` committed and showing up as a check on a test pull request
- [ ] Confirm whether `search-bar` is actually a fragment or a component in your codebase, and update this doc's example paths if it moves
- [ ] Phase 0 fully working (repo structure, templates, mkdocs.yml, hosted preview, CI check)
- [ ] 3–5 requirement docs written for your highest-churn components
- [ ] Storybook addon panel working end-to-end for at least one component
- [ ] Team walkthrough: show the loop (code comment → doc → back to code) working live
