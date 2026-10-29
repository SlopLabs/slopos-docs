import type { CSSProperties } from 'react';

type Proc = {
  name: string;
  who: string;
  caps: string[];
  note?: string;
  step?: { n: number; label: string };
  children?: Proc[];
};

const TREE: Proc = {
  name: '/sbin/init',
  who: 'uid 0',
  caps: ['every capability'],
  note: 'the kernel starts it',
  children: [
    {
      name: '/sbin/privd',
      who: 'uid 0',
      caps: ['what an action may name', 'SetId'],
      note: 'listens on /run/privd',
      children: [
        {
          name: '/bin/halt',
          who: 'uid 0',
          caps: ['Power'],
          note: 'a fresh child of privd, holding only what the action names',
          step: { n: 2, label: 'runs' },
        },
      ],
    },
    {
      name: '/bin/compositor',
      who: 'uid 1000',
      caps: ['DisplaySeat', 'InputSeat'],
    },
    {
      name: '/bin/terminal',
      who: 'uid 1000',
      caps: [],
      children: [
        {
          name: '/bin/shell',
          who: 'uid 1000',
          caps: [],
          children: [
            {
              name: '/bin/halt',
              who: 'uid 1000',
              caps: [],
              note: 'cannot power off, so asks privd for org.slopos.power.poweroff',
              step: { n: 1, label: 'asks' },
            },
          ],
        },
      ],
    },
  ],
};

const SUMMARY =
  'A process tree. Init, uid 0, holds every capability. It starts privd as uid 0 holding what an action may name plus SetId, the compositor as uid 1000 holding the two seat capabilities, and the terminal as uid 1000 holding nothing gated. The terminal starts a shell, which starts /bin/halt, all as uid 1000 holding nothing gated. That halt asks privd, which starts a second /bin/halt as its own child, as uid 0 holding only Power, and that one powers the machine off.';

const mono: CSSProperties = { fontFamily: 'var(--font-mono)' };

function Chip({ children, held }: { children: string; held: boolean }) {
  return (
    <span
      className="rounded border px-2 py-0.5 text-xs"
      style={{
        ...mono,
        borderColor: held ? 'var(--line-strong)' : 'var(--line)',
        color: held ? 'var(--ink)' : 'var(--ink-faint)',
        background: 'var(--surface)',
      }}
    >
      {children}
    </span>
  );
}

function Node({ proc }: { proc: Proc }) {
  const marked = proc.step !== undefined;
  return (
    <li className="mt-2">
      <div
        className="rounded-md border p-2.5"
        style={{
          borderColor: marked ? 'var(--accent)' : 'var(--line)',
          background: marked ? 'var(--accent-wash)' : 'var(--surface)',
        }}
      >
        <div className="flex flex-wrap items-center gap-2">
          {proc.step && (
            <span
              className="rounded px-1.5 py-0.5 text-xs font-medium"
              style={{ background: 'var(--accent)', color: 'var(--on-accent)' }}
            >
              {proc.step.n} {proc.step.label}
            </span>
          )}
          <span className="text-sm" style={{ ...mono, color: 'var(--ink)' }}>
            {proc.name}
          </span>
          <span className="text-xs" style={{ color: 'var(--ink-faint)' }}>
            {proc.who}
          </span>
          {proc.caps.length === 0 ? (
            <Chip held={false}>nothing gated</Chip>
          ) : (
            proc.caps.map((cap) => (
              <Chip key={cap} held>
                {cap}
              </Chip>
            ))
          )}
        </div>
        {proc.note && (
          <div className="mt-1 text-xs" style={{ color: 'var(--ink-dim)' }}>
            {proc.note}
          </div>
        )}
      </div>
      {proc.children && (
        <ul className="ml-3 border-l pl-3 sm:ml-5 sm:pl-4" style={{ borderColor: 'var(--line-strong)' }}>
          {proc.children.map((child) => (
            <Node key={child.name + child.who} proc={child} />
          ))}
        </ul>
      )}
    </li>
  );
}

export function CapabilityTree() {
  return (
    <figure className="not-prose my-8" role="img" aria-label={SUMMARY}>
      <ul>
        <Node proc={TREE} />
      </ul>
      <figcaption className="mt-3 text-xs" style={{ color: 'var(--ink-dim)' }}>
        Every process also holds the universal capabilities (
        <span style={mono}>ConsoleIo</span>, <span style={mono}>ClipboardGlobal</span>,{' '}
        <span style={mono}>Fate</span>) its spawner held. The terminal, the shell and the first{' '}
        <span style={mono}>halt</span> run as the person; the second <span style={mono}>halt</span>{' '}
        is privd&rsquo;s child, not the shell&rsquo;s.
      </figcaption>
    </figure>
  );
}
