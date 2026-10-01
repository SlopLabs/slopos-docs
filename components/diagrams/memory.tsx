import type { CSSProperties } from 'react';

// Two programs' address spaces on either side of physical RAM. Each virtual
// page either points at a frame or has no entry yet; one frame is mapped by
// both programs, the way a shared library is.
type Page = { label: string; frame: number | null };

const PROGRAM_A: Page[] = [
  { label: '0x400000', frame: 1 },
  { label: '0x401000', frame: 3 },
  { label: '0x402000', frame: null },
  { label: '0x403000', frame: 5 },
];
const PROGRAM_B: Page[] = [
  { label: '0x400000', frame: 4 },
  { label: '0x401000', frame: 3 },
  { label: '0x402000', frame: 0 },
  { label: '0x403000', frame: null },
];
const FRAMES = 6;

const W = 120;
const H = 30;
const GAP = 10;
const TOP = 26;
const COL_A = 0;
const COL_RAM = 210;
const COL_B = 420;
const VIEW_W = COL_B + W;
const FRAME_H = 24;
const FRAME_GAP = 6;
const VIEW_H = TOP + Math.max(PROGRAM_A.length * (H + GAP), FRAMES * (FRAME_H + FRAME_GAP)) + 4;

const mono: CSSProperties = { fontFamily: 'var(--font-mono)' };
const mapped: CSSProperties = { fill: 'var(--accent-wash)', stroke: 'var(--accent)', strokeWidth: 1 };
const absent: CSSProperties = { fill: 'var(--surface-2)', stroke: 'var(--line-strong)', strokeWidth: 1, strokeDasharray: '4 3' };
const frameUsed: CSSProperties = { fill: 'var(--surface-3)', stroke: 'var(--line-strong)', strokeWidth: 1 };
const frameFree: CSSProperties = { fill: 'var(--surface)', stroke: 'var(--line)', strokeWidth: 1 };

// Frames mapped by either program; the rest are drawn as free.
const USED_FRAMES = new Set([...PROGRAM_A, ...PROGRAM_B].map((p) => p.frame));
const frameY = (i: number) => TOP + i * (FRAME_H + FRAME_GAP);

const SUMMARY =
  'Two programs each use addresses 0x400000 to 0x403000. Their page tables point those pages at different frames of physical RAM, except one frame that both map. Some pages have no entry yet; touching one causes a page fault.';

function Heading({ x, children }: { x: number; children: string }) {
  return (
    <text x={x + W / 2} y={14} textAnchor="middle" fontSize={11} letterSpacing="0.06em" style={{ ...mono, fill: 'var(--ink-faint)' }}>
      {children}
    </text>
  );
}

function Column({ x, pages, side }: { x: number; pages: Page[]; side: 'left' | 'right' }) {
  return (
    <g>
      {pages.map((page, i) => {
        const y = TOP + i * (H + GAP);
        const fromX = side === 'left' ? x + W : x;
        const toX = side === 'left' ? COL_RAM : COL_RAM + W;
        return (
          <g key={page.label}>
            {page.frame !== null && (
              <line
                x1={fromX}
                y1={y + H / 2}
                x2={toX}
                y2={frameY(page.frame) + FRAME_H / 2}
                style={{ stroke: 'var(--accent-line)', strokeWidth: 1.25 }}
              />
            )}
            <rect x={x} y={y} width={W} height={H} rx={2} style={page.frame === null ? absent : mapped} />
            <text
              x={x + W / 2}
              y={y + H / 2 + 4}
              textAnchor="middle"
              fontSize={12}
              style={{ ...mono, fill: page.frame === null ? 'var(--ink-faint)' : 'var(--accent)' }}
            >
              {page.frame === null ? `${page.label} ?` : page.label}
            </text>
          </g>
        );
      })}
    </g>
  );
}

export function PageTranslation() {
  return (
    <figure className="not-prose my-8">
      <div className="overflow-x-auto rounded-md border" style={{ borderColor: 'var(--line)', background: 'var(--surface)' }}>
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label={SUMMARY}
          style={{ display: 'block', width: '100%', minWidth: 520, height: 'auto', padding: '18px 20px' }}
        >
          <title>{SUMMARY}</title>
          <Heading x={COL_A}>PROGRAM A</Heading>
          <Heading x={COL_RAM}>RAM</Heading>
          <Heading x={COL_B}>PROGRAM B</Heading>
          <Column x={COL_A} pages={PROGRAM_A} side="left" />
          <Column x={COL_B} pages={PROGRAM_B} side="right" />
          {Array.from({ length: FRAMES }, (_, i) => (
            <g key={i}>
              <rect x={COL_RAM} y={frameY(i)} width={W} height={FRAME_H} rx={2} style={USED_FRAMES.has(i) ? frameUsed : frameFree} />
              <text
                x={COL_RAM + W / 2}
                y={frameY(i) + FRAME_H / 2 + 4}
                textAnchor="middle"
                fontSize={11}
                style={{ ...mono, fill: USED_FRAMES.has(i) ? 'var(--ink-dim)' : 'var(--ink-faint)' }}
              >
                {USED_FRAMES.has(i) ? `frame ${i}` : 'free'}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <figcaption className="mt-2 text-sm" style={{ color: 'var(--ink-faint)' }}>
        Both programs use the same addresses, but each page table points them at different frames of RAM. Frame 3 is
        mapped by both, the way a shared library is. A dashed page has no entry yet; the first access to it is a page
        fault.
      </figcaption>
    </figure>
  );
}
