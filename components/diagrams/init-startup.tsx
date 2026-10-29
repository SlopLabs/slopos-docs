import type { CSSProperties } from 'react';

type Step = {
  title: string;
  detail: string;
  holds: string;
};

type Phase = {
  name: string;
  note: string;
  steps: Step[];
};

const PHASES: Phase[] = [
  {
    name: 'Before anything runs',
    note: 'init runs each to the end before the next',
    steps: [
      {
        title: 'Crash records',
        detail: 'bootctl collect moves what a crashed boot left to /var/log/crash',
        holds: 'RawBlock, Power',
      },
      {
        title: 'The root',
        detail: 'the ownership map’s directories, a hand-over of /usr/local finished, the apps’ manifest',
        holds: 'init itself',
      },
      {
        title: 'People',
        detail: 'users sync writes the user database from the accounts record',
        holds: 'Seal',
      },
      {
        title: 'Extensions',
        detail: 'extctl activate-all shows each enabled extension at /opt/<name>',
        holds: 'ExtensionUpdate, Seal',
      },
    ],
  },
  {
    name: 'Services',
    note: 'started again when they exit, five times a minute at most',
    steps: [
      {
        title: 'privd',
        detail: 'waited for until it says it is listening on /run/privd',
        holds: 'every capability an action may name, and SetId',
      },
      {
        title: 'remoted',
        detail: 'only on a base that carries a pairing',
        holds: 'nothing',
      },
      {
        title: 'Wheel of Fate',
        detail: '/bin/roulette, waited for; skipped on a test boot or with roulette=skip',
        holds: 'DisplaySeat',
      },
      {
        title: 'Console login and extensions’ services',
        detail: '/bin/login on init’s terminal, and each service an extension declares',
        holds: 'nothing, or what the extension was granted',
      },
    ],
  },
  {
    name: 'The screen',
    note: 'sessions, each under a login tag of its own',
    steps: [
      {
        title: 'The boot’s session',
        detail: 'the desktop of the person who logs in by themselves, else the login screen',
        holds: 'DisplaySeat, InputSeat',
      },
      {
        title: 'Its first window',
        detail: 'once the compositor says it is ready: a terminal, or the installer’s welcome on a live boot',
        holds: 'nothing',
      },
    ],
  },
];

const SUMMARY =
  'What init starts, in order. ' +
  PHASES.map(
    (phase) =>
      `${phase.name} (${phase.note}): ` + phase.steps.map((s) => `${s.title}, holding ${s.holds}.`).join(' '),
  ).join(' ');

const mono: CSSProperties = { fontFamily: 'var(--font-mono)' };

export function InitStartup() {
  let n = 0;
  return (
    <figure className="not-prose my-8">
      <div className="grid gap-4" role="img" aria-label={SUMMARY}>
        {PHASES.map((phase, p) => (
          <section key={phase.name} aria-hidden="true">
            <div className="mb-1.5 flex flex-wrap items-baseline gap-x-3">
              <span className="text-sm font-medium" style={{ color: p === 1 ? 'var(--accent)' : 'var(--ink)' }}>
                {phase.name}
              </span>
              <span className="text-xs" style={{ color: 'var(--ink-faint)' }}>
                {phase.note}
              </span>
            </div>
            <ol className="grid gap-1.5">
              {phase.steps.map((step) => {
                n += 1;
                return (
                  <li
                    key={step.title}
                    className="grid gap-1 rounded-md border p-3 sm:grid-cols-[2rem_1fr_13rem] sm:gap-3"
                    style={{
                      borderColor: p === 1 ? 'var(--accent-line)' : 'var(--line)',
                      background: p === 1 ? 'var(--accent-wash)' : 'var(--surface)',
                    }}
                  >
                    <div className="text-xs" style={{ ...mono, color: 'var(--ink-faint)' }}>
                      {n}
                    </div>
                    <div>
                      <div className="text-sm font-medium" style={{ color: 'var(--ink)' }}>
                        {step.title}
                      </div>
                      <div className="mt-0.5 text-xs" style={{ color: 'var(--ink-dim)' }}>
                        {step.detail}
                      </div>
                    </div>
                    <div className="text-xs sm:text-right" style={{ color: 'var(--ink-dim)' }}>
                      <span style={{ color: 'var(--ink-faint)' }}>Holds: </span>
                      {step.holds}
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>
        ))}
      </div>
      <figcaption className="mt-2 text-sm" style={{ color: 'var(--ink-faint)' }}>
        What init starts on an ordinary boot, beside the universal capabilities every program holds. A test boot
        runs the userland tests in place of the Wheel, the login prompt and the screen.
      </figcaption>
    </figure>
  );
}
