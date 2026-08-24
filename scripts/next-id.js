#!/usr/bin/env node
/**
 * next-id.js
 *
 * Scans docs/ for existing REQ-##### / DEC-##### heading ids (e.g.
 * "## REQ-XXXXX: Sizing") inside every requirements.md / decisions.md file,
 * and prints the next free id, zero-padded to 5 digits.
 *
 * Usage:
 *   node scripts/next-id.js REQ
 *   node scripts/next-id.js DEC
 *
 * Optional — append a new section directly instead of just printing the id:
 *   node scripts/next-id.js REQ --create "Sizing" fragments/search-bar
 *   node scripts/next-id.js DEC --create "Debounce search input" fragments/search-bar
 *
 * The folder path points at the component/fragment/page's own folder (NOT a
 * requirements/decisions subfolder) — the prefix (REQ or DEC) determines
 * whether requirements.md or decisions.md gets the new section. The target
 * folder must already exist — this script won't decide categorization for
 * you (see the build plan's fragment/component/page test for that).
 *
 * ⚠️ GOTCHA: never use a real-looking 5-digit REQ-##### or DEC-##### number
 * in illustrative code comments/examples anywhere in this repo unless that
 * id actually exists — check-references.js (the CI check) can't tell an
 * intentional example apart from a real broken reference. Use REQ-XXXXX
 * as the placeholder in examples instead.
 */

import fs from 'fs';
import path from 'path';

const DOCS_DIR = path.join(process.cwd(), 'docs');
const TEMPLATES_DIR = path.join(process.cwd(), 'templates');
const PAD_LENGTH = 5;

function walk(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, fileList);
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

function findHighestId(prefix) {
  const files = walk(DOCS_DIR);
  let highest = 0;

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const regex = /^##\s+(REQ|DEC)-(\d+):/gm; // fresh regex per file, avoids stateful lastIndex issues
    let match;
    while ((match = regex.exec(content)) !== null) {
      if (match[1] === prefix) {
        const num = parseInt(match[2], 10);
        if (num > highest) highest = num;
      }
    }
  }

  return highest;
}

function formatId(prefix, num) {
  return `${prefix}-${String(num).padStart(PAD_LENGTH, '0')}`;
}

function toTitleCase(str) {
  return str
    .split(/[-_]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function ensureFileExists(targetPath, kind, folderName) {
  if (fs.existsSync(targetPath)) return;

  const templateName = kind === 'requirements' ? 'requirements-file.md' : 'decisions-file.md';
  const templatePath = path.join(TEMPLATES_DIR, templateName);
  const niceName = toTitleCase(folderName);

  let header;
  if (fs.existsSync(templatePath)) {
    header = fs.readFileSync(templatePath, 'utf8');
    header = header.replace('{ComponentName}', niceName);
    header = header.replace(/^name:.*$/m, `name: ${folderName}`);
  } else {
    header = `---\nname: ${folderName}\n---\n\n# ${niceName} — ${kind}\n`;
  }

  fs.writeFileSync(targetPath, header);
}

function appendSection(prefix, id, title, relativeFolder) {
  const kind = prefix === 'REQ' ? 'requirements' : 'decisions';
  const folderPath = path.join(DOCS_DIR, relativeFolder);

  if (!fs.existsSync(folderPath)) {
    console.error(
      `Target folder does not exist: docs/${relativeFolder}\n` +
      `Create the folder first (this script won't guess your category/type grouping for you).`
    );
    process.exit(1);
  }

  const targetPath = path.join(folderPath, `${kind}.md`);
  const folderName = path.basename(relativeFolder);
  ensureFileExists(targetPath, kind, folderName);

  const sectionTemplateName = prefix === 'REQ' ? 'requirement-section.md' : 'decision-section.md';
  const sectionTemplatePath = path.join(TEMPLATES_DIR, sectionTemplateName);

  let section;
  if (fs.existsSync(sectionTemplatePath)) {
    section = fs.readFileSync(sectionTemplatePath, 'utf8');
  } else if (prefix === 'REQ') {
    section = `\n## {ID}: {Title}\n**Status:** draft · **Tags:** \n\n`;
  } else {
    section = `\n## {ID}: {Title}\n**Date:** {date} · **Status:** accepted · **Relates to:** \n\n### Context\n\n### Decision\n\n### Consequences\n`;
  }

  const today = new Date().toISOString().slice(0, 10);
  section = section.replace(/\{ID\}/g, id).replace(/\{Title\}/g, title).replace(/\{date\}/g, today);

  fs.appendFileSync(targetPath, '\n' + section.replace(/^\n+/, ''));
  console.log(`Appended ${id} to docs/${relativeFolder}/${kind}.md`);
  console.log(`ID assigned: ${id}`);
}

function main() {
  const [, , rawPrefix, flag, title, relativeFolder] = process.argv;

  if (!rawPrefix || !['REQ', 'DEC'].includes(rawPrefix.toUpperCase())) {
    console.error('Usage: node scripts/next-id.js <REQ|DEC> [--create "Title" relative/folder/path]');
    process.exit(1);
  }

  const prefix = rawPrefix.toUpperCase();
  const highest = findHighestId(prefix);
  const nextId = formatId(prefix, highest + 1);

  if (flag === '--create') {
    if (!title || !relativeFolder) {
      console.error('When using --create, both a title and a relative folder path are required.');
      console.error('Example: node scripts/next-id.js REQ --create "Sizing" fragments/search-bar');
      process.exit(1);
    }
    appendSection(prefix, nextId, title, relativeFolder);
  } else {
    console.log(nextId);
  }
}

main();
