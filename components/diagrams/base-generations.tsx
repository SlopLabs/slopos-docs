import type { CSSProperties } from 'react';

type State = 'current' | 'kept' | 'held';

type Stage = {
  title: string;
  shows: number;
  generations: { n: number; state: State; note: string }[];
};

const STAGES: Stage[] = [
  {
    title: 'The machine boots',
    shows: 1,
    generations: [{ n: 1, state: 'current', note: 'read where the boot loader put it, no copy' }],
  },
  {
    title: 'A new base takes over',
    shows: 2,
    generations: [
      { n: 2, state: 'current', note: 'a copy the kernel owns' },
      { n: 1, state: 'kept', note: 'programs started before still run from it' },
    ],
  },
  {
    title: 'Another base takes over',
    shows: 3,
    generations: [
      { n: 3, state: 'current', note: 'a copy the kernel owns' },
      { n: 2, state: 'held', note: 'freed once no open file, mapping or program holds it' },
      { n: 1, state: 'kept', note: 'the booted one stays for the whole boot' },
    ],
  },
];

const LABEL: Record<State, string> = {
  current: 'current',
  kept: 'kept',
  held: 'retired',
};

const mono: CSSProperties = { fontFamily: 'var(--font-mono)' };

const SUMMARY =
  'Base generations over one boot. At boot, generation 1 is current and is read where the boot loader put it. ' +
  'After a new base takes over, generation 2 is current and generation 1 stays, since the booted generation is kept for the whole boot. ' +
  'After another, generation 3 is current, generation 2 is freed once no open file, mapping or running program holds it, and generation 1 stays.';

export function BaseGenerations() {
  return (
    <figure className="not-prose my-8" role="img" aria-label={SUMMARY}>
      <ol className="grid gap-2 md:grid-cols-3">
        {STAGES.map((stage, i) => (
          <li
            key={stage.title}
            className="rounded-md border p-3"
            style={{ borderColor: 'var(--line)', background: 'var(--surface)' }}
          >
            <div className="text-xs" style={{ ...mono, color: 'var(--ink-faint)' }}>
              {i + 1}
            </div>
            <div className="mt-1 text-sm font-medium" style={{ color: 'var(--ink)' }}>
              {stage.title}
            </div>
            <div className="mt-1 text-xs" style={{ color: 'var(--ink-dim)' }}>
              the base directories show generation {stage.shows}
            </div>
            <ul className="mt-3 grid gap-1.5">
              {stage.generations.map((g) => {
                const current = g.state === 'current';
                return (
                  <li
                    key={g.n}
                    className="rounded border px-2 py-1.5"
                    style={{
                      borderColor: current ? 'var(--accent)' : 'var(--line)',
                      background: current ? 'var(--accent-wash)' : 'transparent',
                      borderStyle: g.state === 'held' ? 'dashed' : 'solid',
                    }}
                  >
                    <div className="flex items-baseline justify-between gap-2 text-xs">
                      <span style={{ ...mono, color: 'var(--ink)' }}>generation {g.n}</span>
                      <span style={{ ...mono, color: current ? 'var(--accent)' : 'var(--ink-faint)' }}>
                        {LABEL[g.state]}
                      </span>
                    </div>
                    <div className="mt-0.5 text-xs" style={{ color: 'var(--ink-dim)' }}>
                      {g.note}
                    </div>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ol>
    </figure>
  );
}
