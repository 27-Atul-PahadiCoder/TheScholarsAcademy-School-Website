import React, { useEffect, useRef, useState } from "react";

interface EyeGameProps {
  size?: number;
  eyeColor?: string;
  pupilColor?: string;
  darkMode?: boolean;
  blinkSpeed?: number;
  variant?: "full" | "embedded";
  smileSignal?: number;
  smileDurationMs?: number;
  popSignal?: number;
  popDurationMs?: number;
}

const EyeGame: React.FC<EyeGameProps> = ({
  size = 130,
  eyeColor = "#e8f0ff",
  pupilColor = "#111",
  darkMode = false,
  blinkSpeed = 3500,
  variant = "full",
  smileSignal = 0,
  smileDurationMs = 3000,
  popSignal = 0,
  popDurationMs = 1000,
}) => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [blink, setBlink] = useState(false);
  const [isSmiling, setIsSmiling] = useState(false);
  const [isPopping, setIsPopping] = useState(false);
  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);

  // Track mouse
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // Blinking loop
  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 180);
    }, blinkSpeed);

    return () => clearInterval(interval);
  }, [blinkSpeed]);

  // Trigger temporary smile animation whenever signal increments
  useEffect(() => {
    if (!smileSignal) return;
    setIsSmiling(true);
    const timer = setTimeout(() => setIsSmiling(false), smileDurationMs);
    return () => clearTimeout(timer);
  }, [smileSignal, smileDurationMs]);

  // Pop (scale up briefly) whenever signal increments
  useEffect(() => {
    if (!popSignal) return;
    setIsPopping(true);
    const timer = setTimeout(() => setIsPopping(false), popDurationMs);
    return () => clearTimeout(timer);
  }, [popSignal, popDurationMs]);

  const calcPupil = (eyeRef: React.RefObject<HTMLDivElement | null>) => {
    const rect = eyeRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };

    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const dampen = 32; // mouse smoothing
    const dx = (mouse.x - cx) / dampen;
    const dy = (mouse.y - cy) / dampen;

    const maxMove = size * 0.15;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > maxMove) {
      const ratio = maxMove / dist;
      return { x: dx * ratio, y: dy * ratio };
    }

    return { x: dx, y: dy };
  };

  const leftPupilMovement = calcPupil(leftEyeRef);
  const rightPupilMovement = calcPupil(rightEyeRef);

  const isEmbedded = variant === "embedded";
  const faceColor = darkMode ? "#222" : "#f6f7fb";
  const wrapperStyle: React.CSSProperties = {
    width: isEmbedded ? "100%" : "100vw",
    height: isEmbedded ? "auto" : "100vh",
    background: isEmbedded ? "transparent" : faceColor,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    transition: "background 0.4s ease",
  };

  const faceWrapperStyle: React.CSSProperties = {
    padding: isEmbedded ? Math.max(20, size * 0.4) : 60,
    borderRadius: isEmbedded ? "32px" : "50%",
    background: darkMode ? "#2a2a2a" : "#ffffff",
    boxShadow: darkMode
      ? "0 0 40px rgba(255,255,255,0.06)"
      : "0 6px 40px rgba(0,0,0,0.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    transform: isPopping ? "scale(1.08)" : "scale(1)",
    transition: "transform 0.35s ease",
  };

  const eyeSpacing = Math.max(18, size * 0.25);

  const eyesRowStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: eyeSpacing,
  };

  const eyeStyle: React.CSSProperties = {
    width: size,
    height: size,
    background: `radial-gradient(circle at 30% 30%, ${eyeColor}, ${
      darkMode ? "#1b1b1b" : "#dce6ff"
    })`,
    borderRadius: "50%",
    position: "relative",
    border: `8px solid ${darkMode ? "#444" : "#cbd6f7"}`,
    margin: 0,
    boxShadow: darkMode
      ? "0 0 20px rgba(255,255,255,0.15) inset"
      : "8px 8px 25px rgba(0,0,0,0.18), -5px -5px 20px rgba(255,255,255,0.8)",
    transition: "transform 0.25s ease",
    overflow: "hidden",
  };

  const eyelidStyle: React.CSSProperties = {
    position: "absolute",
    width: "100%",
    height: blink ? "100%" : "0%",
    top: 0,
    background: darkMode ? "#111" : "#fff",
    borderRadius: "0 0 50% 50%",
    transition: "height 0.15s ease-in-out",
    zIndex: 10,
  };

  const mouthStroke = Math.max(3, size * 0.05);
  const mouthContainerStyle: React.CSSProperties = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: Math.max(12, size * 0.18),
    position: "relative",
    height: size * 0.4,
  };

  const neutralMouthStyle: React.CSSProperties = {
    width: size * 0.7,
    height: mouthStroke,
    background: darkMode ? "#9ca3af" : "#1f2937",
    borderRadius: mouthStroke,
    opacity: isSmiling ? 0 : 0.5,
    transition: "opacity 0.25s ease",
  };

  const smileArcStyle: React.CSSProperties = {
    position: "absolute",
    width: size * 1.1,
    height: size * 0.8,
    borderBottom: `${mouthStroke}px solid ${darkMode ? "#f3f4f6" : "#1f2937"}`,
    borderLeft: `${mouthStroke}px solid transparent`,
    borderRight: `${mouthStroke}px solid transparent`,
    borderTop: "none",
    borderRadius: `${size}px`,
    bottom: 0,
    opacity: isSmiling ? 0.95 : 0,
    transform: isSmiling ? "scale(1)" : "scale(0.8,0.2)",
    transformOrigin: "50% 100%",
    transition: "opacity 0.3s ease, transform 0.3s ease",
  };

  return (
    <div style={wrapperStyle}>
      {/* Mascot Face */}
      <div style={faceWrapperStyle}>
        <div style={eyesRowStyle}>
          {/* Left Eye */}
          <Eye
            ref={leftEyeRef}
            style={eyeStyle}
            pupilColor={pupilColor}
            pupilMovement={leftPupilMovement}
            eyelidStyle={eyelidStyle}
          />

          {/* Right Eye */}
          <Eye
            ref={rightEyeRef}
            style={eyeStyle}
            pupilColor={pupilColor}
            pupilMovement={rightPupilMovement}
            eyelidStyle={eyelidStyle}
          />
        </div>

        {/* Mouth */}
        <div style={mouthContainerStyle}>
          <div style={neutralMouthStyle} />
          <div style={smileArcStyle} />
        </div>
      </div>
    </div>
  );
};

// ---------------- Eye Sub-component --------------------

interface EyeProps {
  style: React.CSSProperties;
  pupilColor: string;
  pupilMovement: { x: number; y: number };
  eyelidStyle: React.CSSProperties;
}

const Eye = React.forwardRef<HTMLDivElement, EyeProps>(
  ({ style, pupilColor, pupilMovement, eyelidStyle }, ref) => {
    return (
      <div ref={ref} style={{ ...style, position: "relative" }}>
        {/* Eyelid */}
        <div style={eyelidStyle}></div>

        {/* Eye highlight */}
        <div
          style={{
            width: "35%",
            height: "35%",
            background: "rgba(255,255,255,0.65)",
            position: "absolute",
            top: "18%",
            left: "22%",
            borderRadius: "50%",
            filter: "blur(3px)",
            zIndex: 2,
          }}
        />

        {/* Centered & Moving Pupil */}
        <div
          style={{
            width: "32%",
            height: "32%",
            background: pupilColor,
            borderRadius: "50%",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(calc(-50% + ${pupilMovement.x}px), calc(-50% + ${pupilMovement.y}px))`,
            transition: "transform 0.08s ease-out",
            boxShadow: "0 0 25px rgba(0,0,0,0.5)",
            zIndex: 3,
          }}
        />
      </div>
    );
  }
);

Eye.displayName = "Eye";

export default EyeGame;
