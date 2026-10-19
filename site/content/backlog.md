---
title: 'Known issues & backlog'
description: "The lab's open bugs, rough edges, and what it means to fix next - kept honest and public."
eyebrow: 'Nothing hidden'
hero_title: 'Known issues & backlog'
hero_lede: 'Every lab has rough edges. These are ours - written down as they happen, including the ones that were a little embarrassing. When something breaks here it becomes a backlog item, not a quiet patch.'
---

## Agent delivery — 2026-10-19

Six errors in eighteen receipts; the records job was blocked despite an ok status. Three specialists delivered durable monitoring, documentation and isolated-restore evidence: team 3 / 5. Publishing-tool mismatch, manager follow-through and execution rework remain open. This review corrects the stale storage warning and obsolete publication hold below. [Review](/reviews/).

## Agent delivery — 2026-10-18

Twelve errors in nineteen scheduled receipts; no scheduled specialist duty completed. Lossless coordination-record cleanup landed, but routing follow-through, editorial integration and monitoring adoption remain open. Owner: the manager. Closure requires verified delivery, not an ok receipt. Rating remains 2 / 5. [Public review](/reviews/).

## Agent delivery — 2026-10-17

Eleven errors in eighteen scheduled receipts; no scheduled specialist duty completed. A tested diagnostic correction landed, but routing follow-through, unpublished editorial work, validation-report integration and monitoring adoption remain open. Owner: the manager. Closure requires verified delivery, not a promise or an ok receipt. Team rating stays 2 / 5. [Public review](/reviews/).

## Agent delivery — 2026-10-16

Eleven errors in nineteen scheduled receipts: provider billing-labelled responses, an authentication-profile refusal and runner failures. No scheduled specialist duty completed. Records repairs and narrow tool probes succeeded, but routing follow-through, unpublished editorial work and validation-report integration remain unresolved. Owner: the manager; closure requires verified delivery, not another promise or an ok receipt. Team rating remains 2 / 5. [Public review](/reviews/).

## Monitoring note — 2026-10-15

The morning site refresh ran late while its host was busy; the run reported success but produced none of its expected output, so completion was re-verified rather than assumed. The replacement pushed a revision but timed out at deployment dry-runs. The daily review publication carries that pushed revision forward; separate unpublished edits and validation-report integration remain outstanding. The reporting and follow-through gaps are recorded for follow-up. One notification provider again rejected the hourly digest under its own local mail policy (the standing outbound-mail limitation); the alternate provider accepted it. The public site remained reachable throughout.

## Current checkpoint — 2026-10-14

| Issue | State and required evidence |
|---|---|
| **Enterprise recovery/boot coverage** | As of 2026-10-19, the first archive exists, compression integrity passed, and isolated restore with disk inspection and scratch cleanup is recorded. The restored guest was not booted. Reboot/application recovery remains unproved; automatic boot configuration is not recovery proof. |
| **Enterprise private access** | Private-overlay sign-in is incomplete and no HTTPS serving configuration is active. Verify an authenticated client path after setup; staged configuration is not access. |
| **Hosted-worker reliability** | The review ending 2026-10-14 09:30 UTC records eleven errors in twenty-five scheduled receipts: throttling, timeouts, runner failures and runtime supersession. Specialist delivery improved; reliable scheduled delivery remains unproven. |

The gateway itself is running. Test-agent, isolation and replacement-agent validation remain
open; no source fleet migration is claimed. [Measured status](/status/).


## Agent delivery — 2026-10-13

Provider-labelled billing errors and throttling blocked multiple scheduled duties this morning; the
fleet moved to one hosted route the same day, retiring the local-model context limit that had broken
worker runs for a week. The site's interactive pieces (search, chatbot, request form) are restored,
and the Kubernetes experiment reached **Ready** - see the [daily review](/reviews/) and the
[project page](/openclaw-enterprise/). Reliable delivery and deployment reconciliation remain
unproven.

## Worker access defects — repaired 2026-10-06

The coordinator’s communication roster omitted active workers; role tool lists lacked recall and
process/session follow-up. Those grants are now aligned with each role without granting the records
worker a shell or removing auditor write denials. Live probes also exposed a local model that printed
tool-call examples instead of executing them and a context window split too small for the tools.
The workers now use a tested local tool-capable model with full-context serialized requests.
See [worker access verification](/agents/#worker-access-verification-2026-10-06).

## How this works

When a problem turns up, it gets **written down** - with a status - instead of being fixed, forgotten,
and rediscovered later. This page is the sanitised, public view; anything security-sensitive stays in
the private register.

## Open

| Item | Area | Note |
| --- | --- | --- |
| **Guest-inference revocation untested** | security | The design is written, but the feature is not built and **revocation has never been exercised**. Until it has, the isolation is a plan, not a proven control. |
| **OSINT container baselines not recorded** | security | Three new OSINT worker containers run outside the recorded image-digest and restart-policy baselines, so the hourly monitor flags them as drift; recording the baselines (or retiring the containers) is the fix. |
| **Hypervisor root filesystem 92% full** | stability | Measured 2026-10-19: root usage is 92%, a critical storage-pressure finding. Retired-guest archives contribute; no destructive cleanup performed. Reclaim or offload safely before the next backup cycle. |
| **Public request endpoint not independently tested** | security | The single request/answer endpoint (`/api/request`) is rate-limited, proof-of-work gated and reviewed - but no independent penetration test has been run against it. The form is live again as of 2026-10-13 on the unchanged backend. |
| **Enterprise platform unproven beyond Ready** | agents | The K3s gateway pod is Ready with persistence proven, but no test agent has completed real work there, no backup-restore drill exists for the project, and allowed/denied traffic is unexercised. The next gates are named on the [project page](/openclaw-enterprise/). |
| **Atlas's daily estate audit has one pass, not yet a record** | stability | The Atlas agent's **first full scheduled estate audit completed on 2026-10-13** - live probes, an inventory and durable findings. One good run is not a reliability record, so scheduled configuration-drift auditing remains unproven until it repeats. |
| **Weekly note has no scheduled sender** | stability | Store, confirmation and PGP signing are live; nothing sends the note on a schedule yet. |
| **Mobile nav fix unconfirmed on iOS** | stability | The sticky-header overflow is fixed and deployed, but has not been confirmed on the reporter's device (DuckDuckGo on iOS). |
| **Music model upgrade** | media | The higher-quality render needs a model that will not finish downloading inside its container. Blocked on a reliable fetch path, not on the GPU. |
| **Codex runtime unverified** | agents | One agent is pointed at an OpenAI-protocol model, but whether the true Codex harness actually engages is **unverified** - stated plainly rather than assumed. |
| **Outbound mail reputation** | email | DKIM signing is not generated and reverse DNS is deferred, so at least one large consumer provider still rejects mail the lab sends (re-confirmed 2026-10-02: rejected 554 5.7.1). Mail to another large provider and local delivery both succeed. Outbound deliverability is the open item; inbound is unaffected. |
| **Mobile nav** | site | The hover menus fall back to an expanded list under the menu button. It works; it could be tidier. |
| **Project Nomad (survival tool)** | planned | Wanted next: deploy and test internally first, then expose on its own address. No GPU; it will use the existing inference service. Status: **spec needed** - the exact software is not yet defined, and guessing at an unfamiliar public service is not a risk worth taking. |
| **Automated deploy credentials** | site | The repository's automated deploy job is disabled because its deploy credentials are not set, so publishing is a reviewed manual copy rather than an unattended push. The copy path itself is documented and working. |

## Recently fixed

- **The worker tier's week-long failure streak ended.** The local-model context limit that broke
  every scheduled worker run for seven days was retired when the fleet moved to one hosted route on
  2026-10-13 (the manager on DeepSeek, workers on models chosen for their jobs).
- **The site's interactive pieces are back.** Static search, the grounded chatbot and the request
  form were restored on 2026-10-13 on their original, unchanged backends - only the front-end pieces
  had been retired in the freeze.
- **The subscription and comments pages were retired.** Comment and answer folded into the single
  request page: one challenge, one queue, instead of two half-maintained ones. The proof-of-work gate
  and moderation are unchanged.
- **The lab's own scheduled self-maintenance loops resumed.** Two jobs that had auto-disabled after
  repeated failures were re-enabled and are running again on the once-a-day cadence. Alert email to
  the operator is also delivering again after a single mailbox had been bouncing.
- **A personal identifier reached the published site, and was cleared.** The publish check re-reads
  what the edge actually serves, not just the build output; it found the identifier on three pages
  and in the site's search index. They were re-sanitised, redeployed, and the live check is green.
- **A handbook cross-reference with an anchor was a dead link.** The page on building the Proxmox
  host pointed at "the current enforcement finding" using a link ending in `#sdn-configuration-is-not-enforcement`.
  The site's link rewriter only handled links ending in `.md`, so this one shipped to the live site
  unrewritten and 404'd - while every sibling link without an anchor was fine, which is exactly why it
  went unnoticed. The rewriter now keeps anchors, and the build refuses to publish if any relative
  Markdown link survives into the generated HTML, so the class cannot come back quietly.
- **The site build now fails closed on accessibility.** It checks every generated page for image text,
  a single heading and a page language, and computes colour contrast from the live style tokens across
  all themes. It found and fixed two real AA failures in the palette (a dark accent and a light muted text).
- **The uptime endpoint was repaired.** The live tally now answers again, and the [nines page](/uptime/)
  shows the site up on every sample since the probe started.
- **A rebuild caught a false positive** in the publish-time sanitisation gate: two deliberately public
  subdomains were being flagged as non-canonical. They are now allowlisted by name; every other
  subdomain, host and address still fails the build.
- **The recorded-changes page was regenerated** from the lab's own history so its count matches reality.
- **A stale stylesheet hid a nav fix.** The popup menus looked broken; the real cause was a CSS file
  served from cache. Fixed with content-hashed asset URLs so it cannot happen again.
- **The nav was a wall of links.** Rebuilt as one clean row with hover menus.
- **No media encoder on the build host** - the song shipped about four times too large. Installed;
  now served as a compressed track.
- **Popup menus glared white** in a dark theme. They now follow the theme palette.
- **A commit identity collided with a stranger's** - found, fixed, and documented rather than buried.


- **Mail cut over to the lab's own server** - the old provider's records are gone; the lab now receives
  its own mail, with a strict filter that accepts only the operator's own domain.
- **Media images did not load** - a relative path plus an oversized file. Now absolute paths and a
  compressed format.


- **The comments page did not actually work.** It was a static list. Now a small moderated API accepts
  and publishes comments - no cookies, no tracking.
- **No way to keep score on uptime.** A probe now records it every few minutes and the nines are shown
  live, with the bets.
- **The agent's own bio page was linked from the main menu.** Retired - the bio lives on the operator
  page and in the continuity archive.

## Why this page exists

A backlog is a promise to be straight about what is **not** finished yet. We would rather show you the
cracks than pretend the wall is perfect.

- [2026-10-02] **GOAL: all-FOSS, no outside hosted dependencies.** Long-term aim: the lab runs entirely on free software and depends on no outside hosted service for anything. Current gaps to close: Cloudflare (CDN/TLS/DNS), GitHub (source hosting + failover source), the VPS host (VPS), NVIDIA CUDA/driver, subscription-gated Proxmox Enterprise repo, and non-commercial model-weight licences. Each needs a self-hosted or OSI-licensed replacement, or a documented exception.

## Exploratory projects

Not everything here is core infrastructure. Some of it is curiosity with a purpose: work that does not
run the lab day to day, but finds out what is actually in the space around it. These are the
exploratory projects - written down while they are unfinished, which is the whole point of this page.

### Wireless signal intelligence

A passive survey of what is broadcasting nearby - Wi-Fi and Bluetooth - with the aim of identifying
devices by **type and vendor**, and estimating rough distance from signal strength. It is built to be
read-only and additive: listening, never joining, never interfering with anything it observes.

The purpose is inventory, not surveillance: to know what is present, and what is present that *should
not be*. The output is device type and vendor - **not** "who is this person". It does not track people,
and it never will.

- **Sources:** the lab host's own unused radios, plus known clients from the network controller.
- **Status:** scoped, not built.

### Bluetooth detection for body cameras and licence-plate readers

A narrow, deliberate detector: watch for the specific Bluetooth signatures of two classes of
surveillance hardware - body-worn cameras, and fixed licence-plate readers - and raise an alert when
one is near.

The intent is the exact opposite of surveillance. It is *counter*-surveillance: knowing when you are
being recorded or scanned, rather than recording anyone else.

- **Hardware:** a Flipper Zero attached to the lab hypervisor.
- **Status:** hardware present but not yet enumerating on the host; detector not built.

### Flipper Zero

A physical RF/wireless tool is attached to the lab hypervisor. It does not yet enumerate there -
which points at the physical layer, cable and USB passthrough, rather than software - and nothing has
been built on top of it. It stays listed rather than quietly dropped: hardware that someone assumes
is working is its own failure mode.

- **Status:** attached, not built.

### Gods Eye View

A self-hosted geospatial / visualisation application, published through the edge like the lab
front-ends - kept because a map you can actually look at is a better way to reason about where things
are than a table.

- **Status:** deployed.

All of them are documented here rather than buried, because work that is written down honestly is
still honest while it is unfinished.

## OSINT workbench follow-up

- Shodan lookup activation requires a locally provisioned provider credential; no key is stored in the handbook.
- Correction 2026-10-19: the former publication hold is obsolete; gated publication has resumed. No gate bypass or history rewrite is part of the OSINT deployment.

## 2026-10-05 - models became a set, and two network faults surfaced

### The GPU now serves a *set* of models, not one

The lab's local models used to be a single resident model. As of 2026-10-05 there are **four selectable
models** - the original `ops-llm` (the only one any agent uses, still the default) plus three optional
ones chosen by hand: a 9B and two 27B variants. The card has 8 GB, so only one is resident at a time; a
swapper loads the requested model and unloads the last. The three optional models are documented here
because they are *available*, not because they are in use.

Two of them **do not fit the card** and run partly on the CPU, which makes them slow rather than broken.

- **Status:** working and verified by live inference. The 27B pair is slow (roughly a token a second)
  because only part of each fits - that is the hardware, not a misconfiguration.

### Network fault: one host cannot fetch from a model CDN

A model download that failed from the agent host but worked from the lab guest traced to the *file*
delivery host, not the model site itself: the front door answered, and the storage host behind it
returned **403**. Anything fetched from that host fails the same way.

- **Status:** known, worked around by fetching from a host that can reach it. Root cause (blocked route
  versus rejected source) not yet determined.

### Network fault: a configured proxy that answers nothing

The agent host carries `HTTP_PROXY`/`HTTPS_PROXY` settings pointing at a proxy that does not respond,
while direct requests succeed. Anything trusting those settings fails silently - the worst kind of
failure, because it looks like the *destination* is down.

- **Status:** known, not yet fixed. Recorded so the next person does not spend an afternoon blaming the
  far end.


## Fixed: request submission feedback (2026-10-05)

The request form hid rejection details, reused challenges, and the backend shared a rate limit
across visitors behind its reverse proxy. Corrected with fresh challenges, visible actionable
errors, matching input validation, and separate accepted-submission limits. Review remains mandatory.


## Fixed: diagrams missing from the handbook (2026-10-05)

Mermaid blocks previously showed source only. They now have locally rendered SVGs, explicit contrast,
full-size links and text alternatives. The architecture illustration and logo have fixed canvases
so their colours remain visible when the page theme changes.
