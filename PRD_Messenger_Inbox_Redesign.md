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

## 7. Inbox Cleanup Tools

Users need efficient ways to remove low-value conversations from their inbox. The system provides three complementary cleanup mechanisms: swipe-to-archive for quick single actions, an inline review card for guided batch cleanup, and long-press selection for manual bulk operations.

### 7.1 Swipe to Archive
- **Gesture:** Swipe left on any conversation row to reveal an archive action
- **Threshold:** Swiping past 40% of the row width triggers the archive
- **Feedback:** Row slides out with animation; undo toast appears at bottom
- **Scope:** Available on all conversations in all tabs
- **Swipe hint:** On first encounter with an ad conversation, a brief animation demonstrates the swipe gesture with a "Swipe to archive" label

### 7.2 Inline Review Card
- **Trigger:** Appears automatically when 3 or more inactive ad conversations exist (ad-initiated, user never replied)
- **Position:** Injected after the 3rd conversation row in the list
- **Visibility:** Shown in the "All" tab and "Pages → All" sub-tab
- **Actions:**
  - **Archive All** — Archives all inactive ad conversations at once
  - **Review** — Navigates to "Pages → Requested" for individual review
  - **Dismiss** — Hides the card for the current session
- **Feedback:** Archive All shows undo toast with count of archived conversations

### 7.3 Long-Press to Select & Bulk Archive
- **Entry:** Long-press (500ms hold) any conversation row to enter selection mode; that row becomes selected
- **Selection mode UI:**
  - **Selection toolbar** replaces the top bar — X button (left) to exit, "{N} selected" count (center), "Select All" / "Deselect All" toggle (right)
  - **Checkboxes** appear on each conversation row over the avatar area (animated blue check when selected, empty circle when unselected)
  - **Selected rows** display a light blue background
  - **Action bar** replaces the bottom navigation — full-width "Archive ({N})" button, disabled when none selected
- **Interactions in selection mode:**
  - Tap any row to toggle its selection (does not open chat)
  - Swipe gestures are disabled while in selection mode
  - "Select All" selects all visible conversations in the current tab/filter
- **Exit selection mode:**
  - Tap X button in the toolbar
  - Archive selected conversations (exits automatically after archiving)
- **Feedback:** Archiving shows undo toast with count; undo restores all archived conversations
- **Gesture coordination:** Long-press and swipe use the same initial touch point — horizontal movement (>5px) cancels the long-press timer and initiates swipe; holding still for 500ms triggers selection mode

### 7.4 Undo Support
- All archive actions (swipe, review card, bulk) show an undo toast
- Toast appears above the bottom navigation for 5 seconds
- "Undo" restores all conversations from the most recent archive action
- Toast auto-dismisses with a fade-out animation

---

## 8. Conversation Interaction Rules

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

## 9. Navigation Structure

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

## 10. UX Requirements

- Mobile-first design
- Familiar messaging layout (no radical redesign of chat UI)
- Clear tab visibility (top or bottom navigation)
- Fast switching between tabs
- Consistent unread indicators across all views

---

## 11. Success Metrics

| Metric | Type |
|---|---|
| Reduced time to find past conversations | Quantitative |
| Increased successful retrieval of group chats | Quantitative |
| Lower user-reported "can't find chat" complaints | Quantitative |
| Increased engagement with relevant Pages conversations | Quantitative |
| Reduced perceived inbox clutter | Qualitative |
| Adoption rate of swipe-to-archive gesture | Quantitative |
| Bulk archive usage (long-press selection) | Quantitative |
| Review card engagement (Archive All vs Review vs Dismiss) | Quantitative |
| Undo rate after archive actions | Quantitative |

---

## 12. Future Considerations *(Out of Scope)*

- AI-based prioritization of chats
- Smart inbox sorting beyond recency
- Search-first navigation model

---

## 13. Summary

This redesign introduces a structured, filter-based inbox for Messenger that preserves simplicity while solving core usability issues:

- **Clutter reduction** — Ad and one-off chats are isolated in Pages → Requested
- **Improved discoverability** — Tab filters let users navigate by conversation type
- **Clearer separation** — Personal, group, and transactional messages are distinct
- **Efficient cleanup** — Swipe-to-archive, inline review cards, and long-press bulk selection give users multiple ways to clean up their inbox at different scales

The system maintains chronological integrity in "All" while giving users control through meaningful filters and cleanup tools.
