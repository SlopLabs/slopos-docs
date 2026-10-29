const STEPS = [
  {
    where: 'SlopOS computer',
    title: 'remoted dials out',
    detail: 'opens a TLS connection to the broker, checks its certificate against the CA in the base, sends the token, then waits',
  },
  {
    where: 'Your Linux machine',
    title: 'You run a command',
    detail: 'just remote run -- uname -a reaches the broker through a private local socket',
  },
  {
    where: 'Your Linux machine',
    title: 'The broker hands it over',
    detail: 'your request goes down the waiting connection; nothing connects to the SlopOS computer',
  },
  {
    where: 'SlopOS computer',
    title: 'remoted dials again',
    detail: 'a fresh connection waits for the next request, so a second command runs beside the first',
  },
  {
    where: 'SlopOS computer',
    title: 'The program runs',
    detail: 'as a person holding nothing; its output streams back as it is written',
  },
  {
    where: 'Your Linux machine',
    title: 'The exit status arrives',
    detail: "just remote exits with the program's status, and that connection closes",
  },
] as const;

export function RemoteRequest() {
  return (
    <figure className="not-prose my-8">
      <ol
        className="grid gap-2 md:grid-cols-3"
        role="img"
        aria-label="One command over the remote control: remoted on the SlopOS computer dials out to the broker and waits; you run just remote on your Linux machine; the broker sends the request down the waiting connection; remoted dials a fresh connection for the next request; the program runs as a person holding nothing and its output streams back; the exit status arrives and the connection closes."
      >
        {STEPS.map((step, i) => {
          const machine = step.where === 'SlopOS computer';
          return (
            <li
              key={step.title}
              className="rounded-md border p-3"
              style={{
                borderColor: machine ? 'var(--accent)' : 'var(--line)',
                background: machine ? 'var(--accent-wash)' : 'var(--surface)',
              }}
            >
              <div
                className="font-mono text-xs"
                style={{ color: machine ? 'var(--accent)' : 'var(--ink-faint)' }}
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
          );
        })}
      </ol>
      <figcaption className="mt-3 text-xs" style={{ color: 'var(--ink-dim)' }}>
        Every connection starts on the SlopOS computer. Your Linux machine opens one port for the
        broker; the SlopOS computer opens none.
      </figcaption>
    </figure>
  );
}
