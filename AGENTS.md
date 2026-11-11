# SlopOS docs

The documentation site for SlopOS (Fumadocs, Next.js, Bun). Pages are MDX in `content/docs/<section>/<page>.mdx`; each section's `meta.json` orders its sidebar.

- Read `STYLE.md` before writing or editing a page. It is binding.
- Facts come from the SlopOS source (`../slopos`), never from another page or from memory. `SYNCED` holds the slopos commit the pages were last checked against; update it only after checking every page touched by the commits since.
- The slopos repository's `docs-sync` skill is the procedure for a sync.
- A new idea takes a row in `content/docs/abi/glossary.mdx` in the same change. A new page takes a `meta.json` entry.
- In MDX prose a bare `{`, `}` or `<` breaks the build: keep them in code spans.
- Before a commit: `bun run types:check && bun run lint && bun run build`.
- Agents read the site through `/llms.txt`, `/llms.mdx/<section>/<page>/content.md` and the MCP server at `/api/mcp` (`list_pages`, `get_page`, `search`). Keep those routes working.
