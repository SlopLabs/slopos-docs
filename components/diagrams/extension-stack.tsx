const LAYERS = [
  {
    title: '/opt/hello',
    detail: 'what programs see: read-only, and no mount or unmount can move it',
    mono: true,
  },
  {
    title: 'The image’s ext4 volume',
    detail: 'served by an ext4 instance of its own, read-only, with no journal',
    mono: false,
  },
  {
    title: 'Verifying device',
    detail: 'checks each 4 KiB block against the image’s hash tree as it is read; a block that fails is EIO',
    mono: false,
  },
  {
    title: '/var/lib/slopos/extensions/hello/<root>.ext',
    detail: 'the image file in the store, sealed, read where it lies',
    mono: true,
  },
  {
    title: 'The root filesystem',
    detail: 'ext4 on the disk, like any other file',
    mono: false,
  },
] as const;

const DEVICE = 2;

export function ExtensionStack() {
  return (
    <figure className="not-prose my-8">
      <ol
        className="grid gap-2"
        role="img"
        aria-label="An extension's files are read through five layers: the mount at /opt/hello, the image's own read-only ext4 volume, a device that checks every block against the image's hash tree, the image file in the extension store, and the root filesystem it lies on."
      >
        {LAYERS.map((layer, i) => {
          const device = i === DEVICE;
          return (
            <li
              key={layer.title}
              className="flex items-baseline gap-3 rounded-md border p-3"
              style={{
                borderColor: device ? 'var(--accent)' : 'var(--line)',
                background: device ? 'var(--accent-wash)' : 'var(--surface)',
              }}
            >
              <span className="font-mono text-xs" style={{ color: 'var(--ink-faint)' }}>
                {i + 1}
              </span>
              <span>
                <span
                  className="text-sm font-medium"
                  style={{
                    color: 'var(--ink)',
                    fontFamily: layer.mono ? 'var(--font-mono)' : undefined,
                  }}
                >
                  {layer.title}
                </span>
                <span className="ml-2 text-xs" style={{ color: 'var(--ink-dim)' }}>
                  {layer.detail}
                </span>
              </span>
            </li>
          );
        })}
      </ol>
      <figcaption className="mt-3 text-xs" style={{ color: 'var(--ink-dim)' }}>
        The kernel makes no copy of the image. A read of a file under /opt/hello goes down this
        stack, and no byte reaches a program unless the root the store recorded vouches for it.
      </figcaption>
    </figure>
  );
}
