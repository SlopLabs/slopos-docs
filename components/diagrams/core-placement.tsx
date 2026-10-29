type Cpu = { id: number; busy?: boolean; rank?: 1 | 2 | 3 };

type Core = { label: string; kind: 'P-core' | 'E-core'; cpus: Cpu[] };

const CORES: Core[] = [
  { label: 'P-core', kind: 'P-core', cpus: [{ id: 0, rank: 1 }, { id: 1, rank: 1 }] },
  { label: 'P-core', kind: 'P-core', cpus: [{ id: 2, busy: true }, { id: 3, rank: 3 }] },
  { label: 'E-core', kind: 'E-core', cpus: [{ id: 4, rank: 2 }] },
  { label: 'E-core', kind: 'E-core', cpus: [{ id: 5, rank: 2 }] },
  { label: 'E-core', kind: 'E-core', cpus: [{ id: 6, busy: true }] },
  { label: 'E-core', kind: 'E-core', cpus: [{ id: 7, rank: 2 }] },
];

const RANK_TEXT = { 1: '1st', 2: '2nd', 3: '3rd' } as const;

function CpuCell({ cpu }: { cpu: Cpu }) {
  const first = cpu.rank === 1;
  return (
    <div
      className="flex flex-col items-center rounded border px-2 py-1.5"
      style={{
        borderColor: first ? 'var(--accent)' : 'var(--line)',
        background: cpu.busy ? 'var(--line)' : first ? 'var(--accent-wash)' : 'var(--surface)',
      }}
    >
      <span className="font-mono text-xs" style={{ color: 'var(--ink)' }}>
        CPU {cpu.id}
      </span>
      <span
        className="text-xs"
        style={{ color: cpu.busy ? 'var(--ink-dim)' : first ? 'var(--accent)' : 'var(--ink-faint)' }}
      >
        {cpu.busy ? 'busy' : cpu.rank ? `${RANK_TEXT[cpu.rank]} choice` : 'idle'}
      </span>
    </div>
  );
}

export function CorePlacement() {
  return (
    <figure
      className="not-prose my-8"
      role="img"
      aria-label="A hybrid processor with two P-cores of two threads each and four E-cores. CPU 2 and CPU 6 are busy. A waking task goes first to CPU 0 or 1, the threads of the P-core with nothing on it; then to an idle E-core, CPU 4, 5 or 7; and only then to CPU 3, the idle thread beside busy CPU 2."
    >
      <div
        className="rounded-md border p-3"
        style={{ borderColor: 'var(--line-strong)', background: 'var(--surface)' }}
      >
        <div className="mb-2 font-mono text-xs" style={{ color: 'var(--ink-faint)' }}>
          one processor package
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
          {CORES.map((core, i) => (
            <div
              key={i}
              className="rounded-md border p-2"
              style={{ borderColor: 'var(--line)' }}
            >
              <div className="mb-1.5 text-xs font-medium" style={{ color: 'var(--ink-dim)' }}>
                {core.label}
              </div>
              <div className="grid gap-1.5">
                {core.cpus.map((cpu) => (
                  <CpuCell key={cpu.id} cpu={cpu} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-3 text-xs" style={{ color: 'var(--ink-dim)' }}>
        Where a waking or new task goes when several CPUs are idle. A P-core with nothing on it
        comes first, then an E-core, and only then the spare thread of a P-core that is already
        running something, because that thread shares the core with its busy sibling. Within one
        rank the CPU with the higher HWP top level wins, and a waking task keeps the CPU it last ran
        on when that CPU is as good as the best.
      </figcaption>
    </figure>
  );
}
