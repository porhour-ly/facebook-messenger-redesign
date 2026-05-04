export type Message = {
  id: string;
  senderId: string;
  text: string;
  timestamp: number;
};

export type User = {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
};

export type Conversation = {
  id: string;
  participants: User[];
  messages: Message[];
  lastMessage: string;
  lastMessageTime: string;
  unread: boolean;
  category: "friends" | "groups" | "pages" | "marketplace";
  pageSubCategory?: "engaged" | "from_ads";
  isGroup: boolean;
};

export const currentUser: User = {
  id: "me",
  name: "You",
  avatar: "",
  isOnline: true,
};

export const users: User[] = [
  { id: "1", name: "Sarah Chen", avatar: "SC", isOnline: true },
  { id: "2", name: "Mike Johnson", avatar: "MJ", isOnline: true },
  { id: "3", name: "Emma Wilson", avatar: "EW", isOnline: false },
  { id: "4", name: "Alex Rivera", avatar: "AR", isOnline: true },
  { id: "5", name: "Jordan Lee", avatar: "JL", isOnline: false },
  { id: "6", name: "Taylor Swift Fan Club", avatar: "TS", isOnline: false },
  { id: "7", name: "React Developers", avatar: "RD", isOnline: false },
  { id: "8", name: "Weekend Hikers", avatar: "WH", isOnline: false },
  { id: "9", name: "TechStore Official", avatar: "TO", isOnline: true },
  { id: "10", name: "FoodieDeals", avatar: "FD", isOnline: false },
  { id: "11", name: "Nike Running", avatar: "NR", isOnline: true },
  { id: "12", name: "Marketplace Seller", avatar: "MS", isOnline: true },
  { id: "13", name: "Vintage Finds", avatar: "VF", isOnline: false },
  { id: "14", name: "David Park", avatar: "DP", isOnline: true },
];

const now = Date.now();
const minute = 60 * 1000;
const hour = 60 * minute;

export const conversations: Conversation[] = [
  {
    id: "conv1",
    participants: [users[0]],
    isGroup: false,
    category: "friends",
    lastMessage: "Are we still on for dinner tonight?",
    lastMessageTime: "2m",
    unread: true,
    messages: [
      { id: "m1", senderId: "1", text: "Hey! How's your day going?", timestamp: now - 2 * hour },
      { id: "m2", senderId: "me", text: "Pretty good! Just finishing up work", timestamp: now - 2 * hour + 5 * minute },
      { id: "m3", senderId: "1", text: "Nice! I was thinking about that new restaurant downtown", timestamp: now - hour },
      { id: "m4", senderId: "me", text: "Oh the Thai place? I've been wanting to try it!", timestamp: now - hour + 3 * minute },
      { id: "m5", senderId: "1", text: "Yes! Let's go tonight?", timestamp: now - 30 * minute },
      { id: "m6", senderId: "me", text: "Sounds perfect. What time works for you?", timestamp: now - 20 * minute },
      { id: "m7", senderId: "1", text: "How about 7pm?", timestamp: now - 10 * minute },
      { id: "m8", senderId: "1", text: "Are we still on for dinner tonight?", timestamp: now - 2 * minute },
    ],
  },
  {
    id: "conv2",
    participants: [users[1]],
    isGroup: false,
    category: "friends",
    lastMessage: "Check out this meme lol",
    lastMessageTime: "15m",
    unread: true,
    messages: [
      { id: "m1", senderId: "2", text: "Dude have you seen the new Marvel trailer?", timestamp: now - 3 * hour },
      { id: "m2", senderId: "me", text: "Not yet! Is it good?", timestamp: now - 3 * hour + 10 * minute },
      { id: "m3", senderId: "2", text: "SO GOOD. The CGI looks insane", timestamp: now - 2.5 * hour },
      { id: "m4", senderId: "me", text: "I'll watch it during lunch break", timestamp: now - 2 * hour },
      { id: "m5", senderId: "2", text: "Also did you finish that project?", timestamp: now - hour },
      { id: "m6", senderId: "me", text: "Almost! Just a few more tweaks", timestamp: now - 45 * minute },
      { id: "m7", senderId: "2", text: "Check out this meme lol", timestamp: now - 15 * minute },
    ],
  },
  {
    id: "conv3",
    participants: [users[2]],
    isGroup: false,
    category: "friends",
    lastMessage: "Thanks for the book recommendation!",
    lastMessageTime: "1h",
    unread: false,
    messages: [
      { id: "m1", senderId: "me", text: "Hey Emma! Have you read any good books lately?", timestamp: now - 5 * hour },
      { id: "m2", senderId: "3", text: "Actually yes! I just finished Project Hail Mary", timestamp: now - 4.5 * hour },
      { id: "m3", senderId: "me", text: "Oh I loved that one! The ending was perfect", timestamp: now - 4 * hour },
      { id: "m4", senderId: "3", text: "Right?? Do you have any recommendations for me?", timestamp: now - 3 * hour },
      { id: "m5", senderId: "me", text: "Try 'Tomorrow and Tomorrow and Tomorrow' - it's amazing", timestamp: now - 2 * hour },
      { id: "m6", senderId: "3", text: "Thanks for the book recommendation!", timestamp: now - hour },
    ],
  },
  {
    id: "conv4",
    participants: [users[3]],
    isGroup: false,
    category: "friends",
    lastMessage: "See you at the gym tomorrow!",
    lastMessageTime: "3h",
    unread: false,
    messages: [
      { id: "m1", senderId: "4", text: "Hey, are you going to the gym tomorrow morning?", timestamp: now - 5 * hour },
      { id: "m2", senderId: "me", text: "Yeah! Planning on going around 7am", timestamp: now - 4.5 * hour },
      { id: "m3", senderId: "4", text: "Perfect, I'll meet you there", timestamp: now - 4 * hour },
      { id: "m4", senderId: "me", text: "Let's do legs day", timestamp: now - 3.5 * hour },
      { id: "m5", senderId: "4", text: "See you at the gym tomorrow!", timestamp: now - 3 * hour },
    ],
  },
  {
    id: "conv5",
    participants: [users[4]],
    isGroup: false,
    category: "friends",
    lastMessage: "Happy birthday! 🎉",
    lastMessageTime: "5h",
    unread: false,
    messages: [
      { id: "m1", senderId: "me", text: "Happy birthday! 🎉", timestamp: now - 5 * hour },
      { id: "m2", senderId: "5", text: "Thank you so much!! 😊", timestamp: now - 4.5 * hour },
      { id: "m3", senderId: "me", text: "Any big plans for today?", timestamp: now - 4 * hour },
      { id: "m4", senderId: "5", text: "Just dinner with family, keeping it chill", timestamp: now - 3.5 * hour },
      { id: "m5", senderId: "me", text: "Sounds lovely! Enjoy your day", timestamp: now - 3 * hour },
    ],
  },
  {
    id: "conv6",
    participants: [users[5]],
    isGroup: true,
    category: "groups",
    lastMessage: "New album dropping next week!!",
    lastMessageTime: "30m",
    unread: true,
    messages: [
      { id: "m1", senderId: "6", text: "Did anyone see the concert announcement?", timestamp: now - 2 * hour },
      { id: "m2", senderId: "me", text: "YES! I'm trying to get tickets", timestamp: now - 1.5 * hour },
      { id: "m3", senderId: "6", text: "Same here! The presale starts tomorrow", timestamp: now - hour },
      { id: "m4", senderId: "me", text: "I set an alarm already haha", timestamp: now - 45 * minute },
      { id: "m5", senderId: "6", text: "New album dropping next week!!", timestamp: now - 30 * minute },
    ],
  },
  {
    id: "conv7",
    participants: [users[6]],
    isGroup: true,
    category: "groups",
    lastMessage: "Has anyone tried the new React 19 features?",
    lastMessageTime: "1h",
    unread: false,
    messages: [
      { id: "m1", senderId: "7", text: "What's everyone working on this week?", timestamp: now - 6 * hour },
      { id: "m2", senderId: "me", text: "Building a messenger clone for fun", timestamp: now - 5 * hour },
      { id: "m3", senderId: "7", text: "Nice! What stack are you using?", timestamp: now - 4 * hour },
      { id: "m4", senderId: "me", text: "Next.js with Tailwind. It's been great", timestamp: now - 3 * hour },
      { id: "m5", senderId: "7", text: "Has anyone tried the new React 19 features?", timestamp: now - hour },
    ],
  },
  {
    id: "conv8",
    participants: [users[7]],
    isGroup: true,
    category: "groups",
    lastMessage: "Trail pics from last weekend 🏔️",
    lastMessageTime: "2h",
    unread: false,
    messages: [
      { id: "m1", senderId: "8", text: "Who's up for a hike this Saturday?", timestamp: now - 8 * hour },
      { id: "m2", senderId: "me", text: "I'm in! Which trail?", timestamp: now - 7 * hour },
      { id: "m3", senderId: "8", text: "Thinking Eagle Peak - 6 miles round trip", timestamp: now - 6 * hour },
      { id: "m4", senderId: "me", text: "Perfect difficulty level. Count me in!", timestamp: now - 5 * hour },
      { id: "m5", senderId: "8", text: "Trail pics from last weekend 🏔️", timestamp: now - 2 * hour },
    ],
  },
  {
    id: "conv9",
    participants: [users[8]],
    isGroup: false,
    category: "pages",
    pageSubCategory: "engaged",
    lastMessage: "Your order has been shipped! Track it here.",
    lastMessageTime: "45m",
    unread: true,
    messages: [
      { id: "m1", senderId: "9", text: "Hi there! 👋 Welcome to TechStore Official. How can we help you today?", timestamp: now - 72 * hour },
      { id: "m2", senderId: "me", text: "Hi! I'm looking for a new laptop for software development", timestamp: now - 71 * hour },
      { id: "m3", senderId: "9", text: "Great choice! We have several options. What's your budget range?", timestamp: now - 70 * hour },
      { id: "m4", senderId: "me", text: "Around $1500-2000", timestamp: now - 69 * hour },
      { id: "m5", senderId: "9", text: "I'd recommend the MacBook Pro M3 or the ThinkPad X1 Carbon. Both are excellent for dev work!", timestamp: now - 68 * hour },
      { id: "m6", senderId: "me", text: "I'll go with the MacBook Pro M3. 16GB RAM version please", timestamp: now - 24 * hour },
      { id: "m7", senderId: "9", text: "Excellent choice! I've added it to your cart. Would you like to proceed with checkout?", timestamp: now - 23 * hour },
      { id: "m8", senderId: "me", text: "Yes please! Do you offer express shipping?", timestamp: now - 22 * hour },
      { id: "m9", senderId: "9", text: "Absolutely! Express shipping is $12.99 and arrives in 1-2 business days 🚀", timestamp: now - 21 * hour },
      { id: "m10", senderId: "me", text: "Perfect, I'll take express shipping", timestamp: now - 20 * hour },
      { id: "m11", senderId: "9", text: "Done! Order #TK-48291 confirmed. Total: $1,812.99 including express shipping.", timestamp: now - 19 * hour },
      { id: "m12", senderId: "9", text: "Thanks for your order! We're processing it now.", timestamp: now - 5 * hour },
      { id: "m13", senderId: "me", text: "Great, when will it ship?", timestamp: now - 4 * hour },
      { id: "m14", senderId: "9", text: "It's being packed right now! You chose express so it'll be fast ⚡", timestamp: now - 3.5 * hour },
      { id: "m15", senderId: "me", text: "Perfect, thank you!", timestamp: now - 3 * hour },
      { id: "m16", senderId: "9", text: "Your order has been shipped! Track it here.", timestamp: now - 45 * minute },
    ],
  },
  {
    id: "conv10",
    participants: [users[9]],
    isGroup: false,
    category: "pages",
    pageSubCategory: "from_ads",
    lastMessage: "🍕 50% off all orders this weekend! Use code YUMMY50",
    lastMessageTime: "2h",
    unread: true,
    messages: [
      { id: "m1", senderId: "10", text: "Welcome to FoodieDeals! 🍔 Thanks for clicking our ad — here's 20% off your first order: WELCOME20", timestamp: now - 72 * hour },
      { id: "m2", senderId: "10", text: "We work with 200+ local restaurants! Thai, Italian, Mexican, Japanese — you name it 🌮🍣", timestamp: now - 48 * hour },
      { id: "m3", senderId: "10", text: "We have a dedicated veggie section with 50+ restaurants. Try Green Garden or Veggie Bowl Co — customer favorites! 🥗", timestamp: now - 36 * hour },
      { id: "m4", senderId: "10", text: "Their Buddha Bowl and Mushroom Risotto are top sellers! Both under $15 with your discount 😋", timestamp: now - 24 * hour },
      { id: "m5", senderId: "10", text: "Weekend special unlocked! Free delivery on all orders over $25 🚗", timestamp: now - 12 * hour },
      { id: "m6", senderId: "10", text: "🍕 50% off all orders this weekend! Use code YUMMY50", timestamp: now - 2 * hour },
    ],
  },
  {
    id: "conv11",
    participants: [users[10]],
    isGroup: false,
    category: "pages",
    pageSubCategory: "from_ads",
    lastMessage: "New running shoes just dropped! Limited edition 🏃",
    lastMessageTime: "4h",
    unread: false,
    messages: [
      { id: "m1", senderId: "11", text: "Thanks for following Nike Running! 👟 Ready to level up your runs?", timestamp: now - 96 * hour },
      { id: "m2", senderId: "11", text: "We noticed you clicked on our Pegasus ad — great taste! It's our most popular daily trainer.", timestamp: now - 72 * hour },
      { id: "m3", senderId: "11", text: "The Pegasus 41 drops next month! Early access members get first dibs 🔔", timestamp: now - 48 * hour },
      { id: "m4", senderId: "11", text: "Launch colors: Black/White, Navy/Orange, and a limited Ghost Green colorway. Ghost Green is exclusive to early access! 💚", timestamp: now - 36 * hour },
      { id: "m5", senderId: "11", text: "Pegasus runs true to size — we recommend trying with your running socks for best fit 🧦", timestamp: now - 24 * hour },
      { id: "m6", senderId: "11", text: "⏰ 24hr reminder: Early access opens tomorrow at 9AM! Be ready.", timestamp: now - 12 * hour },
      { id: "m7", senderId: "11", text: "New running shoes just dropped! Limited edition 🏃", timestamp: now - 4 * hour },
    ],
  },
  {
    id: "conv12",
    participants: [users[11]],
    isGroup: false,
    category: "marketplace",
    lastMessage: "Is the desk still available?",
    lastMessageTime: "20m",
    unread: true,
    messages: [
      { id: "m1", senderId: "12", text: "Hi! I saw your listing for the standing desk", timestamp: now - hour },
      { id: "m2", senderId: "me", text: "Yes it's still available!", timestamp: now - 50 * minute },
      { id: "m3", senderId: "12", text: "What's the lowest you'd go?", timestamp: now - 40 * minute },
      { id: "m4", senderId: "me", text: "I can do $150, it's in great condition", timestamp: now - 30 * minute },
      { id: "m5", senderId: "12", text: "Is the desk still available?", timestamp: now - 20 * minute },
    ],
  },
  {
    id: "conv13",
    participants: [users[12]],
    isGroup: false,
    category: "marketplace",
    lastMessage: "I can pick it up tomorrow if that works?",
    lastMessageTime: "1h",
    unread: false,
    messages: [
      { id: "m1", senderId: "me", text: "Hi! Is the vintage lamp still for sale?", timestamp: now - 4 * hour },
      { id: "m2", senderId: "13", text: "Yes it is! $45 firm", timestamp: now - 3.5 * hour },
      { id: "m3", senderId: "me", text: "Looks great. Can I see more photos?", timestamp: now - 3 * hour },
      { id: "m4", senderId: "13", text: "Sure! Here are some from different angles", timestamp: now - 2.5 * hour },
      { id: "m5", senderId: "me", text: "Love it! I'll take it", timestamp: now - 2 * hour },
      { id: "m6", senderId: "13", text: "I can pick it up tomorrow if that works?", timestamp: now - hour },
    ],
  },
  {
    id: "conv14",
    participants: [users[13]],
    isGroup: false,
    category: "friends",
    lastMessage: "Let's grab coffee this week",
    lastMessageTime: "6h",
    unread: false,
    messages: [
      { id: "m1", senderId: "14", text: "Hey! Long time no see", timestamp: now - 12 * hour },
      { id: "m2", senderId: "me", text: "I know! How have you been?", timestamp: now - 10 * hour },
      { id: "m3", senderId: "14", text: "Good! Started a new job last month", timestamp: now - 9 * hour },
      { id: "m4", senderId: "me", text: "Congrats! We should catch up properly", timestamp: now - 8 * hour },
      { id: "m5", senderId: "14", text: "Let's grab coffee this week", timestamp: now - 6 * hour },
    ],
  },
];

export const autoReplies: Record<string, string[]> = {
  conv1: [
    "Sounds great! Can't wait 😊",
    "I'll text you when I'm on my way",
    "Should we invite anyone else?",
  ],
  conv2: [
    "Haha that's hilarious 😂",
    "Wait I have an even better one",
    "Okay okay you win this round",
  ],
  conv3: [
    "I just started reading it! So good so far",
    "The characters are so well written",
    "Any other recs? I'm on a reading streak",
  ],
  conv4: [
    "Don't skip leg day! 💪",
    "I'll bring my new pre-workout to try",
    "Let's aim for a PR this time",
  ],
  conv5: [
    "Thank you! You're the best ❤️",
    "We should hang out soon!",
    "Miss you!",
  ],
  conv6: [
    "I GOT TICKETS!! Row 5!!",
    "Who else is going??",
    "This is going to be the best concert ever",
  ],
  conv7: [
    "That sounds really cool! Share it when you're done",
    "I'm working on a similar project with Vue",
    "Server components are a game changer",
  ],
  conv8: [
    "The views are absolutely stunning!",
    "We should do Mount Wilson next",
    "Bring extra water, it's going to be hot",
  ],
  conv9: [
    "Your package is out for delivery!",
    "Estimated delivery: today by 5pm",
    "Let us know if you need anything else!",
  ],
  conv10: [
    "Great choice! Your order is confirmed 🎉",
    "Don't forget - free delivery on orders over $30!",
    "New deals dropping tomorrow at noon!",
  ],
  conv11: [
    "Thanks for your interest! Here's a sneak peek 👀",
    "Members get early access - sign up now!",
    "Which color are you going for?",
  ],
  conv12: [
    "Great! Can I come see it today?",
    "Would you take $130?",
    "I'm very interested, please hold it for me",
  ],
  conv13: [
    "Perfect! I'll be there around 3pm",
    "Can you send me the address?",
    "See you tomorrow!",
  ],
  conv14: [
    "How about Wednesday morning?",
    "There's a new cafe on 5th that's great",
    "I'll send you the details!",
  ],
};
