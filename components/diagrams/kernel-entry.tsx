import type { CSSProperties } from 'react';

const mono: CSSProperties = { fontFamily: 'var(--font-mono)' };

// Two lanes, time running left to right: the program's lane on top, the
// kernel's below. Arrows between them are the only ways across.
const VIEW_W = 560;
const LANE_H = 40;
const USER_Y = 22;
const KERNEL_Y = 132;
const LABEL_W = 72;

const MODE_SUMMARY =
  'Time runs left to right. The program runs in user mode until a system call, an interrupt or a fault moves the CPU into kernel mode, at an entry point the kernel chose at boot. The kernel saves the program’s registers, does the work, restores them and returns with the IRETQ instruction, and the program continues from where it stopped.';

function Segment({ x, y, w, label, kernel }: { x: number; y: number; w: number; label: string; kernel?: boolean }) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={LANE_H}
        rx={3}
        style={{
          fill: kernel ? 'var(--accent-wash)' : 'var(--surface-2)',
          stroke: kernel ? 'var(--accent)' : 'var(--line-strong)',
          strokeWidth: 1,
        }}
      />
      <text
        x={x + w / 2}
        y={y + LANE_H / 2 + 4}
        textAnchor="middle"
        fontSize={12}
        style={{ fill: kernel ? 'var(--accent)' : 'var(--ink)' }}
      >
        {label}
      </text>
    </g>
  );
}

function Crossing({
  x1,
  y1,
  x2,
  y2,
  label,
  side,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label: string;
  side: 'left' | 'right';
}) {
  const midY = (y1 + y2) / 2;
  const labelX = side === 'left' ? Math.min(x1, x2) - 8 : Math.max(x1, x2) + 8;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} style={{ stroke: 'var(--accent)', strokeWidth: 1.5 }} markerEnd="url(#mode-arrow)" />
      <text
        x={labelX}
        y={midY - 6}
        textAnchor={side === 'left' ? 'end' : 'start'}
        fontSize={11}
        style={{ ...mono, fill: 'var(--ink-dim)' }}
      >
        {label}
      </text>
    </g>
  );
}

export function ModeSwitch() {
  const userBottom = USER_Y + LANE_H;
  return (
    <figure className="not-prose my-8">
      <div className="overflow-x-auto rounded-md border" style={{ borderColor: 'var(--line)', background: 'var(--surface)' }}>
        <svg
          viewBox={`0 0 ${VIEW_W} ${KERNEL_Y + LANE_H + 8}`}
          role="img"
          aria-label={MODE_SUMMARY}
          style={{ display: 'block', width: '100%', minWidth: 520, height: 'auto', padding: '16px 18px' }}
        >
          <title>{MODE_SUMMARY}</title>
          <defs>
            <marker id="mode-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0,0 L8,4 L0,8 z" style={{ fill: 'var(--accent)' }} />
            </marker>
          </defs>
          <text x={0} y={USER_Y + LANE_H / 2 + 4} fontSize={11} letterSpacing="0.06em" style={{ ...mono, fill: 'var(--ink-faint)' }}>
            USER
          </text>
          <text x={0} y={KERNEL_Y + LANE_H / 2 + 4} fontSize={11} letterSpacing="0.06em" style={{ ...mono, fill: 'var(--ink-faint)' }}>
            KERNEL
          </text>
          <line
            x1={LABEL_W}
            x2={VIEW_W}
            y1={(userBottom + KERNEL_Y) / 2}
            y2={(userBottom + KERNEL_Y) / 2}
            style={{ stroke: 'var(--line)', strokeDasharray: '3 4' }}
          />
          <Segment x={LABEL_W} y={USER_Y} w={140} label="program runs" />
          <Crossing x1={LABEL_W + 140} y1={userBottom} x2={LABEL_W + 172} y2={KERNEL_Y} label="syscall, interrupt, fault" side="left" />
          <Segment x={LABEL_W + 176} y={KERNEL_Y} w={160} label="save, handle, restore" kernel />
          <Crossing x1={LABEL_W + 336} y1={KERNEL_Y} x2={LABEL_W + 368} y2={userBottom} label="IRETQ" side="right" />
          <Segment x={LABEL_W + 372} y={USER_Y} w={VIEW_W - LABEL_W - 372} label="program continues" />
        </svg>
      </div>
      <figcaption className="mt-2 text-sm" style={{ color: 'var(--ink-faint)' }}>
        Every trip into the kernel lands at an entry point the kernel set up at boot, and every trip back out
        ends with the same instruction.
      </figcaption>
    </figure>
  );
}

type Step = { title: string; detail: string; side: 'program' | 'kernel' };

const SYSCALL_STEPS: Step[] = [
  { title: 'Load registers', detail: 'call number in rax, arguments in rdi, rsi, rdx, r10, r8, r9', side: 'program' },
  { title: 'Enter the kernel', detail: 'the syscall instruction; the trusted core saves the registers', side: 'kernel' },
  { title: 'Look up the number', detail: 'a table maps it to a handler, or to ENOSYS', side: 'kernel' },
  { title: 'Check permission', detail: 'EPERM if the caller lacks the capability', side: 'kernel' },
  { title: 'Run the handler', detail: 'typed arguments; user memory copied in and out', side: 'kernel' },
  { title: 'Leave the kernel', detail: 'result in rax; pending signals and kills handled; IRETQ', side: 'kernel' },
  { title: 'Read the result', detail: 'a count, or -1 and errno from the C library', side: 'program' },
];

const SYSCALL_SUMMARY =
  'A system call, step by step: ' + SYSCALL_STEPS.map((s, i) => `${i + 1}. ${s.title} (${s.side}): ${s.detail}.`).join(' ');

export function SyscallPath() {
  return (
    <figure className="not-prose my-8">
      <ol className="grid gap-1.5" role="img" aria-label={SYSCALL_SUMMARY}>
        {SYSCALL_STEPS.map((step, i) => {
          const kernel = step.side === 'kernel';
          return (
            <li
              key={step.title}
              className={`grid gap-1 rounded-md border px-3 py-2 sm:grid-cols-[6.5rem_9.5rem_1fr] sm:gap-3 ${kernel ? 'sm:ml-10' : 'sm:mr-10'}`}
              style={{
                borderColor: kernel ? 'var(--accent-line)' : 'var(--line)',
                background: kernel ? 'var(--accent-wash)' : 'var(--surface)',
              }}
            >
              <div className="text-xs" style={{ ...mono, color: kernel ? 'var(--accent)' : 'var(--ink-faint)' }}>
                {i + 1} · {kernel ? 'kernel' : 'program'}
              </div>
              <div className="text-sm font-medium" style={{ color: 'var(--ink)' }}>
                {step.title}
              </div>
              <div className="text-xs sm:pt-0.5" style={{ color: 'var(--ink-dim)' }}>
                {step.detail}
              </div>
            </li>
          );
        })}
      </ol>
      <figcaption className="mt-2 text-sm" style={{ color: 'var(--ink-faint)' }}>
        The indented, tinted steps run in kernel mode. The program sees none of them: to it, the system call is
        one instruction that took a while.
      </figcaption>
    </figure>
  );
}
