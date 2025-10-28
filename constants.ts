export const CALIFORNIA_COUNTIES = [
    "Alameda", "Alpine", "Amador", "Butte", "Calaveras", "Colusa", "Contra Costa", 
    "Del Norte", "El Dorado", "Fresno", "Glenn", "Humboldt", "Imperial", "Inyo", 
    "Kern", "Kings", "Lake", "Lassen", "Los Angeles", "Madera", "Marin", "Mariposa", 
    "Mendocino", "Merced", "Modoc", "Mono", "Monterey", "Napa", "Nevada", "Orange", 
    "Placer", "Plumas", "Riverside", "Sacramento", "San Benito", "San Bernardino", 
    "San Diego", "San Francisco", "San Joaquin", "San Luis Obispo", "San Mateo", 
    "Santa Barbara", "Santa Clara", "Santa Cruz", "Shasta", "Sierra", "Siskiyou", 
    "Solano", "Sonoma", "Stanislaus", "Sutter", "Tehama", "Trinity", "Tulare", 
    "Tuolumne", "Ventura", "Yolo", "Yuba"
];

export const UTILITY_COMPANIES = ["PG&E", "SCE", "SDG&E", "SMUD", "LADWP", "Other"];

export const CRAFT_TYPES = [
    { name: "Electrician (General)", nonPwRate: 45.00, pwRate: 75.00 },
    { name: "Laborer (General)", nonPwRate: 25.00, pwRate: 50.00 },
    { name: "Roofer", nonPwRate: 35.00, pwRate: 60.00 },
    { name: "Ironworker", nonPwRate: 40.00, pwRate: 70.00 },
    { name: "Equipment Operator", nonPwRate: 42.00, pwRate: 72.00 },
    { name: "Apprentice (Electrician)", nonPwRate: 22.50, pwRate: 37.50 },
    { name: "Project Manager", nonPwRate: 55.00, pwRate: 55.00 },
    { name: "Carpenter", nonPwRate: 38.00, pwRate: 68.00 },
    { name: "Plumber", nonPwRate: 48.00, pwRate: 80.00 },
    { name: "Painter", nonPwRate: 32.00, pwRate: 58.00 },
    { name: "Sheet Metal Worker", nonPwRate: 43.00, pwRate: 74.00 },
    { name: "Cement Mason", nonPwRate: 36.00, pwRate: 65.00 },
    { name: "HVAC Technician", nonPwRate: 46.00, pwRate: 78.00 },
    { name: "Drywall Installer", nonPwRate: 33.00, pwRate: 62.00 },
];

export const PW_RATES_BY_COUNTY: { [county: string]: { [craft: string]: number } } = {
  "Los Angeles": {
    "Electrician (General)": 80.50,
    "Laborer (General)": 55.20,
    "Roofer": 64.00,
    "Carpenter": 72.10,
    "Plumber": 85.50,
  },
  "San Francisco": {
    "Electrician (General)": 95.75,
    "Laborer (General)": 65.10,
    "Roofer": 75.00,
    "Carpenter": 88.30,
    "Plumber": 102.00,
  },
  "Sacramento": {
    "Electrician (General)": 72.00,
    "Laborer (General)": 51.50,
    "Roofer": 59.80,
    "Carpenter": 68.00,
    "Plumber": 79.25,
  },
  "San Diego": {
    "Electrician (General)": 75.50,
    "Laborer (General)": 53.00,
    "Roofer": 61.50,
    "Carpenter": 70.00,
    "Plumber": 82.00,
  }
};

export const APPRENTICESHIP_PROGRAMS: { [county: string]: { trade: string; name: string; contact: string; website: string; }[] } = {
    "Los Angeles": [
      { trade: "Electrician", name: "Los Angeles County Electrical JATC (IBEW Local 11)", contact: "(323) 221-5881 | 6023 S. Garfield Ave., Commerce, CA 90040", website: "https://www.laett.com/" },
      { trade: "Carpenter", name: "Southwest Carpenters Training Fund", contact: "(562) 699-0417 | 12057 E. Slauson Ave., Santa Fe Springs, CA 90670", website: "https://www.swctf.org/" },
      { trade: "Laborer", name: "Southern California Laborers JATC", contact: "(626) 610-1700 | 1385 W. Sierra Madre Ave., Azusa, CA 91702", website: "https://www.socalaborers.org/training/" },
    ],
    "San Francisco": [
      { trade: "Electrician", name: "San Francisco Electrical JATC (IBEW Local 6)", contact: "(415) 587-2500 | 381 Martin Luther King Jr. Dr., San Francisco, CA 94132", website: "https://www.sfejatc.org/" },
      { trade: "Carpenter", name: "Northern California Carpenters Training Committee", contact: "(510) 568-4545 | 2350 Santa Rita Rd., Pleasanton, CA 94566", website: "https://www.ctcnc.org/" },
      { trade: "Plumber", name: "UA Local 38 / San Francisco Plumbing and Pipe Trades", contact: "(415) 562-3838 | 1621 Sullivan Ave, Daly City, CA 94015", website: "https://www.ualocal38.org/training.aspx" },
    ],
    "Sacramento": [
      { trade: "Electrician", name: "Sacramento Area Electrical JATC (IBEW Local 340)", contact: "(916) 646-6688 | 2600 Longview Dr., North Highlands, CA 95660", website: "https://www.sacja.org/" },
      { trade: "Sheet Metal", name: "Sheet Metal Workers Local 104 and Bay Area Training Fund", contact: "(916) 993-4191 | 1410 E. Beamer St., Woodland, CA 95776", website: "https://www.smw104.org/training/sacramento-training-center/" },
    ],
    "San Diego": [
      { trade: "Electrician", name: "San Diego Electrical Training Center (IBEW Local 569)", contact: "(858) 569-6633 | 4675 Viewridge Ave., San Diego, CA 92123", website: "https://www.sdett.org/" },
      { trade: "Carpenter", name: "Southwest Carpenters Training Fund (San Diego)", contact: "(858) 621-2667 | 8595 Miralani Dr., San Diego, CA 92126", website: "https://www.swctf.org/" },
    ],
    "Alameda": [
       { trade: "Electrician", name: "Alameda County Electrical JATC (IBEW Local 595)", contact: "(510) 357-5282 | 6250 Village Pkwy, Dublin, CA 94568", website: "https://www.595jatc.org/" },
       { trade: "Carpenter", name: "Northern California Carpenters Training Committee", contact: "(510) 568-4545 | 2350 Santa Rita Rd., Pleasanton, CA 94566", website: "https://www.ctcnc.org/" },
    ]
  };


export const MARKUPS = {
    ADMIN: 0.06,
    INSURANCE: 0.15,
    MARGIN_NON_PW: 0.20,
    MARGIN_PW: 0.22,
};