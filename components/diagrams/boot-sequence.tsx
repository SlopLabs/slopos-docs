import type { CSSProperties } from 'react';

type Stage = {
  title: string;
  detail: string;
  seen: string;
  user?: boolean;
};

const STAGES: Stage[] = [
  {
    title: 'Firmware',
    detail: 'UEFI checks the hardware and starts the boot loader',
    seen: 'whatever the firmware shows',
  },
  {
    title: 'Limine',
    detail: 'loads the kernel, the base image and the command line into memory',
    seen: 'no menu: it boots the default entry at once',
  },
  {
    title: 'Kernel setup',
    detail: 'CPU tables, memory, interrupt controllers, timers, the other CPUs, devices',
    seen: 'the splash screen and its progress bar',
  },
  {
    title: 'Root filesystem',
    detail: 'a disk or the base image becomes /',
    seen: 'ROOTFS: and VFS: lines in the log',
  },
  {
    title: 'init',
    detail: 'the first program; it starts everything else',
    seen: 'USERLAND: launched /sbin/init in the log',
    user: true,
  },
  {
    title: 'Wheel of Fate',
    detail: 'a spin decides whether this boot continues',
    seen: 'the wheel',
    user: true,
  },
  {
    title: 'Desktop',
    detail: 'init starts the compositor, then a terminal running the shell',
    seen: 'the desktop and a shell prompt',
    user: true,
  },
];

const FIRST_USER = STAGES.findIndex((s) => s.user);

const SUMMARY =
  'The boot sequence in order: firmware, Limine, kernel setup, root filesystem, then in user mode init, the Wheel of Fate and the desktop. ' +
  STAGES.map((s) => `${s.title}: you see ${s.seen}.`).join(' ');

const mono: CSSProperties = { fontFamily: 'var(--font-mono)' };

export function BootSequence() {
  return (
    <figure className="not-prose my-8">
      <ol className="grid gap-1.5" role="img" aria-label={SUMMARY}>
        {STAGES.map((stage, i) => (
          <li key={stage.title}>
            {i === FIRST_USER && (
              <div className="my-2 flex items-center gap-3" aria-hidden="true">
                <div className="h-0 flex-1 border-t-2 border-dashed" style={{ borderColor: 'var(--accent)' }} />
                <span className="text-xs" style={{ ...mono, color: 'var(--accent)' }}>
                  kernel mode above, user mode below
                </span>
                <div className="h-0 flex-1 border-t-2 border-dashed" style={{ borderColor: 'var(--accent)' }} />
              </div>
            )}
            <div
              className="grid gap-1 rounded-md border p-3 sm:grid-cols-[2rem_1fr_13rem] sm:gap-3"
              style={{
                borderColor: stage.user ? 'var(--accent-line)' : 'var(--line)',
                background: stage.user ? 'var(--accent-wash)' : 'var(--surface)',
              }}
            >
              <div className="text-xs" style={{ ...mono, color: 'var(--ink-faint)' }}>
                {i + 1}
              </div>
              <div>
                <div className="text-sm font-medium" style={{ color: 'var(--ink)' }}>
                  {stage.title}
                </div>
                <div className="mt-0.5 text-xs" style={{ color: 'var(--ink-dim)' }}>
                  {stage.detail}
                </div>
              </div>
              <div className="text-xs sm:text-right" style={{ color: 'var(--ink-dim)' }}>
                <span style={{ color: 'var(--ink-faint)' }}>You see: </span>
                {stage.seen}
              </div>
            </div>
          </li>
        ))}
      </ol>
      <figcaption className="mt-2 text-sm" style={{ color: 'var(--ink-faint)' }}>
        From power-on to the desktop. The serial log follows every stage; the screen shows the splash until a
        program draws over it.
      </figcaption>
    </figure>
  );
}
