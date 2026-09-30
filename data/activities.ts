export type ActivityItem = {
  id: string;
  category: "slot" | "casino";
  title: string;
  currentTurn: number;
  targetTurn: number;
  rewardBaht: number;
  tiers: { rank: string; target: number; reward: number }[];
};

export const ACTIVITIES: ActivityItem[] = [
  {
    id: "turnover",
    category: "slot",
    title: "ทำยอด Turn รับรางวัล",
    currentTurn: 5000,
    targetTurn: 3000,
    rewardBaht: 100,
    tiers: [
      { rank: "1", target: 3000, reward: 100 },
      { rank: "2", target: 10000, reward: 300 },
    ],
  },
  {
    id: "football",
    category: "casino",
    title: "ทายผลบอล",
    currentTurn: 100,
    targetTurn: 1000,
    rewardBaht: 50,
    tiers: [{ rank: "1", target: 1000, reward: 50 }],
  },
];
