import HomeContent from "@/components/home-content";
import bioskop25426 from "../assets/images/b25426.jpg";
import photoboth26426 from "../assets/images/pb26426.jpg";
import kebunkopi14526 from "../assets/images/kk14526.jpg";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* Preload images: rendered hidden in server HTML so browser downloads immediately */}
      <div
        aria-hidden="true"
        className="fixed pointer-events-none opacity-0 w-0 h-0 overflow-hidden"
      >
        <Image src={bioskop25426} alt="" priority width={1} height={1} />
        <Image src={photoboth26426} alt="" priority width={1} height={1} />
        <Image src={kebunkopi14526} alt="" priority width={1} height={1} />
      </div>

      <HomeContent
        images={{
          bioskop: bioskop25426,
          photoBooth: photoboth26426,
          kebunKopi: kebunkopi14526,
        }}
      />
    </>
  );
}
