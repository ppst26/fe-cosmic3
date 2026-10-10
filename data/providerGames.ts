export type InnerGame = {
  id: string;
  title: string;
  image: string;
  badge?: "ฮิต" | "ใหม่";
  players: number;
  trend: "up" | "down";
  favorite?: boolean;
};

// Base game image pool
const SLOT_HERO_GAMES: { title: string; image: string; badge?: "ฮิต" | "ใหม่" }[] = [
  { title: "Mahjong Mega Wins", image: "/assets/games/mahjong-mega-wins.jpg", badge: "ฮิต" },
  { title: "Nom Nom Fat Cat", image: "/assets/games/nom-nom-fat-cat.jpg", badge: "ใหม่" },
  { title: "Farmstead Fortune", image: "/assets/games/farmstead-fortune.jpg", badge: "ฮิต" },
  { title: "Treasures of Aztec", image: "/assets/games/treasures-of-aztec.jpg", badge: "ฮิต" },
  { title: "MAHJONG SMASH", image: "/assets/games/mahjong-smash.jpg", badge: "ใหม่" },
  { title: "Roma", image: "/assets/games/roma.jpg" },
  { title: "Lucky Neko", image: "/hitz game/lucky neko.webp", badge: "ฮิต" },
  { title: "Mahjong Ways 2", image: "/hitz game/majongway.webp", badge: "ฮิต" },
  { title: "Songkran Splash", image: "/hitz game/songkran splash.webp", badge: "ใหม่" },
  { title: "Super Ace", image: "/hitz game/super ace.webp", badge: "ฮิต" },
  { title: "Wild Bounty Showdown", image: "/hitz game/wildBounty.webp", badge: "ฮิต" },
  { title: "Win Win Neko", image: "/hitz game/winwin neko.webp", badge: "ใหม่" },
  { title: "Sugar Bang 100", image: "/assets/games/sugar-bang-100.jpg", badge: "ฮิต" },
  { title: "Mahjong Phoenix", image: "/assets/games/mahjong-phoenix.jpg" },
  { title: "Gates of Olympus", image: "/hitz game/pp.avif", badge: "ฮิต" },
  { title: "Muay Thai Champion", image: "/hitz game/boxign.webp", badge: "ใหม่" },
  { title: "Devil's Fire", image: "/hitz game/devil.webp" },
  { title: "Super Elements", image: "/hitz game/superelement.webp" },
  { title: "Goat Sport Gold", image: "/assets/games/goatsport.jpg" },
];

const FISHING_HERO_GAMES: { title: string; image: string; badge?: "ฮิต" | "ใหม่" }[] = [
  { title: "Jackpot Fishing", image: "/hitz game/jackpotfishing.avif", badge: "ฮิต" },
  { title: "Fa Chai Fishing", image: "/fishing/Fc.avif", badge: "ฮิต" },
  { title: "Ocean King 3", image: "/fishing/fungy.avif", badge: "ใหม่" },
  { title: "Mega Fishing Deluxe", image: "/fishing/ygr.avif", badge: "ฮิต" },
  { title: "Fish Hunter Golden Toad", image: "/fishing/goldy.avif" },
  { title: "SlotXO Fishing 2", image: "/fishing/Xo.avif", badge: "ฮิต" },
  { title: "Dragon Fortune Fishing", image: "/fishing/cq9.avif", badge: "ใหม่" },
  { title: "SimplePlay Fishing", image: "/fishing/simpleplay.avif" },
  { title: "Spade Fish Hunter", image: "/fishing/spade.avif" },
  { title: "AMB Deep Sea Hunting", image: "/fishing/amb.avif", badge: "ฮิต" },
  { title: "Dinosaur Tycoon", image: "/fishing/Fc.avif", badge: "ใหม่" },
  { title: "Bombing Fishing", image: "/fishing/ygr.avif" },
  { title: "Cai Shen Fishing", image: "/fishing/cq9.avif", badge: "ฮิต" },
  { title: "Happy Fishing", image: "/fishing/fungy.avif" },
  { title: "Monster Awaken", image: "/fishing/goldy.avif" },
];

const CARD_HERO_GAMES: { title: string; image: string; badge?: "ฮิต" | "ใหม่" }[] = [
  { title: "ป๊อกเด้ง (Pok Deng)", image: "/slots/Rich88.webp", badge: "ฮิต" },
  { title: "เก้าเกไทย (Gao Gae)", image: "/slots/JILI.webp", badge: "ฮิต" },
  { title: "ดัมมี่ ฮีโร่ (Dummy)", image: "/slots/KA Gaming.webp", badge: "ใหม่" },
  { title: "ไพ่แคง (Kang Card)", image: "/slots/askmeslot.webp", badge: "ฮิต" },
  { title: "เสือมังกร (Dragon Tiger)", image: "/slots/Creative Gaming.webp", badge: "ใหม่" },
  { title: "ไฮโลไทย (Thai Hi-Lo)", image: "/slots/Funky Games.webp", badge: "ฮิต" },
  { title: "น้ำเต้าปูปลา", image: "/slots/Simple Play.webp" },
  { title: "Super Ace Table", image: "/hitz game/super ace.webp", badge: "ฮิต" },
  { title: "Blackjack VIP", image: "/slots/EvoPlay.webp" },
  { title: "Baccarat Deluxe", image: "/slots/Rich88.webp", badge: "ฮิต" },
  { title: "Texas Hold'em Poker", image: "/slots/cq9.webp" },
  { title: "กำถั่ว (Fan Tan)", image: "/slots/sexyslot.webp", badge: "ใหม่" },
  { title: "Belangkai 2", image: "/slots/Creative Gaming.webp" },
  { title: "Tongits Go", image: "/slots/JILI.webp" },
  { title: "Pai Gow Poker", image: "/slots/KA Gaming.webp" },
];

// Helper to deterministically generate realistic games for a provider
export function getGamesForProvider(providerTitle: string, category: string): InnerGame[] {
  let pool = SLOT_HERO_GAMES;
  if (category === "fish") {
    pool = FISHING_HERO_GAMES;
  } else if (category === "card") {
    pool = CARD_HERO_GAMES;
  }

  // Generate 18 games per provider for a rich 3-column grid experience (6 rows of 3)
  const count = 18;
  const hash = providerTitle.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);

  return Array.from({ length: count }, (_, idx) => {
    const baseItem = pool[(idx + hash) % pool.length];
    const playerIdSeed = ((hash * (idx + 1) * 9301 + 49297) % 233280);
    const players = Math.floor((playerIdSeed / 233280) * 28000) + 15;
    const isUp = (idx + hash) % 3 !== 0;

    let badge: "ฮิต" | "ใหม่" | undefined = undefined;
    if (idx % 4 === 0) badge = "ฮิต";
    else if (idx % 4 === 1) badge = "ใหม่";

    return {
      id: `${providerTitle.toLowerCase().replace(/[^a-z0-9]/g, "-")}-game-${idx + 1}`,
      title: `${baseItem.title}`,
      image: baseItem.image,
      badge: badge ?? baseItem.badge,
      players,
      trend: isUp ? "up" : "down",
      favorite: (idx + hash) % 5 === 0,
    };
  });
}
