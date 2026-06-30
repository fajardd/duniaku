import PreloadImages from "@/components/preload-images";
import HomeContent from "@/components/home-content";
import bioskop25426 from "../assets/images/b25426.jpg";
import marugameUdon25426 from "../assets/images/mu25426.jpg";
import chaTime25426 from "../assets/images/ct25426.jpg";
import photoboth26426 from "../assets/images/pb26426.jpg";
import iceCream26426 from "../assets/images/ic26426.jpg";
import kebunkopi14526 from "../assets/images/kk14526.jpg";
import playStation2026 from "../assets/images/ps2026.jpg";
import playStation20626 from "../assets/images/ps20626.jpg";
import photoBooth2126 from "../assets/images/pb2026.jpg";
import photoBooth21626 from "../assets/images/pb21626.jpg";
import iceCream2126 from "../assets/images/ic21626.jpg";

export default function Home() {
  return (
    <>
      <PreloadImages
        bioskop25426={bioskop25426}
        marugameUdon25426={marugameUdon25426}
        chaTime25426={chaTime25426}
        photoboth26426={photoboth26426}
        iceCream26426={iceCream26426}
        kebunkopi14526={kebunkopi14526}
        playStation2026={playStation2026}
        playStation20626={playStation20626}
        photoBooth2126={photoBooth2126}
        photoBooth21626={photoBooth21626}
        iceCream2126={iceCream2126}
      />
      <HomeContent
        images={{
          bioskop25426: bioskop25426,
          marugameUdon25426: marugameUdon25426,
          chaTime25426: chaTime25426,
          photoBooth26426: photoboth26426,
          iceCream26426: iceCream26426,
          kebunKopi14526: kebunkopi14526,
          playStation2026: playStation2026,
          playStation20626: playStation20626,
          photoBooth2126: photoBooth2126,
          photoBooth21626: photoBooth21626,
          iceCream2126: iceCream2126,
        }}
      />
    </>
  );
}
