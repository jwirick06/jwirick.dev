import type { APIRoute } from 'astro';

// This site builds fully static (see astro.config.mjs: no `output` set, so the
// default 'static' mode applies), so this endpoint prerenders to a real
// resume.ans file at build time.
export const prerender = true;

import {
  summary,
  skillGroups,
  problemSolving,
  experiences,
  selfDirected,
  projects,
  education,
  additional,
} from '../data/resume';

// --- ANSI styling ------------------------------------------------------
//
// 256-colour SGR codes, not 24-bit truecolor: Terminal.app on macOS does not
// support truecolor, and 256-colour is universally supported. These
// approximate the site's dark terminal palette.

const ACCENT = '\x1b[38;5;69m'; // site accent blue #5b8def
const NAME = '\x1b[1;38;5;231m'; // bright bold white, site zinc-50
const BODY = '\x1b[38;5;247m'; // site zinc-400 body/secondary text
const DIM = '\x1b[38;5;240m'; // site zinc-600ish, dim rules/meta
const EMERALD = '\x1b[38;5;78m'; // site emerald-400, status accent
const RESET = '\x1b[0m';

const WRAP_WIDTH = 80;

// Strips SGR escape sequences so width math operates on what actually prints.
// ANSI codes have zero display width but count toward .length, so every
// padding/wrap/alignment decision below goes through this rather than raw
// string length.
const ANSI_PATTERN = /\x1b\[[0-9;]*m/g;

function stripAnsi(str: string): string {
  return str.replace(ANSI_PATTERN, '');
}

function visibleWidth(str: string): number {
  return stripAnsi(str).length;
}

// Plain word-wrap (no ANSI inside `text`). Returns wrapped lines with no
// indent baked in; callers add indent and colour around each line.
function wrapLines(text: string, width: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = '';

  for (const word of words) {
    const candidate = line === '' ? word : `${line} ${word}`;
    if (visibleWidth(candidate) > width && line !== '') {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line !== '') lines.push(line);

  return lines;
}

// Plain word-wrap with a fixed indent applied to every line, joined into one
// string. Used for paragraph-style text (summary, additional, descriptions)
// that gets a single colour wrapped around the whole block.
function wrapText(text: string, width = WRAP_WIDTH, indent = ''): string {
  return wrapLines(text, width - indent.length)
    .map((line) => indent + line)
    .join('\n');
}

// Wraps a list of atomic units (already-bracketed skill chips) without ever
// splitting a unit across lines, packing as many per line as fit at `width`.
// Mirrors the site's flex-wrap chip rows.
function wrapAtomic(units: string[], width: number, indent: string): string[] {
  const lines: string[] = [];
  let line = indent;
  let hasContent = false;

  for (const unit of units) {
    const candidate = hasContent ? `${line} ${unit}` : `${line}${unit}`;
    if (visibleWidth(candidate) > width && hasContent) {
      lines.push(line);
      line = indent + unit;
      hasContent = true;
    } else {
      line = candidate;
      hasContent = true;
    }
  }
  if (hasContent) lines.push(line);

  return lines;
}

// Renders a bullet item with a dim "-" marker and a hanging indent, so
// wrapped continuation lines align under the bullet text rather than the
// marker. Marker and text carry different colours, so each line is
// self-contained and resets at its own end.
function bullet(item: string): string {
  const indentWidth = 4; // "  - " on the first line, "    " on the rest
  const lines = wrapLines(item, WRAP_WIDTH - indentWidth);

  return lines
    .map((line, index) =>
      index === 0
        ? `${DIM}  -${RESET} ${BODY}${line}${RESET}`
        : `    ${BODY}${line}${RESET}`
    )
    .join('\n');
}

function heading(title: string): string {
  return `${ACCENT}##${RESET} ${NAME}${title}${RESET}`;
}

function label(text: string): string {
  return `${ACCENT}-${RESET} ${NAME}${text}${RESET}`;
}

function hr(): string {
  return `${DIM}${'─'.repeat(WRAP_WIDTH)}${RESET}`;
}

// Right-aligns `right` to column `width` on the same line as `left`, when it
// fits cleanly; otherwise drops `right` to its own line, right-aligned as far
// as it can go. Width math is done on visible (post-strip) width, since both
// `left` and `right` already carry colour codes.
function alignRight(left: string, right: string, width = WRAP_WIDTH): string {
  const gap = width - visibleWidth(left) - visibleWidth(right);
  if (gap >= 1) {
    return `${left}${' '.repeat(gap)}${right}`;
  }
  const rightPad = Math.max(width - visibleWidth(right), 0);
  return `${left}\n${' '.repeat(rightPad)}${right}`;
}

function buildResumeAnsi(): string {
  const parts: string[] = [];

  parts.push(`${NAME}Jonathan Wirick${RESET}`);
  parts.push(`${BODY}CIS Student | Service Desk & Infrastructure Support${RESET}`);
  parts.push(`${DIM}West Kelowna, BC | jwirick06@gmail.com | github.com/jwirick06${RESET}`);
  parts.push(hr());

  parts.push('');
  parts.push(heading('Summary'));
  parts.push(`${BODY}${wrapText(summary)}${RESET}`);

  parts.push('');
  parts.push(hr());
  parts.push('');
  parts.push(heading('Key Skills'));
  for (const group of skillGroups) {
    parts.push(label(group.label));
    const chipUnits = group.items.map((item) => `[${item}]`);
    parts.push(`${BODY}${wrapAtomic(chipUnits, WRAP_WIDTH, '    ').join('\n')}${RESET}`);
  }
  parts.push(`${BODY}${wrapText(problemSolving)}${RESET}`);

  parts.push('');
  parts.push(hr());
  parts.push('');
  parts.push(heading('Work Experience'));
  experiences.forEach((job, index) => {
    parts.push(alignRight(`${NAME}${job.role}${RESET}`, `${DIM}${job.period}${RESET}`));
    parts.push(`${BODY}${job.company}${RESET}`);
    parts.push(job.bullets.map(bullet).join('\n'));
    if (index < experiences.length - 1) parts.push('');
  });

  parts.push('');
  parts.push(hr());
  parts.push('');
  parts.push(heading('Self-Directed Technical Experience'));
  selfDirected.forEach((entry) => {
    parts.push(alignRight(`${NAME}${entry.role}${RESET}`, `${DIM}${entry.period}${RESET}`));
    parts.push(entry.bullets.map(bullet).join('\n'));
  });
  parts.push('');
  parts.push(label('Projects'));
  projects.forEach((project) => {
    const tags = `${DIM}[${project.tags.join(', ')}]${RESET}`;
    const header = `${ACCENT}-${RESET} ${NAME}${project.name}${RESET} ${tags}`;
    if (project.link) {
      const inline = `${header}${ACCENT} - ${project.link}${RESET}`;
      if (visibleWidth(inline) <= WRAP_WIDTH) {
        parts.push(inline);
      } else {
        parts.push(header);
        parts.push(`    ${ACCENT}${project.link}${RESET}`);
      }
    } else {
      parts.push(header);
    }
    parts.push(`${BODY}${wrapText(project.description, WRAP_WIDTH, '    ')}${RESET}`);
  });

  parts.push('');
  parts.push(hr());
  parts.push('');
  parts.push(heading('Education'));
  education.forEach((entry, index) => {
    parts.push(`${NAME}${entry.credential}${RESET}`);
    parts.push(`${BODY}${entry.school}${RESET}`);
    parts.push(`${DIM}${entry.period}${RESET}  ${EMERALD}[${entry.badge}]${RESET}`);
    if (entry.notes.length > 0) {
      parts.push(entry.notes.map(bullet).join('\n'));
    }
    if (index < education.length - 1) parts.push('');
  });

  parts.push('');
  parts.push(hr());
  parts.push('');
  parts.push(heading('Additional'));
  parts.push(`${BODY}${wrapText(additional)}${RESET}`);

  return `${parts.join('\n')}${RESET}\n`;
}

export const GET: APIRoute = () => {
  return new Response(buildResumeAnsi(), {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
