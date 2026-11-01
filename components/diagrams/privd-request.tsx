type Step = {
  where: string;
  title: string;
  detail: string;
  person?: boolean;
};

const STEPS: Step[] = [
  {
    where: 'Requester',
    title: 'bootctl asks',
    detail:
      'it holds no RawBlock or Power, so it connects to /run/privd and sends the action, its arguments, descriptors for its input and output, and its directory',
  },
  {
    where: 'Kernel',
    title: 'Who connected',
    detail: 'the socket recorded uid 1000, a process handle and the program /bin/bootctl when bootctl connected',
  },
  {
    where: 'privd',
    title: 'The policy decides',
    detail: 'the arguments fit install *; the person is an administrator, and the line says admin confirm',
  },
  {
    where: 'Compositor',
    title: 'The dialog asks',
    detail: 'on the desktop in front, which belongs to the person who asked: one click answers',
    person: true,
  },
  {
    where: 'privd',
    title: 'Checked again',
    detail: 'the requester still runs bootctl, the people still allow it, and no other boot-slots job runs',
  },
  {
    where: 'Mechanism',
    title: 'A fresh bootctl runs',
    detail:
      'as uid 0 holding RawBlock and Power, in the same directory; its output reaches the terminal and its exit status comes back',
  },
];

const SUMMARY =
  'A privileged request in order. ' +
  STEPS.map((s, i) => `${i + 1}, ${s.where}: ${s.title}, ${s.detail}.`).join(' ');

export function PrivdRequest() {
  return (
    <figure className="not-prose my-8">
      <ol className="grid gap-2 md:grid-cols-3" role="img" aria-label={SUMMARY}>
        {STEPS.map((step, i) => (
          <li
            key={step.title}
            className="rounded-md border p-3"
            style={{
              borderColor: step.person ? 'var(--accent)' : 'var(--line)',
              background: step.person ? 'var(--accent-wash)' : 'var(--surface)',
            }}
          >
            <div
              className="font-mono text-xs"
              style={{ color: step.person ? 'var(--accent)' : 'var(--ink-faint)' }}
            >
              {i + 1} · {step.where}
            </div>
            <div className="mt-1 text-sm font-medium" style={{ color: 'var(--ink)' }}>
              {step.title}
            </div>
            <div className="mt-1 text-xs" style={{ color: 'var(--ink-dim)' }}>
              {step.detail}
            </div>
          </li>
        ))}
      </ol>
      <figcaption className="mt-3 text-xs" style={{ color: 'var(--ink-dim)' }}>
        <code>bootctl install b kernel.elf</code> typed in a terminal on the first person’s desktop. Only step 4
        needs the person; an action that runs unasked goes straight from step 3 to step 6.
      </figcaption>
    </figure>
  );
}
