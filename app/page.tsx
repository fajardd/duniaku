"use client";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Music } from "lucide-react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Loading from "./loading";
import NotFound from "./not-found";
import { motion } from "framer-motion";
import Image from "next/image";
import edelwisSiang from "../assets/images/edelwis-siang.jpg";
import edelwisMalam from "../assets/images/edelwis-malam.jpg";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const history = {
  data: [
    {
      id: 1,
      image: edelwisSiang,
      date: "2026-03-10",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    },
    {
      id: 2,
      image: edelwisMalam,
      date: "2026-04-12",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    },
  ],
  meta: {
    page: 1,
    limit: 2,
    totalRows: 2,
    totalPages: 1,
  },
};

export default function Home() {
  const [step, setStep] = useState(0);
  const [closed, setClosed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const CORRECT_OTP = "1828";

  const playMusic = () => {
    audioRef.current?.play();
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

  const backStep = () => {
    setStep(step - 1);
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  if (!isVerified) {
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-6 p-6">
        <p className="text-center">Masukkan kode untuk masuk 👀</p>
        <InputOTP
          maxLength={4}
          value={otp}
          onChange={(value) => {
            setOtp(value);

            if (value.length === 4) {
              if (value === CORRECT_OTP) {
                setIsVerified(true);
                setError("");
              } else {
                setError("kode salah 😅");
                setOtp("");
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
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  if (closed) {
    return <NotFound />;
  }

  return (
    <div className="flex flex-col justify-center items-center p-6 h-screen">
      <audio ref={audioRef} src="/sounds/bunga-abadi.mp3" loop />
      <div className="max-w-sm">
        {step === 0 && (
          <div className="flex flex-col justify-center items-center gap-6">
            <motion.div
              initial={{ x: -60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <p className="text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. In
                totam ipsum officiis, at error reprehenderit illo beatae ab vero
                iure animi nihil voluptas perspiciatis maiores ipsam quia magni
                blanditiis aut?
              </p>
            </motion.div>
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-row space-x-2"
            >
              <Button onClick={playMusic}>
                <Music />
              </Button>
              <Button onClick={nextStep}>Lanjut</Button>
            </motion.div>
          </div>
        )}
        {step === 1 && (
          <div className="flex flex-col justify-center items-center gap-6">
            <div className="flex flex-col">
              <Image src={edelwisSiang} alt="Picture of the author" />
              {`[28/01/25 02:00]`}
            </div>
            <motion.div
              initial={{ x: -60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <p className="text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. In
                totam ipsum officiis, at error reprehenderit illo beatae ab vero
                iure animi nihil voluptas perspiciatis maiores ipsam quia magni
                blanditiis aut?
              </p>
            </motion.div>
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-row space-x-2"
            >
              <Button onClick={backStep}>Kembali</Button>
              <Button onClick={nextStep}>Lanjut</Button>
            </motion.div>
          </div>
        )}
        {step === 2 && (
          <div className="flex flex-col justify-center items-center gap-6">
            <motion.div
              initial={{ x: -60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <p className="text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
                minima exercitationem voluptas perspiciatis quibusdam?
                Reprehenderit necessitatibus, tempore, eligendi nisi delectus
                porro alias ipsa ratione, beatae exercitationem earum amet fugit
                est.
              </p>
              <div className="flex flex-col">
                <Image src={edelwisSiang} alt="Picture of the author" />
                {`[28/01/25 02:00]`}
              </div>
              <div className="flex flex-col">
                <Image src={edelwisMalam} alt="Picture of the author" />
                {`[28/01/25 02:00]`}
              </div>
            </motion.div>
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-row space-x-2"
            >
              <Button onClick={backStep}>Kembali</Button>
              <Button onClick={nextStep}>Lanjut</Button>
            </motion.div>
          </div>
        )}
        {step === 3 && (
          <div className="flex flex-col justify-center items-center gap-6">
            <motion.div
              initial={{ x: -60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {history?.data.map((item, index) => (
                <div key={item.id}>{item.description}</div>
              ))}
            </motion.div>
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-row space-x-2"
            >
              <Button onClick={backStep}>Kembali</Button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
