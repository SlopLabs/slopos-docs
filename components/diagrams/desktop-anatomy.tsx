const PARTS = [
  { n: 1, who: 'Compositor', text: "SlopOS's mark: opens the system menu" },
  { n: 2, who: 'Compositor', text: "the focused window's app, by its dock entry's name" },
  { n: 3, who: 'Compositor', text: 'network and clock, each opening a panel' },
  { n: 4, who: 'Compositor', text: 'close, minimise and zoom, on the left of the title bar' },
  { n: 5, who: 'App', text: "the window's content: the app's own buffer" },
  { n: 6, who: 'Compositor', text: 'the dock: pinned apps, then running ones no entry names, a dot under each that runs' },
] as const;

function Marker({ n }: { n: number }) {
  return (
    <span
      className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full font-mono text-[10px]"
      style={{ background: 'var(--accent)', color: 'var(--on-accent)' }}
    >
      {n}
    </span>
  );
}

function Tile({ running }: { running?: boolean }) {
  return (
    <span className="flex flex-col items-center gap-1">
      <span
        className="block h-5 w-5 rounded-md"
        style={{ background: 'var(--accent-wash)', border: '1px solid var(--accent-line)' }}
      />
      <span
        className="block h-1 w-1 rounded-full"
        style={{ background: running ? 'var(--ink-dim)' : 'transparent' }}
      />
    </span>
  );
}

export function DesktopAnatomy() {
  return (
    <figure
      className="not-prose my-8"
      role="img"
      aria-label="The parts of a SlopOS desktop: a menu bar across the top with SlopOS's mark, the focused app's name, and the network and clock items; a window with its close, minimise and zoom buttons on the left of its title bar above content the app draws; and a dock along the bottom of pinned and running apps."
    >
      <div
        className="overflow-hidden rounded-md border"
        style={{ borderColor: 'var(--line-strong)', background: 'var(--surface)' }}
      >
        <div
          className="flex items-center gap-2 border-b px-2 py-1 text-xs"
          style={{ borderColor: 'var(--line)', color: 'var(--ink)' }}
        >
          <span className="block h-3 w-3 rounded-sm" style={{ background: 'var(--accent)' }} />
          <Marker n={1} />
          <span className="font-medium">Editor</span>
          <Marker n={2} />
          <span className="flex-1" />
          <Marker n={3} />
          <span className="font-mono" style={{ color: 'var(--ink-dim)' }}>
            net
          </span>
          <span className="font-mono">14:05</span>
        </div>

        <div className="px-4 py-5 sm:px-10">
          <div
            className="mx-auto max-w-md overflow-hidden rounded-lg border"
            style={{ borderColor: 'var(--line-strong)' }}
          >
            <div
              className="flex items-center gap-2 border-b px-2 py-1 text-xs"
              style={{ borderColor: 'var(--line)', color: 'var(--ink-dim)' }}
            >
              {['close', 'minimise', 'zoom'].map((b) => (
                <span
                  key={b}
                  className="block h-2.5 w-2.5 rounded-full"
                  style={{ background: 'var(--ink-faint)' }}
                />
              ))}
              <Marker n={4} />
              <span className="flex-1 truncate text-center">notes.txt — Editor</span>
            </div>
            <div
              className="flex h-20 items-center justify-center gap-2 text-xs"
              style={{ background: 'var(--accent-wash)', color: 'var(--ink-dim)' }}
            >
              <Marker n={5} />
              <span>drawn by the app</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center pb-2">
          <div
            className="flex items-end gap-2 rounded-xl border px-3 pt-2"
            style={{ borderColor: 'var(--line)', background: 'var(--surface)' }}
          >
            <Tile running />
            <Tile />
            <Tile running />
            <span className="mb-3 block h-4 w-px" style={{ background: 'var(--line-strong)' }} />
            <Tile running />
            <span className="mb-3">
              <Marker n={6} />
            </span>
          </div>
        </div>
      </div>

      <ol className="mt-3 grid gap-1 sm:grid-cols-2">
        {PARTS.map((part) => (
          <li key={part.n} className="flex items-start gap-2 text-xs" style={{ color: 'var(--ink-dim)' }}>
            <Marker n={part.n} />
            <span>
              <span style={{ color: part.who === 'App' ? 'var(--accent)' : 'var(--ink)' }}>{part.who}:</span>{' '}
              {part.text}
            </span>
          </li>
        ))}
      </ol>
      <figcaption className="mt-3 text-xs" style={{ color: 'var(--ink-dim)' }}>
        Only the content of each window is the app's. The compositor draws everything else, over the
        same theme the apps use.
      </figcaption>
    </figure>
  );
}
