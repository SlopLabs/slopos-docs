import type { CSSProperties } from 'react';

type Kind = 'kept' | 'gone' | 'free' | 'new' | 'reused';

type Segment = { label: string; grow: number; kind: Kind };

type Mode = {
  title: string;
  flag: string;
  now: Segment[];
  after: Segment[];
};

const MODES: Mode[] = [
  {
    title: 'Erase the disk',
    flag: '--mode erase',
    now: [{ label: 'whatever the disk held', grow: 10, kind: 'gone' }],
    after: [
      { label: 'ESP', grow: 1.2, kind: 'new' },
      { label: 'boot', grow: 1.4, kind: 'new' },
      { label: 'root', grow: 6.6, kind: 'new' },
      { label: 'crash', grow: 0.8, kind: 'new' },
    ],
  },
  {
    title: 'Install beside what is there',
    flag: '--mode free',
    now: [
      { label: 'ESP', grow: 1.2, kind: 'kept' },
      { label: 'other system', grow: 4.8, kind: 'kept' },
      { label: 'free space', grow: 4, kind: 'free' },
    ],
    after: [
      { label: 'ESP, shared', grow: 1.2, kind: 'kept' },
      { label: 'other system', grow: 4.8, kind: 'kept' },
      { label: 'boot', grow: 1.2, kind: 'new' },
      { label: 'root', grow: 2, kind: 'new' },
      { label: 'crash', grow: 0.8, kind: 'new' },
    ],
  },
  {
    title: 'Install on a partition',
    flag: '--mode reuse --root /dev/<partition>',
    now: [
      { label: 'ESP', grow: 1.2, kind: 'kept' },
      { label: 'other system', grow: 3.8, kind: 'kept' },
      { label: 'a partition', grow: 3, kind: 'kept' },
      { label: 'free', grow: 2, kind: 'free' },
    ],
    after: [
      { label: 'ESP, shared', grow: 1.2, kind: 'kept' },
      { label: 'other system', grow: 3.8, kind: 'kept' },
      { label: 'root', grow: 3, kind: 'reused' },
      { label: 'boot', grow: 1.2, kind: 'new' },
      { label: 'crash', grow: 0.8, kind: 'new' },
    ],
  },
];

const mono: CSSProperties = { fontFamily: 'var(--font-mono)' };

function style(kind: Kind): CSSProperties {
  switch (kind) {
    case 'new':
      return { background: 'var(--accent-wash)', borderColor: 'var(--accent-line)', color: 'var(--ink)' };
    case 'reused':
      return { background: 'var(--accent-wash)', borderColor: 'var(--accent)', color: 'var(--ink)' };
    case 'free':
      return { background: 'transparent', borderColor: 'var(--line-strong)', borderStyle: 'dashed', color: 'var(--ink-faint)' };
    case 'gone':
      return {
        background: 'var(--surface)',
        borderColor: 'var(--line)',
        color: 'var(--ink-faint)',
        textDecoration: 'line-through',
      };
    default:
      return { background: 'var(--surface)', borderColor: 'var(--line)', color: 'var(--ink-dim)' };
  }
}

function Bar({ name, segments }: { name: string; segments: Segment[] }) {
  return (
    <div className="grid grid-cols-[3.5rem_1fr] items-center gap-2">
      <div className="text-xs" style={{ color: 'var(--ink-faint)' }}>
        {name}
      </div>
      <div className="flex min-w-0 gap-1">
        {segments.map((s, i) => (
          <div
            key={i}
            className="min-w-0 overflow-hidden rounded border px-1.5 py-1 text-[11px] leading-tight"
            style={{ ...style(s.kind), flexGrow: s.grow, flexBasis: 0 }}
          >
            {s.label}
          </div>
        ))}
      </div>
    </div>
  );
}

const SUMMARY =
  'The three ways to install, as one disk before and after. Erase: everything the disk held goes, and a new ESP, SlopOS boot, root and crash partitions take its place. Beside what is there: the ESP is shared, the other system is kept, and SlopOS boot, root and crash partitions go into the free space. On a partition: the ESP and the other system are kept, the chosen partition becomes the SlopOS root and is erased, and the boot and crash partitions go into free space. Not to scale.';

export function InstallDisk() {
  return (
    <figure className="not-prose my-8" role="img" aria-label={SUMMARY}>
      <div className="grid gap-4">
        {MODES.map((mode) => (
          <div key={mode.title} className="rounded-md border p-3" style={{ borderColor: 'var(--line)' }}>
            <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-3">
              <span className="text-sm font-medium" style={{ color: 'var(--ink)' }}>
                {mode.title}
              </span>
              <span className="text-xs" style={{ ...mono, color: 'var(--ink-faint)' }}>
                {mode.flag}
              </span>
            </div>
            <div className="grid gap-1.5">
              <Bar name="Now" segments={mode.now} />
              <Bar name="After" segments={mode.after} />
            </div>
          </div>
        ))}
      </div>
      <figcaption className="mt-2 text-sm" style={{ color: 'var(--ink-faint)' }}>
        One disk before and after each kind of install, not to scale. Highlighted parts are SlopOS&apos;s; the outlined
        one is a partition reused and erased. A new root takes all the free space unless you give it a size, and
        whatever it leaves stays free.
      </figcaption>
    </figure>
  );
}
