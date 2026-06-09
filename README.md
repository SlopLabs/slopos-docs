# SlopOS Documentation

Official documentation for [SlopOS](https://github.com/SlopLabs/slopos), the operating system that boots when the Wheel of Fate allows it.

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

## Publishing

Deploy the repository on Vercel. Vercel detects `bun.lock` and uses Bun for dependency installation.

## License

Documentation content follows the main SlopOS license: **GPL-3.0-only**.
