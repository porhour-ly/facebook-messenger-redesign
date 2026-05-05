# PRD: Messenger Inbox Redesign (Structured Navigation System)

## 1. Overview

This product redesign improves the inbox experience of Facebook Messenger by introducing a structured navigation system that reduces clutter and improves discoverability of conversations.

The current inbox mixes all conversation types (personal, group, business, marketplace, ads) into a single chronological feed, making it difficult for users to locate specific chats and manage communication effectively.

---

## 2. Problem Statement

Users struggle with three main issues:

- **Poor discoverability** — Difficult to find past group chats or specific conversations
- **Inbox clutter** — All conversation types are mixed in one feed
- **Low-value message noise** — Ad-initiated and one-off business messages clutter meaningful conversations

Despite this, business-related conversations (including ads) must remain accessible for platform integrity and commercial value.

---

## 3. Goals

### User Goals
- Quickly find important conversations
- Reduce clutter from low-value or one-off chats
- Easily separate personal, group, and transactional messages

### Business Goals
- Preserve visibility of ad-initiated conversations
- Maintain engagement with Pages and Marketplace chats
- Avoid removing or hiding any message types

---

## 4. Non-Goals

- No removal of ads or business conversations
- No AI-driven prioritization in "All"
- No redesign of individual chat UI (focus is inbox only)
- No elimination of chronological ordering in "All"

---

## 5. Core Information Architecture

The inbox is structured into five primary tabs:

### 1. All
- Displays **ALL** conversations
- Strictly sorted by recency (latest activity first)
- Includes: Friends, Groups, Pages, Marketplace
- No filtering or ranking logic beyond time

### 2. Friends
- Only 1:1 personal conversations
- Sorted by recency
- Excludes groups, pages, marketplace

### 3. Groups
- All group conversations
- Sorted by recency

### 4. Pages
- Business and page conversations only
- Sub-navigation:
  - **All** — All page conversations. Shows "From Ad" label on conversations whose most recent page message originated from an ad.
  - **Engaged** — Conversations where the user has replied at least once
  - **Requested** — Conversations where the user has never replied (currently limited to ad-initiated messages, but extensible to other request types)
- Rules:
  - A conversation is "Requested" when the user has never responded to the page
  - If a user replies → conversation moves to **Engaged** and the "From Ad" label is removed
  - The "You opened this chat through an ad. View ad" banner remains in chat history regardless of engagement
  - A conversation can be in Engaged but still show a "From Ad" label if the most recent page message was an ad

### 5. Marketplace
- All buying/selling conversations
- Sorted by recency
- Represents transactional communication threads

---

## 6. Key User Experience Principles

### 6.1 Predictability
"All" is always a raw chronological feed — no hidden ranking logic.

### 6.2 Mental Separation
Users can filter by relationship type (Friends, Groups, Pages).

### 6.3 Clutter Containment
Ads and one-off business chats are contained within **Pages → Requested**.

### 6.4 Minimal Cognitive Load
Simple tab-based navigation with no complex AI sorting layers.

---

## 7. Interaction Rules

### Message Classification
Conversations exist in one system but are filtered into multiple views.

### Pages Behavior
- "Requested" → default state for conversations where the user has never replied
- On user reply → moves automatically to "Engaged" and "From Ad" label is cleared
- "From Ad" label → shown when the most recent page message originated from an ad (independent of Engaged/Requested status)

### Marketplace Behavior
- Treated as a separate transactional system
- Sorted strictly by recency

---

## 8. Navigation Structure

**Top-level tabs:**

| Tab | Description |
|---|---|
| All | All conversations, chronological |
| Friends | 1:1 personal chats only |
| Groups | Group conversations |
| Pages | Business & page chats |
| Marketplace | Buying/selling threads |

**Pages sub-tabs:**

| Sub-tab | Description |
|---|---|
| All | All page conversations (with "From Ad" label where applicable) |
| Engaged | Conversations where the user has replied |
| Requested | Conversations where the user has never replied |

---

## 9. UX Requirements

- Mobile-first design
- Familiar messaging layout (no radical redesign of chat UI)
- Clear tab visibility (top or bottom navigation)
- Fast switching between tabs
- Consistent unread indicators across all views

---

## 10. Success Metrics

| Metric | Type |
|---|---|
| Reduced time to find past conversations | Quantitative |
| Increased successful retrieval of group chats | Quantitative |
| Lower user-reported "can't find chat" complaints | Quantitative |
| Increased engagement with relevant Pages conversations | Quantitative |
| Reduced perceived inbox clutter | Qualitative |

---

## 11. Future Considerations *(Out of Scope)*

- AI-based prioritization of chats
- Smart inbox sorting beyond recency
- Search-first navigation model
- Automatic archiving of inactive chats

---

## 12. Summary

This redesign introduces a structured, filter-based inbox for Messenger that preserves simplicity while solving core usability issues:

- **Clutter reduction** — Ad and one-off chats are isolated in Pages → Requested
- **Improved discoverability** — Tab filters let users navigate by conversation type
- **Clearer separation** — Personal, group, and transactional messages are distinct

The system maintains chronological integrity in "All" while giving users control through meaningful filters.
