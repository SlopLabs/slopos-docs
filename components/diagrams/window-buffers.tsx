const STEPS = [
  { who: 'App', title: 'Create two buffers', detail: 'blocks of shared memory, each the size of the window' },
  { who: 'App', title: 'Draw and send', detail: 'the first time, the buffer itself travels over the socket' },
  { who: 'Compositor', title: 'Map and remember', detail: 'it can now read the same memory the app wrote' },
  { who: 'Compositor', title: 'Paint changed areas', detail: 'copies only the damaged rectangles to the screen' },
  { who: 'Compositor', title: 'Release', detail: 'tells the app it has finished reading that buffer' },
  { who: 'App', title: 'Draw the next frame', detail: 'into the other buffer, sending only its number' },
] as const;

export function WindowBuffers() {
  return (
    <figure className="not-prose my-8">
      <ol
        className="grid gap-2 md:grid-cols-3"
        role="img"
        aria-label="How an app's pixels reach the screen: the app creates two shared-memory buffers, draws into one and sends it over the socket, the compositor maps it, paints the damaged areas, then releases the buffer, while the app draws the next frame into the other buffer."
      >
        {STEPS.map((step, i) => {
          const app = step.who === 'App';
          return (
            <li
              key={step.title}
              className="rounded-md border p-3"
              style={{
                borderColor: app ? 'var(--accent-line)' : 'var(--line)',
                background: app ? 'var(--accent-wash)' : 'var(--surface)',
              }}
            >
              <div
                className="font-mono text-xs"
                style={{ color: app ? 'var(--accent)' : 'var(--ink-faint)' }}
              >
                {i + 1} · {step.who}
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
        The pixels are never copied between the two programs. Only small messages and, once per
        buffer, the buffer itself cross the socket.
      </figcaption>
    </figure>
  );
}
