import HomeContent from "@/components/home-content";
import edelwisSiang from "../assets/images/edelwis-siang.jpg";
import edelwisMalam from "../assets/images/edelwis-malam.jpg";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* Preload images: rendered hidden in server HTML so browser downloads immediately */}
      <div aria-hidden="true" className="fixed pointer-events-none opacity-0 w-0 h-0 overflow-hidden">
        <Image src={edelwisSiang} alt="" priority width={1} height={1} />
        <Image src={edelwisMalam} alt="" priority width={1} height={1} />
      </div>

      <HomeContent images={{ siang: edelwisSiang, malam: edelwisMalam }} />
    </>
  );
}
