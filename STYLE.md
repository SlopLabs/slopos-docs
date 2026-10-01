# Writing the SlopOS docs

Read this before you write or edit a page.

## Who we write for

Assume a capable developer who has never worked on an operating system. They
know what an operating system is for, why programs are isolated from each
other, and what processes, threads, files, file descriptors, system calls,
`fork`/`exec`, sockets and TCP are. Don't explain those: it reads as
condescending and buries what is new. They don't know what an inode, a page
table, a wait queue or an interrupt controller is, and they shouldn't need to
in order to understand what SlopOS does and why. Explain those, and spend
most of the words on what SlopOS does differently or specifically.

The test for every explanatory page: a reader like that finishes it thinking
"right, that makes sense", not "I'd need to know a lot more to follow this".
If a page only works for kernel developers, it is a reference page, and it
should say so and link to the explanation.

The writing we want to sound like: OSTEP's chapter on crash consistency, the
Redis persistence docs, SQLite's *Atomic Commit*, the Rust Book, the Go blog,
Tailscale's *How Tailscale works*, LWN. They teach from the ground up, they
are practical about what you get, and they credit where ideas came from.
Read one before a long writing session.

## Kinds of page

| Kind | Job | Example |
|------|-----|---------|
| Explanation | How a part of SlopOS works and what it guarantees, from first principles | *Crash recovery* |
| Guide | Get one task done | *Add a syscall* |
| Reference | Be looked up, exact and complete | *Syscalls*, *Boot options* |

An explanation lives next to the reference for the same subsystem, not in a
separate essay section. Readers look for "filesystem", not for "ideas".

Where each kind lives:

| Section | Kind |
|---------|------|
| Getting started | Guides, plus *QEMU options* as reference |
| Architecture | Explanations, one per subsystem |
| Self-hosting | Explanations, with the commands you type |
| Safety and verification | Explanations, plus *Safety gates* as reference |
| Guides | Guides |
| Reference | Reference |
| Status | Plain statements of fact, kept current |

## Shape of an explanation page

1. **What you get.** The first paragraph says what the feature does for the
   reader, in their terms: what they can rely on, what they can't. A reader
   who stops there has the right idea.
2. **Where it comes from.** If the idea isn't ours, say so up front and say
   whose it is. Most of SlopOS is well-known technique, carefully done.
3. **The problem.** Why the feature has to exist. Concrete failure cases
   beat abstract statements.
4. **How it works.** The model, in as few steps as possible, with one worked
   example and a diagram where things happen in order or in space.
5. **What it means in practice.** What a program, a user or an operator
   should do differently because of it.
6. **How we know it works.** The tests, briefly.
7. **Further reading.** Annotated links: what each source is and why you'd
   read it. Start with the most approachable.
8. **In the source.** A small table of files for contributors, then a link to
   the reference page.

Implementation detail that only a contributor needs (ring slots, revoke
records, flag ordering) belongs on a reference page. When a subsystem has no
separate reference page, put it in a final **For contributors** section,
after the explanation and before *Further reading*: the rules a change must
keep and the reasons for them, stated briefly. A reader who stops before that
section has missed nothing they needed.

## Shape of a guide

1. One sentence on what you'll have done by the end.
2. What you need first, if anything.
3. Numbered steps. Each has the exact command or code, and what you should
   see when it worked.
4. How to check the result as a whole.
5. What usually goes wrong, briefly, and what to read next.

Explain only what the reader needs in order to do the step correctly. Link
to the Architecture page for the why.

## Shape of a reference page

One or two sentences on what the page lists and where the authoritative
source is (a file in the source tree, a spec). Then the entries: tables or
definition lists, complete and exact, in an order a reader can scan. Write
like a man page: no narrative, no asides, no selling.

## Titles and headings

Name things the way a reader would search for them.

- Page titles are plain nouns: "Crash recovery", "Boot options", "Add a
  driver". Not "Surviving a crash".
- Headings say exactly what the section contains: "Why a crash can damage a
  filesystem", "What happens at the next boot", "What programs can rely on",
  "Further reading". A question a reader would ask works well too: "How
  durable is the append-only file?" (Redis).
- No evocative or clever headings: "The pieces", "Blocks that change hands",
  "When replay refuses". They sound written by a machine trying to sound
  human.
- Sentence case everywhere.

## Voice

**Explain, don't present.** No dramatic setups ("pull the plug at every
step"), no build-up to a reveal. Say what happens and why.

**Plain word first, technical term second.** "A record for the file (Unix
calls it an *inode*)". Then keep using the plain word. Introduce a term only
if the reader will meet it again, in a log line, a man page or a linked
source.

**"We" and "you".** "We" is the people who built SlopOS, "you" is the
reader.

**Connect your sentences.** "So", "but", "because", "which is why". A
paragraph is an argument, not a list of facts.

**Be concrete.** A real command, a real log line, a real file path. Prefer
one worked example to three rules.

**Say what you don't promise.** Limits stated plainly read as competence.

**Name code for the people who will grep.** The sentence is about *the
journal*, not `Journal::seal`. Paths and symbols go in an "In the source"
table or in parentheses.

**One aside per page at most.** A short, true remark a person would make,
usually about why a number is what it is. Never in Reference or Guides.

## Don't

- Marketing words: unleash, powerful, seamless, robust, blazing, world-class.
- Sentences about the docs themselves ("These pages describe..."). One
  sentence at the end of an explanation's introduction saying what the page
  walks through is fine; OSTEP does it at the start of every chapter.
- Closing sections for their own sake. "How it is tested", "For
  contributors", "Further reading" and "In the source" appear when they have
  something real to say, not because every page has them.
- Em dashes in prose. Use a comma, colon, parentheses or a full stop. (Quoted
  log output stays verbatim.) No emoji.
- Volatile numbers (byte counts, timings, test totals) outside Status pages.
- Claims you didn't check against the source, or about other systems you
  didn't check against their documentation.

## Mechanics

- **Descriptions** are one sentence a person would say out loud.
- **Diagrams** for anything spatial or sequential are components in
  `components/diagrams/`, in the site's palette. ASCII is for terminal output.
- **Links** go to the page that answers the next question.
- **Facts** come from the source in `../slopos`, not from memory or another
  doc page.
