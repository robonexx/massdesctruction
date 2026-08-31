# Mass Destruction Archive

[massdestruction.se](https://massdestruction.se) är ett digitalt arkiv över den svenska popping- och lockinggruppen Mass Destruction. Projektet bevarar gruppens ursprungliga webbplats, filmer, bilder, musik och historia i en modern version som fortfarande ligger nära Sven Forshells originaldesign.

## Från 2004 till idag

Den första webbplatsen skapades 2004 av Sven Forshell, även känd som Slam Tilt. Sven var en av personerna bakom Mass Destruction och formgav och byggde sidan i PHP. På den tiden låg webbplatsen lokalt på en dator som fungerade som server hemma hos Sven.

När originalsajten senare försvann från webben fanns inte längre någon modern kodbas att fortsätta arbeta i. Jag letade därför upp bevarade versioner via [Wayback Machine](https://web.archive.org/web/20100523135817/http://www.massdestruction.se/) och använde dem som visuell och historisk referens.

Några år senare, när jag studerade webbutveckling, började jag återskapa sidan med React och Vite. Den versionen blev det första försöket att flytta designen från den gamla PHP-sajten till en modern frontend.

Nu har projektet byggts om igen, denna gång som en fullstack-applikation med Next.js. Målet har inte varit att ersätta originalet med en helt ny design, utan att bevara känslan, materialet och historien samtidigt som webbplatsen fungerar i dagens webbläsare och återigen ligger live på sin ursprungliga domän: [massdestruction.se](https://massdestruction.se).

![Referensbild från den ursprungliga webbplatsen](./massdestruction.png)

## Utmaningar i restaureringen

Att flytta en webbplats från 2004 till dagens webb har inneburit flera typer av arbete:

- Designen behövde rekonstrueras från ofullständiga ögonblicksbilder i Wayback Machine.
- Den tidigare Vite-versionen behövde separeras från den nya Next.js-strukturen utan att viktiga resurser försvann.
- Den gamla PHP-baserade lösningen ersattes med Next.js App Router och serverbaserade API-rutter.
- Den fasta originaldesignen behövde anpassas för moderna skärmstorlekar, mobil navigation och scrollbara innehållsytor.
- Nyheter och gästboksinlägg behövde få permanent lagring, administration och sessionsbaserad inloggning.
- Gamla videoformat konverterades till MP4 för att fungera i moderna webbläsare.

Originalfilmerna och bilderna är historiskt källmaterial. Deras upplösning och bildkvalitet kan inte förbättras på riktigt utan att materialets ursprungliga karaktär förändras. De publiceras därför så nära originalskicket som möjligt.

## Den moderna versionen

Den nuvarande webbplatsen använder:

- Next.js 16 med App Router
- React 19
- MongoDB Atlas för nyheter och gästbok
- Server-side API routes för läsning, publicering och moderering
- Signerade, HTTP-only cookies för adminsessionen
- Framer Motion för mindre animationer
- Vercel för hosting och deployment

Webbplatsen innehåller bland annat:

- Det historiska nyhetsarkivet från originalsajten
- Nya nyheter publicerade via `/md-admin`
- Gästbok med permanent MongoDB-lagring
- Musik, arkivbilder och MP4-konverterade filmer
- Medlemssidor och historiskt material om gruppen

## Lokal utveckling

Installera beroenden och starta utvecklingsservern:

```bash
npm install
npm run dev
```

Öppna [http://localhost:3000](http://localhost:3000).

Skapa en lokal `.env` med följande servervariabler:

```env
MD_ADMIN_USER=your-admin-user
MD_ADMIN_PASS=your-admin-password
MD_ADMIN_SESSION_SECRET=your-long-random-session-secret
MONGODB_URI=your-mongodb-atlas-connection-string
MONGODB_DB=massdestruction
```

Admininloggningen finns på `/md-login`. Hemliga värden ska aldrig använda prefixet `NEXT_PUBLIC_`.

## Deployment

Projektet är kopplat till Vercel och använder MongoDB Atlas för den permanenta datan. Se [DEPLOYMENT.md](./DEPLOYMENT.md) för miljövariabler och deployinstruktioner.

## Om projektet

Detta är ett personligt arkiv- och minnesprojekt tillägnat Sven Forshell och Mass Destruction: Slam Tilt, Prime, Quill och Rob One.

## Kontakt

- [GitHub](https://github.com/xxrobone)
- [LinkedIn](https://www.linkedin.com/in/robert-w%C3%A4gar-1b4661139/)
- [Portfolio](https://www.robertwagar.se)
