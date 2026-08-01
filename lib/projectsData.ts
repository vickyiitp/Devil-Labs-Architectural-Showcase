export interface MaterialSwatch {
  id: string;
  name: string;
  category: 'Concrete' | 'Stone' | 'Timber' | 'Metal' | 'Glass' | 'Earth';
  textureUrl: string;
  description: string;
  origin: string;
  carbonFootprint: string;
}

export interface FloorPlanRoom {
  id: string;
  name: string;
  areaSqM: number;
  dimensions: string;
  keyFeatures: string[];
}

export interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  category: 'Living Space' | 'Workspace' | 'Courtyard' | 'Material Study';
  location: string;
  country: string;
  year: string;
  areaSqM: number;
  clientType: string;
  heroImage: string;
  conceptStatement: string;
  siteContext: string;
  sketches: string[];
  floorPlanImage: string;
  rooms: FloorPlanRoom[];
  materials: MaterialSwatch[];
  structuralNotes: string[];
  galleryImages: string[];
  awards?: string[];
  coordinates3D?: { x: number; y: number; z: number };
}

export const PROJECTS_DATA: ProjectData[] = [
  {
    id: 'villa-solis',
    title: 'VILLA SOLIS',
    subtitle: 'Cliffside Brutalist Sanctuarium',
    category: 'Living Space',
    location: 'Malibu Coast',
    country: 'United States',
    year: '2025',
    areaSqM: 1250,
    clientType: 'Private Family Office',
    heroImage: 'https://picsum.photos/seed/villasolis1/1600/1000',
    conceptStatement: 'Carved directly into the coastal basalt cliffs, Villa Solis responds to the harsh pacific elements through monolithic board-formed white concrete cantilevered slabs that float above the breaking surf.',
    siteContext: 'A 42-degree rocky slope facing southwest. The building is oriented to capture passive solar warmth while protecting living areas from prevailing onshore winds.',
    sketches: [
      'https://picsum.photos/seed/solissketch1/800/600',
      'https://picsum.photos/seed/solissketch2/800/600'
    ],
    floorPlanImage: 'https://picsum.photos/seed/solisplan/1200/900',
    rooms: [
      { id: 'r1', name: 'Grand Horizon Lounge', areaSqM: 180, dimensions: '15.0m x 12.0m', keyFeatures: ['12m frameless glass curtain', 'Sunken conversation hearth', 'Custom travertine furniture'] },
      { id: 'r2', name: 'Infinity Reflection Courtyard', areaSqM: 220, dimensions: '18.0m x 12.2m', keyFeatures: ['Acoustic water mirror', 'Subterranean olive tree', 'Bush-hammered limestone decking'] },
      { id: 'r3', name: 'Master Suite Sanctuary', areaSqM: 140, dimensions: '12.0m x 11.6m', keyFeatures: ['Cantilevered ocean balcony', 'Bespoke cedar slat screen', 'Monolithic stone bath'] },
      { id: 'r4', name: 'Subterranean Wine & Art Vault', areaSqM: 95, dimensions: '10.0m x 9.5m', keyFeatures: ['Climate-sealed basalt walls', 'Integrated linear LED reveals', 'Private tasting lounge'] }
    ],
    materials: [
      {
        id: 'm1',
        name: 'White Board-Formed Concrete',
        category: 'Concrete',
        textureUrl: 'https://picsum.photos/seed/concrete1/400/400',
        description: 'Cast in-situ using local Douglas fir formwork, exposing rich grain texture with high thermal mass.',
        origin: 'Pasadena Aggregates, CA',
        carbonFootprint: 'Net-Zero via Portland Pozzolan Blend'
      },
      {
        id: 'm2',
        name: 'Navona Roman Travertine',
        category: 'Stone',
        textureUrl: 'https://picsum.photos/seed/travertine1/400/400',
        description: 'Unfilled vein-cut travertine slabs with satin honed surface finish.',
        origin: 'Tivoli Quarry, Rome, Italy',
        carbonFootprint: 'Low Impact Quarried Stone'
      },
      {
        id: 'm3',
        name: 'Oxidized Aged Bronze Sashes',
        category: 'Metal',
        textureUrl: 'https://picsum.photos/seed/bronze1/400/400',
        description: 'Hand-patinated solid bronze mullions engineered for extreme marine air resilience.',
        origin: 'Birmingham Foundry, UK',
        carbonFootprint: '100% Recycled Architectural Alloy'
      },
      {
        id: 'm4',
        name: 'Charred Japanese Cedar (Shou Sugi Ban)',
        category: 'Timber',
        textureUrl: 'https://picsum.photos/seed/wood1/400/400',
        description: 'Deeply charred Yakusugi timber providing natural weather resistance and tactile depth.',
        origin: 'Nagano Prefecture, Japan',
        carbonFootprint: 'Carbon Negative Timber'
      }
    ],
    structuralNotes: [
      'Post-tensioned 14-meter cantilever concrete beam system anchored into granite bedrock.',
      'Triple-glazed low-emissivity glass panels with hidden floor track drainage systems.',
      'Integrated geothermal closed-loop heating embedded within slab sub-floors.'
    ],
    galleryImages: [
      'https://picsum.photos/seed/villasolis1/1600/1000',
      'https://picsum.photos/seed/villasolis2/1600/1000',
      'https://picsum.photos/seed/villasolis3/1600/1000',
      'https://picsum.photos/seed/villasolis4/1600/1000'
    ],
    awards: ['RIBA International Award 2025 - Winner', 'Architectural Record Design Vanguard']
  },
  {
    id: 'pavor-akan',
    title: 'PAVILION AKAN',
    subtitle: 'Courtyard Sanctuary & Tea House',
    category: 'Courtyard',
    location: 'Kyoto Highlands',
    country: 'Japan',
    year: '2024',
    areaSqM: 680,
    clientType: 'Cultural Foundation',
    heroImage: 'https://picsum.photos/seed/akan1/1600/1000',
    conceptStatement: 'A quiet meditation between shadow and light. Pavilion Akan uses charred cedar columns and dark pigmented concrete to frame an open-air moss courtyard that collects rainwater into a silent basalt reflecting pool.',
    siteContext: 'A protected forest buffer zone bordering ancient cedar groves. The building touches the terrain softly on elevated pilotis.',
    sketches: [
      'https://picsum.photos/seed/akansketch1/800/600',
      'https://picsum.photos/seed/akansketch2/800/600'
    ],
    floorPlanImage: 'https://picsum.photos/seed/akanplan/1200/900',
    rooms: [
      { id: 'ak1', name: 'Central Moss Courtyard', areaSqM: 210, dimensions: '16.0m x 13.0m', keyFeatures: ['Native Kyoto moss garden', 'Rainwater basalt fountain', 'Floating granite stepping stones'] },
      { id: 'ak2', name: 'Paper & Timber Pavilion', areaSqM: 160, dimensions: '14.0m x 11.4m', keyFeatures: ['Washi paper sliding partitions', 'Hinoki cypress flooring', 'Framed garden vistas'] },
      { id: 'ak3', name: 'Tea Ceremony Cell', areaSqM: 45, dimensions: '6.0m x 7.5m', keyFeatures: ['Sunken iron kettle pit', 'Rammed clay plaster walls', 'Low lintel entrance'] }
    ],
    materials: [
      {
        id: 'am1',
        name: 'Rammed Clay Plaster',
        category: 'Earth',
        textureUrl: 'https://picsum.photos/seed/clay1/400/400',
        description: 'Traditional earthen wall plaster made from local volcanic clay and straw binder.',
        origin: 'Kyoto Basin Soil',
        carbonFootprint: 'Zero Operational Carbon'
      },
      {
        id: 'am2',
        name: 'Hinoki Cypress',
        category: 'Timber',
        textureUrl: 'https://picsum.photos/seed/hinoki1/400/400',
        description: 'Unfinished aromatic Japanese cypress with silky smooth hand-planed grain.',
        origin: 'Gifu Prefecture, Japan',
        carbonFootprint: 'Sustainably Managed Forest'
      }
    ],
    structuralNotes: [
      'Timber frame construction joined with traditional mortise and tenon joinery without metal fasteners.',
      'Permeable stone foundation allowing subterranean root systems to flourish.'
    ],
    galleryImages: [
      'https://picsum.photos/seed/akan1/1600/1000',
      'https://picsum.photos/seed/akan2/1600/1000',
      'https://picsum.photos/seed/akan3/1600/1000'
    ],
    awards: ['Japan Institute of Architects Gold Medal 2024']
  },
  {
    id: 'kronos-hq',
    title: 'KRONOS TOWER',
    subtitle: 'Monolithic Glass & Bronze Headquarters',
    category: 'Workspace',
    location: 'Zurich Financial District',
    country: 'Switzerland',
    year: '2026',
    areaSqM: 8400,
    clientType: 'Private Wealth Management',
    heroImage: 'https://picsum.photos/seed/kronos1/1600/1000',
    conceptStatement: 'A statement of permanence and financial restraint. Kronos Tower combines a triple-laminated fluted glass skin with vertical oxidized bronze fins, creating a dynamic play of light that changes with Zurich seasonal skies.',
    siteContext: 'Urban infill plot adjacent to the Limmat river. Designed to achieve Swiss Minergie-P-ECO sustainability certification.',
    sketches: [
      'https://picsum.photos/seed/kronossketch1/800/600'
    ],
    floorPlanImage: 'https://picsum.photos/seed/kronosplan/1200/900',
    rooms: [
      { id: 'kr1', name: 'Atrium Sky Lobby', areaSqM: 520, dimensions: '22.0m x 23.5m', keyFeatures: ['24-meter triple height atrium', 'Suspended spiral travertine staircase', 'Acoustic oak slat ceiling'] },
      { id: 'kr2', name: 'Executive Design Labs', areaSqM: 780, dimensions: '30.0m x 26.0m', keyFeatures: ['Flex-partition glass suites', 'Circadian rhythm lighting', 'Integrated outdoor green terraces'] },
      { id: 'kr3', name: 'Boardroom Monolith', areaSqM: 190, dimensions: '15.0m x 12.6m', keyFeatures: ['30-person black walnut table', 'Integrated acoustic sound baffles', 'Private alpine panorama deck'] }
    ],
    materials: [
      {
        id: 'km1',
        name: 'Fluted Low-Iron Glass',
        category: 'Glass',
        textureUrl: 'https://picsum.photos/seed/glass1/400/400',
        description: 'Custom fluted triple-paned acoustic glass providing privacy while diffusing daylight deep into floorplates.',
        origin: 'Saint-Gobain Glass, France',
        carbonFootprint: 'High Recycled Glass Content'
      },
      {
        id: 'km2',
        name: 'Anodized Bronze Exoskeleton',
        category: 'Metal',
        textureUrl: 'https://picsum.photos/seed/bronze2/400/400',
        description: 'Extruded structural bronze louvers serving as solar shading and exterior building envelope frame.',
        origin: 'Zurich Metallurgy, Switzerland',
        carbonFootprint: '95% Recycled Metal'
      }
    ],
    structuralNotes: [
      'Hybrid timber-concrete slab construction reducing embodied carbon by 40% vs standard steel.',
      'Active double-skin glass facade with automated shade blinds driven by rooftop weather sensors.'
    ],
    galleryImages: [
      'https://picsum.photos/seed/kronos1/1600/1000',
      'https://picsum.photos/seed/kronos2/1600/1000',
      'https://picsum.photos/seed/kronos3/1600/1000'
    ],
    awards: ['World Architecture Festival Commercial Building 2025']
  },
  {
    id: 'estate-terra',
    title: 'ESTATE TERRA',
    subtitle: 'Earth-Integrated Vineyard & Winery',
    category: 'Material Study',
    location: 'Chianti Valley',
    country: 'Italy',
    year: '2025',
    areaSqM: 3200,
    clientType: 'Private Winery Estate',
    heroImage: 'https://picsum.photos/seed/terra1/1600/1000',
    conceptStatement: 'Half-submerged into the rolling Tuscan hillside, Estate Terra blends subterranean concrete barrel vaults with terraced travertine olive orchards.',
    siteContext: 'A 15-hectare historic vineyard estate. The structure regulates its internal temperature naturally through earth thermal mass.',
    sketches: [
      'https://picsum.photos/seed/terrasketch/800/600'
    ],
    floorPlanImage: 'https://picsum.photos/seed/terraplan/1200/900',
    rooms: [
      { id: 'tr1', name: 'Subterranean Barrel Vault', areaSqM: 850, dimensions: '35.0m x 24.0m', keyFeatures: ['Raw concrete catenary arches', 'Natural constant humidity 14°C', 'Travertine tasting plinth'] },
      { id: 'tr2', name: 'Terrace Pavilion', areaSqM: 420, dimensions: '21.0m x 20.0m', keyFeatures: ['Open-air dining pavilion', 'Rammed earth perimeter walls', 'Panoramic Chianti valley views'] }
    ],
    materials: [
      {
        id: 'tm1',
        name: 'Rammed Tuscan Earth',
        category: 'Earth',
        textureUrl: 'https://picsum.photos/seed/earth1/400/400',
        description: 'Compacted layers of local red clay, gravel, and lime binder forming 600mm structural walls.',
        origin: 'On-site Excavated Earth',
        carbonFootprint: 'Near Zero Carbon Footprint'
      }
    ],
    structuralNotes: [
      'Catenary concrete arch structures supporting 2 meters of topsoil and active grapevine planting.',
      'Passive earth tube cooling system providing constant fresh air exchange.'
    ],
    galleryImages: [
      'https://picsum.photos/seed/terra1/1600/1000',
      'https://picsum.photos/seed/terra2/1600/1000'
    ]
  },
  {
    id: 'alove-residence',
    title: 'THE ALOVE MONOLITH',
    subtitle: 'Alpine Cantilevered High-Altitude Residence',
    category: 'Living Space',
    location: 'St. Moritz',
    country: 'Switzerland',
    year: '2025',
    areaSqM: 920,
    clientType: 'Private Collector',
    heroImage: 'https://picsum.photos/seed/alove1/1600/1000',
    conceptStatement: 'A bold, needle-sharp concrete volume resting atop a snow-covered ridge in the Swiss Alps, framing dramatic views of Lake St. Moritz.',
    siteContext: 'High alpine terrain at 1,850m elevation. Engineered to withstand heavy snow loads and sub-zero thermal stress.',
    sketches: ['https://picsum.photos/seed/alovesketch/800/600'],
    floorPlanImage: 'https://picsum.photos/seed/aloveplan/1200/900',
    rooms: [
      { id: 'al1', name: 'Sky Lounge & Fireplace', areaSqM: 160, dimensions: '16.0m x 10.0m', keyFeatures: ['360-degree glass perimeter', 'Suspended steel fireplace', 'Heated concrete floors'] }
    ],
    materials: [
      {
        id: 'alm1',
        name: 'Hydrophobic Dark Concrete',
        category: 'Concrete',
        textureUrl: 'https://picsum.photos/seed/darkconcrete/400/400',
        description: 'Pigmented graphite concrete engineered with hydrophobic additives for freeze-thaw durability.',
        origin: 'Graubünden Concrete Works',
        carbonFootprint: 'Low Carbon Binder'
      }
    ],
    structuralNotes: [
      'Anchored into granite bedrock using 22 structural tension cables to prevent wind shear drift.'
    ],
    galleryImages: [
      'https://picsum.photos/seed/alove1/1600/1000',
      'https://picsum.photos/seed/alove2/1600/1000'
    ]
  }
];

export const STUDIO_LEADERSHIP = [
  {
    name: 'HENRIK VON ARC',
    role: 'Founding Design Principal',
    credentials: 'M.Arch ETH Zurich / RIBA Int.',
    image: 'https://picsum.photos/seed/henrik/600/800',
    quote: 'Architecture is not the sculpting of form, but the orchestration of void, light, and gravity for human tranquility.'
  },
  {
    name: 'ELENA VASQUEZ',
    role: 'Partner & Director of Material Innovation',
    credentials: 'M.Arch Harvard GSD',
    image: 'https://picsum.photos/seed/elena/600/800',
    quote: 'We test concrete like stonecutters and glass like opticians. Materiality is our tactile vocabulary.'
  },
  {
    name: 'KENJI SATO',
    role: 'Design Principal - Asia & Pacific',
    credentials: 'M.Arch University of Tokyo',
    image: 'https://picsum.photos/seed/kenji/600/800',
    quote: 'The courtyard is where nature reminds the residence of time and seasons.'
  }
];

export const STUDIO_LOCATIONS = [
  { city: 'ZURICH', country: 'Switzerland', address: 'Gotthardstrasse 24, 8002 Zurich', phone: '+41 44 288 9000', email: 'zurich@archabitat.com' },
  { city: 'LOS ANGELES', country: 'United States', address: '8900 Wilshire Blvd, Beverly Hills, CA', phone: '+1 310 492 8100', email: 'la@archabitat.com' },
  { city: 'KYOTO', country: 'Japan', address: 'Kamigyo-ku, Horikawa-dori, Kyoto', phone: '+81 75 411 9200', email: 'kyoto@archabitat.com' }
];

export const MATERIAL_TAXONOMY_FULL: MaterialSwatch[] = [
  {
    id: 'mat-1',
    name: 'Board-Formed White Concrete',
    category: 'Concrete',
    textureUrl: 'https://picsum.photos/seed/matconc1/500/500',
    description: 'In-situ white Portland cement cast against rough Douglas fir boards. Exhibits natural grain prints and subtle color shifts.',
    origin: 'Zurich Lab Sample Batch #104',
    carbonFootprint: 'Net-Zero via Calcined Clay substitution'
  },
  {
    id: 'mat-2',
    name: 'Vein-Cut Navona Travertine',
    category: 'Stone',
    textureUrl: 'https://picsum.photos/seed/mattrav/500/500',
    description: 'Honed Roman limestone with long parallel mineral veins. Warm cream undertones with tactile satin feel.',
    origin: 'Tivoli Quarry, Italy',
    carbonFootprint: 'Natural Quarry Cut - Minimal processing'
  },
  {
    id: 'mat-3',
    name: 'Charred Yakusugi Timber',
    category: 'Timber',
    textureUrl: 'https://picsum.photos/seed/matcharred/500/500',
    description: 'Shou Sugi Ban technique charred cedar timber. Carbonized protective exterior layer resistant to moisture, rot, and insects.',
    origin: 'Nagano Prefecture, Japan',
    carbonFootprint: 'Carbon Negative Timber'
  },
  {
    id: 'mat-4',
    name: 'Hand-Patinated Architectural Bronze',
    category: 'Metal',
    textureUrl: 'https://picsum.photos/seed/matbronze/500/500',
    description: 'Aged bronze alloy with liver-of-sulfur chemical patina finish. Ages gracefully into rich earthy browns and deep umber accents.',
    origin: 'Birmingham Foundry, UK',
    carbonFootprint: '98% Recycled Scrap Alloy'
  },
  {
    id: 'mat-5',
    name: 'Fluted Thermal Glass',
    category: 'Glass',
    textureUrl: 'https://picsum.photos/seed/matglass/500/500',
    description: 'Custom ribbed architectural glass panels with low-iron clarity. Distorts direct vision while allowing soft ambient light diffusion.',
    origin: 'St. Gobain Specialty Glass',
    carbonFootprint: 'Low-E Energy Rating Class A+'
  },
  {
    id: 'mat-6',
    name: 'Stabilized Rammed Earth',
    category: 'Earth',
    textureUrl: 'https://picsum.photos/seed/matearth/500/500',
    description: 'Compacted local clay, aggregate, and natural hydraulic lime. High thermal mass providing passive climate stabilization.',
    origin: 'Chianti Valley Excavation Site',
    carbonFootprint: 'Zero Transport Embodied Carbon'
  }
];
