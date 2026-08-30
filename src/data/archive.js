export const musicTracks = [
  'Prime-All.Four.Elements.06.mp3', 'Prime-Funk.Destruction.mp3',
  'Prime-Funky.Mix.mp3', 'Prime-Gun.Law.mp3', 'Prime-Hip.Hop.Mix.mp3',
  'Prime-Hooligans.Theme.mp3', 'Prime-Keep.the.Pace.mp3',
  'Prime-Lazy.Days.mp3', 'Prime-Pickled.Herring.mp3',
  'Prime-So.Hot.mp3', 'Prime-Swedish.Meatballs.mp3',
]

export const videoClips = [
  ['md-chuco.mp4', 'Chuco', 'Feature clip of Chuco, representing Universoul BBoyz'],
  ['md-f4b-01.mp4', 'Funky Four Brothers.01', 'A-Train and Skills qualifying at Juste Debout 2006'],
  ['md-unknown.mp4', 'Unknown?', 'Old artifact...'],
  ['md-sean-01.mp4', 'Sean.01', 'Feature clip of Sean, El Tempo Crew, Norway'],
  ['md-mansion-locking.mp4', 'MD.03', "Locking in Quill's Mansion"],
  ['md-mansion-popping.mp4', 'MD.04', "Popping in Quill's Mansion"],
  ['md-old-raw-footage.mp4', 'MD.05', 'Old Raw Footage'],
  ['md-comviq-kompis.mp4', 'MD.06', 'Comviq Kompis Commercial'],
  ['md-maxsat.mp4', 'MD.07', 'Maxsat 87'],
  ['md-robone-01.mp4', 'Rob One.01', 'Introducing Rob One'],
  ['md-robone-02.mp4', 'Rob One.02', 'Rob One playing in the street'],
  ['md-quill-02.mp4', 'Quill.02', 'Backyard Summertime'],
  ['md-quill-03.mp4', 'Quill.03', 'Practice Session'],
  ['md-quill-04.mp4', 'Quill.04', 'Mowing the Lawn'],
  ['md-sven-01.mp4', 'Sven.01', 'Graffiti wall in Paris'],
  ['md-sven-02.mp4', 'Sven.02', 'Funk Battle at Lydmar Stockholm'],
  ['md-sven-05.mp4', 'Sven.05', 'Time2Battle in Malmö'],
  ['md-sven-06.mp4', 'Sven.06', 'Battle Night at Grodan Stockholm'],
  ['md-sven-07.mp4', 'Sven.07', 'Jam called Cypher at Danscenter'],
  ['md-sven-08.mp4', 'Sven.08', 'Solo from battle against El Tempo'],
  ['md-sven-09.mp4', 'Sven.09', 'Solo from KRS-One at Berns Stockholm'],
  ['md-prime-01.mp4', 'Prime.01', 'Funk Battle at Lydmar Stockholm'],
  ['md-prime-02.mp4', 'Prime.02', 'Funk Battle at Lydmar Stockholm'],
  ['md-prime-03.mp4', 'Prime.03', 'Freestyle Locking'],
  ['md-prime-04.mp4', 'Prime.04', 'Battle of the Year 2000'],
  ['md-prime-05.mp4', 'Prime.05', 'Solo from battle against El Tempo'],
  ['SlamJammin.mp4', 'Slam Jammin', 'Mass Destruction archive clip'],
]

export const pictureFiles = Array.from({ length: 53 }, (_, index) => index + 1)
  .filter((number) => ![36, 40].includes(number))
  .map((number) => `smallpic${String(number).padStart(3, '0')}.jpg`)

export const interviews = [
  { slug: 'chuco', name: 'Chuco', date: '2006', intro: 'Universoul popper Chuco om foundation, crews, boogaloo och att bygga en egen stil.', topics: ['Where it started', 'Foundation before style', 'Crew culture', 'Advice for new dancers'] },
  { slug: 'joakim', name: 'Joakim', date: '2006-12-05', intro: 'Den danske funkstylern Joakim om den skandinaviska scenen, battles och gemenskap.', topics: ['Copenhagen', 'The Scandinavian approach', 'Memorable battles', 'Why crews matter'] },
  { slug: 'sean', name: 'Sean', date: '2005-04', intro: 'Bjørn “Sean” Hagen om popping, graffiti, musik och den norska streetdance-scenen.', topics: ['Norway and El Tempo', 'Mixing styles', 'Teaching', 'Building foundation'] },
  { slug: 'shallow', name: 'Shallow', date: '2006-04', intro: 'Shallow berättar om sin start 1978 och eventet Unity & Respect i Boston.', topics: ['Dancing since 1978', 'Hip-hop community', 'Unity & Respect', 'Music without boundaries'] },
]

export const archiveLinks = [
  ['Locker Legends', 'https://lockerlegends.net/'], ['Wigz & Co', 'https://wigzandco.com/'],
  ['Funkcamp', 'https://funkcamp.se/'], ['Campbellock', 'https://campbellock.dance/'],
  ['The Lockers', 'https://www.thelockersdance.com/'],
  ['Dr. Plik Plok', 'http://www.plikplok.com'], ['Twilight Players', 'http://www.twilightplayers.com'],
  ['Style2ouf', 'http://www.style2ouf.com'], ['BBoyworld', 'http://www.bboyworld.com'],
]

export const displayName = (fileName) => fileName
  .replace(/\.(mp3|mov|mp4)$/i, '').replace(/^md-/i, '').replace(/^Prime-/i, '')
  .replace(/[.-]+/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase())
