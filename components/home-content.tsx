"use client";

import { useRef, useState, useEffect } from "react";
import {
  Music,
  VolumeX,
  ChevronRight,
  ChevronLeft,
  Lock,
  Heart,
} from "lucide-react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion, AnimatePresence } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Particles from "@/components/particles";

interface HistoryItem {
  id: number;
  image: StaticImageData;
  date: string;
  description: string;
}

interface HomeContentProps {
  images: {
    bioskop: StaticImageData;
    photoBooth: StaticImageData;
    kebunKopi: StaticImageData;
  };
}

const pageVariants = {
  initial: { opacity: 0, y: 30, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -20, scale: 0.98 },
};

const pageTransition = {
  duration: 0.5,
  ease: [0.25, 0.46, 0.45, 0.94] as const,
};

export default function HomeContent({ images }: HomeContentProps) {
  const [step, setStep] = useState(0);
  const [closed, setClosed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
  const [previewImage, setPreviewImage] = useState<StaticImageData | null>(
    null,
  );

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const CORRECT_OTP = "1828";

  const history: HistoryItem[] = [
    {
      id: 1,
      image: images.bioskop,
      date: "2026-04-25",
      description:
        "Nonton film Ghost In The Cell di CGV 21 Pakuwon Mall Yogyakarta",
    },
    {
      id: 2,
      image: images.photoBooth,
      date: "2026-04-26",
      description: "Photobooth di Malioboro",
    },
    {
      id: 3,
      image: images.kebunKopi,
      date: "2026-05-14",
      description:
        "Explore Wonosobo ke Kebun Teh Sikatok yang swegerrr dan sejuk",
    },
  ];

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    async function checkWebsite() {
      try {
        const snap = await getDoc(doc(db, "config", "site"));
        const data = snap.data();
        if (data?.isClosed) {
          setClosed(true);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    checkWebsite();
  }, []);

  const backStep = () => setStep((s) => s - 1);
  const nextStep = () => setStep((s) => s + 1);

  /* ======= OTP GATE ======= */
  if (!isVerified) {
    return (
      <>
        <Particles count={20} />
        <div className="relative z-10 flex flex-col justify-center items-center h-screen gap-8 p-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-card-strong p-10 flex flex-col items-center gap-7 max-w-sm w-full"
          >
            {/* Lock Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.2,
              }}
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                background: "rgba(232, 168, 124, 0.15)",
                border: "1px solid rgba(232, 168, 124, 0.25)",
              }}
            >
              <Lock className="w-7 h-7" style={{ color: "#e8a87c" }} />
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center space-y-2"
            >
              <h1
                className="text-2xl font-bold text-gradient"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                Duniaku
              </h1>
              <p className="text-sm" style={{ color: "#a89b8c" }}>
                Masukkan kode rahasia untuk masuk 🔐
              </p>
            </motion.div>

            {/* OTP Input */}
            <motion.div
              key={shakeKey}
              className={error ? "animate-shake" : ""}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <InputOTP
                maxLength={4}
                value={otp}
                onChange={(value) => {
                  setOtp(value);
                  setError("");
                  if (value.length === 4) {
                    if (value === CORRECT_OTP) {
                      setIsVerified(true);
                      setError("");
                    } else {
                      setError("Kode salah, coba lagi 😅");
                      setOtp("");
                      setShakeKey((k) => k + 1);
                    }
                  }
                }}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                </InputOTPGroup>
              </InputOTP>
            </motion.div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-sm"
                  style={{ color: "#ff6b6b" }}
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </>
    );
  }

  /* ======= LOADING ======= */
  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-4 p-6">
        <Particles count={15} />
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="animate-heart-beat text-4xl">🌸</div>
          <div className="space-y-3 w-64">
            <div className="h-3 rounded-full animate-shimmer" />
            <div className="h-3 w-3/4 mx-auto rounded-full animate-shimmer" />
            <div className="h-3 w-1/2 mx-auto rounded-full animate-shimmer" />
          </div>
          <p className="text-sm mt-2" style={{ color: "#a89b8c" }}>
            Memuat dunia...
          </p>
        </div>
      </div>
    );
  }

  /* ======= CLOSED ======= */
  if (closed) {
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-6 p-6">
        <Particles count={10} />
        <div className="relative z-10 glass-card p-12 text-center max-w-sm">
          <div className="text-5xl mb-4">🌙</div>
          <h2
            className="text-xl font-bold text-gradient mb-3"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Sedang Istirahat
          </h2>
          <p className="text-sm" style={{ color: "#a89b8c" }}>
            Dunia ini sedang tertidur. Kembali lagi nanti ya 💫
          </p>
        </div>
      </div>
    );
  }

  /* ======= MAIN CONTENT ======= */
  return (
    <>
      <Particles count={25} />
      <audio ref={audioRef} src="/sounds/bunga-abadi.mp3" loop />

      {/* Music toggle - floating */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
        onClick={toggleMusic}
        className={`fixed top-5 right-5 z-50 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
          isPlaying ? "animate-pulse-glow" : ""
        }`}
        style={{
          background: isPlaying
            ? "linear-gradient(135deg, #e8a87c, #d4a5a5)"
            : "rgba(255, 255, 255, 0.08)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          color: isPlaying ? "#0b0b1a" : "#f0e6d3",
        }}
      >
        {isPlaying ? (
          <Music className="w-4 h-4" />
        ) : (
          <VolumeX className="w-4 h-4" />
        )}
      </motion.button>

      {/* Step indicator */}
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex gap-2">
        {Array.from({ length: 1 + Math.ceil(history.length / 3) }).map(
          (_, i) => (
            <div
              key={i}
              className="h-1.5 rounded-full transition-all duration-500"
              style={{
                width: step === i ? "2rem" : "0.375rem",
                background:
                  step === i
                    ? "linear-gradient(90deg, #e8a87c, #d4a5a5)"
                    : "rgba(255, 255, 255, 0.15)",
              }}
            />
          ),
        )}
      </div>

      <div className="relative z-10 flex flex-col justify-center items-center p-6 min-h-screen">
        <div className="max-w-md w-full">
          <AnimatePresence mode="wait">
            {/* ======= STEP 0: WELCOME ======= */}
            {step === 0 && (
              <motion.div
                key="step0"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransition}
                className="flex flex-col justify-center items-center gap-8"
              >
                {/* Decorative flower */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="text-5xl opacity-50"
                >
                  ✿
                </motion.div>

                <div className="glass-card p-8 text-center space-y-5">
                  <h1
                    className="text-3xl font-bold text-gradient"
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                  >
                    Duniaku
                  </h1>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-sm leading-relaxed"
                    style={{
                      color: "#d4cec4",
                      fontFamily: "var(--font-inter), sans-serif",
                    }}
                  >
                    Terima kasih sudah hadir dan membuatku mengenalmu. Sejak
                    awal kita mulai berbincang, aku sudah merasa senang karena
                    setiap obrolan yang kita lalui selalu membuatku bahagia. Aku
                    harap kamu suka, ya, Clara Claurita Salindri.
                  </motion.p>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex gap-3"
                >
                  <button
                    onClick={nextStep}
                    className="btn-gradient flex items-center gap-2 text-sm"
                  >
                    Mulai Perjalanan
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </motion.div>
              </motion.div>
            )}

            {/* ======= STEP 1+: HISTORY ======= */}
            {step >= 1 && (
              <motion.div
                key={`step-history-${step}`}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransition}
                className="flex flex-col justify-center items-center gap-7"
              >
                <h2
                  className="text-2xl font-bold text-gradient"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  Kenangan
                </h2>

                {/* Timeline */}
                <div className="w-full space-y-4">
                  {[...history]
                    .reverse()
                    .slice((step - 1) * 3, step * 3)
                    .map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.15 }}
                        className="glass-card p-5 flex gap-4 items-start"
                      >
                        <div
                          className="flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden cursor-pointer"
                          onClick={() => setPreviewImage(item.image)}
                        >
                          <Image
                            src={item.image}
                            alt={`Memory ${item.id}`}
                            priority
                            className="w-full h-full object-cover transition-transform hover:scale-110"
                            sizes="56px"
                          />
                        </div>
                        <div className="flex-1 space-y-1.5">
                          <div className="flex items-center gap-2">
                            <Heart
                              className="w-3 h-3"
                              style={{ color: "#e8a87c" }}
                            />
                            <span
                              className="text-xs"
                              style={{ color: "#a89b8c" }}
                            >
                              {new Date(item.date).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                          <p
                            className="text-sm leading-relaxed"
                            style={{ color: "#d4cec4" }}
                          >
                            {item.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={backStep}
                    className="btn-ghost-romantic flex items-center gap-2 text-sm"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Kembali
                  </button>
                  {step - 1 < Math.ceil(history.length / 3) - 1 && (
                    <button
                      onClick={nextStep}
                      className="btn-gradient flex items-center gap-2 text-sm"
                    >
                      Lanjut
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* End decoration only on the last page */}
                {step - 1 === Math.ceil(history.length / 3) - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center space-y-2 mt-4"
                  >
                    <div className="animate-heart-beat text-3xl">💕</div>
                    <p className="text-xs" style={{ color: "#a89b8c" }}>
                      — sampai kapanpun —
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ======= IMAGE PREVIEW MODAL ======= */}
      <AnimatePresence>
        {previewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-3xl w-full max-h-screen p-4 flex flex-col justify-center items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={previewImage}
                alt="Preview"
                className="max-w-full max-h-[85vh] w-auto h-auto rounded-lg object-contain shadow-2xl"
              />
              <button
                onClick={() => setPreviewImage(null)}
                className="absolute top-6 right-6 bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/70 transition"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
