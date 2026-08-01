export interface Artwork {
  id: number
  wvNr: string // Werkverzeichnis-Nummer (Catalogue Raisonné)
  title: string
  category: 'lebenskunst' | 'portrait' | 'abstrakt' | 'anatomie' | 'epoxid'
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
    title: "Portrait im Chiaroscuro (Licht & Schatten)",
    category: "portrait",
    medium: "Öl auf feiner belgischer Leinwand & Video-Lichtstudie",
    year: "2026",
    dimensions: "90 x 70 cm",
    price: "3.200 €",
    status: "Verfügbar",
    location: "Atelier (Deutschland)",
    image: "/artworks/oil_painting_abstract_1784989375408.png",
    video: "/artworks/glam_video_magic.MP4",
    description: "Zeitgenössische Öl-Portraitmalerei in klassischer Altmeister-Schichttechnik mit bewegter Lichtdynamik.",
    certificate: true,
    shipping: "Versicherter Spezialversand im Echtholzverschlag",
    careInstructions: "Mit Spezialfirnis geschützt. Staubfrei halten.",
    provenance: "Werkverzeichnis Malerei 2026.",
    defaultPos: { x: 4, y: 0, w: 4, h: 4 },
    mediaSize: 1
  },
  {
    id: 3,
    wvNr: "WV-2026-003",
    title: "Anatomische Torsostudie (A4 Galerie)",
    category: "anatomie",
    medium: "Rötel & Sepia-Kohle auf Büttenpapier",
    year: "2026",
    dimensions: "29.7 x 21 cm (A4)",
    price: "850 €",
    status: "Verfügbar",
    location: "Atelier Mappe Anatomie",
    image: "/artworks/anatomie/IMG_1070.jpg",
    video: "/artworks/Clip2Comic-2024-09-09-14-50-27.MP4",
    description: "Originale Handzeichnung aus der Galerie 'Skizze A4 (Anatomie)'. Animation der Strichführung.",
    certificate: true,
    shipping: "Planverpackt im Passepartout mit UV-Museumsglas",
    careInstructions: "Fixiertes Pigment. Säurefrei gerahmt.",
    provenance: "Google Drive Galerie Skizze A4 Anatomie.",
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
    description: "Klassische Proportionsstudie nach dem Modell mit animiertem Strichverlauf.",
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
    title: "Abstrakte Symphonie – Farben Konflikt",
    category: "abstrakt",
    medium: "Mischtechnik, Acryl & Pigmente auf Schichtleinen (Blender Animation)",
    year: "2025",
    dimensions: "140 x 100 cm",
    price: "4.100 €",
    status: "Verfügbar",
    location: "Atelier (Deutschland)",
    image: "/artworks/abstrakt/Regenbogen 01.jpg",
    video: "/artworks/FERTIGE_ANIMATION_Farben_Konflikt.mp4",
    description: "Expressive abstrakte Komposition mit bewegter 3D-Farbanimation aus Blender.",
    certificate: true,
    shipping: "Kostenfreier Kunstversand inkl. Wandaufhängung",
    careInstructions: "Staubfrei halten.",
    provenance: "Google Drive Galerie Digitale Kunstwerke & Blender.",
    defaultPos: { x: 4, y: 4, w: 4, h: 4 },
    mediaSize: 1
  },
  {
    id: 6,
    wvNr: "WV-2026-009",
    title: "Epoxidharz Ocean Wave Animation",
    category: "epoxid",
    medium: "UV-beständiges Epoxidharz & Meerespigmente auf Akazienholz",
    year: "2026",
    dimensions: "120 x 80 cm",
    price: "1.850 €",
    status: "Verfügbar",
    location: "Atelier (Deutschland)",
    image: "/artworks/epoxid/436241146_336920962729022_164646371994329756_n copy.jpg",
    video: "/artworks/IMG_0244.MP4",
    description: "Original Epoxidharz-Kunstwerk mit lebendiger Harzwellen-Animation.",
    certificate: true,
    shipping: "Versicherter Transport mit Kantenschutz",
    careInstructions: "Mit feuchtem Mikrofasertuch reinigen.",
    provenance: "Serie Epoxidharz Kunstwerke.",
    defaultPos: { x: 8, y: 4, w: 4, h: 4 },
    mediaSize: 1
  },
  {
    id: 7,
    wvNr: "WV-2026-010",
    title: "Anatomische Gestenstudie (A3 Großformat)",
    category: "anatomie",
    medium: "Rötelstift & Sepiatusche auf A3 Büttenpapier",
    year: "2026",
    dimensions: "42 x 29.7 cm (A3)",
    price: "950 €",
    status: "Verfügbar",
    location: "Atelier Mappe A3",
    image: "/artworks/anatomie/IMG_1054.jpg",
    description: "Großformatige Anatomiezeichnung aus der Galerie 'Skizzen A3' mit präziser Detailstudie.",
    certificate: true,
    shipping: "Versicherter Versand im Passepartout",
    careInstructions: "Fixierte Kohle.",
    provenance: "Google Drive Galerie Skizzen A3.",
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
    title: "Abstrakter Farbcode – Robotic Rainbow",
    category: "abstrakt",
    medium: "Mischtechnik auf Schwerleinwand",
    year: "2026",
    dimensions: "100 x 80 cm",
    price: "2.600 €",
    status: "Verfügbar",
    location: "Atelier (Deutschland)",
    image: "/artworks/abstrakt/Robotic Rainbow .jpg",
    description: "Zeitgenössisches abstraktes Werk in ausdrucksstarker Schichtkomposition.",
    certificate: true,
    shipping: "Versicherter Kunstversand",
    careInstructions: "UV-Schutzfirnis.",
    provenance: "Google Drive Galerie Digitale Kunstwerke.",
    defaultPos: { x: 8, y: 8, w: 4, h: 4 },
    mediaSize: 1
  }
]
