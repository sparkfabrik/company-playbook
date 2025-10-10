/*
title: Sprint Framework
sort: 1
*/

## Introduction

The **Sparkfabrik Sprint Framework** is a work management model developed and tested by Sparkfabrik's Platform Team over several years. Built on **Scrum foundations** and adapted for our specific context, it's designed for development teams operating in multi-client contexts that need to balance planned work, on-demand requests, and internal innovation activities.

We believe that **Scrum** is a great framework, but it needs to be adapted to meet our specific needs and context. Therefore, we have created a *simplified, flexible* version that retains the core principles while allowing for more adaptability.
It is very easy to understand and accessible to teams of all sizes and experience levels.

### Framework Objectives

- **Predictability**: Guarantee deliveries within established timeframes
- **Flexibility**: Handle urgent requests without compromising planning
- **Quality**: Dedicated time to do things right
- **Team Building**: Create collaboration and knowledge sharing
- **Growth**: Protected space for innovation and continuous improvement

> **Ready to start?** Jump to our [Quick Start Guide](#quick-start-guide) for immediate implementation steps.

---

## Quick Start Guide

**New to the Sprint Framework?** Follow this checklist to get your team up and running in one week:

### Before Your First Sprint (1 week prep)

- [ ] **Understand our quality standards**: Make sure the team reads and understand our [Universal Definition of Done](/tools-and-policies/universal-dod)
- [ ] **Setup tools**: Configure GitLab board and Float accounts (see [Tools and Setup](#tools-and-setup))
- [ ] **Define roles**: Assign Delivery Manager and Staff Engineer (see [Roles and Responsibilities](#roles-and-responsibilities))
- [ ] **Choose sprint length**: Start with 2 weeks for new teams (see [Choosing Sprint Duration](#choosing-sprint-duration))
- [ ] **Create initial backlog**: Gather 15-20 issues with basic descriptions
- [ ] **Schedule ceremonies**: Block calendar time for planning, stand-ups, and retrospectives

### Week 1: Your First Sprint

- [ ] **Sprint Planning**: 2-hour session with entire team to select and estimate issues (see [Sprint Planning](#1-sprint-planning-15-2-hours-monday-of-sprint-start))
- [ ] **Daily Standups**: Start with 3 sync + 2 async format (see [Daily Standup](#2-daily-standup))
- [ ] **Time tracking**: Everyone tracks time on Float (and GitLab issues if defined for your team)
- [ ] **Buffer monitoring**: Track urgent requests and buffer usage
- [ ] **Mid-sprint check**: Informal team check-in after 1 week

### After Your First Sprint

- [ ] **Sprint planning for sprint 2**: Review completed work from sprint 1 and plan sprint 2
- [ ] **Start grooming**: Schedule weekly 2-hour grooming sessions (see [Weekly Grooming](#3-weekly-grooming-2-hours))
- [ ] **Apply lessons learned**: Use insights from sprint 1 in your planning
- [ ] **Schedule retrospective**: After sprint 3, conduct your first retrospective

**Need help?** Check the [Troubleshooting](#troubleshooting-and-success-metrics) section for common issues and solutions.

---

## Table of Contents

1. [Introduction](#introduction)
2. [Quick Start Guide](#quick-start-guide)
3. [Model Overview](#model-overview)
   - [Core Principles](#core-principles)
   - [Choosing Sprint Duration](#choosing-sprint-duration)
   - [Process Flow](#process-flow)
4. [Roles and Responsibilities](#roles-and-responsibilities)
   - [Role Mapping](#role-mapping)
   - [Detailed Responsibilities](#detailed-responsibilities)
5. [Tools and Setup](#tools-and-setup)
   - [GitLab Setup](#gitlab-setup)
   - [Float (Capacity Planning)](#float-capacity-planning)
   - [Basic Metrics](#basic-metrics)
   - [Additional Tools](#additional-tools)
6. [Framework Implementation](#framework-implementation)
   - [Framework Components](#framework-components)
   - [Team-Specific Configurations](#team-specific-configurations)
   - [Templates and Checklists](#templates-and-checklists)
7. [Troubleshooting and Success Metrics](#troubleshooting-and-success-metrics)
   - [Common Troubleshooting](#common-troubleshooting)
   - [Success Metrics](#success-metrics)
8. [Gradual Implementation Guide](#gradual-implementation-guide)

---

## Model Overview

- **Sprint Duration**: 1-3 weeks (see "Choosing Sprint Duration" section)
- **Buffer**: 25-30% of available time
- **Cadence**: Sprint planning every 2-3 weeks, retrospectives every 3-4 sprints
- **Tracking**: Dual tracking - GitLab + Float
- **Capacity Planning**: Float automatically calculates available working time considering holidays, conferences, training and other non-work activities

### Core Principles

1. **Capacity-driven planning**: Planning starts from team's available capacity
2. **Protected buffer**: Fixed percentage of time for unexpected work and innovation
3. **Continuous visibility**: Daily standup for constant alignment
4. **Quality focus**: Regular grooming to maintain high issue quality
5. **Learning culture**: Retrospectives for continuous improvement
6. **Time-based estimation**: Using concrete hours/days instead of abstract story points for better planning accuracy

### Choosing Sprint Duration

#### 1-Week Sprints

**When to use**:

- Small teams of people deeply experienced with the framework (maximum adaptability)
- Emergent contexts with small protected buffer (< 20%)
- Small teams (< 5 people) with solid expertise
- Situations with significant more pipelines than team members, small maintenance tasks and short visibility

**Advantages**: Maximum reactivity, quicker planning, easier negotiation with stakeholder
**Disadvantages**: Short-term visibility, hard to fit medium-to-high complexity tasks

#### 2-Week Sprints

**When to use**:

- Teams new to the framework (more feedback loops)
- Projects with volatile requirements
- Small teams (< 5 people) that prefer agility
- Clients requiring very frequent deliveries

**Advantages**: High reactivity, faster corrections, low risk of problem accumulation
**Disadvantages**: Higher planning overhead, less time for complex tasks

#### 3-Week Sprints

**When to use**:

- Mature teams with consolidated processes
- Projects with more complex tasks
- Teams with many different clients (reduces context switching)
- When more time is needed for accurate grooming

**Advantages**: Less overhead, more time for deep work, more accurate planning
**Disadvantages**: Less flexibility, risk of accumulating problems

**Recommendation**: Start with 2 weeks for the first 2-3 sprints, then evaluate moving to 3 weeks when the team is more mature in the process.

### Process Flow

```
    ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
    │  Weekly         │    │  Sprint         │    │  Daily          │
    │  Grooming       │────│  Planning       │────│  Standup        │
    │  (2h)           │    │  (1.5-2h)       │    │  (max 30min)    │
    └─────────────────┘    └─────────────────┘    └─────────────────┘
            │                        │                        │
            │                        ▼                        │
            │              ┌─────────────────┐                │
            │              │  Sprint Work    │◄───────────────┤
            │              │  (70% planned   │                │
            │              │   30% buffer)   │                │
            │              └─────────────────┘                │
            │                        │                        │
            │                        ▼                        │
            │              ┌─────────────────┐                │
            │              │  Next Sprint    │                │
            │              │  Planning       │                │
            │              └─────────────────┘                │
            │                        │                        │
            │                        ▼                        │
            └──────────────► ┌─────────────────┐ ◄────────────┘
                             │  Retrospective  │
                             │  (every 3-4     │
                             │   sprints)      │
                             └─────────────────┘
```

**Key Flow Points:**

- **Grooming** prepares issues for upcoming sprints (see [Weekly Grooming](#3-weekly-grooming-2-hours))
- **Planning** reviews previous sprint and selects new work based on capacity (see [Sprint Planning](#1-sprint-planning-15-2-hours-monday-of-sprint-start))
- **Daily rhythm** keeps team aligned and surfaces blockers
- **Buffer time** handles unexpected work and innovation
- **Retrospectives** drive continuous improvement (see [Retrospectives](#4-retrospectives-2-hours-every-3-4-sprints))

---

## Roles and Responsibilities

### Role Mapping

The Sprint Framework adapts traditional Scrum roles to fit our organizational context:

| Traditional Scrum | Sprint Framework | Key Responsibilities |
|-------------------|------------------------------|---------------------|
| **Scrum Master** | **Delivery Manager (DM)** | Facilitates processes, removes impediments, manages client priorities |
| **Product Owner** | **Staff Engineer** | Ensures technical quality, owns grooming, validates technical decisions |
| **Development Team** | **Team Members** | Cross-functional team delivering value, participating actively in all ceremonies |

**Key Difference**: Unlike traditional Scrum where the Product Owner owns the product backlog, our Staff Engineer focuses on technical excellence while the Delivery Manager handles prioritization and stakeholder management.

> **Note**: Role assignment is crucial for framework success. See [Team-Specific Configurations](#team-specific-configurations) for adaptations in small teams where one person may cover multiple roles.

### Detailed Responsibilities

#### Delivery Manager (DM)

- Facilitates sprint planning and retrospectives (see [Framework Components](#framework-components))
- Manages priorities and conflicts between clients
- Monitors buffer usage (see [Success Metrics](#success-metrics) for tracking guidelines)
- Interfaces with external stakeholders
- Removes impediments

#### Staff Engineer

- Ensures technical quality of issues
- Conducts grooming sessions (see [Weekly Grooming](#3-weekly-grooming-2-hours))
- Validates technical and architectural choices
- Technical mentoring and pairing
- Manages technical debt

#### Team Leader

- Owns grooming, planning, standups and review
- Oversees the assignation of activitied, tasks and issues
- Coaches the team on the working methodology, enforcing it with the team
- Makes sure retrospective actions / policies are addressed
- Removes impediments

#### Team Members

- Actively participate in planning
- Time tracking on GitLab for work activities (see [GitLab Setup](#gitlab-setup))
- Update Float with holidays, conferences, training (see [Float (Capacity Planning)](#float-capacity-planning))
- Knowledge sharing during standup
- Contribute to grooming (voluntary)
- Execute assigned tasks

---

## Tools Setup

### GitLab Setup (**EXPERIMENTAL**)

> **Note**: This GitLab arrangement is experimental and intended only for teams that serve many different clients, handle frequent emergent issues, and face continuously shifting priorities (for example maintenance teams). Those who are focused on a single, long‑running project should not adopt this model. Use it cautiously and evaluate its fit for your context before rolling it out.

- **Single board** to track all work
- **Client labels** to filter and organize
- **Per-sprint milestones** to collect the sprint scope
- **Issue templates** for work standardization (see [GitLab Issue Templates](https://playbook.sparkfabrik.com/tools-and-policies/gitlab-issue-templates))
- **Time-based estimates** using `/estimate` command on issues (e.g., `/estimate 2d` for 2 days, `/estimate 4h` for 4 hours)
- **Active time tracking** on all issues

### Float (Capacity Planning)

- **Capacity planning**: Track holidays, conferences, training, and other non-work activities
- **Available time calculation**: Float automatically calculates actual working capacity by subtracting non-work time when viewing reports
- **Team reporting**: Select team (department) and date range to view capacity reports with time-offs already considered
- **Sprint planning input**: Use Float's calculated capacity data for upcoming sprint planning
- **Hours → days conversion**: 1 day = 8 hours for planning purposes
- **Time fractions management**: Half day = 4h for partial availability

### Basic Metrics (keep them tracked )

- Velocity (completed estimated items per sprint)
- Estimate vs Actual Completion Time
- Percentage of sprint backlog actually completed
- Buffer usage by type / reason

## Additional Tools and practical tips

### Useful tools

- **[Retrium.com](https://retrium.com)**: Online retrospective facilitation platform (used in [Retrospectives](#4-retrospectives-2-hours-every-3-4-sprints))
- **[Thunderdome.dev](http://thunderdome.dev/)**: Poker planning tool for collaborative estimation during [Sprint Planning](#1-sprint-planning-15-2-hours-monday-of-sprint-start)

### Practical tips

- Use **Google Meet AI Notetaking** to take summaries of [standups](#2-daily-standup) or other discussions.
- Query **SparkFabrik Intelligence**, our AI-powered Slack participant, about our policies, tools, and every [books mentioned in the opening chapter](/working-methods/methods).
- Focus on the **quality of requirement and specs**, both as a starting point for estimation, and as an input for GenAI coding and planning tools.

---

## Framework Implementation

### Framework Components

#### 1. Sprint Planning (1.5-2 hours, Monday of sprint start)

**Participants**: Entire team (mandatory attendance for all team members)
**Duration**: 1.5h for 2-week sprints, 2h for 3-week sprints
**Format**: All team members participate together in a single session
**Agenda**:

- Review previous sprint (30 min)
- Calculate available capacity using Float data (15 min)
- Issue selection and discussion with collaborative estimation using [Thunderdome.dev](http://thunderdome.dev/) (60 min)
- Final commit and goal definition (15 min)

**Output**:

- GitLab milestone with assigned issues
- Allocated capacity (70% planned + 30% buffer)
- Clear and shared sprint goals

#### 2. Daily Standup

**Mixed format**:

- 3 synchronous standups per week (max 30 min)
- 2 asynchronous updates on Slack

**Structure**:

- What I did yesterday
- What I'll do today
- Blocks or support needed
- Buffer usage update

#### 3. Weekly Grooming (2 hours)

**Participants**: Staff Engineer + Delivery Manager + volunteers
**Objectives**:

- Prepare issues for upcoming sprints
- Define scope and acceptance criteria
- Identify dependencies and risks
- Estimate complexity/effort using `/estimate` command (e.g., `/estimate 1d`, `/estimate 4h`) (use [Thunderdome.dev](http://thunderdome.dev/) for collaborative sessions)

> **Note**: We use time-based estimates (hours/days) rather than story points for more concrete planning. Grooming is voluntary but highly encouraged to maintain issue quality. Be careful about the time spent on grooming to avoid it becoming a bottleneck.

#### 4. Retrospectives (2 hours, every 3-4 sprints)

**Facilitator**: Delivery Manager, Senior colleague or HR coach if necessary
**Format**: The team selects the most suitable format for the purpose of each retrospective (we use [Retrium.com](https://retrium.com) for online facilitation)
**Output**: Issue with trackable action items

### Team-Specific Configurations

#### Maintenance/Support Teams

- **Short sprints**: 1 or 2 weeks for greater reactivity (see [Choosing Sprint Duration](#choosing-sprint-duration))
- **Larger buffer**: 35-40% to handle emergencies (vs standard 25-30%)
- **Project rotation**: Avoid competence silos
- **Proactive communication**: Alert clients about response times
- **Activity mix**: 70% maintenance + 30% innovation/training

#### Long-term Project Teams

- **Long sprints**: 3 weeks for focus on complex tasks (see [Choosing Sprint Duration](#choosing-sprint-duration))
- **More focused sprints**: Less context switching
- **Smaller buffer**: 25-30% sufficient (standard buffer guidelines)
- **Intermediate milestones**: More frequent checkpoints
- **More frequent retrospectives**: Every 2-3 sprints for critical projects (vs standard 3-4)

#### Small Teams (< 5 people)

- **Reduced sprint planning**: 1-1.5 hours regardless of duration, but still with entire team (see [Sprint Planning](#1-sprint-planning-15-2-hours-monday-of-sprint-start))
- **More informal dailies**: Even just async checks (see [Daily Standup](#2-daily-standup))
- **Integrated grooming**: During sprint planning instead of separate sessions
- **Multiple roles**: DM and Staff Engineer same person (see [Role Mapping](#role-mapping))

### Templates and Checklists

#### Pre-Sprint Planning Checklist

- [ ] Team capacity calculated using Float
- [ ] Issues prioritized and groomed
- [ ] Dependencies identified
- [ ] Buffer allocated
- [ ] Stakeholders informed

#### Standard Issue Template

See [GitLab Issue Templates](https://playbook.sparkfabrik.com/tools-and-policies/gitlab-issue-templates) for standardized templates to use.

#### Retrospective Checklist

- [ ] *No later than the day before:* Facilitator must query the team about - or take a look at - the most prominent topics that need discussion
- [ ] *Within 1 hour before the retro:* Facilitator must decide the format and prepare the room on Retrium
- [ ] *During the retrospective:* Don't play finger-pointing, focus on improvement, generate practical action items
- [ ] *Within 1 hour after the retro:* Facilitator summarizes the outcome and actions decided upon to the team in a place that stays visible up to the next retro
- [ ] *Withing the next planning / grooming* (whatever comes first): All actions that need to be tracked are created as issues by the facilitator (can delegate someone in the team)

---

## Troubleshooting and Success Metrics

### Common Troubleshooting

#### "We don't have time to do this"

**Causes**: Always in reactive mode, everything feels urgent, no protected time for improvement

**Solutions**:

- **Use the buffer**: 30% buffer includes time for learning/improvement, not just emergencies
- **Sprint planning protection**: Block specific time slots for non-urgent activities
- **Micro-investments**: Start with 15-30 min sessions instead of longer blocks
- **Make it visible**: Add learning/improvement tasks to sprint as real work items
- **Pair activities**: Combine learning with actual work (e.g., research while fixing)
- **Management enforcement**: DM/Staff Engineer must protect time for strategic activities

#### "We never manage to close sprints"

**Causes**: Inaccurate estimates, scope creep, excessive interruptions

**Solutions**:

- More granular issue breakdown (max 1 day estimates)
- Post-mortem on issues that exceed estimates by 150%+
- Better buffer protection (see [Core Principles](#core-principles) for buffer guidelines)
- Review capacity calculation accuracy (see [Float (Capacity Planning)](#float-capacity-planning))
- Limit work in progress (focus on clearing queues at bottlenecks)

#### "Buffer is never enough"

**Causes**: Too much on-demand work, poor priority management

**Solutions**:

- **Either** temporarily increase buffer (see [Team-Specific Configurations](#team-specific-configurations) for guidance) **or** reduce the sprint duration, so non-vital stuff is at most one week ahead and the plan can be preserved.
- Track types of urgent requests for better planning (check contracts)
- Surface and enforce response times contract provisions with stakeholders (negotiate whenever possible)
- Review [Delivery Manager responsibilities](#delivery-manager-dm) for priority management

#### "Estimates are always wrong"

**Causes**: Poorly defined issues, underestimated complexity

**Solutions**:

- More accurate grooming with detailed tasks breakdown
- Involve actual assegnees in estimation process (see [Weekly Grooming](#3-weekly-grooming-2-hours))
- Create a template checklist for estimation
- Break down tasks to maximum 1 day estimates for better accuracy
- Use [Thunderdome.dev](http://thunderdome.dev/) for collaborative estimation during planning

#### "Team doesn't collaborate"

**Causes**: Competence silos, lack of incentives

**Solutions**:

- Forced rotation during planning (see [Sprint Planning](#1-sprint-planning-15-2-hours-monday-of-sprint-start))
- Mandatory pairing on complex tasks
- Retrospectives focused on team building (see [Retrospectives](#4-retrospectives-2-hours-every-3-4-sprints))
- Organize immediate knowledge sharing right after [Daily Standups](#2-daily-standup), whenever necessary

### Success Metrics

#### Positive Indicators

- Sprint completion rate > 80%
- Estimate accuracy ±20%
- Emergency response time < 2h
- Growing team satisfaction
- Reduced context switching

#### Red Flags

- Constant buffer consumption > 50%
- Issues rolling over for 2 or more sprints
- Frequent overtime
- Reactive instead of proactive client communication

---

## Gradual Implementation Guide

For teams wanting to adopt the Sprint Framework progressively, we recommend a phased approach that allows for gradual adaptation without overwhelming the team.

> **Need faster setup?** Check our [Quick Start Guide](#quick-start-guide) for immediate implementation in one week.

### Phase 1: Foundation (Sprint 1-2)

**Implement**:

- Sprint planning
- Dedicated buffer (30-35%)
- Structured daily standups
- GitLab tracking

**Keep unchanged**:

- Existing tools
- Escalation processes
- Client communication

**Goals**: Establish basic rhythm and get comfortable with sprint boundaries and buffer concept.

### Phase 2: Evolution (Sprint 3+)

**Add**:

- Weekly grooming
- Scheduled retrospectives
- Standardized issue templates
- Metrics and reporting

**Goals**: Improve quality and predictability through better preparation and continuous improvement.

### Implementation Tips

- **Start small**: Don't change everything at once
- **Communicate**: Keep stakeholders informed about the transition
- **Measure**: Track basic metrics from day one
- **Adapt**: Use retrospectives to adjust the framework to your context
- **Be patient**: Allow 2-3 sprints for the team to get comfortable with each phase
- **Stop starting, start finishing**: Bring tasks to actual delivery before taking up more work
