import { useCallback, useEffect, useRef, useState } from "react";

const INTRO_DURATION = 5000;
const PLAYBACK_TIMEOUT = 8000;

const INTRO_VIDEO = "/logo/intro/P-Reach_Out_Intro.mp4";
const BRAND_LOGO = "/logo/static/P-Reach_Out_Int_Brand.svg";

export default function LogoIntro({ onComplete }) {
  const completedRef = useRef(false);
  const durationTimerRef = useRef(null);
  const playbackTimeoutRef = useRef(null);

  const [videoFailed, setVideoFailed] = useState(false);

  const [reduceMotion] = useState(() =>
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );

  const finishIntro = useCallback(() => {
    if (completedRef.current) return;

    completedRef.current = true;
    window.clearTimeout(durationTimerRef.current);
    window.clearTimeout(playbackTimeoutRef.current);

    onComplete?.();
  }, [onComplete]);

  const startDurationTimer = useCallback(() => {
    if (
      completedRef.current ||
      durationTimerRef.current !== null
    ) {
      return;
    }

    window.clearTimeout(playbackTimeoutRef.current);

    durationTimerRef.current = window.setTimeout(
      finishIntro,
      INTRO_DURATION
    );
  }, [finishIntro]);

  const handleVideoError = useCallback(() => {
    setVideoFailed(true);
    startDurationTimer();
  }, [startDurationTimer]);

  useEffect(() => {
    if (reduceMotion) {
      durationTimerRef.current = window.setTimeout(
        finishIntro,
        INTRO_DURATION
      );

      return () => {
        window.clearTimeout(durationTimerRef.current);
      };
    }

    playbackTimeoutRef.current = window.setTimeout(
      finishIntro,
      PLAYBACK_TIMEOUT
    );

    return () => {
      window.clearTimeout(durationTimerRef.current);
      window.clearTimeout(playbackTimeoutRef.current);
    };
  }, [finishIntro, reduceMotion]);

  const mediaStyle = {
    width: "min(65vw, 48svh, 27rem)",
    aspectRatio: "1 / 1",
    flexShrink: 0,
    objectFit: "contain",
    borderRadius: "1.25rem",
    overflow: "hidden",
  };

  return (
    <main
      className="flex min-h-[100vh] min-h-[100svh] w-full
                 flex-col items-center justify-start
                 overflow-x-hidden px-4 pb-6 pt-6
                 sm:px-6 sm:pb-8 sm:pt-8"
      style={{
        backgroundColor: "var(--bg, #ffffff)",
        color: "var(--text, #1a1a2e)",
      }}
      aria-label="P-Reach Out International introduction"
    >
      <div className="flex w-full flex-col items-center">
        {reduceMotion || videoFailed ? (
          <img
            src={BRAND_LOGO}
            alt="P-Reach Out International logo"
            draggable={false}
            onDragStart={(event) => event.preventDefault()}
            className="block max-w-full select-none"
            style={mediaStyle}
          />
        ) : (
          <video
            className="block max-w-full rounded-2xl"
            style={mediaStyle}
            src={INTRO_VIDEO}
            poster={BRAND_LOGO}
            autoPlay
            muted
            playsInline
            preload="auto"
            controls={false}
            disablePictureInPicture
            draggable={false}
            onDragStart={(event) => event.preventDefault()}
            onPlaying={startDurationTimer}
            onEnded={finishIntro}
            onError={handleVideoError}
            aria-label="Animated P-Reach Out International logo"
          />
        )}

        <p
          className="mt-6 max-w-full text-center leading-tight sm:mt-8"
          style={{
            fontFamily: '"Story Script", cursive',
            fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
            color: "var(--primary, #c41e3a)",
            overflowWrap: "anywhere",
          }}
        >
          A Friend Stays There
        </p>

        <button
          type="button"
          onClick={finishIntro}
          className="mt-7 rounded-full px-4 py-2 text-xs
                     underline underline-offset-4
                     transition-opacity hover:opacity-70
                     focus-visible:outline-2
                     focus-visible:outline-offset-4
                     sm:mt-9"
          style={{
            color: "var(--text-mid, #6b7280)",
          }}
        >
          Skip intro
        </button>
      </div>
    </main>
  );
}
