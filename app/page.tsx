import type { Metadata } from 'next';
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Cpu,
  Gauge,
  LayoutPanelLeft,
  Rocket,
  Search,
  Settings2,
  ShieldCheck,
  SquareTerminal,
} from 'lucide-react';
import { docsRoute, sloposGitHubUrl } from '@/lib/shared';
import './landing.css';

export const metadata: Metadata = {
  title: 'SlopOS — an operating system written by AI',
  description:
    'SlopOS is a from-scratch x86_64 OS — a real Rust kernel, a documented ABI, and a testable userland — designed and written end-to-end by AI agents.',
};

function GitHubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      width={size}
      height={size}
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <main className="site grain">
      {/* ============ NAV ============ */}
      <nav className="nav">
        <a className="nav__brand" href="/">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo/logo.png" alt="SlopOS" />
        </a>
        <div className="nav__links">
          <a className="nav__link" href={`${docsRoute}/architecture/overview`}>
            Architecture
          </a>
          <a className="nav__link" href={docsRoute}>
            Docs
          </a>
          <a className="nav__link" href={`${docsRoute}/getting-started/quickstart`}>
            Quickstart
          </a>
          <a className="nav__link" href={`${docsRoute}/status/current-capabilities`}>
            Status
          </a>
        </div>
        <div className="nav__spacer" />
        <a className="nav__search" href={docsRoute}>
          <Search width={13} height={13} />
          <span>Search</span>
          <span className="nav__kbd">⌘K</span>
        </a>
        <a
          className="btn btn--sm btn--secondary"
          href={sloposGitHubUrl}
          target="_blank"
          rel="noreferrer"
        >
          <GitHubIcon size={14} /> GitHub
        </a>
        <a className="btn btn--sm btn--violet" href="#quickstart">
          Get started
        </a>
      </nav>

      {/* ============ HERO ============ */}
      <header className="hero">
        <div className="hero__aura" />
        <div className="hero__inner wrap">
          <div className="hero__status">
            <span className="pulse" />
            <b>Pre-alpha</b>
            <span className="div" />
            boots in QEMU
            <span className="div" />
            100% AI-authored
          </div>
          <h1>
            An operating system written&nbsp;by <em>machines</em>.
          </h1>
          <p className="hero__sub">
            SlopOS is a from-scratch x86_64 OS — a real Rust kernel, a documented
            ABI, and a testable userland — designed and written end-to-end by AI
            agents.
          </p>
          <div className="hero__cta">
            <a className="btn btn--primary" href="#quickstart">
              Build &amp; boot in QEMU
            </a>
            <a className="btn btn--ghost" href="#architecture">
              Explore the architecture <ArrowRight width={15} height={15} />
            </a>
          </div>
          <p className="hero__note">
            Five commands to a booted OS &middot; <code>just boot</code> &middot;
            GPL-3.0
          </p>
        </div>

        <div className="hero__product">
          <div className="hero__frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/slopos-screenshot-2026-04-23.png"
              alt="SlopOS running the Shell, System Monitor, and Files applications"
            />
          </div>
          <div className="hero__fade" />
        </div>
      </header>

      {/* ============ STAT BAND ============ */}
      <section style={{ padding: '8px 0 96px', position: 'relative', zIndex: 2 }}>
        <div className="wrap-wide statband">
          <div className="statband__i">
            <div className="statband__n">0</div>
            <div className="statband__l">Human authors</div>
          </div>
          <div className="statband__i">
            <div className="statband__n">
              100<span className="u">%</span>
            </div>
            <div className="statband__l">Rust</div>
          </div>
          <div className="statband__i">
            <div className="statband__n">x86_64</div>
            <div className="statband__l">From scratch</div>
          </div>
          <div className="statband__i">
            <div className="statband__n">GPL-3.0</div>
            <div className="statband__l">Open source</div>
          </div>
        </div>
      </section>

      {/* ============ ARCHITECTURE / MATRIX ============ */}
      <section className="section" id="architecture" style={{ paddingTop: 24 }}>
        <div className="wrap-wide">
          <div className="section__head">
            <div className="eyebrow">current shape</div>
            <h2>A real kernel, with sharp edges.</h2>
            <p>
              Every subsystem is written and reviewed by agents. The docs state
              what works, what&apos;s deliberately odd, and what&apos;s still a
              development note — nothing is hand-waved.
            </p>
          </div>
          <div className="matrix">
            {SUBSYSTEMS.map((s) => (
              <div className="subsys" key={s.idx}>
                <div className="subsys__top">
                  <span className="subsys__idx">{s.idx}</span>
                  <span className="subsys__name">{s.name}</span>
                </div>
                <div
                  className="subsys__impl"
                  dangerouslySetInnerHTML={{ __html: s.impl }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SPLIT: USERLAND ============ */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap-wide split">
          <div>
            <div className="eyebrow split__kick">userland</div>
            <h3>The shell, compositor and apps all run in Ring 3.</h3>
            <p>
              A framebuffer compositor drives real windows over memfd-backed
              surfaces. The shell, System Monitor and Files run as ordinary user
              tasks, talking to the kernel over a single SYSCALL fast path.
            </p>
            <ul className="featlist">
              <li>
                <SquareTerminal />
                <span>
                  <b>Phosphor shell</b> with a real TTY, job control and the W/L
                  currency readout.
                </span>
              </li>
              <li>
                <LayoutPanelLeft />
                <span>
                  <b>Compositor + appkit</b> — windowing protocol, raw window
                  API, widgets.
                </span>
              </li>
              <li>
                <Activity />
                <span>
                  <b>System Monitor</b> reads live scheduler and per-CPU state
                  over the ABI.
                </span>
              </li>
            </ul>
          </div>
          <div className="split__media">
            <div className="archstack">
              <div className="arch-layer ring3">
                <div className="arch-layer__head">
                  <span className="arch-tag v">Ring 3</span>
                  <span className="arch-layer__name">Userland</span>
                  <span className="arch-layer__sub">user tasks</span>
                </div>
                <div className="arch-chips">
                  {['shell', 'compositor', 'terminal', 'files', 'sysmon', 'appkit'].map(
                    (c) => (
                      <span className="arch-chip" key={c}>
                        {c}
                      </span>
                    ),
                  )}
                </div>
              </div>
              <div className="arch-bus">
                <b>⇅ SYSCALL</b>
                <span>one fast path</span>
              </div>
              <div className="arch-layer ring0">
                <div className="arch-layer__head">
                  <span className="arch-tag">Ring 0</span>
                  <span className="arch-layer__name">Kernel</span>
                  <span className="arch-layer__sub">trusted core</span>
                </div>
                <div className="arch-chips">
                  {['scheduler', 'memory', 'drivers', 'net', 'fs', 'slopring'].map(
                    (c) => (
                      <span className="arch-chip" key={c}>
                        {c}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ LORE ============ */}
      <section className="lore" id="lore">
        <div className="lore__inner wrap">
          <div className="eyebrow center">built-in gambling · not a bit</div>
          <h2>There&apos;s a casino in the bootloader.</h2>
          <p className="lore__sub">
            Every default boot runs the{' '}
            <b style={{ color: 'var(--ink)' }}>Wheel of Fate</b> — a real gambling
            mechanic that decides whether the kernel hands off to your shell. A
            joke we actually shipped. Need a deterministic boot?{' '}
            <code>just boot-fast</code> skips the spin.
          </p>
          <div className="outcomes">
            <div className="outcome win">
              <span className="outcome__k">WIN</span>
              <span className="outcome__v">→ enter the shell</span>
            </div>
            <div className="outcome loss">
              <span className="outcome__k">LOSE</span>
              <span className="outcome__v">→ reboot &amp; try again</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ DOCS MAP ============ */}
      <section className="section" id="docs">
        <div className="wrap-wide">
          <div className="section__head center">
            <div className="eyebrow center">documentation</div>
            <h2>
              Everything is documented.
              <br />
              Even the odd parts.
            </h2>
          </div>
          <div className="cards">
            {DOC_CARDS.map((card) => (
              <a className="doc-card" href={card.href} key={card.title}>
                <div className="doc-card__icon">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
                <span className="doc-card__arrow">{card.cta} →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ============ QUICKSTART ============ */}
      <section className="section" id="quickstart" style={{ paddingTop: 0 }}>
        <div className="wrap-wide quick">
          <div>
            <div className="eyebrow">quickstart</div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(28px,3.4vw,44px)',
                letterSpacing: '-0.035em',
                lineHeight: 1.03,
                margin: '18px 0 18px',
                color: 'var(--ink)',
              }}
            >
              Five commands
              <br />
              to a booted OS.
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 16,
                lineHeight: 1.65,
                color: 'var(--ink-dim)',
                margin: '0 0 28px',
                maxWidth: '42ch',
              }}
            >
              You need QEMU, xorriso, mkfs.ext2 and <code>just</code>. The ISO
              build pulls the pinned Limine release on demand — no submodule
              dance.
            </p>
            <a
              className="btn btn--secondary"
              href={sloposGitHubUrl}
              target="_blank"
              rel="noreferrer"
            >
              <GitHubIcon size={15} /> Browse the source tree
            </a>
          </div>
          <div className="codeblock">
            <div className="codeblock__bar">
              <div className="win__lights">
                <i className="tl-r" />
                <i className="tl-y" />
                <i className="tl-g" />
              </div>
              <span>bash — sloptopia</span>
            </div>
            <pre>
              <span className="c-comment"># Arch (btw)</span>
              {'\n'}
              <span className="c-cmd">sudo pacman -S</span>{' '}
              <span className="c-arg">qemu-full xorriso e2fsprogs just go</span>
              {'\n\n'}
              <span className="c-cmd">git clone</span>{' '}
              <span className="c-arg">
                https://github.com/SlopLabs/slopos.git
              </span>
              {'\n'}
              <span className="c-cmd">cd</span>{' '}
              <span className="c-arg">slopos</span>
              {'\n\n'}
              <span className="c-cmd">just setup</span>
              {'          '}
              <span className="c-comment"># installs rust nightly</span>
              {'\n'}
              <span className="c-cmd">just boot</span>
              {'           '}
              <span className="c-comment"># spins the wheel</span>
              {'\n'}
              <span className="c-cmd">just boot-fast</span>{' '}
              <span className="c-flag">roulette=skip</span>{' '}
              <span className="c-comment"># deterministic</span>
            </pre>
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="section" id="status" style={{ paddingTop: 0 }}>
        <div className="wrap-wide">
          <div className="cta">
            <div className="eyebrow center">pre-alpha</div>
            <h2 style={{ marginTop: 16 }}>It&apos;s early, and it&apos;s unstable.</h2>
            <p>
              SlopOS is pre-alpha and developed against QEMU — it may not boot on
              bare-metal hardware, and POSIX coverage is partial. Things break.
              That&apos;s the point.
            </p>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 12,
                flexWrap: 'wrap',
              }}
            >
              <a className="btn btn--violet" href={docsRoute}>
                Read the docs
              </a>
              <a
                className="btn btn--ghost"
                href={`${docsRoute}/status/known-limitations`}
              >
                Known limitations <ArrowUpRight width={15} height={15} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="footer">
        <div className="wrap-wide">
          <div className="footer__top">
            <div className="footer__brand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo/logo.png" alt="SlopOS" />
              <p className="footer__tag">
                &ldquo;Three kernel wizards shipwrecked on the island of
                Sloptopia. Zero fear of <code>unsafe</code>.&rdquo;
              </p>
            </div>
            <div className="footer__cols">
              <div className="footer__col">
                <h4>Docs</h4>
                <a href={`${docsRoute}/getting-started/quickstart`}>Quickstart</a>
                <a href={`${docsRoute}/architecture/overview`}>Architecture</a>
                <a href={`${docsRoute}/abi/syscalls`}>ABI Reference</a>
                <a href={`${docsRoute}/verification/framekernel`}>Verification</a>
              </div>
              <div className="footer__col">
                <h4>Project</h4>
                <a href={sloposGitHubUrl} target="_blank" rel="noreferrer">
                  Source
                </a>
                <a href={`${docsRoute}/status/current-capabilities`}>Status</a>
                <a href={`${docsRoute}/status/roadmap`}>Roadmap</a>
                <a href={`${docsRoute}/status/known-limitations`}>Limitations</a>
              </div>
              <div className="footer__col">
                <h4>The Lore</h4>
                <a href="#lore">The Wheel of Fate</a>
                <a href="#lore">W/L Currency</a>
                <a href={sloposGitHubUrl} target="_blank" rel="noreferrer">
                  Sacred Chronicles
                </a>
              </div>
            </div>
          </div>
          <div className="footer__bottom">
            <span>© 2026 SlopLabs · GPL-3.0-only</span>
            <span style={{ color: 'var(--lavender)' }}>
              &ldquo;still no progress but ai said it works soo it has to be
              working :)&rdquo;
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}

const SUBSYSTEMS = [
  { idx: '01', name: 'Boot', impl: 'Limine + OVMF, Rust boot pipeline, per-CPU GDT/TSS, SYSCALL MSRs' },
  { idx: '02', name: 'Privilege', impl: 'Ring 0 kernel, Ring 3 user tasks, TSS/RSP0, per-task syscall stacks' },
  { idx: '03', name: 'Scheduling', impl: 'Preemptive SMP scheduler, fused task state, WaitQueue / EventBus' },
  { idx: '04', name: 'Memory', impl: 'OSTD frames, slab + heap, process VM, demand paging, COW, memfd' },
  { idx: '05', name: 'Interrupts', impl: 'LAPIC, IOAPIC, MSI / MSI-X, HPET clock, LAPIC scheduler timer' },
  { idx: '06', name: 'Storage', impl: 'VirtIO block, ext2, ramfs, devfs, VFS file operations' },
  { idx: '07', name: 'Networking', impl: 'VirtIO net, IPv4, ARP, ICMP, UDP, TCP, DNS, AF_UNIX sockets' },
  { idx: '08', name: 'Async edge', impl: 'SlopRing plus <code>slopos-rt</code> and <code>slopfut</code> in userland' },
  { idx: '09', name: 'Userland', impl: 'libc layer, shell, compositor, terminal, windowing, appkit' },
];

const DOC_CARDS = [
  {
    icon: <Rocket />,
    title: 'Getting Started',
    body: 'Host setup, build recipes, QEMU options, and troubleshooting.',
    cta: 'Quickstart',
    href: `${docsRoute}/getting-started/quickstart`,
  },
  {
    icon: <Cpu />,
    title: 'Architecture',
    body: 'The current subsystem map and kernel design notes.',
    cta: 'Overview',
    href: `${docsRoute}/architecture/overview`,
  },
  {
    icon: <BookOpen />,
    title: 'ABI Reference',
    body: 'Syscall families, SlopRing, KTAP, and window protocol surfaces.',
    cta: 'Syscalls',
    href: `${docsRoute}/abi/syscalls`,
  },
  {
    icon: <ShieldCheck />,
    title: 'Verification',
    body: 'Framekernel discipline, trusted core, Verus status, and KernMiri.',
    cta: 'Framekernel',
    href: `${docsRoute}/verification/framekernel`,
  },
  {
    icon: <Settings2 />,
    title: 'Development',
    body: 'Extending syscalls, drivers, tests, debugging, and security review.',
    cta: 'Adding a syscall',
    href: `${docsRoute}/development/adding-a-syscall`,
  },
  {
    icon: <Gauge />,
    title: 'Status',
    body: 'Capability matrix, limitations, hardware requirements, roadmap.',
    cta: 'Capabilities',
    href: `${docsRoute}/status/current-capabilities`,
  },
];
