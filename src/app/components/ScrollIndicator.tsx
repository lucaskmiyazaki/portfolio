interface ScrollIndicatorProps {
  dark?: boolean; // true = dark background → white text (default); false = light background → black text
}

export function ScrollIndicator({ dark = true }: ScrollIndicatorProps) {
  return (
    <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 ${dark ? 'text-white' : 'text-black'}`}>
      <span className="text-xs tracking-widest uppercase">Scroll</span>
      <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    </div>
  );
}
