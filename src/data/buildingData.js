// Building projects data
export const BUILDING_PROJECTS = [
  { 
    id: 'altan', 
    name: 'Altan (Balcony)',
    description: 'Upphöjd altan med räcken'
  }
];

// Size recommendations for each project type
export const SIZE_RECOMMENDATIONS = {
  altan: {
    minWidth: 1.5,
    maxWidth: 4.0,
    minLength: 2.0,
    maxLength: 6.0,
    defaultWidth: 2.0,
    defaultLength: 3.0,
    unit: 'meter'
  }
};

// Foundation options
export const FOUNDATION_OPTIONS = [
  {
    id: 'marksten',
    name: 'Marksten (paving stone)',
    description: 'Betongplattor direkt på marken',
    description2: 'Rekommendation är 1 i varje hörn och var annan eller 3:e under',
    imageUrl: 'https://bolist.se/media/cache/d0b/15f/d0b15fa8493c40cc9f5b13bcd031518f/c0f7f295051cb3deb52509085081aae9/610x610.jpg',
    pros: ['Stabil grund', 'Lång hållbarhet', 'Bra för alla storlekar'],
    cons: ['Kan vara svåra att få raka', 'Tjäle kan vara problem'],
    materials: [
      '1 platta i varje hörn och mitt under var annan eller var 3:e',
    ],
    costPerSt: 35,
  },
  {
    id: 'plint 300',
    name: 'Plint 300 (Concrete Piers)',
    description: 'Betongplintar som bär upp konstruktionen',
    description2: '1,5 - 2m mellanrum',
    imageUrl: 'https://www.beijerbygg.se/wcsstore/BeijerCAS/HPMAssets/d220001/derivates/9/001/628/12726437_640px.jpg',
    pros: ['Distans från mark', 'Snabb installation', 'Justerbart järn'],
    cons: ['Kräver frostfri djup', 'Begränsad belastning'],
    materials: [
      'Räkna 1 i varje hörn och 1,5-2m mellan varje plint.'
    ],
    costPerSt: 356,
  },
  {
    id: 'plint 500',
    name: 'Plint 500 (Concrete Piers)',
    description: 'Betongplintar som bär upp konstruktionen',
    description2: '1,5 - 2m mellanrum',
    imageUrl: 'https://www.beijerbygg.se/wcsstore/BeijerCAS/HPMAssets/d220001/derivates/9/001/969/3410-501600S_p_ps_640px.jpg',
    pros: ['Distans från mark', 'Snabb installation', 'Justerbart järn'],
    cons: ['Kräver frostfri djup', 'Begränsad belastning'],
    materials: [
      'Räkna 1 i varje hörn och 1,5-2m mellan varje plint.',
    ],
    costPerSt: 800,
  },
  {
    id: 'plint 700',
    name: 'Plint 700 (Concrete Piers)',
    description: 'Betongplintar som bär upp konstruktionen',
    description2: '1,5 - 2m mellanrum',
    imageUrl: 'https://www.beijerbygg.se/wcsstore/BeijerCAS/HPMAssets/d220001/derivates/9/001/969/3410-501600S_p_ps_640px.jpg',
    pros: ['Distans från mark', 'Snabb installation', 'Justerbart järn'],
    cons: ['Kräver frostfri djup', 'Begränsad belastning'],
    materials: [
      'Räkna 1 i varje hörn och 1,5-2m mellan varje plint.',
    ],
    costPerSt: 800,
  }
];

// Joint/beam options
export const JOINT_OPTIONS = [
  {
    id: '45x145',
    name: '45x145mm',
    description: 'Standard balk för mindre projekt',
    imageUrl: 'https://www.byggmax.se/media/catalog/product/cache/bed8de9818ad0cb6b0e672d6723959dc/0/8/08745145_fc628aa9-13a5-4437-884b-7555bf1b29c2.jpg',
    strength: 'C24',
    spacing: '400mm',
    costPerMeter: 45,
    maxSpan: 2.4,
    suitableFor: 'Mindre verandor och terrasser'
  },
  {
    id: '45x170',
    name: '45x170mm',
    description: 'Mellanstor balk för medelstora projekt',
    imageUrl: 'https://media-prod.beijerflow.com/media/derivates/9/001/192/676/IMP_45x170_130121_100715_0073_640px.jpg',
    strength: 'C24',
    spacing: '500mm',
    costPerMeter: 58,
    maxSpan: 3.2,
    suitableFor: 'Medelstora verandor och terrasser'
  },
  {
    id: '45x195',
    name: '45x195mm',
    description: 'Stor balk för stora projekt',
    imageUrl: 'https://media-prod.beijerflow.com/media/derivates/9/286/828/IMP_45x190_130121_100809_0074_640px_640px.jpg',
    strength: 'C24',
    spacing: '600mm',
    costPerMeter: 72,
    maxSpan: 4.0,
    suitableFor: 'Stora verandor och terrasser'
  }
];

// Floorboard options
export const FLOORBOARD_OPTIONS = [
  {
    id: '28x95',
    name: '28x95mm',
    description: 'Smal bräda för klassisk look',
    imageUrl: 'https://www.obsbygg.no/globalassets/productimages/terrassebord-21x095-_.jpg?ref=7D8029BFA7&w=960&mode=pad&h=960&format=jpg',
    material: 'Impregnerad furu',
    spacing: '5mm',
    costPerM2: 180,
    metersPerM2: 10.5,
    suitableFor: 'Mindre projekt, klassisk stil'
  },
  {
    id: '28x120',
    name: '28x120mm',
    description: 'Standard bräda för de flesta projekt',
    imageUrl: 'https://nemotec.no/wp-content/uploads/2022/04/0ZG20nqlEeyir87_fgSqzg-va8dhX0UEeyC3vnsxywEyw-700x525.jpeg',
    material: 'Impregnerad furu',
    spacing: '5mm',
    costPerM2: 220,
    metersPerM2: 8.33,
    suitableFor: 'De flesta verandor och terrasser'
  },
  {
    id: '28x145',
    name: '28x145mm',
    description: 'Bred bräda för modern look',
    imageUrl: 'https://media-prod.beijerflow.com/media/derivates/8/001/205/062/Trall_34x145_130121_101605_0084_1536px.jpg',
    material: 'Impregnerad furu',
    spacing: '5mm',
    costPerM2: 260,
    metersPerM2: 6.7,
    suitableFor: 'Stora projekt, modern stil'
  },
  {
    id: '34x145',
    name: '34x145mm',
    description: 'Tjock bräda för extra hållbarhet',
    imageUrl: 'https://www.beijerbygg.se/wcsstore/BeijerCAS/HPMAssets/d220001/derivates/9/001/205/062/Trall_34x145_130121_101605_0084_640px.jpg',
    material: 'Impregnerad furu',
    spacing: '5mm',
    costPerM2: 320,
    metersPerM2: 6.7,
    suitableFor: 'Högbelastade ytor, lång hållbarhet'
  }
]; 