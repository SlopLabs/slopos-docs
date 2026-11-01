type Source = 'disk' | 'base' | 'ext' | 'ram' | 'dev';

const SOURCES: Record<Source, { label: string; border: string; wash: string; ink: string }> = {
  disk: { label: 'Root disk, writable, survives reboots', border: 'var(--accent)', wash: 'var(--accent-wash)', ink: 'var(--accent)' },
  base: { label: 'The base, from the boot partition, read-only', border: 'var(--line-strong)', wash: 'var(--surface-3)', ink: 'var(--ink-dim)' },
  ext: { label: 'An extension\u2019s image, read-only', border: 'var(--accent-line)', wash: 'var(--surface)', ink: 'var(--ink-dim)' },
  ram: { label: 'In memory, gone at reboot', border: 'var(--line)', wash: 'var(--surface-2)', ink: 'var(--ink-dim)' },
  dev: { label: 'Devices', border: 'var(--line)', wash: 'var(--surface)', ink: 'var(--ink-dim)' },
};

const ROWS: { path: string; what: string; source: Source }[] = [
  { path: '/', what: 'the root', source: 'disk' },
  { path: '/etc  /var  /root  /home  /src  /usr/local  /opt/bin', what: 'what this machine wrote', source: 'disk' },
  { path: '/bin  /sbin  /lib  /usr/bin  /usr/share  /etc/ssl', what: 'the system\u2019s programs and libraries', source: 'base' },
  { path: '/opt/<name>', what: 'an installed extension', source: 'ext' },
  { path: '/tmp  /run  /dev/shm', what: 'scratch space and runtime state', source: 'ram' },
  { path: '/dev', what: 'disks, terminals, /dev/disk/by-*', source: 'dev' },
];

export function FsLayout() {
  return (
    <figure className="not-prose my-8">
      <ul
        className="grid gap-2"
        role="img"
        aria-label="Where each part of a running system comes from: the root disk holds / and what the machine wrote, the base supplies /bin, /sbin, /lib, /usr/bin, /usr/share and /etc/ssl read-only from the boot partition, each installed extension appears read-only under /opt, /tmp, /run and /dev/shm live in memory, and /dev lists devices."
      >
        {ROWS.map((row) => {
          const s = SOURCES[row.source];
          return (
            <li
              key={row.path}
              className="rounded-md border p-3"
              style={{ borderColor: s.border, background: s.wash }}
            >
              <div className="font-mono text-xs" style={{ color: 'var(--ink)' }}>
                {row.path}
              </div>
              <div className="mt-1 text-xs" style={{ color: s.ink }}>
                {row.what} · {s.label}
              </div>
            </li>
          );
        })}
      </ul>
      <figcaption className="mt-3 text-xs" style={{ color: 'var(--ink-dim)' }}>
        A running system with a disk root. On a RAM root, / and what it holds live in memory too.
      </figcaption>
    </figure>
  );
}
