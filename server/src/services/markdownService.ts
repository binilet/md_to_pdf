// server/src/services/markdownService.ts
import { marked, Renderer } from 'marked';
import hljs from 'highlight.js';

const renderer = new Renderer();

renderer.code = function (code: string, lang: string | undefined, _escaped: boolean): string {
    const language: string = lang && hljs.getLanguage(lang) ? lang : 'plaintext';
    const highlighted: string = hljs.highlight(code, { language }).value;

    return `<pre><code class="hljs language-${language}">${highlighted}</code></pre>`;
};

marked.use({
    renderer,
    gfm: true,
    breaks: false,
});

export function markdownToHTML(markdown: string): string {
    return marked.parse(markdown) as string;
}