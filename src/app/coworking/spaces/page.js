import { getSpaces } from "@/services/coworking.service";
import SpacesGrid from "./components/SpacesGrid";

export const revalidate = 3600;

const gridPositions = [
  { col: "1 / 2", row: "1 / 2" },
  { col: "2 / 5", row: "1 / 2" },
  { col: "1 / 3", row: "2 / 3" },
  { col: "3 / 5", row: "2 / 3" },
  { col: "1 / 3", row: "3 / 4" },
  { col: "3 / 5", row: "3 / 5" },
  { col: "1 / 2", row: "4 / 5" },
  { col: "2 / 3", row: "4 / 5" },
  { col: "5 / 6", row: "1 / 5" },
];

const spaceImages = [
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
  "https://images.unsplash.com/photo-1505624198937-c704aff72608?w=800&q=80",
  "https://images.unsplash.com/photo-1594235048794-fae8583a5af5?w=800&q=80",
  "https://images.unsplash.com/photo-1604328704120-91e8d2fdc188?w=800&q=80",
  "https://images.unsplash.com/photo-1687945727613-a4d06cc41024?w=800&q=80",
  "https://plus.unsplash.com/premium_photo-1661962361446-f450f3f21495?w=800&q=80",
  "https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=800&q=80",
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
];

export default async function SpacesPage() {
  const data = await getSpaces();
  const spaces = data.slice(0, gridPositions.length);

  return (
    <>
      <div className="text-center mt-4 sm:mt-6 lg:mt-8 mb-3 sm:mb-4 px-4">
        <h1
          className="text-2xl sm:text-3xl lg:text-5xl font-bold"
          style={{ color: "var(--surface-900)" }}
        >
          Espacios disponibles
        </h1>
        <p
          className="text-sm sm:text-base lg:text-lg mt-1 sm:mt-2"
          style={{ color: "var(--surface-600)" }}
        >
          Encuentra espacios disponibles de co-working
        </p>
      </div>

      <SpacesGrid
        spaces={spaces}
        gridPositions={gridPositions}
        spaceImages={spaceImages}
      />
    </>
  );
}
