import type { CSSProperties } from 'react';

const STEPS = [
  { title: 'Write the contents', detail: 'to their final location' },
  { title: 'Write the journal entry', detail: 'copies of the changed metadata' },
  { title: 'Write the commit record', detail: 'the change now counts' },
  { title: 'Update in place', detail: 'metadata to its final location' },
  { title: 'Free the entry', detail: 'journal space is reused' },
] as const;

const COMMIT_STEP = 2;

export function JournalTimeline() {
  return (
    <figure className="not-prose my-8">
      <ol className="grid gap-2 md:grid-cols-5" aria-label="The steps of saving a change">
        {STEPS.map((step, i) => {
          const commit = i === COMMIT_STEP;
          return (
            <li
              key={step.title}
              className="rounded-md border p-3"
              style={{
                borderColor: commit ? 'var(--accent)' : 'var(--line)',
                background: commit ? 'var(--accent-wash)' : 'var(--surface)',
              }}
            >
              <div
                className="font-mono text-xs"
                style={{ color: commit ? 'var(--accent)' : 'var(--ink-faint)' }}
              >
                {i + 1}
              </div>
              <div className="mt-1 text-sm font-medium" style={{ color: 'var(--ink)' }}>
                {step.title}
              </div>
              <div className="mt-1 text-xs" style={{ color: 'var(--ink-dim)' }}>
                {step.detail}
              </div>
            </li>
          );
        })}
      </ol>
      <div className="mt-3 grid gap-2 md:grid-cols-5">
        <p
          className="border-t-2 pt-2 text-xs md:col-span-3"
          style={{ borderColor: 'var(--line-strong)', color: 'var(--ink-dim)' }}
        >
          Crash before the commit record is on disk: the change is discarded at the next boot.
        </p>
        <p
          className="border-t-2 pt-2 text-xs md:col-span-2"
          style={{ borderColor: 'var(--accent)', color: 'var(--ink-dim)' }}
        >
          Crash after it: the change is finished at the next boot.
        </p>
      </div>
    </figure>
  );
}

type Cell = 'old' | 'new' | 'list' | 'copy' | 'commit';

const CELL_STYLE: Record<Cell, { box: CSSProperties; text: CSSProperties }> = {
  old: {
    box: { fill: 'var(--surface-3)', stroke: 'var(--line-strong)' },
    text: { fill: 'var(--ink-dim)' },
  },
  new: {
    box: { fill: 'var(--accent-wash)', stroke: 'var(--accent)' },
    text: { fill: 'var(--accent)' },
  },
  list: {
    box: { fill: 'var(--surface-2)', stroke: 'var(--accent-line)' },
    text: { fill: 'var(--ink-dim)' },
  },
  copy: {
    box: { fill: 'var(--accent-wash)', stroke: 'var(--accent-line)' },
    text: { fill: 'var(--accent)' },
  },
  commit: {
    box: { fill: 'var(--accent)', stroke: 'var(--accent)' },
    text: { fill: 'var(--on-accent)', fontWeight: 600 },
  },
};

// One grid for both rows, so a metadata block's journal copy sits directly
// above its final location. The journal row leaves the contents column
// empty: file contents never go into the journal.
const COLUMNS = ['list', 'record', 'directory', 'map', 'contents', 'commit'] as const;
const FINAL_COLUMNS = [1, 2, 3, 4] as const;
const JOURNAL_COLUMNS = [0, 1, 2, 3, 5] as const;

const STATES = {
  crash: {
    journal: ['list', 'copy', 'copy', 'copy', 'commit'],
    final: ['old', 'old', 'old', 'new'],
    summary:
      'After the crash: the journal holds a complete entry with a commit record. The record, directory and map at their final locations are still the old versions; the contents are already new.',
  },
  replay: {
    journal: [],
    final: ['new', 'new', 'new', 'new'],
    summary:
      'After replay: the copies from the journal have been written to their final locations and the journal is empty.',
  },
} satisfies Record<string, { journal: Cell[]; final: Cell[]; summary: string }>;

const W = 76;
const H = 34;
const GAP = 8;
const GRID_X = 132;
const ROW_JOURNAL = 0;
const ROW_FINAL = 54;
const VIEW_W = GRID_X + COLUMNS.length * (W + GAP) - GAP;
const VIEW_H = ROW_FINAL + H;

const mono: CSSProperties = { fontFamily: 'var(--font-mono)' };

function Block({ column, y, cell }: { column: number; y: number; cell: Cell }) {
  const x = GRID_X + column * (W + GAP);
  return (
    <g>
      <rect x={x} y={y} width={W} height={H} rx={2} style={{ ...CELL_STYLE[cell].box, strokeWidth: 1 }} />
      <text
        x={x + W / 2}
        y={y + H / 2 + 4}
        textAnchor="middle"
        fontSize={12}
        style={{ ...mono, ...CELL_STYLE[cell].text }}
      >
        {COLUMNS[column]}
      </text>
    </g>
  );
}

function RowLabel({ y, children }: { y: number; children: string }) {
  return (
    <text x={0} y={y + H / 2 + 4} fontSize={11} letterSpacing="0.06em" style={{ ...mono, fill: 'var(--ink-faint)' }}>
      {children}
    </text>
  );
}

const LEGEND: { cell: Cell; label: string }[] = [
  { cell: 'old', label: 'old version' },
  { cell: 'new', label: 'new version' },
  { cell: 'copy', label: 'copy in the journal' },
  { cell: 'commit', label: 'commit record' },
];

export function JournalDisk({
  state,
  caption,
  legend = false,
}: {
  state: keyof typeof STATES;
  caption: string;
  legend?: boolean;
}) {
  const { journal, final, summary }: { journal: Cell[]; final: Cell[]; summary: string } =
    STATES[state];
  return (
    <figure className="not-prose my-8">
      <div
        className="overflow-x-auto rounded-md border"
        style={{ borderColor: 'var(--line)', background: 'var(--surface)' }}
      >
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label={summary}
          style={{ display: 'block', width: '100%', minWidth: 520, height: 'auto', padding: '18px 20px' }}
        >
          <title>{summary}</title>
          <RowLabel y={ROW_JOURNAL}>JOURNAL</RowLabel>
          {journal.length === 0 ? (
            <text
              x={GRID_X}
              y={ROW_JOURNAL + H / 2 + 4}
              fontSize={12}
              style={{ ...mono, fill: 'var(--ink-faint)', fontStyle: 'italic' }}
            >
              empty
            </text>
          ) : (
            journal.map((cell, i) => (
              <Block key={JOURNAL_COLUMNS[i]} column={JOURNAL_COLUMNS[i]} y={ROW_JOURNAL} cell={cell} />
            ))
          )}
          <RowLabel y={ROW_FINAL}>IN PLACE</RowLabel>
          {final.map((cell, i) => (
            <Block key={FINAL_COLUMNS[i]} column={FINAL_COLUMNS[i]} y={ROW_FINAL} cell={cell} />
          ))}
        </svg>
        {legend && (
          <ul
            className="flex flex-wrap gap-x-5 gap-y-2 border-t px-5 py-3 text-xs"
            style={{ borderColor: 'var(--line)', color: 'var(--ink-dim)' }}
            aria-label="Diagram key"
          >
            {LEGEND.map(({ cell, label }) => (
              <li key={cell} className="flex items-center gap-2">
                <svg width="18" height="14" aria-hidden="true">
                  <rect
                    x="0.5"
                    y="0.5"
                    width="17"
                    height="13"
                    rx="2"
                    style={{ ...CELL_STYLE[cell].box, strokeWidth: 1 }}
                  />
                </svg>
                {label}
              </li>
            ))}
          </ul>
        )}
      </div>
      <figcaption className="mt-2 text-sm" style={{ color: 'var(--ink-faint)' }}>
        {caption}
      </figcaption>
    </figure>
  );
}
