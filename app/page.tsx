"use client";
import { useRef, useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Music } from "lucide-react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Loading from "./loading";
import NotFound from "./not-found";
import { motion } from "framer-motion";

export default function Home() {
  const [step, setStep] = useState(0);
  const [closed, setClosed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playMusic = () => {
    audioRef.current?.play();
  };

  async function closeWebsite() {
    await updateDoc(doc(db, "config", "site"), {
      isClosed: true,
    });
    location.reload();
  }

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
              <Button onClick={nextStep}>Siap Paham Lanjut</Button>
            </motion.div>
          </div>
        )}
        {step === 1 && (
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
              <Button onClick={backStep}>Kembali</Button>
              <Button onClick={nextStep}>Siap Paham Lanjut</Button>
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
              <Button onClick={nextStep}>Siap Paham Lanjut</Button>
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
              <Button>
                <a
                  href="whatsapp://send/?phone=6281215431897&text=Halo ganteng lagi ngapain😊&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noreferrer"
                >
                  Lanjut
                </a>
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button>Terimakasih</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Apa kamu yakin pilih ini!
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Klo pilih tombol <span className="font-bold">Yakin </span>
                      websitenya bakal gabisa diakses lagi. Makasih yaa udah
                      kenal sampai saat ini semoga ara bahagia selalu dengan apa
                      yang dicari dan diinginkan😊
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Gajadi</AlertDialogCancel>
                    <AlertDialogAction
                      variant="destructive"
                      onClick={closeWebsite}
                    >
                      Yakin
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
