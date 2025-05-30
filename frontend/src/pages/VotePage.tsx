import { NoMoreItems } from "@/components/NoMoreItems";
import { getPickerData, PickerDetails, submitVote, Thing } from "@/lib/api";
import { shuffle } from "@/lib/utils/shuffle";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

const SWIPE_THRESHOLD = 100;

export const VotePage = () => {
  const { pickerId } = useParams();
  const [things, setThings] = useState<Thing[]>([]);
  const [current, setCurrent] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(true);
  const [done, setDone] = useState(false);
  const startX = useRef(0);

  useEffect(() => {
    (async () => {
      if (!pickerId) return;
      setLoading(true);
      try {
        const picker: PickerDetails = await getPickerData(pickerId);
        setThings(shuffle(picker.things));
      } finally {
        setLoading(false);
      }
    })();
  }, [pickerId]);

  const handleVote = useCallback(
    async (type: "like" | "dislike" | "skip") => {
      setDragX(0);
      setIsDragging(false);
      if (current >= things.length) return;
      const thing = things[current];
      if (type !== "skip" && pickerId && thing) {
        await submitVote(pickerId, thing.id, type);
      }
      if (current + 1 >= things.length) {
        setDone(true);
      } else {
        setCurrent((prev) => prev + 1);
      }
    },
    [current, things, pickerId],
  );

  // --- Fix: Only allow one vote per drag/swipe ---
  const hasVotedRef = useRef(false);

  // Touch events for mobile
  const onTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    startX.current = e.touches[0].clientX;
    hasVotedRef.current = false;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setDragX(e.touches[0].clientX - startX.current);
  };
  const onTouchEnd = () => {
    if (hasVotedRef.current) return;
    hasVotedRef.current = true;
    if (dragX > SWIPE_THRESHOLD) {
      handleVote("like");
    } else if (dragX < -SWIPE_THRESHOLD) {
      handleVote("dislike");
    } else {
      setDragX(0);
      setIsDragging(false);
    }
  };

  // Mouse events for desktop
  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startX.current = e.clientX - dragX;
    hasVotedRef.current = false;
    window.addEventListener("mousemove", onMouseMove, { passive: false });
    window.addEventListener("mouseup", onMouseUp);
  };
  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    setDragX(e.clientX - startX.current);
  };
  const onMouseUp = (e?: MouseEvent) => {
    if (hasVotedRef.current) return;
    hasVotedRef.current = true;
    const finalX = e ? e.clientX - startX.current : dragX;
    if (finalX > SWIPE_THRESHOLD) {
      handleVote("like");
    } else if (finalX < -SWIPE_THRESHOLD) {
      handleVote("dislike");
    } else {
      setDragX(0);
      setIsDragging(false);
    }
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  };

  useEffect(() => {
    // Clean up listeners on unmount
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <div className="mt-20 flex flex-col items-center">Loading…</div>;
  }
  if (done) {
    return <NoMoreItems />;
  }
  const item = things[current];
  if (!item) return <NoMoreItems />;

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-x-hidden">
      <div className="fixed inset-0 -z-10 h-full w-full">
        <div className="relative h-full w-full bg-slate-950">
          <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
          <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
        </div>
      </div>
      <div className="root-container flex w-full max-w-xs flex-col items-center">
        <div
          className="relative flex h-64 w-full select-none items-center justify-center"
          style={{ touchAction: "pan-y" }}
        >
          <div
            className={`relative flex h-60 w-full items-center justify-center rounded-xl border border-slate-700 bg-slate-900 text-2xl font-bold shadow-purple-glow transition-transform duration-75 ${
              dragX > SWIPE_THRESHOLD
                ? "ring-4 ring-green-400"
                : dragX < -SWIPE_THRESHOLD
                  ? "ring-4 ring-red-400"
                  : ""
            }`}
            style={{
              transform: `translateX(${dragX}px) rotate(${dragX / 18}deg)`,
              boxShadow: isDragging ? "0 8px 32px rgba(0,0,0,0.2)" : undefined,
              cursor: isDragging ? "grabbing" : "grab",
              userSelect: "none",
              color: "#fff",
              transition: isDragging ? "none" : undefined,
            }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onMouseDown={onMouseDown}
            onMouseMove={
              isDragging ? (e) => onMouseMove(e.nativeEvent) : undefined
            }
            onMouseUp={isDragging ? (e) => onMouseUp(e.nativeEvent) : undefined}
          >
            {item.name}
            {/* Swipe indicator text */}
            {dragX > SWIPE_THRESHOLD && (
              <span className="absolute right-4 top-4 text-lg font-bold text-green-400 drop-shadow-lg">
                LIKE
              </span>
            )}
            {dragX < -SWIPE_THRESHOLD && (
              <span className="absolute left-4 top-4 text-lg font-bold text-red-400 drop-shadow-lg">
                DISLIKE
              </span>
            )}
          </div>
        </div>
        <div className="mt-8 flex w-full justify-between gap-4">
          <button
            className="flex items-center justify-center rounded-full border border-red-400 bg-red-900/60 p-4 text-2xl transition-colors hover:border-red-300 hover:bg-red-800"
            onClick={() => handleVote("dislike")}
            aria-label="Dislike"
            type="button"
          >
            <span
              role="img"
              aria-label="Dislike"
              className="flex h-8 w-8 items-center justify-center"
              style={{ transform: "translateY(-3px)" }}
            >
              👎
            </span>
          </button>
          <button
            className="flex items-center justify-center rounded-full border border-slate-400 bg-slate-800/60 p-4 text-2xl transition-colors hover:border-slate-300 hover:bg-slate-700"
            onClick={() => handleVote("skip")}
            aria-label="Skip"
            type="button"
          >
            <span
              role="img"
              aria-label="Skip"
              className="flex h-8 w-8 items-center justify-center"
              style={{
                transform: "translateY(-2px) scale(0.95) translateX(-1px)",
              }}
            >
              ⏭️
            </span>
          </button>
          <button
            className="flex items-center justify-center rounded-full border border-green-400 bg-green-900/60 p-4 text-2xl transition-colors hover:border-green-300 hover:bg-green-800"
            onClick={() => handleVote("like")}
            aria-label="Like"
            type="button"
          >
            <span
              role="img"
              aria-label="Like"
              className="flex h-8 w-8 items-center justify-center"
              style={{ transform: "translateY(-5px)" }}
            >
              👍
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
