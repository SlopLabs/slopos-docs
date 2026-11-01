import type { CSSProperties } from 'react';

type Band = {
  name: string;
  note: string;
  parts: string[];
  emphasis?: boolean;
};

const USER_BANDS: Band[] = [
  {
    name: 'Programs',
    note: 'ordinary programs, each in its own memory, each running as some user',
    parts: ['init', 'privd', 'compositor', 'shell', 'terminal', 'apps', 'cat, ls, curl ...'],
  },
  {
    name: 'Libraries',
    note: 'the C library turns function calls into system calls',
    parts: ['slibc, the C library and loader', 'Rust std', 'SlopRing runtime (base programs only)'],
  },
];

const KERNEL_BANDS: Band[] = [
  {
    name: 'Kernel',
    note: 'safe Rust only',
    parts: ['processes and scheduling', 'memory', 'capabilities and users', 'filesystem', 'network', 'drivers and USB'],
  },
  {
    name: 'Trusted core',
    note: 'all of the kernel’s unsafe Rust',
    parts: ['CPU setup', 'page tables', 'user memory access', 'task switching', 'interrupt entry'],
    emphasis: true,
  },
];

const HARDWARE: Band = {
  name: 'Hardware',
  note: '',
  parts: ['CPUs', 'memory', 'disks', 'network card', 'screen', 'keyboard', 'USB devices'],
};

const SUMMARY =
  'The layers of SlopOS, top to bottom: programs and the libraries they link, the C library among them, run in user mode; below the system call boundary, the kernel runs in kernel mode on top of a small trusted core, the only part of the kernel allowed to use unsafe Rust; the hardware is at the bottom.';

const mono: CSSProperties = { fontFamily: 'var(--font-mono)' };

function Chip({ children, emphasis }: { children: string; emphasis?: boolean }) {
  return (
    <span
      className="rounded border px-2 py-0.5 text-xs"
      style={{
        borderColor: emphasis ? 'var(--accent-line)' : 'var(--line)',
        background: emphasis ? 'var(--accent-wash)' : 'var(--surface-2)',
        color: emphasis ? 'var(--accent)' : 'var(--ink-dim)',
      }}
    >
      {children}
    </span>
  );
}

function BandRow({ band }: { band: Band }) {
  return (
    <div
      className="grid gap-2 rounded-md border p-3 sm:grid-cols-[9rem_1fr]"
      style={{
        borderColor: band.emphasis ? 'var(--accent)' : 'var(--line)',
        background: band.emphasis ? 'var(--accent-wash)' : 'var(--surface)',
      }}
    >
      <div>
        <div className="text-sm font-medium" style={{ color: band.emphasis ? 'var(--accent)' : 'var(--ink)' }}>
          {band.name}
        </div>
        {band.note && (
          <div className="mt-0.5 text-xs" style={{ color: 'var(--ink-faint)' }}>
            {band.note}
          </div>
        )}
      </div>
      <div className="flex flex-wrap content-start gap-1.5">
        {band.parts.map((part) => (
          <Chip key={part} emphasis={band.emphasis}>
            {part}
          </Chip>
        ))}
      </div>
    </div>
  );
}

function ModeLabel({ children }: { children: string }) {
  return (
    <div className="text-[11px] tracking-[0.06em]" style={{ ...mono, color: 'var(--ink-faint)' }}>
      {children}
    </div>
  );
}

export function SystemLayers() {
  return (
    <figure className="not-prose my-8">
      <div className="grid gap-2" role="img" aria-label={SUMMARY}>
        <ModeLabel>USER MODE</ModeLabel>
        {USER_BANDS.map((band) => (
          <BandRow key={band.name} band={band} />
        ))}
        <div className="flex items-center gap-3 py-1" aria-hidden="true">
          <div className="h-0 flex-1 border-t-2 border-dashed" style={{ borderColor: 'var(--accent)' }} />
          <span className="text-xs" style={{ ...mono, color: 'var(--accent)' }}>
            system calls
          </span>
          <div className="h-0 flex-1 border-t-2 border-dashed" style={{ borderColor: 'var(--accent)' }} />
        </div>
        <ModeLabel>KERNEL MODE</ModeLabel>
        {KERNEL_BANDS.map((band) => (
          <BandRow key={band.name} band={band} />
        ))}
        <div className="mt-1">
          <BandRow band={HARDWARE} />
        </div>
      </div>
      <figcaption className="mt-2 text-sm" style={{ color: 'var(--ink-faint)' }}>
        Programs ask the kernel for everything through system calls. Inside the kernel, only the trusted core
        may use unsafe Rust; drivers reach their devices through its safe interfaces.
      </figcaption>
    </figure>
  );
}
