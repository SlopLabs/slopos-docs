# SlopOS Documentation

Official documentation for [SlopOS](https://github.com/SlopLabs/slopos), the operating system that boots when the Wheel of Fate allows it.

## Writing

Pages live in `content/docs/`, one MDX file each; sidebar order is set by the
`meta.json` in each folder. Read [STYLE.md](STYLE.md) before writing or editing
a page, and check facts against the SlopOS source rather than other pages.
Diagrams are React components in `components/diagrams/`.

`SYNCED` holds the SlopOS commit the pages were last checked against. Update
it only after checking every page the commits since then touch.

## Development

This site is built with [Fumadocs](https://fumadocs.dev), [Next.js](https://nextjs.org), and [Bun](https://bun.sh).

Install dependencies:

```bash
bun install
```

Run the development server:

```bash
bun run dev
```

View your local preview at `http://localhost:3000`.

Useful checks:

```bash
bun run types:check
bun run lint
bun run build
```

## For AI agents

The site serves itself to agents three ways: an index at `/llms.txt`, each
page as Markdown at `/llms.mdx/<section>/<page>/content.md`, and an
[MCP](https://modelcontextprotocol.io) server at `/api/mcp` with the tools
`list_pages`, `get_page` and `search`:

```json
{ "mcpServers": { "slopos-docs": { "type": "http", "url": "https://slopos.sloplabs.net/api/mcp" } } }
```

## Publishing

Deploy the repository on Vercel. Vercel detects `bun.lock` and uses Bun for dependency installation.

## License

Documentation content follows the main SlopOS license: **GPL-3.0-or-later**.
