const icons = {
  apple: "apple",
  avatar: "avatar",
  bell: "bell",
  bento: "bento",
  bolt: "bolt",
  bowl: "bowl",
  bulb: "bulb",
  calendar: "calendar",
  can: "can",
  carrot: "carrot",
  cart: "cart",
  cheese: "cheese",
  chili: "chili",
  clock: "clock",
  cook: "cook",
  droplet: "droplet",
  egg: "egg",
  "egg-custom": "egg-custom",
  flame: "flame",
  "fried-egg": "fried-egg",
  herb: "herb",
  ice: "ice",
  leaf: "leaf",
  lemon: "lemon",
  meat: "meat",
  money: "money",
  moon: "moon",
  muscle: "muscle",
  noodles: "noodles",
  pause: "pause",
  pencil: "pencil",
  pin: "pin",
  plate: "plate",
  rice: "rice",
  runner: "runner",
  salad: "salad",
  sparkle: "sparkle",
  steak: "steak",
  timer: "timer",
  tomato: "tomato",
  wave: "wave",
} as const;

export type FigmaIconName = keyof typeof icons;

export function FigmaIcon({
  name,
  size = 20,
  className,
}: {
  name: FigmaIconName;
  size?: number;
  className?: string;
}) {
  return (
    <img
      alt=""
      aria-hidden="true"
      className={className ? "figma-icon " + className : "figma-icon"}
      draggable={false}
      height={size}
      src={
        import.meta.env.BASE_URL +
        "figma-icons/" +
        icons[name] +
        ".svg"
      }
      width={size}
    />
  );
}

