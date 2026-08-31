import type { APIRoute } from 'astro';

// This site builds fully static (see astro.config.mjs: no `output` set, so the
// default 'static' mode applies), so this endpoint prerenders to a real
// resume.txt file at build time.
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

const WRAP_WIDTH = 80;

function wrap(text: string, width = WRAP_WIDTH, indent = ''): string {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = indent;

  for (const word of words) {
    const candidate = line === indent || line === '' ? indent + word : `${line} ${word}`;
    if (candidate.length > width && line.trim().length > 0) {
      lines.push(line);
      line = indent + word;
    } else {
      line = candidate;
    }
  }
  if (line.trim().length > 0) lines.push(line);

  return lines.join('\n');
}

// Wraps a bullet item with a "  - " marker on the first line and a matching
// hanging indent on continuation lines, so wrapped text stays aligned under
// the bullet text rather than under the dash.
function bullet(item: string): string {
  const prefix = '  - ';
  const contIndent = '    ';
  const words = item.split(/\s+/);
  const lines: string[] = [];
  let line = prefix;
  let first = true;

  for (const word of words) {
    const currentIndent = first ? prefix : contIndent;
    const candidate = line === currentIndent ? currentIndent + word : `${line} ${word}`;
    if (candidate.length > WRAP_WIDTH && line.trim().length > 0) {
      lines.push(line);
      first = false;
      line = contIndent + word;
    } else {
      line = candidate;
    }
  }
  if (line.trim().length > 0) lines.push(line);

  return lines.join('\n');
}

function heading(title: string): string {
  const rule = '='.repeat(title.length);
  return `${title}\n${rule}`;
}

function buildResumeText(): string {
  const parts: string[] = [];

  parts.push('Jonathan Wirick');
  parts.push('CIS Student | Service Desk & Infrastructure Support');
  parts.push('West Kelowna, BC | jwirick06@gmail.com | github.com/jwirick06');
  parts.push('-'.repeat(WRAP_WIDTH));

  parts.push(heading('Summary'));
  parts.push(wrap(summary));

  parts.push('');
  parts.push(heading('Key Skills'));
  for (const group of skillGroups) {
    parts.push(`- ${group.label}`);
    parts.push(wrap(group.items.join(', '), WRAP_WIDTH, '    '));
  }
  parts.push(wrap(problemSolving));

  parts.push('');
  parts.push(heading('Work Experience'));
  experiences.forEach((job, index) => {
    parts.push(`${job.role} - ${job.company} (${job.period})`);
    parts.push(job.bullets.map(bullet).join('\n'));
    if (index < experiences.length - 1) parts.push('');
  });

  parts.push('');
  parts.push(heading('Self-Directed Technical Experience'));
  selfDirected.forEach((entry) => {
    parts.push(`${entry.role} (${entry.period})`);
    parts.push(entry.bullets.map(bullet).join('\n'));
  });
  parts.push('');
  parts.push('Projects:');
  projects.forEach((project) => {
    const header = `- ${project.name} [${project.tags.join(', ')}]`;
    if (project.link) {
      // Keep the link on the header line when it fits, otherwise drop it to
      // its own indented line rather than overflowing the 80-column wrap.
      const inline = `${header} - ${project.link}`;
      if (inline.length <= WRAP_WIDTH) {
        parts.push(inline);
      } else {
        parts.push(header);
        parts.push(`    ${project.link}`);
      }
    } else {
      parts.push(header);
    }
    parts.push(wrap(project.description, WRAP_WIDTH, '    '));
  });

  parts.push('');
  parts.push(heading('Education'));
  education.forEach((entry, index) => {
    parts.push(entry.credential);
    parts.push(entry.school);
    parts.push(`${entry.period}  [${entry.badge}]`);
    if (entry.notes.length > 0) {
      parts.push(entry.notes.map(bullet).join('\n'));
    }
    if (index < education.length - 1) parts.push('');
  });

  parts.push('');
  parts.push(heading('Additional'));
  parts.push(wrap(additional));

  return `${parts.join('\n')}\n`;
}

export const GET: APIRoute = () => {
  return new Response(buildResumeText(), {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
