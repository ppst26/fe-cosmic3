import type {
  LotteryFeaturedItem,
  LotteryGridItem,
  LotteryResultRow,
} from "@/types/lotteryHub";

/** การ์ด feature — หวยไทย · ยี่กี */
export const LOTTERY_FEATURED_ITEMS: LotteryFeaturedItem[] = [
  {
    id: "lottery-feature-thai",
    title: "หวยรัฐบาลไทย",
    countdownLabel: "13 วัน",
    href: "/lottery/thai-government",
    visual: "thai-gov",
  },
  {
    id: "lottery-feature-yiki-5",
    title: "หวยยี่กี 5 นาที",
    countdownLabel: "00:03:24",
    href: "/lottery/yiki-5",
    visual: "yiki",
    yikiMinutes: 5,
  },
  {
    id: "lottery-feature-yiki-15",
    title: "หวยยี่กี 15 นาที",
    countdownLabel: "03:29:01",
    href: "/lottery/yiki-15",
    visual: "yiki",
    yikiMinutes: 15,
  },
  {
    id: "lottery-feature-yiki-30",
    title: "หวยยี่กี 30 นาที",
    countdownLabel: "12:04:18",
    href: "/lottery/yiki-30",
    visual: "yiki",
    yikiMinutes: 30,
  },
];

/** กริดประเภทหวย — href ตรงกับตลาดที่ sport รองรับแล้ว + mock เพิ่มเติม */
export const LOTTERY_GRID_ITEMS: LotteryGridItem[] = [
  {
    id: "lottery-laos",
    title: "หวยลาว",
    status: "open",
    countdownLabel: "03:29:01",
    flagLabel: "LA",
    flagTone: "la",
    href: "/lottery/laos",
  },
  {
    id: "lottery-hanoi",
    title: "หวยฮานอย",
    status: "open",
    countdownLabel: "03:29:01",
    flagLabel: "VN",
    flagTone: "vn",
    href: "/lottery/hanoi",
  },
  {
    id: "lottery-thai",
    title: "หวยรัฐบาล",
    status: "open",
    countdownLabel: "13 วัน",
    flagLabel: "TH",
    flagTone: "th",
    href: "/lottery/thai-government",
  },
  {
    id: "lottery-yiki-5",
    title: "ยี่กี 5 นาที",
    status: "open",
    countdownLabel: "00:03:24",
    flagLabel: "YK",
    flagTone: "gold",
    href: "/lottery/yiki-5",
  },
  {
    id: "lottery-yiki-15",
    title: "ยี่กี 15 นาที",
    status: "open",
    countdownLabel: "03:29:01",
    flagLabel: "YK",
    flagTone: "gold",
    href: "/lottery/yiki-15",
  },
  {
    id: "lottery-yiki-30",
    title: "ยี่กี 30 นาที",
    status: "open",
    countdownLabel: "12:04:18",
    flagLabel: "YK",
    flagTone: "gold",
    href: "/lottery/yiki-30",
  },
];

export const LOTTERY_LATEST_RESULTS: LotteryResultRow[] = [
  {
    id: "res-la",
    title: "หวยลาว",
    top3: "428",
    bottom2: "15",
    dateLabel: "วันนี้",
    flagLabel: "LA",
    flagTone: "la",
  },
  {
    id: "res-hn",
    title: "หวยฮานอย",
    top3: "903",
    bottom2: "62",
    dateLabel: "วันนี้",
    flagLabel: "VN",
    flagTone: "vn",
  },
  {
    id: "res-th",
    title: "หวยรัฐบาลไทย",
    top3: "842",
    bottom2: "56",
    dateLabel: "1 ส.ค. 2026",
    flagLabel: "TH",
    flagTone: "th",
  },
];
