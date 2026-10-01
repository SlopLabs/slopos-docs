type Side = 'waiter' | 'waker';

type Step = { side: Side; text: string; detail?: string };

const ORDERS = {
  lost: {
    label: 'A lost wakeup: the waiter checks, then sleeps, with a gap in between',
    steps: [
      { side: 'waiter', text: 'Is there data in the pipe?', detail: 'No.' },
      { side: 'waker', text: 'Write data into the pipe' },
      { side: 'waker', text: 'Wake everyone waiting on the pipe', detail: 'Nobody is waiting yet.' },
      { side: 'waiter', text: 'Join the wait queue and sleep' },
    ],
    outcome: 'The waiter sleeps with data waiting for it, and nothing will wake it.',
    bad: true,
  },
  safe: {
    label: 'The order SlopOS uses: announce the sleep first, then check again',
    steps: [
      { side: 'waiter', text: 'Is there data in the pipe?', detail: 'No.' },
      { side: 'waiter', text: 'Join the wait queue, mark myself asleep' },
      { side: 'waiter', text: 'Check again', detail: 'Still no data.' },
      { side: 'waker', text: 'Write data into the pipe' },
      { side: 'waker', text: 'Wake everyone waiting on the pipe', detail: 'Finds the waiter, marks it ready.' },
      { side: 'waiter', text: 'Go to sleep', detail: 'Already marked ready: carry on instead.' },
    ],
    outcome:
      'Wherever the write lands, one side sees the other: either the second check finds the data, or the wake finds the waiter.',
    bad: false,
  },
} satisfies Record<string, { label: string; steps: Step[]; outcome: string; bad: boolean }>;

const SIDES: { key: Side; title: string }[] = [
  { key: 'waiter', title: 'Reader (waits for data)' },
  { key: 'waker', title: 'Writer (provides it)' },
];

export function LostWakeup({ order }: { order: keyof typeof ORDERS }) {
  const { label, steps, outcome, bad } = ORDERS[order];
  const summary = `${label}. ${steps
    .map((s, i) => `${i + 1}. ${s.side === 'waiter' ? 'Reader' : 'Writer'}: ${s.text}${s.detail ? ` (${s.detail})` : ''}`)
    .join(' ')} ${outcome}`;

  return (
    <figure className="not-prose my-8" role="img" aria-label={summary}>
      <div aria-hidden="true">
        <div className="grid grid-cols-[1.5rem_1fr_1fr] gap-x-3 gap-y-2">
          <div />
          {SIDES.map((side) => (
            <div
              key={side.key}
              className="font-mono text-xs uppercase"
              style={{ color: 'var(--ink-faint)', letterSpacing: '0.06em' }}
            >
              {side.title}
            </div>
          ))}
          {steps.map((step, i) => (
            <Row key={i} index={i} step={step} />
          ))}
        </div>
        <p
          className="mt-3 border-t-2 pt-2 text-xs"
          style={{
            borderColor: bad ? 'var(--line-strong)' : 'var(--accent)',
            color: 'var(--ink-dim)',
          }}
        >
          {outcome}
        </p>
      </div>
    </figure>
  );
}

function Row({ index, step }: { index: number; step: Step }) {
  const card = (
    <div
      className="rounded-md border p-2"
      style={{ borderColor: 'var(--line)', background: 'var(--surface)' }}
    >
      <div className="text-sm" style={{ color: 'var(--ink)' }}>
        {step.text}
      </div>
      {step.detail ? (
        <div className="mt-0.5 text-xs" style={{ color: 'var(--ink-dim)' }}>
          {step.detail}
        </div>
      ) : null}
    </div>
  );
  return (
    <>
      <div className="pt-2 font-mono text-xs" style={{ color: 'var(--ink-faint)' }}>
        {index + 1}
      </div>
      {step.side === 'waiter' ? card : <div />}
      {step.side === 'waker' ? card : <div />}
    </>
  );
}
