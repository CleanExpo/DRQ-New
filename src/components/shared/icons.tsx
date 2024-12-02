interface IconProps {
  className?: string;
}

export function IconWater({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2L4.5 9.5C3 11 2 13 2 15c0 3.9 3.1 7 7 7s7-3.1 7-7c0-2-1-4-2.5-5.5L12 2z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function IconFire({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2c0 0-3 5.5-3 9c0 1.6 0.8 3.1 2 4c1.2-0.9 2-2.4 2-4c0-3.5-3-9-3-9zM12 2c0 0 3 5.5 3 9c0 3.3-2.7 6-6 6s-6-2.7-6-6c0-2 1-4 2.5-5.5L12 2z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function IconMold({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8s8 3.6 8 8s-3.6 8-8 8z" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 6c-3.3 0-6 2.7-6 6s2.7 6 6 6s6-2.7 6-6s-2.7-6-6-6z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function IconStorm({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13 11l-4 6h6l-4 6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function IconSewage({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2v6M12 22v-6M4.93 4.93l4.24 4.24M19.07 19.07l-4.24-4.24M2 12h6M22 12h-6M4.93 19.07l4.24-4.24M19.07 4.93l-4.24 4.24" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function IconCrime({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2L2 7l10 5l10-5l-10-5zM2 17l10 5l10-5M2 12l10 5l10-5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
