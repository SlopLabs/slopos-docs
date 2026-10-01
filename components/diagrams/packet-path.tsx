const STEPS = [
  { where: 'Network card', title: 'Packet arrives', detail: 'the card stores it in memory and raises an interrupt' },
  { where: 'Kernel', title: 'Receive thread wakes', detail: 'collects a batch of packets from the card' },
  { where: 'Kernel', title: 'Filters and IPv4', detail: 'checks the header, puts fragments back together' },
  { where: 'Kernel', title: 'TCP, UDP or ICMP', detail: 'finds the socket the packet belongs to' },
  { where: 'Kernel', title: 'Socket queue', detail: 'data waits here; programs waiting on this socket wake' },
  { where: 'Your program', title: 'recv returns', detail: 'the bytes are copied into your buffer' },
] as const;

export function PacketPath() {
  return (
    <figure className="not-prose my-8">
      <ol
        className="grid gap-2 md:grid-cols-3"
        role="img"
        aria-label="A packet's path from the network card to a program: the card raises an interrupt, a kernel receive thread collects a batch, IPv4 checks it, TCP, UDP or ICMP finds the socket, the data waits in the socket's queue, and the program's recv copies it out."
      >
        {STEPS.map((step, i) => {
          const user = step.where === 'Your program';
          return (
            <li
              key={step.title}
              className="rounded-md border p-3"
              style={{
                borderColor: user ? 'var(--accent)' : 'var(--line)',
                background: user ? 'var(--accent-wash)' : 'var(--surface)',
              }}
            >
              <div
                className="font-mono text-xs"
                style={{ color: user ? 'var(--accent)' : 'var(--ink-faint)' }}
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
        Sending runs the same path backwards: your bytes go into the socket, TCP or UDP wraps
        them, the route table picks the next hop, and the driver hands the frame to the card.
      </figcaption>
    </figure>
  );
}
