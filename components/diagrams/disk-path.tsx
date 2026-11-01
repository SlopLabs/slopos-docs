const LAYERS = [
  { title: 'Programs and the filesystem', detail: 'read and write files, or /dev/nvme0n1p2 directly' },
  { title: 'Block layer', detail: 'names, partitions, claims: who may write which part of a disk' },
  { title: 'Request engine', detail: 'a fixed set of request slots per queue, timeouts, ordering' },
  { title: 'Transport', detail: 'NVMe, virtio-blk or USB Bulk-Only: turns a request into the device\u2019s own format' },
  { title: 'Disk', detail: 'reads or writes the blocks and reports back' },
] as const;

export function DiskPath() {
  return (
    <figure className="not-prose my-8">
      <ol
        className="grid gap-2"
        role="img"
        aria-label="A disk request passes from a program through the block layer, the request engine and a transport to the disk, and the answer comes back the same way."
      >
        {LAYERS.map((layer, i) => (
          <li
            key={layer.title}
            className="flex items-baseline gap-3 rounded-md border p-3"
            style={{
              borderColor: i === 1 ? 'var(--accent)' : 'var(--line)',
              background: i === 1 ? 'var(--accent-wash)' : 'var(--surface)',
            }}
          >
            <span className="font-mono text-xs" style={{ color: 'var(--ink-faint)' }}>
              {i + 1}
            </span>
            <span>
              <span className="text-sm font-medium" style={{ color: 'var(--ink)' }}>
                {layer.title}
              </span>
              <span className="ml-2 text-xs" style={{ color: 'var(--ink-dim)' }}>
                {layer.detail}
              </span>
            </span>
          </li>
        ))}
      </ol>
      <figcaption className="mt-3 text-xs" style={{ color: 'var(--ink-dim)' }}>
        Every request goes down this stack and its answer comes back up it. Nothing above the
        block layer talks to a driver directly.
      </figcaption>
    </figure>
  );
}
