import Image, { StaticImageData } from "next/image";

interface preloadImagsProps {
  bioskop25426: StaticImageData;
  marugameUdon25426: StaticImageData;
  chaTime25426: StaticImageData;
  photoboth26426: StaticImageData;
  iceCream26426: StaticImageData;
  kebunkopi14526: StaticImageData;
  playStation2026: StaticImageData;
  playStation20626: StaticImageData;
  photoBooth2126: StaticImageData;
  photoBooth21626: StaticImageData;
  iceCream2126: StaticImageData;
}

export default function PreloadImages({
  bioskop25426,
  marugameUdon25426,
  chaTime25426,
  photoboth26426,
  iceCream26426,
  kebunkopi14526,
  playStation2026,
  playStation20626,
  photoBooth2126,
  photoBooth21626,
  iceCream2126,
}: preloadImagsProps) {
  return (
    <div
      aria-hidden="true"
      className="fixed pointer-events-none opacity-0 w-0 h-0 overflow-hidden"
    >
      {/* Preload images: rendered hidden in server HTML so browser downloads immediately */}
      <Image
        src={bioskop25426}
        alt="bioskop25426"
        priority
        width={1}
        height={1}
      />
      <Image
        src={marugameUdon25426}
        alt="marugameUdon25426"
        priority
        width={1}
        height={1}
      />
      <Image
        src={chaTime25426}
        alt="chaTime25426"
        priority
        width={1}
        height={1}
      />
      <Image
        src={photoboth26426}
        alt="photoboth26426"
        priority
        width={1}
        height={1}
      />
      <Image
        src={iceCream26426}
        alt="iceCream26426"
        priority
        width={1}
        height={1}
      />
      <Image
        src={kebunkopi14526}
        alt="kebunkopi14526"
        priority
        width={1}
        height={1}
      />
      <Image
        src={playStation2026}
        alt="playStation2026"
        priority
        width={1}
        height={1}
      />
      <Image
        src={playStation20626}
        alt="playStation20626"
        priority
        width={1}
        height={1}
      />
      <Image
        src={photoBooth2126}
        alt="photoBooth2126"
        priority
        width={1}
        height={1}
      />
      <Image
        src={photoBooth21626}
        alt="photoBooth21626"
        priority
        width={1}
        height={1}
      />
      <Image
        src={iceCream2126}
        alt="iceCream2126"
        priority
        width={1}
        height={1}
      />
    </div>
  );
}
