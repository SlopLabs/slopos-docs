import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Books,
  Cpu,
  GithubLogo,
  Graph,
  SealCheck,
  ShieldCheck,
  Terminal,
  Wrench,
} from '@phosphor-icons/react/ssr';
import { Reveal } from '@/components/reveal';
import { Mark, Wordmark } from '@/components/wordmark';
import { docsRoute, sloposGitHubUrl } from '@/lib/shared';
import './brand.css';

export const metadata: Metadata = {
  title: 'SlopOS, a from-scratch x86_64 operating system in Rust',
  description:
    'AI agents wrote SlopOS, an x86_64 kernel in Rust. We named it slop, then quarantined every unsafe block in one crate and had Verus prove the invariants underneath it.',
};

export default function HomePage() {
  return (
    <div className="site">
      <nav className="site-nav">
        <Link className="site-nav__brand" href="/" aria-label="SlopOS home">
          <Wordmark className="site-nav__wordmark" />
        </Link>

        <div className="site-nav__links">
          <a className="site-nav__link" href={`${docsRoute}/architecture/overview`}>
            Architecture
          </a>
          <a className="site-nav__link" href={`${docsRoute}/abi/syscalls`}>
            ABI
          </a>
          <a className="site-nav__link" href={`${docsRoute}/verification/framekernel`}>
            Verification
          </a>
          <a className="site-nav__link" href={`${docsRoute}/status/current-capabilities`}>
            Status
          </a>
        </div>

        <div className="site-nav__end">
          <a
            className="btn btn--sm btn--outline site-nav__github"
            href={sloposGitHubUrl}
            target="_blank"
            rel="noreferrer"
          >
            <GithubLogo size={15} weight="fill" />
            GitHub
          </a>
          <a className="btn btn--sm btn--primary" href={docsRoute}>
            Read the docs
          </a>
        </div>
      </nav>

      <main>
        <header className="hero">
          <div className="wrap hero__grid">
            <div>
              <p className="hero__eyebrow">
                Rust <b>/</b> x86_64 <b>/</b> framekernel
              </p>

              <h1>
                An operating system written by <i>AI agents</i>.
              </h1>

              <p className="hero__sub">
                We named it slop, then made the build prove otherwise. Verus
                checks the invariants the kernel rests on.
              </p>

              <div className="hero__cta">
                <a
                  className="btn btn--primary"
                  href={`${docsRoute}/getting-started/quickstart`}
                >
                  Build and boot it
                  <ArrowRight size={15} />
                </a>
                <a
                  className="btn btn--outline"
                  href={`${docsRoute}/architecture/overview`}
                >
                  Architecture
                </a>
              </div>
            </div>

            <div>
              <div className="hero__photo">
                <Image
                  src="/images/slopos-on-hardware.jpg"
                  alt="The SlopOS desktop running on a Lenovo laptop, showing the terminal, file manager, system monitor and image viewer"
                  width={1680}
                  height={1045}
                  priority
                  sizes="(max-width: 1023px) 100vw, 58vw"
                />
              </div>
              <p className="hero__caption">
                A real laptop. Our own Intel Xe driver lights that panel, and our
                ACPI interpreter found the touchpad.
              </p>
            </div>
          </div>
        </header>
        <section className="section" id="verification">
          <div className="wrap">
            <Reveal>
              <h2 className="section__title">
                Do not take the machine&apos;s word for it.
              </h2>
              <p className="section__lead">
                An agent will tell you the code is correct. That is worth
                nothing, so we made the build prove it.{' '}
                <code>slopos-ostd</code> owns every <code>unsafe</code> block and
                the other crates carry <code>#![forbid(unsafe_code)]</code>. A
                macro can smuggle <code>unsafe</code> past that lint without
                warning, so CI expands each crate and reads what the compiler saw.
              </p>
            </Reveal>

            <div className="proof" style={{ marginTop: 44 }}>
              <Reveal>
                <div className="proof__figures">
                  <div className="proof__fig">
                    <div className="proof__n">54</div>
                    <p className="proof__l">
                      <code>pub unsafe fn</code> in the trusted core
                    </p>
                  </div>
                  <div className="proof__fig">
                    <div className="proof__n">15</div>
                    <p className="proof__l">
                      <code>pub unsafe trait</code> you audit by reading
                    </p>
                  </div>
                  <div className="proof__fig">
                    <div className="proof__n">16</div>
                    <p className="proof__l">
                      safe functions that still carry a prose contract
                    </p>
                  </div>
                  <div className="proof__fig">
                    <div className="proof__n">2,500+</div>
                    <p className="proof__l">
                      tests that boot under QEMU on each change
                    </p>
                  </div>
                </div>
                <p
                  style={{
                    fontSize: 13.5,
                    lineHeight: 1.55,
                    color: 'var(--ink-faint)',
                    marginTop: 14,
                    maxWidth: '48ch',
                  }}
                >
                  Those first three numbers are what you must trust by reading
                  rather than by type-checking. CI fails the build when they grow.
                </p>
              </Reveal>

              <Reveal delay={0.08}>
                <p
                  style={{
                    fontSize: 15,
                    lineHeight: 1.6,
                    color: 'var(--ink-dim)',
                    margin: '0 0 22px',
                    maxWidth: '52ch',
                  }}
                >
                  Verus, an SMT-backed proof system for Rust, checks the
                  invariants underneath that crate. The proofs cover the spots
                  where a bug corrupts memory instead of raising a type error.
                </p>
                <ul className="proof__list">
                  <li>
                    <SealCheck size={18} />
                    <span>
                      <b>Frame reference counts.</b> No double-free, no
                      use-after-free.
                    </span>
                  </li>
                  <li>
                    <SealCheck size={18} />
                    <span>
                      <b>Slab slot lifetimes.</b> A slot cannot outlive the slab
                      it came from.
                    </span>
                  </li>
                  <li>
                    <SealCheck size={18} />
                    <span>
                      <b>Page-table walks.</b> User mappings cannot reach kernel
                      memory.
                    </span>
                  </li>
                  <li>
                    <SealCheck size={18} />
                    <span>
                      <b>SlopRing cursors.</b> A hostile userland cannot overflow
                      the shared rings.
                    </span>
                  </li>
                  <li>
                    <SealCheck size={18} />
                    <span>
                      <b>TCP zero-copy pinning.</b> A page stays pinned while the
                      NIC can still read it.
                    </span>
                  </li>
                </ul>
                <a
                  className="btn btn--outline"
                  style={{ marginTop: 26 }}
                  href={`${docsRoute}/verification/framekernel`}
                >
                  How the gates work
                  <ArrowRight size={15} />
                </a>
              </Reveal>
            </div>
          </div>
        </section>
        <section className="section" id="subsystems">
          <div className="wrap">
            <Reveal>
              <h2 className="section__title">
                The agents wrote a TCP stack.
              </h2>
              <p className="section__lead">
                SlopOS pulls in no networking or driver crates, so the retransmit
                timers, the AML interpreter and the compositor are{' '}
                <code>#![no_std]</code> Rust written for this kernel. The models
                learned how kernels work by reading Linux, Asterinas and Redox.
                We credit that debt in the source.
              </p>
            </Reveal>

            <div className="bento">
              <Reveal className="bento__cell bento__cell--wide bento__cell--terminal">
                <pre className="term">
                  <span className="c"># five commands to a booted OS</span>
                  {'\n'}
                  <span className="g">git clone</span> https://github.com/SlopLabs/slopos.git
                  {'\n'}
                  <span className="g">cd</span> slopos
                  {'\n'}
                  <span className="g">just setup</span>
                  {'      '}
                  <span className="c"># pinned rust nightly</span>
                  {'\n'}
                  <span className="g">just boot</span>
                  {'       '}
                  <span className="c"># spins the wheel</span>
                  {'\n'}
                  <span className="g">just test</span>
                  {'       '}
                  <span className="c"># 2,500+ tests under QEMU</span>
                  {'\n\n'}
                  <span className="p">root@sloptopia</span>:/#
                </pre>
              </Reveal>

              <Reveal className="bento__cell bento__cell--half" delay={0.05}>
                <h3>Kernel</h3>
                <p>
                  An SMP preemptive scheduler, demand paging with copy-on-write
                  fork, futexes, signals, PTYs and pidfd. When a task panics, the
                  kernel symbolizes the backtrace, bills the damage to that task
                  and keeps running.
                </p>
              </Reveal>

              <Reveal className="bento__cell bento__cell--third" delay={0.1}>
                <h3>Drivers</h3>
                <p>
                  Our ACPI interpreter walks the firmware&apos;s AML tables to
                  find the touchpad, then drives it over our own I²C and GPIO.
                  The Intel Xe driver paints the panel in that photo.
                </p>
              </Reveal>

              <Reveal className="bento__cell bento__cell--third" delay={0.15}>
                <h3>Network</h3>
                <p>
                  ARP, IPv4, TCP, UDP, ICMP, DHCP, DNS and unix sockets, with
                  NAPI-style ingress. Userland ships <code>curl</code>,{' '}
                  <code>ping</code>, <code>nc</code>, and <code>nmap</code> for
                  auditing your own two sockets.
                </p>
              </Reveal>

              <Reveal className="bento__cell bento__cell--third" delay={0.2}>
                <h3>Desktop</h3>
                <p>
                  Clients hand the compositor their buffers over memfd and
                  SCM_RIGHTS, the way Wayland does it. It tracks damage, culls
                  what you cannot see, and runs four applications.
                </p>
              </Reveal>
            </div>
          </div>
        </section>
        <section className="section" id="wheel">
          <div className="wrap wheel">
            <Reveal>
              <h2 className="section__title">
                The bootloader gambles with your session.
              </h2>
              <p className="section__lead">
                Before the desktop starts, SlopOS spins the Wheel of Fate and
                charges the result to your W/L balance. We shipped the joke and
                then had to live with it. Run <code>just boot-fast</code> to skip
                the spin.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="wheel__outcomes">
                <div className="wheel__row wheel__row--win">
                  <span className="wheel__k">WIN</span>
                  <span className="wheel__v">the desktop starts</span>
                </div>
                <div className="wheel__row wheel__row--lose">
                  <span className="wheel__k">LOSE</span>
                  <span className="wheel__v">reboot and try again</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
        <section className="section" id="docs">
          <div className="wrap">
            <Reveal>
              <h2 className="section__title">Documentation</h2>
              <p className="section__lead">
                These pages say what works today, which parts we made strange on
                purpose, and where the source still disagrees with the prose.
              </p>
            </Reveal>

            <Reveal delay={0.06}>
              <div className="docmap">
                {DOCS.map((d) => (
                  <a className="docmap__item" href={d.href} key={d.title}>
                    <d.icon size={18} />
                    <span>
                      <span className="docmap__t">{d.title}</span>
                      <span className="docmap__d">{d.body}</span>
                    </span>
                    <ArrowRight className="docmap__go" size={16} />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
        <section className="section" id="status">
          <div className="wrap">
            <Reveal>
              <div className="closing">
                <h2>The name is a warning.</h2>
                <p>
                  POSIX coverage stops well short of complete, and the hardware
                  list runs to one laptop and a QEMU target. The status pages name
                  the edges you will hit before you hit them.
                </p>
                <div className="closing__cta">
                  <a
                    className="btn btn--primary"
                    href={`${docsRoute}/getting-started/quickstart`}
                  >
                    Build and boot it
                    <ArrowRight size={15} />
                  </a>
                  <a
                    className="btn btn--outline"
                    href={`${docsRoute}/status/known-limitations`}
                  >
                    Known limitations
                    <ArrowUpRight size={15} />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap">
          <div className="site-footer__top">
            <div className="site-footer__brand">
              <Mark className="site-footer__mark" />
              <p className="site-footer__quote">
                Three kernel wizards shipwrecked on the island of Sloptopia,
                armed with Rust, mass token consumption, and zero fear of{' '}
                <code>unsafe</code>.
              </p>
            </div>

            <div>
              <h4>Docs</h4>
              <a href={`${docsRoute}/getting-started/quickstart`}>Quickstart</a>
              <a href={`${docsRoute}/architecture/overview`}>Architecture</a>
              <a href={`${docsRoute}/abi/syscalls`}>ABI reference</a>
              <a href={`${docsRoute}/verification/framekernel`}>Verification</a>
            </div>

            <div>
              <h4>Project</h4>
              <a href={sloposGitHubUrl} target="_blank" rel="noreferrer">
                Source
              </a>
              <a href={`${docsRoute}/status/current-capabilities`}>Capabilities</a>
              <a href={`${docsRoute}/status/hardware-requirements`}>Hardware</a>
              <a href={`${docsRoute}/status/roadmap`}>Roadmap</a>
            </div>

            <div>
              <h4>Develop</h4>
              <a href={`${docsRoute}/development/adding-a-syscall`}>Add a syscall</a>
              <a href={`${docsRoute}/development/adding-a-driver`}>Add a driver</a>
              <a href={`${docsRoute}/development/adding-tests`}>Add tests</a>
              <a href={`${docsRoute}/development/debugging-gdb-record-replay`}>
                Debugging
              </a>
            </div>
          </div>

          <div className="site-footer__bottom">
            <span>Copyright 2025-2026 The SlopOS Authors. GPL-3.0-or-later.</span>
            <span>&ldquo;the compiler won&apos;t let us&rdquo;</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

const DOCS = [
  {
    icon: Terminal,
    title: 'Getting started',
    body: 'Set up the host, build an ISO, boot it, fix what breaks',
    href: `${docsRoute}/getting-started/quickstart`,
  },
  {
    icon: Cpu,
    title: 'Architecture',
    body: 'How boot, memory, scheduling, drivers and the network fit together',
    href: `${docsRoute}/architecture/overview`,
  },
  {
    icon: Books,
    title: 'ABI reference',
    body: 'Syscall families, SlopRing, KTAP and the window protocol',
    href: `${docsRoute}/abi/syscalls`,
  },
  {
    icon: ShieldCheck,
    title: 'Verification',
    body: 'The gates CI runs, what Verus proves, where Miri looks',
    href: `${docsRoute}/verification/framekernel`,
  },
  {
    icon: Wrench,
    title: 'Development',
    body: 'Add a syscall or driver, write tests, debug a wedged kernel',
    href: `${docsRoute}/development/adding-a-syscall`,
  },
  {
    icon: Graph,
    title: 'Status',
    body: 'What runs today, what does not, and which hardware we tested',
    href: `${docsRoute}/status/current-capabilities`,
  },
];
