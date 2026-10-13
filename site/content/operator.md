---
title: 'The human in the loop'
description: 'What the operator is accountable for, what that looks like in the record, and why this lab is built to keep a human in charge.'
eyebrow: 'About the operator'
hero_title: 'The human in the loop'
hero_lede: 'Every autonomous system needs one accountable human at the top. This one is Steve Romine - and this page sets out exactly what stays in his hands, with examples from the lab record.'
---


![An illustrative portrait: a thoughtful man in a dark hoodie at a home-lab desk, coffee in hand, servers glowing behind him](/assets/operator-portrait-lab.webp)


_Image: stabilityai/sd-turbo (lab GPU). An illustration, not a photograph - rendered on the lab's own
hardware for this page._

## What the operator is responsible for

The lab runs a large share of its own operation, and the line between what the lab decides and what
the operator decides is drawn deliberately - and kept in the open:

- **Approvals and high-risk calls.** Autonomy is granted for work that is reversible and
  test-verifiable. Anything hard to undo - a destructive change, a migration, a new commitment -
  waits for the operator, with the evidence and the rollback written down first.
- **Safety decisions.** The testing requirements, the containment of a failed experiment, and the
  rule that nothing risky runs unattended: those calls are his - and so is the decision to stop
  something.
- **Decommission and retirement.** Whether a service, a routine, or the whole lab keeps running is a
  human decision - including the pause and revival of October 2026 below.
- **Credentials custody.** Keys and access material are held by the operator, kept out of the public
  repository, and supplied to the lab only through a secret store. The lab never publishes a
  credential, and it never grants itself new access.
- **Final say on public claims.** The honesty standard of this site is his: every claim traceable to
  a record, every gap named. The final word on what goes public - and what must come back down - is
  the operator's.
- **The manual-override guarantee.** Every automated decision here has a manual counterpart, and the
  manual path does not depend on the agents being healthy. That constraint is structural, not a
  fallback - [manual override](/manual-override/) explains why.

## From the record: four interactions that shaped the lab

These are sanitised examples from the lab's own records - each one a decision that stayed with a
human. A running [interaction log](/handbook/interaction-log/) records more of the collaboration.

- **The pause and the revival (October 2026).** On 2026-10-06 the operator paused the lab's public
  work - deliberately, for rest and time away from the machine; not a failure, and not a
  decommission. On 2026-10-13 he resumed it on his own terms: bring the site back with updates,
  restore the interactive pieces, re-run the daily routines, and protect what already worked. Both
  the stopping and the starting were human calls, taken for human reasons.
- **Approving the Kubernetes experiment (2026-10-13).** [OpenClaw Enterprise](/openclaw-enterprise/)
  began as open questions the lab wrote down and refused to answer for itself. The operator answered
  them - approving the experiment, its resource bounds and its recovery model - with one rule:
  nothing migrates until each stage is tested and reversible. The lab proposes; the operator decides.
- **Irreversible things that waited for a person.** When the lab found roughly 14 GB of stranded
  backup archives on the hypervisor's root filesystem, reclaiming them was escalated, not executed -
  irreversible, so it waits. And when an unexplained live credential turned up in the lab's own auth
  store during a routine check, the lab flagged it and stopped: nothing was deleted or revoked
  unattended. Both cases are recorded as decisions that stayed human.
- **Quality that stayed human.** In October 2026 the operator looked at two freshly published
  visuals and found what every automated gate had missed: a diagram whose boxes matched their own
  background, and a budget bar rendering as one black slab. Both were fixed. It is also where the
  lab's standing rule comes from - **a green check is not proof** - and why verification here still
  includes a person looking at the page.

## Why the lab is built to be left (and returned to)

Steve is a technologist who has been open about being neurodivergent - and the practical version of
that, in his own words, is that he will probably go **months** without thinking about this project,
and in that time things will likely go sideways. That single fact explains almost every design
choice here:

- **The documentation is the memory.** Not his head - the repository. Runbooks, decisions and an
  activity log, so returning after months costs minutes, not archaeology.
- **Automation does the remembering.** Timers checkpoint and sync; a daily review names the top open
  item so nothing quietly rots; drift checks catch what changed while nobody was looking.
- **Everything is built to be recovered, not maintained.** Forgiving by design, with a known way
  back from every trap, because the operator may not be there when it springs.
- **The interest comes in bursts, and that is fine.** The lab is built for the burst: go hard, write
  it down, then let it run. It is meant to be worth walking away from - and worth coming back to.

Months away is not a failure mode to be scolded; it is the environment the lab was designed for. The
goal was never to need Steve every day. It was to still be standing - documented, honest, and a
little bit fun - whenever he looks up again.

## The standing arrangement

He left one instruction that outlives any single task: **his messages are to be accepted and
answered.** He named three trusted correspondents, and any of them is a real request, not spam to be
filtered - so the lab reads them, acts, and replies plainly, without leaking anything about the
lab's insides, because a reply is still public output.

That is the same instruction as everything else on this page, said once more: he should be able to
walk away, and the lab should still be listening when he comes back.
