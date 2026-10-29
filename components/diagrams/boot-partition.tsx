import type { CSSProperties } from 'react';

const ENTRIES = [
  { entry: 'slopos-a', kernel: '/boot/a/kernel.elf' },
  { entry: 'slopos-b', kernel: '/boot/b/kernel.elf' },
] as const;

const BASES = [
  { path: '/boot/base/current.img', module: 'initramfs', what: 'the base every slot boots' },
  { path: '/boot/base/previous.img', module: 'initramfs-previous', what: 'the base that ran before it' },
] as const;

const mono: CSSProperties = { fontFamily: 'var(--font-mono)' };

export function BootPartition() {
  return (
    <figure
      className="not-prose my-8"
      role="img"
      aria-label="The boot partition: each boot entry, slopos-a and slopos-b, loads its own slot's kernel, /boot/a/kernel.elf or /boot/b/kernel.elf, and both bases, /boot/base/current.img as the module initramfs and /boot/base/previous.img as the module initramfs-previous. The kernel boots current when it serves current's interface, and previous otherwise."
    >
      <div className="grid gap-2 md:grid-cols-2">
        {ENTRIES.map((e) => (
          <div
            key={e.entry}
            className="rounded-md border p-3"
            style={{ borderColor: 'var(--line)', background: 'var(--surface)' }}
          >
            <div className="text-xs" style={{ color: 'var(--ink-faint)' }}>
              boot entry
            </div>
            <div className="mt-1 text-sm font-medium" style={{ ...mono, color: 'var(--ink)' }}>
              {e.entry}
            </div>
            <div className="mt-2 text-xs" style={{ color: 'var(--ink-dim)' }}>
              its own kernel
            </div>
            <div className="text-xs" style={{ ...mono, color: 'var(--ink)' }}>
              {e.kernel}
            </div>
          </div>
        ))}
      </div>
      <div className="my-2 flex items-center gap-3" aria-hidden="true">
        <div className="h-0 flex-1 border-t-2 border-dashed" style={{ borderColor: 'var(--accent-line)' }} />
        <span className="text-xs" style={{ ...mono, color: 'var(--accent)' }}>
          both entries load both bases
        </span>
        <div className="h-0 flex-1 border-t-2 border-dashed" style={{ borderColor: 'var(--accent-line)' }} />
      </div>
      <div
        className="grid gap-2 rounded-md border p-3 md:grid-cols-2"
        style={{ borderColor: 'var(--accent)', background: 'var(--accent-wash)' }}
      >
        {BASES.map((b) => (
          <div key={b.path}>
            <div className="text-xs" style={{ ...mono, color: 'var(--ink)' }}>
              {b.path}
            </div>
            <div className="mt-1 text-xs" style={{ color: 'var(--ink-dim)' }}>
              {b.what}
            </div>
            <div className="mt-1 text-xs" style={{ ...mono, color: 'var(--ink-faint)' }}>
              module: {b.module}
            </div>
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-xs" style={{ color: 'var(--ink-dim)' }}>
        The SlopOS boot partition. Whichever kernel boots reads each base&rsquo;s interface number
        and boots current when it serves it, previous otherwise.
      </figcaption>
    </figure>
  );
}
