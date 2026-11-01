type Row = {
  path: string;
  depth: number;
  device: string;
  driver: string;
  result: string;
  hub?: boolean;
};

const ROWS: readonly Row[] = [
  { path: '1-4', depth: 0, device: 'hub', driver: 'the USB core', result: 'more ports: 1-4.1, 1-4.2, ...', hub: true },
  { path: '1-4.1', depth: 1, device: 'USB stick', driver: 'usb-storage', result: 'disk sda' },
  { path: '1-4.2', depth: 1, device: 'tablet', driver: 'usb-hid', result: 'the one cursor' },
  { path: '1-4.3', depth: 1, device: 'mouse', driver: 'usb-hid', result: 'the one cursor' },
  { path: '1-4.4', depth: 1, device: 'Ethernet adapter', driver: 'usb-net', result: 'interface eth1' },
  { path: '1-6', depth: 0, device: 'keyboard', driver: 'usb-hid', result: 'the one keyboard state' },
];

export function UsbTree() {
  return (
    <figure
      className="not-prose my-8"
      role="img"
      aria-label="A USB controller, numbered 1, with a hub on root port 4 that has a stick, a tablet, a mouse and an Ethernet adapter on its ports 1 to 4, and a keyboard on root port 6. Each device is named by its port path, such as 1-4.2, bound to a driver, and becomes a disk, the cursor, a network interface or the keyboard state."
    >
      <div
        className="rounded-md border p-3"
        style={{ borderColor: 'var(--accent)', background: 'var(--accent-wash)' }}
      >
        <div className="text-sm font-medium" style={{ color: 'var(--ink)' }}>
          xHCI controller 1
        </div>
        <div className="mt-1 text-xs" style={{ color: 'var(--ink-dim)' }}>
          a PCI device; its root ports are numbered 1, 2, 3 and up
        </div>
      </div>
      <div
        className="mt-3 hidden grid-cols-[5rem_1fr_7rem_1fr] gap-3 px-3 text-xs md:grid"
        style={{ color: 'var(--ink-faint)' }}
      >
        <span>Name</span>
        <span>Device</span>
        <span>Driver</span>
        <span>What the system gets</span>
      </div>
      <ol className="mt-2 grid gap-2">
        {ROWS.map((row) => (
          <li
            key={row.path}
            className="grid grid-cols-[5rem_1fr] gap-x-3 gap-y-1 rounded-md border p-3 md:grid-cols-[5rem_1fr_7rem_1fr]"
            style={{
              marginLeft: `${row.depth * 1.5}rem`,
              borderColor: row.hub ? 'var(--line-strong)' : 'var(--line)',
              background: 'var(--surface)',
            }}
          >
            <span className="font-mono text-xs" style={{ color: 'var(--accent)' }}>
              {row.path}
            </span>
            <span className="text-sm" style={{ color: 'var(--ink)' }}>
              {row.device}
            </span>
            <span
              className="col-start-2 font-mono text-xs md:col-start-auto"
              style={{ color: 'var(--ink-dim)' }}
            >
              {row.driver}
            </span>
            <span
              className="col-start-2 text-xs md:col-start-auto"
              style={{ color: 'var(--ink-dim)' }}
            >
              {row.result}
            </span>
          </li>
        ))}
      </ol>
      <figcaption className="mt-3 text-xs" style={{ color: 'var(--ink-dim)' }}>
        Some of the devices on one controller of the machine just test-usb boots, as a
        shipped kernel binds them. A device is named by the controller and the ports on the way
        to it: 1-4.2 is port 2 of the hub on root port 4 of controller 1. Hubs
        belong to the USB core and are never offered to a driver.
      </figcaption>
    </figure>
  );
}
