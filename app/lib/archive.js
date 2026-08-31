export const musicTracks = [
  'Prime-All.Four.Elements.06.mp3', 'Prime-Funk.Destruction.mp3',
  'Prime-Funky.Mix.mp3', 'Prime-Gun.Law.mp3', 'Prime-Hip.Hop.Mix.mp3',
  'Prime-Hooligans.Theme.mp3', 'Prime-Keep.the.Pace.mp3',
  'Prime-Lazy.Days.mp3', 'Prime-Pickled.Herring.mp3',
  'Prime-So.Hot.mp3', 'Prime-Swedish.Meatballs.mp3',
]

export const videoClips = [
  ['md-yared-01.mp4', 'Razzle Dazzle (Yared).01', "Razzle Dazzle playing with Prime's music"],
  ['md-bbot-01.mp4', 'Baby Bang & Ooooh Tiffany (BBOT)', "Clip from France featuring Baby Bang and Ooooh Tiffany with Prime's music"],
  ['md-greg.mp4', 'Greg Campbellock Jr. Interview', 'Interview clip with Greg Campbellock Jr.'],
  ['md-joakim-01.mp4', 'Joakim.01', 'Feature clip with Joakim from Copenhagen'],
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

export const clipTrackList = [
  { clip: 'MD.01', title: 'The Teaser Clip', tracks: ['Chocolate Milk — Take It Off'] },
  { clip: 'MD.02', title: 'Popping Zombies', tracks: ['Tuff Crew — Techno Tuff'] },
  { clip: 'MD.03', title: 'Locking in Quills Mansion', tracks: ['James Brown — Rapp Payback'] },
  {
    clip: 'MD.04',
    title: 'Popping in Quills Mansion',
    tracks: [
      'Chocolate Milk — Running On Empty',
      'Prince — Head',
      'Roger Troutman — Thrillseekers',
    ],
  },
  { clip: 'Quill.01', title: 'Royal Theatre of Örebro', tracks: ['The Rolling Stones — Paint It Black'] },
  { clip: 'Quill.02', title: 'Backyard Summertime', tracks: ['D-Train — Keep Giving Me Love'] },
  { clip: 'Sven.01', title: 'Graffiti Wall in Paris', tracks: ['Kadenza — Love You Madly'] },
  { clip: 'Sven.03', title: 'Eiffel Tower, Paris', tracks: ["Ebonnee Webb — Keep On Steppin'"] },
  { clip: 'Prime.03', title: 'Freestyle Locking', tracks: ['Afterback — Wanna Fill You Up'] },
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
