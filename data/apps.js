// Shared app data for both HomePage and app/[id]
export const apps = [
  {
    id: 1,
    name: 'Vine',
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" rx="20" fill="%2300bf63"/><text x="50" y="50" text-anchor="middle" dy="0.3em" fill="white" font-family="sans-serif" font-size="16" font-weight="bold">VINE</text></svg>',
    year: '2013-2017',
    description: 'Vine var en populær app for korte, seks sekunders videoer. Den la grunnlaget for mange internett-memes og lanserte flere influencere.',
    rating: '4.5',
    screenshots: [],
    commentary: 'Husker du alle de absurde Vine-videoene? "Do it for the Vine!"',
  },
  {
    id: 2,
    name: 'Google+',
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" rx="20" fill="%23dd4b39"/><text x="50" y="50" text-anchor="middle" dy="0.3em" fill="white" font-family="sans-serif" font-size="20" font-weight="bold">G+</text></svg>',
    year: '2011-2019',
    description: 'Googles forsøk på et sosialt nettverk. Det ble aldri en suksess, men mange husker det for "circles" og integrasjon med andre Google-tjenester.',
    rating: '3.2',
    screenshots: [],
    commentary: 'Ble du noen gang lagt til i en Google+ sirkel mot din vilje?',
  },
  {
    id: 3,
    name: 'Flappy Bird',
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" rx="20" fill="%2370c5ce"/><text x="50" y="50" text-anchor="middle" dy="0.3em" font-size="30">🐦</text></svg>',
    year: '2013-2014',
    description: 'Det enkle, men frustrerende spillet som tok verden med storm før det plutselig forsvant fra app-butikkene.',
    rating: '4.0',
    screenshots: [],
    commentary: 'Hvor langt kom du egentlig? Be honest.',
  },
  // ...legg til flere apper her med tilsvarende struktur...
];
