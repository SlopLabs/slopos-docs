const LAYERS = [
  {
    name: 'Programs',
    detail: 'The shell, the desktop, your programs. They reach the kernel through system calls.',
    rule: 'User mode',
    trusted: false,
  },
  {
    name: 'Kernel services',
    detail: 'Scheduler, memory manager, filesystems, network stack, drivers: every other crate the kernel links.',
    rule: 'Safe Rust only',
    trusted: false,
  },
  {
    name: 'Trusted core (OSTD)',
    detail: 'Every line of the kernel’s unsafe code, wrapped in safe functions and types.',
    rule: 'May use unsafe',
    trusted: true,
  },
  {
    name: 'Hardware',
    detail: 'CPU registers, page tables, interrupts, device memory.',
    rule: '',
    trusted: false,
  },
] as const;

const SUMMARY =
  'The layers of SlopOS, top to bottom: programs in user mode; kernel services, written in safe Rust only; the trusted core, the one crate that may use unsafe code; and the hardware. The kernel services reach the hardware only through the trusted core.';

export function FramekernelLayers() {
  return (
    <figure className="not-prose my-8">
      <div role="img" aria-label={SUMMARY} className="grid gap-2">
        {LAYERS.map((layer) => (
          <div
            key={layer.name}
            className="grid items-baseline gap-x-4 gap-y-1 rounded-md border px-4 py-3 sm:grid-cols-[11rem_1fr_auto]"
            style={{
              borderColor: layer.trusted ? 'var(--accent)' : 'var(--line)',
              background: layer.trusted ? 'var(--accent-wash)' : 'var(--surface)',
            }}
          >
            <div
              className="text-sm font-medium"
              style={{ color: layer.trusted ? 'var(--accent)' : 'var(--ink)' }}
            >
              {layer.name}
            </div>
            <div className="text-xs" style={{ color: 'var(--ink-dim)' }}>
              {layer.detail}
            </div>
            <div
              className="font-mono text-xs"
              style={{ color: layer.trusted ? 'var(--accent)' : 'var(--ink-faint)' }}
            >
              {layer.rule}
            </div>
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-xs" style={{ color: 'var(--ink-dim)' }}>
        Kernel services reach the hardware only through the trusted core, so a memory-safety bug in
        the kernel has to start in the highlighted layer, not in the code above it.
      </figcaption>
    </figure>
  );
}
