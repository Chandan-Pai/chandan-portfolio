# Chandan Pai — UX Research & Human Factors Portfolio

**Human Factors Engineer / UX Researcher**  
MS Industrial & Systems Engineering — University of Minnesota (May 2026)

[🌐 Portfolio](https://chandan-pai.github.io/chandan-portfolio/) · [💼 LinkedIn](https://www.linkedin.com/in/chandan-umesh-pai/) · [📧 Email](mailto:2000chandanpai@gmail.com)

---

## About This Repo

This is the source code for my UX research and human factors portfolio, built with Next.js and deployed via GitHub Pages. The work here spans automotive ergonomics, accessibility redesign, campus product design, and medical device manufacturing — all grounded in field research and measured outcomes.

Below is a detailed breakdown of the featured project: **CampusSync**, including the research process, where AI tools were used, and the decisions that shaped the final product.

---

## Featured Project: CampusSync — Gopher Tunnel Navigation

**Live product → [campus-sync.org](https://campus-sync.org)**  
**Role:** UX Research Lead & Product Designer  
**Team:** Nick Kanning, Chandan Umesh Pai, Saad Saleem, David Tomlinson  
**Timeline:** September – December 2025

---

### The Problem in One Sentence

Students at the University of Minnesota weren't avoiding the 7-mile underground tunnel system because they didn't know about it — they avoided it because they couldn't trust it.

One blocked door mid-route costs more time than just going outside in -20°F weather. So students kept making the rational choice: take the guaranteed bad option over the uncertain good one.

**The infrastructure gap:**
- Building hours scattered across 12 different department websites
- Official tunnel maps were static PDFs last updated in 2019
- Google Maps routed outdoors by default
- No single tool combined routing + real-time building access

---

### Research Approach

#### Phase 1 — Contextual Inquiry (Field Research)
Before opening Figma, we went outside with students in September.

We shadowed 15 students navigating campus during actual conditions — not in a lab, not via survey. What we expected to see: students struggling to find tunnel entrances. What we actually observed: students finding entrances just fine, then **turning around anyway**.

The hesitation was the data point. Students were running a mental risk calculation at every tunnel entrance:

> *"If this route is blocked halfway through, I've lost more time than if I just go outside now."*

This single insight reframed the entire problem. The product didn't need to improve awareness. It needed to **guarantee route completeness**.

#### Phase 2 — Hierarchical Task Analysis
We mapped 40+ navigation scenarios — from a simple 2-building hop to a complex multi-stop route during a building closure.

Key finding: most campus navigation is **short 1–3 building hops**, not long cross-campus trips. This meant our UI needed to optimize for a 10-second lookup, not a trip planner. The HTA also revealed that building hours mattered most *mid-journey*, not at the start — students were making decisions at tunnel entrances in real time, in coats and gloves.

#### Phase 3 — Three Rounds of Usability Testing

| Round | Stage | Participants | Key Finding |
|---|---|---|---|
| 1 | Figma Prototype | n=8 | Map-tap input too slow for users in motion → rebuilt around search-first |
| 2 | MVP | n=10 | Users following routes without realizing they'd gone outdoors → single-color map lines were ambiguous |
| 3 | Functional Prototype | n=7 | Dropdown menus broken on phones under 390px width → rebuilt as bottom-sheet components |

Round 2 was the most important. The maroon/gold dual-color visual system wasn't a design preference — it was a **fix for a usability failure we directly observed**.

---

### Where AI Tools Were Used

AI tools were integrated at two specific points in the research process:

**1. Post-Round 2 Theme Synthesis**  
After Round 2 testing, I had 40+ raw observation notes across 10 participants. I used ChatGPT to do initial theme clustering, then manually validated each theme against the HTA framework and my own field observations. The AI output surfaced the route color ambiguity issue as the dominant pattern — which matched what I was seeing in session recordings. I then used that as the brief for the dual-color visual system.

*Prompt used:*
```
Here are 40 usability observation notes from students navigating a map-based web app on mobile. 
Cluster these into themes by frequency and severity. For each theme, list: theme name, number 
of observations, representative quote, and suggested design direction.
```

*What I kept vs. changed:* The AI correctly identified 3 of 4 major themes. It missed the dropdown overflow issue on narrow screens — that came from my own device testing log, not the observation notes. I added it manually.

**2. Scope Decision Documentation**  
When writing the Project Scope Statement, I used ChatGPT to stress-test our cut decisions. I listed the 4 features we were explicitly NOT building and asked: *"For each of these, what is the strongest argument for including it, and what is the strongest argument for cutting it?"*

This helped the team reach faster sign-off on scope and produced language we used directly in the SOW to explain the cuts to stakeholders.

---

### Key Product Decisions

#### Decision 1: Web app, not native mobile app
The Figma prototype started as a native mobile app. First-round testing answered the real question — would students use this at all? — and revealed something unexpected: a new installed app created friction before students even got to the routing. A native app asks users to commit before they've seen the value.

We shipped as a web product instead. No download. No login. Open a link, type two buildings, get a route. The barrier to first use dropped to zero — which mattered enormously for a product students had to trust enough to use mid-route, in a coat, in the cold.

**The first prototype wasn't a failed design. It was the research that made the right design obvious.**

#### Decision 2: Scope discipline as a design skill
We made an explicit list of features we were NOT building — and got team sign-off on it in week two. Every time someone suggested adding a feature, we referenced the Scope Statement. Features cut: real-time building hour API updates, turn-by-turn indoor navigation, Minneapolis/St. Paul cross-linking, schedule integration.

Every one of these was a real request from early user interviews. Every one was cut deliberately — not because they weren't valuable, but because they would have made it impossible to ship a reliable core product by December.

#### Decision 3: Two fixes after pilot testing, not ten
Pilot testing produced 10+ feedback items. We implemented exactly two improvements — chosen by impact, not by ease:
1. Tunnel overlay visual weight increased for mobile readability
2. Dropdown menus rebuilt as bottom-sheet components on narrow screens

Both were regression-tested before the December 9 release.

---

### Outcomes

All success metrics were defined **before** building began — not after seeing results.

| Metric | Target | Result |
|---|---|---|
| Routing accuracy | ≥ 90% | ~90% (validated on 20 manual routes) |
| User satisfaction | ≥ 80% | 80%+ post-task survey |
| SUS Score | ≥ 68 (industry avg) | **82/100** |
| Structured feedback responses | ≥ 10 | 10+ collected |
| Usability improvements implemented | ≥ 2 | 2 shipped |
| Bugs resolved | ≥ 50% | 50% resolved pre-launch |
| Mobile adoption | — | **70%** used on phones during navigation |
| Task completion time | — | **45% faster** than PDF maps + scattered building-hours pages |

The 10% routing accuracy gap is entirely attributable to Minneapolis/St. Paul cross-campus connections — a known scope exclusion documented before development began. The tunnels don't connect the campuses. That's a geography problem, not a missing feature.

---

### Lessons Learned

- **The hesitation is the data.** Observing behavior in context reveals what surveys and interviews miss. Students couldn't tell us they were doing a risk calculation — we had to watch them do it.
- **Scope discipline is a design skill.** Cutting features deliberately is harder than adding them. The scope statement saved the project.
- **Test on real devices in real conditions.** The dropdown overflow issue only appeared on phones under 390px width. Lab desktops wouldn't have caught it.
- **AI tools accelerate synthesis, not judgment.** Theme clustering with ChatGPT was faster than manual affinity mapping — but it missed the device-specific bug that came from my own testing log. The judgment call on what to build still required a human.

---

## Other Projects

| Project | Role | Key Outcome |
|---|---|---|
| [Initiator Fellowship Website Redesign](https://chandan-pai.github.io/chandan-portfolio/initiator-fellowship/) | UX Researcher & Accessibility Specialist | 2.3/5 → 4.7/5 usability · 104% improvement · WCAG 2.1 AA |
| [Interactive Repair Guidance — Mercedes-Benz](https://chandan-pai.github.io/chandan-portfolio/mercedes-service-manual/) | Product Researcher | Multi-format prototype · 300% throughput improvement · 40% error reduction |
| [Manufacturing Process Optimization](https://chandan-pai.github.io/chandan-portfolio/manufacturing-workflow/) | Industrial Designer | Lean workflow analysis · Takt time: 13.47 sec/blade |

---

## Tech Stack

This portfolio is built with:
- **Next.js** (App Router)
- **Vanilla CSS** (no framework)
- **GitHub Pages** (deployment via GitHub Actions)

---

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Contact

Open to Human Factors Engineer, UX Researcher, and Industrial Engineer roles — nationwide.

[2000chandanpai@gmail.com](mailto:2000chandanpai@gmail.com) · [LinkedIn](https://www.linkedin.com/in/chandan-umesh-pai/)
