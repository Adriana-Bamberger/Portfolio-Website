#!/usr/bin/env node
/**
 * check-references.js
 *
 * Scans the whole codebase for REQ-##### / DEC-##### mentions (in code
 * comments, anywhere really) and confirms each one has a matching heading
 * (e.g. "## REQ-XXXXX: Sizing") inside some requirements.md / decisions.md
 * file under docs/.
 *
 * ⚠️ GOTCHA — read this before writing example code/comments anywhere in
 * this repo: this script cannot tell the difference between a real
 * reference and an illustrative one. If you write a comment like
 * "// e.g. see REQ-XXXXX" purely as an example (in a README, another
 * script, a Slack snippet copied into code, etc.) and that id happens
 * not to exist yet, this check will fail on it as if it were a real typo.
 * Always use a non-numeric placeholder like REQ-XXXXX in illustrative
 * examples, never a real-looking 5-digit number.
 *
 * Exits with code 1 and a list of problems if anything is orphaned —
 * referenced in code but no matching heading exists. Exits with code 0 if
 * everything resolves.
 *
 * Usage:
 *   node scripts/check-references.js
 *
 * Intended to run as a required check in CI on every pull request.
 */

import fs from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();
const DOCS_DIR = path.join(ROOT_DIR, 'docs');

// Folders to skip while scanning the codebase for REQ/DEC mentions.
// 'docs' is skipped here on purpose — we don't want a doc's own heading
// counted as a "reference" needing a matching heading.
const IGNORE_DIRS = new Set(['node_modules', '.git', 'dist', 'build', 'docs', '.next', 'coverage']);

// File types worth scanning for REQ-#####/DEC-##### mentions in comments.
// Add more extensions here if your codebase uses them.
const SCAN_EXTENSIONS = new Set(['.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.html']);

function walk(dir, filter, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (IGNORE_DIRS.has(entry.name)) continue;
      walk(path.join(dir, entry.name), filter, fileList);
    } else if (entry.isFile() && filter(entry.name)) {
      fileList.push(path.join(dir, entry.name));
    }
  }
  return fileList;
}

function collectValidIds() {
  const docFiles = walk(DOCS_DIR, (name) => name.endsWith('.md'));
  const validIds = new Set();

  for (const file of docFiles) {
    const content = fs.readFileSync(file, 'utf8');
    const headingRegex = /^##\s+(REQ|DEC)-(\d+):/gm;
    let match;
    while ((match = headingRegex.exec(content)) !== null) {
      validIds.add(`${match[1]}-${match[2].padStart(5, '0')}`);
    }
  }

  return validIds;
}

function findReferences() {
  const codeFiles = walk(ROOT_DIR, (name) => SCAN_EXTENSIONS.has(path.extname(name)));
  const references = [];

  for (const file of codeFiles) {
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');

    lines.forEach((lineText, index) => {
      const lineRegex = /(REQ|DEC)-(\d{5})/g; // fresh regex per line, avoids stateful lastIndex bugs
      let match;
      while ((match = lineRegex.exec(lineText)) !== null) {
        references.push({
          id: `${match[1]}-${match[2]}`,
          file: path.relative(ROOT_DIR, file),
          line: index + 1,
        });
      }
    });
  }

  return references;
}

function main() {
  const validIds = collectValidIds();
  const references = findReferences();

  const orphanRefs = references.filter((ref) => !validIds.has(ref.id));

  if (orphanRefs.length > 0) {
    console.error('Found references to requirement/decision IDs with no matching heading in docs/:\n');
    for (const ref of orphanRefs) {
      console.error(`  ${ref.id}  referenced in ${ref.file}:${ref.line}`);
    }
    console.error(
      `\n${orphanRefs.length} orphaned reference(s) found.\n` +
      `Fix by either adding a "## ${orphanRefs[0].id}: ..." section to the relevant requirements.md/decisions.md, ` +
      `or correcting the typo in the code comment.`
    );
    process.exitCode = 1;
    return;
  }

  console.log(
    `All ${references.length} REQ/DEC reference(s) found in code resolve to a real doc heading. ` +
    `(${validIds.size} doc id(s) exist in total.)`
  );

  // Informational only — doesn't fail the build. Docs with no code reference
  // yet are completely normal (e.g. a requirement written before the code
  // exists), so this is just a nudge, not an error.
  const referencedIds = new Set(references.map((ref) => ref.id));
  const uncitedDocs = [...validIds].filter((id) => !referencedIds.has(id));
  if (uncitedDocs.length > 0) {
    console.log(`\nFYI: ${uncitedDocs.length} doc id(s) exist but aren't cited anywhere in code yet:`);
    console.log(`  ${uncitedDocs.join(', ')}`);
  }
}

main();
