---
name: about-this-system
---

# About this documentation system

If you're new to the team and wondering why this site exists and how it works, start here.

## What this is

This is a docs-as-code system for UI requirements and decisions. Instead of specs living in tickets, a wiki, or a spreadsheet, they live as markdown files in this repo, version-controlled with git, and rendered into this searchable site.

- **Requirements** (`REQ-#####`) — living specs: "what must be true" about a page, component, or fragment. Get updated as understanding evolves.
- **Decisions** (`DEC-#####`) — an append-only log: "why we did it this way." Reference one or more requirements, and are never edited after the fact (write a new one if circumstances change).

Every page, component, and fragment has exactly one `requirements.md` and one `decisions.md` — not one file per individual requirement. Each file holds multiple numbered sections, so opening one file shows everything true about that item.

## The ID system

IDs (`REQ-XXXXX`, `DEC-XXXXX`, etc.) are a flat, global, 5-digit sequence per type — never reset, never segmented by component or team. This is deliberate: the ID never changes meaning even if a component is renamed, split, merged, or moved to a different folder. It's the one stable thing that ties everything together:

- Code comments cite it: `// see REQ-XXXXX`
- Figma layer names carry it as plain text: `Search bar [REQ-XXXXX]`
- Storybook story metadata references it, surfaced via an addon panel

None of these link to each other directly — they all just carry the same ID string. That's intentional: deep links (a URL to a specific Figma frame, a specific file path) break the moment something gets reorganized. A plain ID string never does.

## How to add a new requirement or decision

Don't create files by hand — use the script, which keeps the numbering correct automatically:

```bash
node scripts/next-id.js REQ --create "Your requirement title" fragments/search-bar
node scripts/next-id.js DEC --create "Your decision title" fragments/search-bar
```

Full setup and usage instructions, including installing Node.js if you don't already have it, are in the build plan doc `ui-docs-system-build-plan.md`.

## How things are categorized

Three top-level categories: `pages/`, `components/`, `fragments/`.

- **Fragment** — smallest reusable piece, rarely useful standalone (icon, label, avatar, input field).
- **Component** — a functional unit made of fragments (search bar, modal, card, navbar). Test: would this ever ship alone, doing something meaningful? If yes, it's a component.
- **Page** — made of multiple components (checkout page, product listing).

Components are further grouped by type (`components/modals/`, `components/buttons/`, etc.) to mirror how Storybook groups the component library.

## The CI check

Every pull request runs `check-references.js`, which scans the codebase for any `REQ-#####`/`DEC-#####` mentioned in a code comment and confirms it resolves to a real heading somewhere in `docs/`. If a comment cites an id that doesn't exist — a typo, or a requirement that was never actually written — the check fails and blocks the merge.

## ⚠️ Known gotcha — read this before writing example code

**Never use a real-looking 5-digit `REQ-#####` or `DEC-#####` number in illustrative code, comments, or documentation examples unless that id genuinely exists.** The CI check has no way to distinguish a real broken reference from an intentional example — it will fail the build on both identically.

This bit us once already while building this system: the scripts' own instructional comments used a real-looking example number as a stand-in, and the check correctly (if annoyingly) flagged it as orphaned.

**The fix**: always use a non-numeric placeholder like `REQ-XXXXX` in anything illustrative — READMEs, Slack messages you're pasting into code, other scripts, training material, this page. If you ever see a CI failure that looks confusing (an id that seems made up, or one that's clearly meant as an example), this is the first thing to check.

## Questions

If something about this system is unclear or feels like it's fighting you, that's useful information — mention it. This system is meant to make work faster and clearer, not to be process for its own sake.
