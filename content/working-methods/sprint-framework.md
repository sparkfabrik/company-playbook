/*
title: Sprint Framework (scrummish)
sort: 1
*/

## Introduction

The **Sparkfabrik Sprint Framework** is a work management model developed and tested by Sparkfabrik's Platform Team over several years. Built on **Scrum foundations** and adapted for our specific context, it's designed for development teams operating in multi-client contexts that need to balance planned work, on-demand requests, and internal innovation activities.

We believe that **Scrum** is a great framework, but it needs to be adapted to meet our specific needs and context. Therefore, we have created a *simplified, flexible* version that retains the core principles while allowing for more adaptability.
It is very easy to understand and accessible to teams of all sizes and experience levels.

On this page, we describe the core **principles of the framework, the ceremonies, roles, and tools that make it effective**. We do not cover detailed practices such as how to write a good story, estimate effectively, or conduct a retrospective. Most of these practices can already be found in this playbook or in the literature, or you can simply ask your colleagues for help.

### Framework Objectives

- **Predictability**: Guarantee deliveries within established timeframes
- **Flexibility**: Handle urgent requests without compromising planning
- **Quality**: Dedicated time to do things right
- **Team Building**: Create collaboration and knowledge sharing
- **Growth**: Protected space for innovation and continuous improvement

---

## Key Roles and Stakeholders

The Sprint Framework adapts traditional Scrum roles to fit our organizational context:

| Traditional Scrum | Sparkfabrik Sprint Framework | Key Responsibilities |
|-------------------|------------------------------|---------------------|
| **Scrum Master** | **Delivery Manager (DM)** | Facilitates processes, removes impediments, manages client priorities |
| **Product Owner** | **Staff Engineer** | Ensures technical quality, owns grooming, validates technical decisions |
| **Development Team** | **Team Members** | Cross-functional team delivering value, participating actively in all ceremonies |

**Key Difference**: Unlike traditional Scrum where the Product Owner owns the product backlog, our Staff Engineer focuses on technical excellence while the Delivery Manager handles prioritization and stakeholder management.

---

## Model Overview

- **Sprint Duration**: 2-3 weeks (see "Choosing Sprint Duration" section)
- **Buffer**: 25-30% of available time
- **Cadence**: Sprint planning every 2-3 weeks, retrospectives every 3-4 sprints
- **Tracking**: Dual tracking - GitLab + Float
- **Capacity Planning**: Float to track available working time (- holidays, conferences, training and other non-work activities)

### Core Principles

1. **Capacity-driven planning**: Planning starts from team's available capacity
2. **Protected buffer**: Fixed percentage of time for unexpected work and innovation
3. **Continuous visibility**: Daily standup for constant alignment
4. **Quality focus**: Regular grooming to maintain high issue quality
5. **Learning culture**: Retrospectives for continuous improvement

---

## Choosing Sprint Duration

### 2-Week Sprints

**When to use**:

- Teams new to the framework (more feedback loops)
- Projects with volatile requirements
- Small teams (< 5 people) that prefer agility
- Clients requiring very frequent deliveries

**Advantages**: More reactivity, faster corrections, less risk of problem accumulation
**Disadvantages**: Higher planning overhead, less time for complex tasks

### 3-Week Sprints

**When to use**:

- Mature teams with consolidated processes
- Projects with more complex tasks
- Teams with many different clients (reduces context switching)
- When more time is needed for accurate grooming

**Advantages**: Less overhead, more time for deep work, more accurate planning
**Disadvantages**: Less flexibility, risk of accumulating problems

### Recommendation

**Start with 2 weeks** for the first 2-3 sprints, then evaluate moving to 3 weeks when the team is more mature in the process.

---

## Framework Components

### 1. Sprint Planning (1.5-2 hours, Monday of sprint start)

**Participants**: Entire team
**Duration**: 1.5h for 2-week sprints, 2h for 3-week sprints
**Agenda**:

- Review previous sprint (30 min)
- Calculate available capacity using Float data (15 min)
- Issue selection and discussion (60 min)
- Final commit and goal definition (15 min)

**Output**:

- GitLab milestone with assigned issues
- Allocated capacity (70% planned + 30% buffer)
- Clear and shared sprint goals

### 2. Daily Standup

**Mixed format**:

- 3 synchronous standups per week (15 min)
- 2 asynchronous updates on Slack

**Structure**:

- What I did yesterday
- What I'll do today
- Blocks or support needed
- Buffer usage update

### 3. Weekly Grooming (2 hours)

**Participants**: Staff Engineer + Delivery Manager + volunteers
**Objectives**:

- Prepare issues for upcoming sprints
- Define scope and acceptance criteria
- Identify dependencies and risks
- Estimate complexity using `/estimate` command (e.g., `/estimate 1d`, `/estimate 4h`)

> **Note**: Grooming is voluntary but highly encouraged to maintain issue quality. Be careful about the time spent on grooming to avoid it becoming a bottleneck.

### 4. Retrospectives (2 hours, every 3-4 sprints)

**Facilitator**: Delivery Manager or senior figure
**Format**: Freely chosen by the team
**Output**: Issue with trackable action items

---

## Roles and Responsibilities

### Delivery Manager (DM)

- Facilitates sprint planning and retrospectives
- Manages priorities and conflicts between clients
- Monitors buffer usage
- Interfaces with external stakeholders
- Removes impediments

### Staff Engineer

- Ensures technical quality of issues
- Conducts grooming sessions
- Validates technical and architectural choices
- Technical mentoring and pairing
- Manages technical debt

### Team Members

- Actively participate in planning
- Time tracking on GitLab for work activities
- Update Float with holidays, conferences, training
- Knowledge sharing during standup
- Contribute to grooming (voluntary)
- Execute assigned tasks

---

## Tools and Setup

### GitLab Setup

- **Single board** to track all work
- **Client labels** to filter and organize
- **Milestone = Sprint** to group work
- **Active time tracking** on all issues
- **Issue templates** for work standardization (see [GitLab Issue Templates](https://playbook.sparkfabrik.com/tools-and-policies/gitlab-issue-templates))
- **Estimates** using `/estimate` command on issues (e.g., `/estimate 2d` for 2 days)

### Float (Capacity Planning)

- **Capacity planning**: Track holidays, conferences, training, and other non-work activities
- **Available time calculation**: Subtract non-work time to get actual working capacity
- **Sprint planning input**: Use Float data to calculate team capacity for upcoming sprint
- **Hours → days conversion**: 1 day = 8 hours for planning purposes
- **Time fractions management**: Half day = 4h for partial availability

### Basic Metrics

- Velocity (story points per sprint)
- Estimate vs Actual Time
- Percentage of issues completed per sprint
- Buffer usage by type

---

## Gradual Implementation

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

### Phase 2: Evolution (Sprint 3+)

**Add**:

- Weekly grooming
- Scheduled retrospectives
- Standardized issue templates
- Metrics and reporting

---

## Team Type Adaptations

### Maintenance/Support Teams

- **Short sprints**: 2 weeks for greater reactivity
- **Larger buffer**: 35-40% to handle emergencies
- **Project rotation**: Avoid competence silos
- **Proactive communication**: Alert clients about response times
- **Activity mix**: 70% maintenance + 30% innovation/training

### Long-term Project Teams

- **Long sprints**: 3 weeks for focus on complex tasks
- **More focused sprints**: Less context switching
- **Smaller buffer**: 25-30% sufficient
- **Intermediate milestones**: More frequent checkpoints
- **More frequent retrospectives**: Every 2-3 sprints for critical projects

### Small Teams (< 5 people)

- **Reduced sprint planning**: 1-1.5 hours regardless of duration
- **More informal dailies**: Even just async checks
- **Integrated grooming**: During sprint planning
- **Multiple roles**: DM and Staff Engineer same person

---

## Templates and Checklists

### Pre-Sprint Planning Checklist

- [ ] Team capacity calculated using Float (subtract holidays/training/conferences)
- [ ] Issues prioritized and groomed
- [ ] Dependencies identified
- [ ] Buffer allocated
- [ ] Stakeholders informed

### Standard Issue Template

See [GitLab Issue Templates](https://playbook.sparkfabrik.com/tools-and-policies/gitlab-issue-templates) for standardized templates to use.

### Retrospective Checklist

- [ ] What went well?
- [ ] What went poorly?
- [ ] What can we improve?
- [ ] Action items with owner and deadline
- [ ] Issue created for follow-up tracking

---

## Common Troubleshooting

### "We don't have time to do this"

**Causes**: Always in reactive mode, everything feels urgent, no protected time for improvement

**Solutions**:

- **Use the buffer**: 30% buffer includes time for learning/improvement, not just emergencies
- **Sprint planning protection**: Block specific time slots for non-urgent activities
- **Micro-investments**: Start with 15-30 min sessions instead of longer blocks
- **Make it visible**: Add learning/improvement tasks to sprint as real work items
- **Pair activities**: Combine learning with actual work (e.g., research while fixing)
- **Management enforcement**: DM/Staff Engineer must protect time for strategic activities

### "We never manage to close sprints"

**Causes**: Inaccurate estimates, scope creep, excessive interruptions

**Solutions**:

- More granular issue breakdown (max 1 day)
- Post-mortem on issues that exceed estimates by 150%+
- Better buffer protection

### "Buffer is never enough"

**Causes**: Too much on-demand work, poor priority management

**Solutions**:

- Temporarily increase buffer
- Track types of urgent requests
- Stakeholder education on response times

### "Estimates are always wrong"

**Causes**: Poorly defined issues, underestimated complexity

**Solutions**:

- More accurate grooming
- Involve those who will do the work in estimates
- Template for estimation checklist

### "Team doesn't collaborate"

**Causes**: Competence silos, lack of incentives

**Solutions**:

- Forced rotation during planning
- Mandatory pairing on complex tasks
- Retrospectives focused on team building

---

## Success Metrics

### Positive Indicators

- Sprint completion rate > 80%
- Estimate accuracy ±20%
- Emergency response time < 2h
- Growing team satisfaction
- Reduced context switching

### Red Flags

- Constant buffer consumption > 50%
- Issues sliding 2+ sprints
- Frequent overtime
- Reactive instead of proactive client communication

