import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export type CategoryNavIconId =
  | "hot"
  | "new"
  | "providers"
  | "sport"
  | "slot"
  | "casino"
  | "cards"
  | "fish"
  | "lottery"
  | "arcade"
  | "fight"
  | "crash"
  | "crypto"
  | "favorite";

const base = { width: 26, height: 26, viewBox: "0 0 24 24", fill: "currentColor" } as const;

export function CategoryNavIcon({
  id,
  ...props
}: IconProps & { id: CategoryNavIconId }) {
  switch (id) {
    case "hot":
      return (
        <svg {...base} {...props}>
          <path d="M12 23c-1.1 0-2-.9-2-2 0-.55.22-1.05.59-1.41C9.5 18.5 8 16.5 8 14c0-2.5 1.5-4.5 3-6-.5 2-1 4 1 6 1-3 3-5 3-8 4 2 6 6 6 10 0 3.87-3.13 7-7 7z" />
        </svg>
      );
    case "new":
      return (
        <svg {...base} {...props}>
          <path d="M12 2 4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm0 2.18 6 2.25v4.66c0 3.87-2.55 7.49-6 8.54-3.45-1.05-6-4.67-6-8.54V6.43l6-2.25z" />
          <path d="M8.5 9.5h7v1.75h-7V9.5zm0 3.25h5v1.75h-5v-1.75z" />
        </svg>
      );
    case "providers":
      return (
        <svg {...base} {...props}>
          <path d="m12 2 8 4.5v7L12 18l-8-4.5v-7L12 2zm0 2.3L6.5 7.2v5.1L12 15.1l5.5-2.8V7.2L12 4.3zM12 8l3.5 1.8L12 11.6 8.5 9.8 12 8z" />
        </svg>
      );
    case "sport":
      return (
        <svg {...base} {...props}>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm0 2a7 7 0 1 1 0 14 7 7 0 0 1 0-14z"
          />
          <path d="M12 8.8 15.04 11.01 13.88 14.59 10.12 14.59 8.96 11.01Z" />
        </svg>
      );
    case "slot":
      return (
        <svg {...base} {...props}>
          <path d="M4 4h16v12H4V4zm2 2v8h12V6H6zm2 2h2v4H8V8zm4 0h2v4h-2V8zM2 18h20v2H2v-2z" />
          <path d="M7 9h1v2H7V9zm4 0h1v2h-1V9zm4 0h1v2h-1V9z" />
        </svg>
      );
    case "casino":
      return (
        <svg {...base} {...props}>
          <path d="M12 2c-3 4-7 7.3-7 11.2a5 5 0 0 0 8.56 3.52c-.3 1.55-1.12 2.72-2.56 3.28h6c-1.44-.56-2.26-1.73-2.56-3.28A5 5 0 0 0 19 13.2C19 9.3 15 6 12 2z" />
        </svg>
      );
    case "cards":
      return (
        <svg {...base} {...props}>
          <path d="M4 4h7v14H4V4zm9 0h7v14h-7V4zM6 6v10h3V6H6zm9 0v10h3V6h-3z" />
        </svg>
      );
    case "fish":
      return (
        <svg {...base} {...props}>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3 12 Q9 4 16 8 L21 12 L16 16 Q9 20 3 12 Z M7.5 10a1 1 0 1 0 0.01 0z"
          />
        </svg>
      );
    case "lottery":
      return (
        <svg {...base} {...props}>
          <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16zm-.5 3h1v4.25l3.5 2-.5.86-4-2.31V7z" />
        </svg>
      );
    case "arcade":
      return (
        <svg {...base} {...props}>
          <path d="M6 3h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm0 2v14h12V5H6zm3 3h2v2H9V8zm4 0h2v2h-2V8zM8 12h8v2H8v-2z" />
        </svg>
      );
    case "fight":
      return (
        <svg {...base} {...props}>
          <path d="M5 4h4l1 3h4l1-3h4v3l-2 2 1 5-4-2-3 3-3-3-4 2 1-5-2-2V4z" />
        </svg>
      );
    case "crash":
      return (
        <svg {...base} {...props}>
          <path d="M4 18V6h2v10h14v2H4zm3-3 3-4 3 2 4-6 3 4v4H7v-6z" />
        </svg>
      );
    case "crypto":
      return (
        <svg {...base} {...props}>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.9c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.2.75-2.2 1.58 0 .84.65 1.3 2.67 1.91 2.49.75 4.18 1.84 4.18 3.91 0 1.89-1.55 3.03-3.94 3.42z" />
        </svg>
      );
    case "favorite":
      return (
        <svg {...base} {...props}>
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      );
    default:
      return null;
  }
}
