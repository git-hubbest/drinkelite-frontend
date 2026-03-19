import { useEffect, useState } from "react";

interface Props {
  color: string;
  triggerKey: string;
}

export default function FlavorWipeTransition({ color, triggerKey }: Props) {
  const [wave, setWave] = useState<{ key: string; color: string } | null>(null);

  useEffect(() => {
    if (!triggerKey) return;
    setWave({ key: triggerKey, color });
    const timer = setTimeout(() => setWave(null), 700);
    return () => clearTimeout(timer);
  }, [triggerKey, color]);

  if (!wave) return null;

  return (
    <>
      <style>{`
        @keyframes wipe-right-to-left {
          0% { transform: translateX(110%); }
          100% { transform: translateX(-110%); }
        }
      `}</style>
      <div
        key={wave.key}
        className="fixed inset-0 z-[100] pointer-events-none"
        style={{
          background: `linear-gradient(to left, transparent 0%, ${wave.color}30 30%, ${wave.color}40 50%, ${wave.color}30 70%, transparent 100%)`,
          animation: "wipe-right-to-left 0.65s cubic-bezier(0.4, 0, 0.2, 1) forwards",
          willChange: "transform",
        }}
      />
    </>
  );
}
