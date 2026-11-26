export type CuisineIconName =
  | "chinese"
  | "indian"
  | "italian"
  | "japanese"
  | "mexican"
  | "mediterranean"
  | "british"
  | "korean";

export function CuisineIcon({
  name,
  size = 31,
}: {
  name: CuisineIconName;
  size?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      className={"cuisine-icon cuisine-icon--" + name}
      fill="none"
      focusable="false"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
      viewBox="0 0 32 32"
      width={size}
    >
      {name === "chinese" ? (
        <>
          <path
            d="M5.5 17.4c0-5.1 4.7-9.2 10.5-9.2s10.5 4.1 10.5 9.2c0 3.1-4.7 5.3-10.5 5.3S5.5 20.5 5.5 17.4Z"
            fill="#FFE3D3"
          />
          <path d="M10 9.5c.7 3.4.7 6.8.2 9.8M14 8.5c.6 4 .6 7.8 0 11M18 8.5c-.3 4-.3 7.8.1 11M22 9.5c-.7 3.4-.7 6.8-.2 9.8" />
          <path d="M6.4 15.8c5.2 2.4 14 2.4 19.2 0" />
        </>
      ) : null}

      {name === "indian" ? (
        <>
          <path
            d="M5 16.2h22c0 5.4-4.9 9.8-11 9.8S5 21.6 5 16.2Z"
            fill="#FFF1C7"
          />
          <path d="M7 19.4h18" />
          <path d="M9.2 12.2c1.8-2.6 5.3-3.5 8.1-2.2 2.1 1 3.4 2.8 3.5 5.2" />
          <path
            d="M17.9 15.2c0-2.5 1.7-4.6 3.9-4.6s3.9 2.1 3.9 4.6c0 2.1-1.7 3.7-3.9 3.7s-3.9-1.6-3.9-3.7Z"
            fill="#FFB36B"
          />
          <path d="M13.2 6.4c-1.3-1.1-.8-2.4.4-3.1M17.7 6.9c-1.2-1-.7-2.3.3-3" />
        </>
      ) : null}

      {name === "italian" ? (
        <>
          <path
            d="M5 16.4h22c0 5.5-5 9.8-11 9.8S5 21.9 5 16.4Z"
            fill="#DFF7EA"
          />
          <path d="M8.5 12.2c1.5 2.2 4.1 3.7 7.5 3.7s6-1.5 7.5-3.7" />
          <path d="M9 15.4c2.2-2.8 4.4.9 6.7-1.3 2.2-2.1 4.3 1 7.3-1.6" />
          <path d="M7.7 10.1c4.8-2.5 12-2.5 16.6 0" />
          <circle cx="13" cy="18.2" r="1.4" fill="#FF8A3D" />
          <circle cx="19.2" cy="19" r="1.4" fill="#FF5C8A" />
        </>
      ) : null}

      {name === "japanese" ? (
        <>
          <ellipse cx="16" cy="21.3" rx="9.3" ry="5.1" fill="#FFFDF7" />
          <path d="M8 20.3c1.9 2.3 5 3.8 8 3.8s6.1-1.5 8-3.8" />
          <path
            d="M7.4 17.7c.7-4.2 3.9-7.6 8.6-7.6 4.7 0 7.9 3.4 8.6 7.6-2.8 1.6-6 2.4-8.6 2.4s-5.8-.8-8.6-2.4Z"
            fill="#FFD7DF"
          />
          <path d="M12.2 16.2c1-1 2.2-1.6 3.8-1.6s2.8.6 3.8 1.6" />
          <path d="M8.2 17.1c2.4 1.4 5 2.1 7.8 2.1s5.4-.7 7.8-2.1" />
          <rect
            fill="#1E1A3C"
            fillOpacity=".08"
            height="6.1"
            rx="1.6"
            width="6.2"
            x="12.9"
            y="17.6"
          />
        </>
      ) : null}

      {name === "mexican" ? (
        <>
          <path
            d="M5.2 20.1C5.2 12.2 10.1 5.8 16 5.8s10.8 6.4 10.8 14.3c-2.5 1.2-6.4 1.9-10.8 1.9S7.7 21.3 5.2 20.1Z"
            fill="#FFD18A"
          />
          <path d="M6.4 19.5c2.3 1.9 5.6 3.1 9.6 3.1s7.3-1.2 9.6-3.1" />
          <path d="M9.1 14.2c2.1-1.7 4.5-2.4 6.9-2.4s4.8.7 6.9 2.4" />
          <path d="M10 16.4c1.3 1.1 2.8 1.7 6 0 3.1 1.7 4.7 1.1 6-.1" fill="#DFF7EA" />
          <circle cx="12.4" cy="17.2" r="1.1" fill="#FF5C8A" />
          <circle cx="19.6" cy="17.3" r="1.1" fill="#FF5C8A" />
        </>
      ) : null}

      {name === "mediterranean" ? (
        <>
          <ellipse cx="16" cy="20.9" rx="10.4" ry="5.4" fill="#FFFDF7" />
          <path d="M7.3 19.4c2.2 2.9 5.2 4.5 8.7 4.5s6.5-1.6 8.7-4.5" />
          <circle cx="12.1" cy="17.8" r="3" fill="#FFF1C7" />
          <circle cx="18.2" cy="17.1" r="2.8" fill="#DFF7EA" />
          <circle cx="20" cy="20" r="2.1" fill="#FFD7DF" />
          <path d="M6.2 10.3c3.2-2.6 7.5-3.4 11.5-2.1M22.8 9.1c1.4 1.4 2.3 3.1 2.8 5" />
          <path d="M14.1 7.6c2.5-.9 4.8-.2 6.2 1.4-2.1 1.7-4.5 2-6.2-1.4Z" fill="#22C27A" fillOpacity=".35" />
        </>
      ) : null}

      {name === "british" ? (
        <>
          <path
            d="M5.7 17.3c0-4.7 4.6-8.4 10.3-8.4s10.3 3.7 10.3 8.4v2.4c0 3.3-4.6 5.7-10.3 5.7S5.7 23 5.7 19.7v-2.4Z"
            fill="#FFD9A3"
          />
          <path d="M7.2 16.7c2.5-2.8 5.4-4.2 8.8-4.2s6.3 1.4 8.8 4.2" />
          <path d="M12.3 20.5h1.2M18.7 20.5h1.2M15.4 18.5v4" />
          <path d="M9.3 9.2c1.9-1.4 4.2-2.1 6.7-2.1s4.8.7 6.7 2.1" />
        </>
      ) : null}

      {name === "korean" ? (
        <>
          <path
            d="M5.1 16.6h21.8c0 5.3-4.9 9.5-10.9 9.5S5.1 21.9 5.1 16.6Z"
            fill="#FFF1C7"
          />
          <path d="M7.4 16.2h17.2M9 20.1h14" />
          <circle cx="16" cy="11.8" r="3.5" fill="#FFC83D" />
          <path d="M13.5 11.9c1.1-1.3 3.7-1.3 5 0" />
          <path d="M22.4 5.6 25 10.1M25.2 4.6l2.6 4.5" />
          <path d="M9.8 7.2c1.1.4 1.7 1.2 2 2.1M7.1 9.1c.9 0 1.7.2 2.4.7" />
        </>
      ) : null}
    </svg>
  );
}

