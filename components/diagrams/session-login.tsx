type Step = {
  where: string;
  title: string;
  detail: string;
  person?: boolean;
};

const STEPS: Step[] = [
  {
    where: 'Login screen',
    title: 'alice types her password',
    detail: 'the compositor, run with --greeter as the greeter user, lists the people and takes the password',
    person: true,
  },
  {
    where: 'privd',
    title: 'org.slopos.login runs',
    detail: 'it allows the greeter unasked, and starts /bin/session login desktop alice with the password on its input',
  },
  {
    where: 'Mechanism',
    title: 'The password is checked',
    detail: 'authcheck decides; a wrong one is answered only after a wait that doubles each time, a right one has the mechanism ask init to log alice in',
  },
  {
    where: 'init',
    title: 'Her desktop starts',
    detail: 'a new session with a login tag of its own: her compositor runs as alice, and init waits until it is ready',
  },
  {
    where: 'Kernel',
    title: 'The seats move',
    detail: 'seat_switch gives her compositor the screen and the input; events queued for the login screen are dropped',
  },
  {
    where: 'init',
    title: 'Front and behind',
    detail: 'her compositor is told it is in front, the login screen ends, and the table reaches privd and /run/sessions',
  },
];

const SUMMARY =
  'Logging in at the login screen, in order. ' +
  STEPS.map((s, i) => `${i + 1}, ${s.where}: ${s.title}, ${s.detail}.`).join(' ');

export function SessionLogin() {
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
        A second person logs in while the first person's desktop waits behind, locked. Had alice been logged in
        already, step 4 would find her desktop running and step 6 would tell it to unlock as well.
      </figcaption>
    </figure>
  );
}
