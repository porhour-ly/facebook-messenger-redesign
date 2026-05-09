# Messenger Inbox Redesign Prototype

An interactive prototype exploring a redesigned Facebook Messenger inbox with structured navigation and inbox cleanup tools. Built to demonstrate how tab-based organization and multiple cleanup mechanisms can solve common pain points: poor discoverability of past conversations, inbox clutter from mixed conversation types, and noise from ad-initiated messages.

## Problem Statement

The current Messenger inbox treats all conversations equally, leading to:
- **Poor discoverability** -- finding old group chats or specific conversations requires scrolling through an unorganized list
- **Inbox clutter** -- personal chats, group chats, business pages, and marketplace threads are all mixed together
- **Low-value message noise** -- ad-initiated and one-off business messages push important conversations down

## Features

### Tab-Based Navigation
Five main tabs to filter conversations by type:
- **All** -- chronological view of every conversation
- **Friends** -- personal 1:1 conversations
- **Groups** -- group chats only
- **Pages** -- business and page conversations (with sub-tabs: All, Engaged, Requested)
- **Marketplace** -- buy/sell conversations

Each tab displays a real-time unread count badge.

### Inbox Cleanup Tools

**Swipe-to-Archive** -- swipe left on any conversation to archive it, with undo support.

**Inline Review Card** -- automatically surfaces when 3+ inactive ad conversations exist, offering bulk "Archive All", individual "Review", or "Dismiss" options.

**Long-Press Bulk Selection** -- hold a conversation for 500ms to enter selection mode with checkboxes, "Select All" toggle, and a bulk archive action bar.

**Undo Toast** -- 5-second undo notification after any archive action to recover conversations.

### Chat View
- Message history with timestamps
- Send messages with auto-reply simulation
- Slide-in animation transitions

## Tech Stack

- **Next.js** 14.2 (App Router)
- **React** 18.3 with TypeScript
- **Tailwind CSS** 3.4

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
cd messenger-prototype
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app renders in a mobile phone frame (440x956px) for realistic preview.

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
messenger-prototype/
├── app/
│   ├── layout.tsx             # Root layout with mobile phone frame
│   ├── page.tsx               # Main inbox logic and state management
│   └── globals.css            # Global styles and Tailwind config
├── components/
│   ├── TopBar.tsx             # Header with search and icons
│   ├── TabBar.tsx             # Main 5-tab navigation
│   ├── SubTabBar.tsx          # Pages sub-navigation
│   ├── ConversationList.tsx   # Conversation list with review card injection
│   ├── ConversationRow.tsx    # Individual conversation display
│   ├── SwipeableConversationRow.tsx  # Swipe-to-archive gesture
│   ├── ReviewCard.tsx         # Inline bulk review card
│   ├── SelectionTopBar.tsx    # Bulk selection header
│   ├── SelectionActionBar.tsx # Bulk selection actions
│   ├── ChatView.tsx           # Chat detail view
│   ├── MessageBubble.tsx      # Message bubble component
│   ├── UndoToast.tsx          # Archive undo notification
│   ├── BottomNav.tsx          # Bottom navigation bar
│   ├── ActiveNowRow.tsx       # Active friends section
│   ├── CleanupMode.tsx        # Cleanup feature UI
│   └── InboxInsightsBanner.tsx # Informational banner
├── data/
│   └── conversations.ts      # Mock data (35+ conversations)
└── PRD_Messenger_Inbox_Redesign.md  # Product requirements document
```

## Design Decisions

- **Client-side only** -- no backend; all data is mocked for rapid prototyping
- **Mobile-first** -- rendered in a fixed phone frame to match the target platform
- **Messenger blue theme** (`#0084FF`) with custom Tailwind color tokens
- **Gesture-based interactions** -- swipe and long-press patterns match native mobile conventions
- **Progressive cleanup** -- three escalating mechanisms (swipe single, review card batch, bulk select) let users choose their preferred cleanup flow

## License

This is a design prototype for demonstration purposes.
