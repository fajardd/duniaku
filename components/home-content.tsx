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
  images: StaticImageData[];
  date: string;
  description: string;
}

interface HomeContentProps {
  images: {
    bioskop25426: StaticImageData;
    marugameUdon25426: StaticImageData;
    chaTime25426: StaticImageData;
    photoBooth26426: StaticImageData;
    iceCream26426: StaticImageData;
    kebunKopi14526: StaticImageData;
    playStation2026: StaticImageData;
    playStation20626: StaticImageData;
    photoBooth2126: StaticImageData;
    photoBooth21626: StaticImageData;
    iceCream2126: StaticImageData;
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
  const [previewImages, setPreviewImages] = useState<StaticImageData[] | null>(
    null,
  );
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const CORRECT_OTP = "1828";

  const history: HistoryItem[] = [
    {
      id: 1,
      images: [
        images.bioskop25426,
        images.marugameUdon25426,
        images.chaTime25426,
      ],
      date: "2026-04-25",
      description:
        "Nonton film Ghost In The Cell di CGV 21, makan mi udon Marugame sama minum Chatime di Pakuwon Mall Yogyakarta",
    },
    {
      id: 2,
      images: [images.photoBooth26426, images.iceCream26426],
      date: "2026-04-26",
      description:
        "Pertamakali photobooth & mam eskrim bareng sama adek di Malioboro",
    },
    {
      id: 3,
      images: [images.kebunKopi14526],
      date: "2026-05-14",
      description:
        "Explore sepontan mau kemana dan kita memilih moncoba pergi ke Kebun Teh Sikatok di Wonosobo yang segar dengan suasana kabut yang menyelimuti sepanjang perjalanan",
    },
    {
      id: 4,
      images: [images.playStation20626, images.playStation2026],
      date: "2026-06-20",
      description:
        "Main game di MainPsId dari jam 2 siang sampai 3 siang yang seharusnya agenda jam 11 siang dengan ditemani makan nasi goreng buatan adek dan kita gagal malam mingguan karena di rumah mas Fajar ada agenda pengajian",
    },
    {
      id: 5,
      images: [
        images.photoBooth2126,
        images.photoBooth21626,
        images.iceCream2126,
      ],
      date: "2026-06-21",
      description:
        "Ngedate di Malioboro jam 10 malem sehabis adek ngambek karena agenda main ke pantai Glagah gagal jadi diubah main ke Malioboro untuk foto di photobooth dan makan eskrim di Malio Gelato",
    },
  ];

  const nextPreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (previewImages && currentPreviewIndex < previewImages.length - 1) {
      setCurrentPreviewIndex((prev) => prev + 1);
    }
  };

  const prevPreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (previewImages && currentPreviewIndex > 0) {
      setCurrentPreviewIndex((prev) => prev - 1);
    }
  };

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
                    awal kita mulai berbincang, mas sudah merasa senang karena
                    setiap obrolan yang kita lalui selalu membuat mas bahagia.
                    Mas harap adek suka, Clara Claurita Salindri.
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
                          className="flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden cursor-pointer relative"
                          onClick={() => {
                            setPreviewImages(item.images);
                            setCurrentPreviewIndex(0);
                          }}
                        >
                          <Image
                            src={item.images[0]}
                            alt={`Memory ${item.id}`}
                            priority
                            className="w-full h-full object-cover transition-transform hover:scale-110"
                            sizes="56px"
                          />
                          {item.images.length > 1 && (
                            <div className="absolute bottom-1 right-1 bg-black/60 backdrop-blur-sm text-white text-[10px] px-1.5 py-0.5 rounded-md font-medium">
                              1/{item.images.length}
                            </div>
                          )}
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
                            className="text-sm leading-relaxed text-justify"
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
        {previewImages && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewImages(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-4xl w-full max-h-screen p-4 flex flex-col justify-center items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full flex justify-center items-center group">
                {currentPreviewIndex > 0 && (
                  <button
                    onClick={prevPreview}
                    className="absolute left-2 md:left-4 z-10 bg-white/10 hover:bg-white/20 text-white w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                )}

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPreviewIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Image
                      src={previewImages[currentPreviewIndex]}
                      alt="Preview"
                      className="max-w-full max-h-[85vh] w-auto h-auto rounded-lg object-contain shadow-2xl"
                    />
                  </motion.div>
                </AnimatePresence>

                {currentPreviewIndex < previewImages.length - 1 && (
                  <button
                    onClick={nextPreview}
                    className="absolute right-2 md:right-4 z-10 bg-white/10 hover:bg-white/20 text-white w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                )}
              </div>

              {/* Indicators */}
              {previewImages.length > 1 && (
                <div className="absolute bottom-6 flex gap-2">
                  {previewImages.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === currentPreviewIndex
                          ? "w-6 bg-white"
                          : "w-1.5 bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              )}

              <button
                onClick={() => setPreviewImages(null)}
                className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 text-white w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all"
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
