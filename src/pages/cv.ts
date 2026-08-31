// Short, extensionless alias for the ANSI resume: `curl -s jwirick.dev/cv`.
//
// This cannot live at /resume. The HTML resume page (resume.astro) builds to
// dist/resume/index.html, so dist/resume is a directory and no file can occupy
// that path. /cv sidesteps the collision.
//
// It re-exports resume.ans rather than rebuilding the document, so there is no
// third copy of the resume data to drift out of sync.
export { GET, prerender } from './resume.ans';
