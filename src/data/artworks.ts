export type ArtworkCategory = 'oel-acryl' | 'lebenskunst' | 'anatomie' | 'digitalkunst' | 'epoxid' | 'animationen'

export interface Artwork {
  id: number
  wvNr: string // Werkverzeichnis-Nummer (Catalogue Raisonné)
  title: string
  category: ArtworkCategory
  medium: string
  year: string
  dimensions: string
  price: string
  status: 'Verfügbar' | 'Reserviert' | 'In Privatsammlung'
  location: string // Standorts- / Sammlungshinweis
  image: string
  video?: string
  description: string
  certificate: boolean
  shipping: string
  careInstructions?: string
  provenance?: string // Ausstellungs- / Herkunftshistorie
  defaultPos: { x: number; y: number; w: number; h: number }
  mediaSize: number
}

export const ARTWORKS_DATA: Artwork[] = [
  {
    id: 1,
    wvNr: "WV-2026-001",
    title: "Lebenskunst N° 1 – Der Pfad der Transformation",
    category: "lebenskunst",
    medium: "Historisches Eichenholz, 24k Blattgold & Epoxidharz-Veredelung",
    year: "2026",
    dimensions: "150 x 90 cm",
    price: "4.500 €",
    status: "Verfügbar",
    location: "Atelier (Deutschland)",
    image: "/artworks/gold_leaf_canvas_1784989991003.png",
    video: "/artworks/copy_88449E85-F23B-42BD-8C34-7DD1842C2E3B.MP4",
    description: "Signaturwerk der Serie 'Lebenskunst'. Ein philosophisches Wandobjekt mit fließender Harzanimation.",
    certificate: true,
    shipping: "Spezialtransport inklusive Vor-Ort-Wandmontage",
    careInstructions: "Mit sanftem Tuch pflegen. UV-beständig veredelt.",
    provenance: "Ausgestellt in der Meisterschul-Vorauswahl 2026.",
    defaultPos: { x: 0, y: 0, w: 4, h: 4 },
    mediaSize: 1
  },
  {
    id: 2,
    wvNr: "WV-2026-002",
    title: "Öl-Portrait im Chiaroscuro (Licht & Schatten)",
    category: "oel-acryl",
    medium: "Öl und Acryl fertig auf feiner belgischer Leinwand",
    year: "2026",
    dimensions: "90 x 70 cm",
    price: "3.200 €",
    status: "Verfügbar",
    location: "Atelier (Deutschland)",
    image: "/artworks/oil_painting_abstract_1784989375408.png",
    video: "/artworks/glam_video_magic.MP4",
    description: "Fertiges Gemälde auf Leinwand in altmeisterlicher Öl- und Acryl-Schichttechnik mit bewegter Lichtdynamik.",
    certificate: true,
    shipping: "Versicherter Spezialversand im Echtholzverschlag",
    careInstructions: "Mit Spezialfirnis geschützt. Staubfrei halten.",
    provenance: "Werkverzeichnis Öl & Acryl 2026.",
    defaultPos: { x: 4, y: 0, w: 4, h: 4 },
    mediaSize: 1
  },
  {
    id: 3,
    wvNr: "WV-2026-003",
    title: "Anatomische Torsostudie (A4 Mappe)",
    category: "anatomie",
    medium: "Rötel & Sepia-Kohle auf Büttenpapier",
    year: "2026",
    dimensions: "29.7 x 21 cm (A4)",
    price: "850 €",
    status: "Verfügbar",
    location: "Atelier Mappe Anatomie",
    image: "/artworks/anatomie/IMG_1070.jpg",
    video: "/artworks/Clip2Comic-2024-09-09-14-50-27.MP4",
    description: "Originale Handzeichnung aus der Skizzen & Anatomie Galerie. Präzise Strichführung.",
    certificate: true,
    shipping: "Planverpackt im Passepartout mit UV-Museumsglas",
    careInstructions: "Fixiertes Pigment. Säurefrei gerahmt.",
    provenance: "Google Drive Galerie Skizzen A4 Anatomie.",
    defaultPos: { x: 8, y: 0, w: 4, h: 4 },
    mediaSize: 1
  },
  {
    id: 4,
    wvNr: "WV-2026-004",
    title: "Anatomie-Skizze N° 2 – Rückenakt & Bewegung",
    category: "anatomie",
    medium: "Graphit & Rötelkreide auf 300g Hahnemühle Büttenpapier",
    year: "2026",
    dimensions: "29.7 x 21 cm (A4)",
    price: "790 €",
    status: "Verfügbar",
    location: "Atelier Mappe Anatomie",
    image: "/artworks/anatomie/IMG_1071.jpg",
    video: "/artworks/3b4df56d-3b7c-4c3b-adb8-a4e7afb54a25-u1_trimmed.MP4",
    description: "Klassische Proportionsstudie nach dem Modell aus der Galerie Skizzen & Anatomie.",
    certificate: true,
    shipping: "Versicherter Kunstversand im Passepartout",
    careInstructions: "Säurefrei gerahmt.",
    provenance: "HBK Mappenkollektion.",
    defaultPos: { x: 0, y: 4, w: 4, h: 4 },
    mediaSize: 1
  },
  {
    id: 5,
    wvNr: "WV-2025-014",
    title: "Abstrakte 3D-Simulation – Farben Konflikt",
    category: "animationen",
    medium: "Blender 3D Motion Render & Unreal Engine Shader",
    year: "2025",
    dimensions: "Digital 4K Render / Loop",
    price: "4.100 €",
    status: "Verfügbar",
    location: "Atelier 3D Studio",
    image: "/artworks/abstrakt/Regenbogen 01.jpg",
    video: "/artworks/FERTIGE_ANIMATION_Farben_Konflikt.mp4",
    description: "Eigenständige 3D-Animation aus Blender & Unreal Engine mit fließenden Partikel-Kollisionen.",
    certificate: true,
    shipping: "Digitaler NFT- / 4K-Master-Download & Frame-Display",
    careInstructions: "Digitales Kunstwerk.",
    provenance: "Google Drive Galerie 3D Animationen & Blender.",
    defaultPos: { x: 4, y: 4, w: 4, h: 4 },
    mediaSize: 1
  },
  {
    id: 6,
    wvNr: "WV-2026-009",
    title: "Epoxidharz Ocean Wave (Werke zum Verkauf)",
    category: "epoxid",
    medium: "UV-beständiges Epoxidharz, Meerespigmente & Akazien-Massivholz",
    year: "2026",
    dimensions: "120 x 80 cm",
    price: "1.850 €",
    status: "Verfügbar",
    location: "Atelier (Deutschland)",
    image: "/artworks/epoxid/436241146_336920962729022_164646371994329756_n copy.jpg",
    video: "/artworks/IMG_0244.MP4",
    description: "Original Resin Art Kunstwerk zum Verkauf aus der Epoxidharz-Serie mit tiefen Meeresfarbpigmenten.",
    certificate: true,
    shipping: "Versicherter Transport mit Spezialkantenschutz",
    careInstructions: "Mit feuchtem Mikrofasertuch reinigen.",
    provenance: "Serie Resin Art Epoxidharz.",
    defaultPos: { x: 8, y: 4, w: 4, h: 4 },
    mediaSize: 1
  },
  {
    id: 7,
    wvNr: "WV-2026-010",
    title: "Digitale Synthese – KI & Concept Art N° 1",
    category: "digitalkunst",
    medium: "Digital Painting, KI-Bearbeitung & Vektor-Komposition",
    year: "2026",
    dimensions: "High-Res Fine Art Print (80 x 60 cm)",
    price: "950 €",
    status: "Verfügbar",
    location: "Atelier Digital",
    image: "/artworks/abstrakt/Ai-next-gen-.jpeg",
    description: "Virtueller Entwurf aus der Galerie 'Digitale Künste' auf zertifiziertem Canson Fine Art Rag gedruckt.",
    certificate: true,
    shipping: "Versicherter Versand in Rolle",
    careInstructions: "Säurefreies Papier.",
    provenance: "Google Drive Galerie Digitale Kunstwerke.",
    defaultPos: { x: 0, y: 8, w: 4, h: 4 },
    mediaSize: 1
  },
  {
    id: 8,
    wvNr: "WV-2025-003",
    title: "Lebenskunst N° 2 – Einkehr & Resonanz",
    category: "lebenskunst",
    medium: "Mischtechnik, Schlagmetall & Harzkristalle auf Holzträger",
    year: "2025",
    dimensions: "110 x 110 cm",
    price: "3.800 €",
    status: "Reserviert",
    location: "Reserviert für Kunststiftung",
    image: "/artworks/gold_leaf_canvas_1784989991003.png",
    description: "Aus der Werkschau 'Lebenskunst'. Hommage an Ruhe und Achtsamkeit mit veredelten Harzkristallen.",
    certificate: true,
    shipping: "Versicherter Spezialversand",
    careInstructions: "Pflegeleicht.",
    provenance: "Privatsammlung Vorschau.",
    defaultPos: { x: 4, y: 8, w: 4, h: 4 },
    mediaSize: 1
  },
  {
    id: 9,
    wvNr: "WV-2026-015",
    title: "Unreal Engine 3D Environment Loop",
    category: "animationen",
    medium: "Realtime 3D Animation in Unreal Engine & 4K Render",
    year: "2026",
    dimensions: "Echtzeit 3D Render Loop",
    price: "2.600 €",
    status: "Verfügbar",
    location: "Atelier 3D Studio",
    image: "/artworks/abstrakt/Robotic Rainbow .jpg",
    description: "3D-Animation aus Unreal Engine aus der Galerie No. 6 (Animationen & 3D).",
    certificate: true,
    shipping: "Digitaler Loop-Export & Display-Option",
    careInstructions: "Echtzeit-Render.",
    provenance: "Serie 3D & Unreal Engine.",
    defaultPos: { x: 8, y: 8, w: 4, h: 4 },
    mediaSize: 1
  }
]
