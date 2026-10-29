const STEPS = [
  { title: 'Install', detail: 'a new kernel goes into the spare slot, b', when: 'slot a still boots by default' },
  { title: 'Arm one boot', detail: 'a firmware variable asks the boot loader for slot b, once', when: 'the default is unchanged' },
  { title: 'Reboot', detail: 'the boot loader boots slot b and clears the request', when: 'any reset from here lands on slot a' },
  { title: 'Commit', detail: 'slot b, the one that booted, becomes the default', when: 'from now on slot b boots every time' },
] as const;

const COMMIT_STEP = 3;

export function BootSlotTimeline() {
  return (
    <figure
      className="not-prose my-8"
      role="img"
      aria-label="Trying a new kernel: install it into the spare slot, arm one boot of it, reboot into it, then commit it as the default. Until the commit, any reset boots the old default kernel."
    >
      <ol className="grid gap-2 md:grid-cols-4">
        {STEPS.map((step, i) => {
          const commit = i === COMMIT_STEP;
          return (
            <li
              key={step.title}
              className="rounded-md border p-3"
              style={{
                borderColor: commit ? 'var(--accent)' : 'var(--line)',
                background: commit ? 'var(--accent-wash)' : 'var(--surface)',
              }}
            >
              <div
                className="font-mono text-xs"
                style={{ color: commit ? 'var(--accent)' : 'var(--ink-faint)' }}
              >
                {i + 1}
              </div>
              <div className="mt-1 text-sm font-medium" style={{ color: 'var(--ink)' }}>
                {step.title}
              </div>
              <div className="mt-1 text-xs" style={{ color: 'var(--ink-dim)' }}>
                {step.detail}
              </div>
              <div className="mt-2 text-xs" style={{ color: 'var(--ink-faint)' }}>
                {step.when}
              </div>
            </li>
          );
        })}
      </ol>
      <div className="mt-3 grid gap-2 md:grid-cols-4">
        <p
          className="border-t-2 pt-2 text-xs md:col-span-3"
          style={{ borderColor: 'var(--line-strong)', color: 'var(--ink-dim)' }}
        >
          A crash or reset before the commit: the machine boots the old default kernel, slot a.
        </p>
        <p
          className="border-t-2 pt-2 text-xs"
          style={{ borderColor: 'var(--accent)', color: 'var(--ink-dim)' }}
        >
          After it: the new kernel is the default.
        </p>
      </div>
    </figure>
  );
}
