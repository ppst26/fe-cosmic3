export const MEMBER = {
  username: "demolege854905112",
  displayName: "คุณพีพี (VIP 3)",
  phone: "089-xxx-8899",
  balance: 28450.75,
  diamonds: 12500,
  vipTier: "GOLD",
  refCode: "PP888",
};

export const REFERRAL_LINK = `https://demo-legend.ctmx.live/?prefix=${MEMBER.username}`;

export const BANKS = [
  { code: "kbank", name: "กสิกรไทย" },
  { code: "scb", name: "ไทยพาณิชย์" },
  { code: "ktb", name: "กรุงไทย" },
  { code: "bbl", name: "กรุงเทพ" },
  { code: "bay", name: "กรุงศรี" },
] as const;

export const DEPOSIT_AMOUNTS = ["100", "300", "500", "1000", "3000", "5000"];

export const DEPOSIT_CHANNELS = [
  { id: "bank", label: "โอนธนาคาร" },
  { id: "promptpay", label: "พร้อมเพย์ QR" },
  { id: "truemoney", label: "ทรูมันนี่" },
] as const;

export const WALLET_HISTORY = [
  { id: "d1", type: "deposit" as const, amount: 1000, status: "สำเร็จ", at: "2026-09-28 14:20" },
  { id: "w1", type: "withdraw" as const, amount: 500, status: "สำเร็จ", at: "2026-09-27 09:10" },
  { id: "d2", type: "deposit" as const, amount: 300, status: "รอตรวจสลิป", at: "2026-09-26 21:02" },
];

export const ACTIVITIES = [
  {
    id: "wheel",
    title: "ภารกิจ",
    emoji: "🎡",
    open: true,
    badge: "ภารกิจพิเศษ",
    reward: "ลุ้นรางวัลกว่า 1,000,000 บาท",
    description: "สะสมแต้มภารกิจรายวัน หมุนวงล้อ ลุ้นทองคำและเครดิตฟรี",
  },
  {
    id: "turnover",
    title: "ทำยอด Turn รับรางวัลจุใจ",
    emoji: "⚡",
    open: true,
    badge: "ยอดนิยม",
    reward: "รับคุ้ม 39,000 บาท/วัน",
    description: "รับโบนัสเมื่อทำยอดเทิร์นครบตามกำหนด ไม่ต้องทำเทิร์นซ้ำ",
  },
  {
    id: "football",
    title: "ทายผลบอล",
    emoji: "⚽",
    open: false,
    badge: "ปิดรับ",
    reward: "ลุ้นรางวัล 10,000 บาท",
    description: "ทายผลพรีเมียร์ลีก ช่วง 2026-09-08 ถึง 2026-09-12",
  },
];

export const CHECKIN_DAYS = [
  { day: "จ.", reward: 5, claimed: true, today: false, special: false },
  { day: "อ.", reward: 5, claimed: false, today: true, special: false },
  { day: "พ.", reward: 5, claimed: false, today: false, special: false },
  { day: "พฤ.", reward: 5, claimed: false, today: false, special: false },
  { day: "ศ.", reward: 5, claimed: false, today: false, special: false },
  { day: "ส.", reward: 5, claimed: false, today: false, special: false },
  { day: "อา.", reward: 20, claimed: false, today: false, special: true },
];

export const SHOP_PACKAGES = [
  { id: "p1", credits: 50, cost: 1000 },
  { id: "p2", credits: 100, cost: 2000, popular: true },
  { id: "p3", credits: 250, cost: 5000 },
  { id: "p4", credits: 500, cost: 10000 },
  { id: "p5", credits: 1000, cost: 20000 },
  { id: "p6", credits: 2000, cost: 40000 },
];

export const VIP_TIERS = [
  { id: "bronze", name: "BRONZE", emoji: "🥉", cashback: "0.2%", turnover: 0 },
  { id: "silver", name: "SILVER", emoji: "🥈", cashback: "0.3%", turnover: 1000 },
  { id: "gold", name: "GOLD", emoji: "🥇", cashback: "0.5%", turnover: 2000 },
  { id: "platinum", name: "PLATINUM", emoji: "💎", cashback: "0.8%", turnover: 5000 },
  { id: "diamond", name: "DIAMOND", emoji: "💠", cashback: "1.2%", turnover: 8000 },
];

export const MEMBER_LINKS = [
  { href: "/profile", label: "โปรไฟล์", emoji: "👤" },
  { href: "/wallet", label: "ฝาก-ถอน", emoji: "👛" },
  { href: "/promotions", label: "โปรโมชั่น", emoji: "🎁" },
  { href: "/activities", label: "กิจกรรม", emoji: "🎯" },
  { href: "/check-in", label: "เช็คอิน", emoji: "📅" },
  { href: "/referral", label: "ชวนเพื่อน", emoji: "🤝" },
  { href: "/commission", label: "คอมมิชชั่น", emoji: "💸" },
  { href: "/shop", label: "ร้านเพชร", emoji: "💎" },
  { href: "/vip", label: "แรงค์ VIP", emoji: "👑" },
] as const;
