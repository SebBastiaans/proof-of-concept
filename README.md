Ontwerp en maak een data driven online concept voor een opdrachtgever

De instructies voor deze opdracht staan in: [docs/INSTRUCTIONS.md](https://github.com/fdnd-task/proof-of-concept/blob/main/docs/INSTRUCTIONS.md)

# Titel
Interactieve tijdlijn met quiz in samenwerking met Q42 voor Teylers Museum.

## Inhoudsopgave

  * [Beschrijving](#beschrijving)
  * [Gebruik](#gebruik)
  * [Kenmerken](#kenmerken)
  * [Installatie](#installatie)
  * [Bronnen](#bronnen)
  * [Licentie](#licentie)

## Beschrijving
[Teylers Museum](https://teylersmuseum.nl/nl) en [Q42](https://www.q42.nl/) werken aan een breder digitaal museumplatform waarin topstukken, verhalen en educatieve werkvormen op een samenhangende manier worden aangeboden. De opdracht is: bouw een nieuwe, uitgebreide detailpagina voor het topstuk “Grote Elektriseermachine met Leidse flessen”. De focus heb ik gelegd op een tijdlijn met een gekoppelde quiz.

https://github.com/user-attachments/assets/45d3f281-e06a-4ce1-8763-c5c9c65cc7f2

https://github.com/user-attachments/assets/53b4838a-6382-4e4b-8b42-96038379106b

[Link naar mijn website.](https://proof-of-concept-p8tg.onrender.com)

## Gebruik
<!-- Bij Gebruik staat de user story, hoe het werkt en wat je er mee kan. -->
Eigenlijk is de website over het algemeen hetzelfde als bij de bestaande website, alleen de tijdlijn en quiz zijn helemaal zelf ontworpen en gebouwd. De tijdlijn verandert een beetje van layout naarmate het scherm groter wordt. 

### Tijdlijn

<img width="399" height="835" alt="image" src="https://github.com/user-attachments/assets/99e629d6-14d4-4d48-b697-0df76fa641b0" />

Op de mobiele versie is de layout 1 kolom. Dit is zodat er genoeg ruimte is voor onderdelen en het overzichtelijk blijft. De tijdlijn staat onder elkaar. De informatie die hoort bij de titel met jaartal wordt tussen de tijdlijn geopent. Door het gele puntje en de ondoorzichtigheid van de niet geselecteerde items in de tijdlijn, wordt het duidelijk waar je bent en dat er nog meer items zijn.

**Groot scherm**

<img width="1023" height="760" alt="image" src="https://github.com/user-attachments/assets/b18f4da5-852c-4a89-83e3-5ce7e7ef94d1" />

Op groot scherm krijgt de tijdlijn een 2 kolommen layout. Op een groot scherm heb je genoeg ruimte om onderdelen naast elkaar te zetten. De navigatie met alle items staat nu vast in de linker kolom. De bijbehorende informatie opent in de rechter kolom.

### Quiz
De quiz werkt als een horizontale carousel. Je ziet een kaartje met de vraag, antwoorden, navigatie knoppen en een teller met hoeveel vragen je van het totaal goed hebt. Wanneer je op een antwoord drukt krijg je een kleien loading state op de knop te zien, zodat de gebruiker weet dat de website nog bezig is met het verwerken van je antwoord. Wanneer je dan een antwoord fout hebt, zie je een berichtje dat je het fout hebt en krijg je een link naar waar je het antwoord kunt vinden in de tijdlijn. Wanneer je hier op klikt, komen de antwoord knoppen weer terug en kun je opnieuw een antwoord geven. Als je dan een antwoord goed hebt krijg je een bericht dat het klopt en wordt er automatisch naar de volgende vraag gescrollt. Wanneer je dan alle vragen goed hebt, komt er confetti over de kaartjes, zodat je weet dat het gelukt is en door kan.

<img width="244" height="365" alt="image" src="https://github.com/user-attachments/assets/e8acf46b-4aa3-4cad-b270-93d65328a1cf" />

<img width="241" height="201" alt="image" src="https://github.com/user-attachments/assets/42784cc9-4a5c-42b3-883d-766cc10c93ff" />

<img width="238" height="465" alt="image" src="https://github.com/user-attachments/assets/f7d47af3-6f3a-4f94-9274-ab41046806a6" />

<img width="252" height="428" alt="image" src="https://github.com/user-attachments/assets/b00d167b-b08d-4b93-8984-0addf02126bb" />

Dit is na testen de uiteindelijke flow van gebruik.
[User test](https://github.com/SebBastiaans/proof-of-concept/issues/19)
[User test](https://github.com/SebBastiaans/proof-of-concept/issues/18)

### Reliable

https://github.com/user-attachments/assets/529ce393-0d77-49ca-801b-c7c78a4240f1

Stel je voor dat opeens CSS en JavaScript het niet meer doen, dan blijven alle onderdelen werken en zichtbaar. Door anchor points in HTML blijven de links tussen de quizvragen ook werken.

## Kenmerken
<!-- Bij Kenmerken staat welke technieken zijn gebruikt en hoe. Wat is de HTML structuur? Wat zijn de belangrijkste dingen in CSS? Wat is er met JS gedaan en hoe? Misschien heb je iets met NodeJS gedaan, of heb je een framwork of library gebruikt? -->
De website is gebouwd met Liquid, NodeJS en Directus API

### Tijdlijn
**Liquid**
https://github.com/SebBastiaans/proof-of-concept/blob/b913f9ba7c7a2fcff098f4181e8cfb9934a254ef/views/partials/timeline.liquid#L30-L67
Data wordt opgehaald in Liquid en met Liquid tags gedisplayed.

**Server-side JS**
https://github.com/SebBastiaans/proof-of-concept/blob/b913f9ba7c7a2fcff098f4181e8cfb9934a254ef/server.js#L18-L36
Deze data wordt gefetched uit de Directus API.

**CSS**
https://github.com/SebBastiaans/proof-of-concept/blob/b913f9ba7c7a2fcff098f4181e8cfb9934a254ef/public/styles/styles.css#L335-L348
De informatie wordt gestyled tussen de nav en pas zichtbaar wanneer die getarget wordt.
https://github.com/SebBastiaans/proof-of-concept/blob/b913f9ba7c7a2fcff098f4181e8cfb9934a254ef/public/styles/styles.css#L398-L402
Op groot scherm gaat deze sectie weg.
https://github.com/SebBastiaans/proof-of-concept/blob/b913f9ba7c7a2fcff098f4181e8cfb9934a254ef/views/partials/timeline-desktop.liquid#L21-L50
Dan wordt deze HTML met 2 kolom layout geladen (beetje geeky) voor groot scherm.

### Quiz
**Liquid**
https://github.com/SebBastiaans/proof-of-concept/blob/b913f9ba7c7a2fcff098f4181e8cfb9934a254ef/views/partials/quiz.liquid#L5-L47
Data voor de quiz wordt opgehaald en verwerkt. [Hier](https://github.com/SebBastiaans/proof-of-concept/blob/b913f9ba7c7a2fcff098f4181e8cfb9934a254ef/views/partials/quiz.liquid#L16) wordt ook gecheckt of de database doorgeeft dat een gegeven antwoord juist of onjuist is, en dan een class voor CSS meegegeven.
https://github.com/SebBastiaans/proof-of-concept/blob/b913f9ba7c7a2fcff098f4181e8cfb9934a254ef/views/partials/quiz.liquid#L36
Er wordt gekeken in de URL bij welke vraag je bent en dan wordt je gelinkt naar de volgende of vorige.

**Server-side JS**
https://github.com/SebBastiaans/proof-of-concept/blob/b913f9ba7c7a2fcff098f4181e8cfb9934a254ef/server.js#L43-L72
Je antwoord wordt gepost in de database.
https://github.com/SebBastiaans/proof-of-concept/blob/b913f9ba7c7a2fcff098f4181e8cfb9934a254ef/server.js#L67-L71
Dan geef je in de GET mee of het is_correct= true/false. 
https://github.com/SebBastiaans/proof-of-concept/blob/b913f9ba7c7a2fcff098f4181e8cfb9934a254ef/server.js#L37-L39
Dit stuur je door in de GET.

**CCS**
https://github.com/SebBastiaans/proof-of-concept/blob/b913f9ba7c7a2fcff098f4181e8cfb9934a254ef/public/styles/styles.css#L473-L479
In de CSS wordt de carousel gestyled.
https://github.com/SebBastiaans/proof-of-concept/blob/b913f9ba7c7a2fcff098f4181e8cfb9934a254ef/public/styles/styles.css#L529-L556
De failed en succes state worden gestyled. 
https://github.com/SebBastiaans/proof-of-concept/blob/b913f9ba7c7a2fcff098f4181e8cfb9934a254ef/public/styles/styles.css#L571-L580
Ook de loading state.
https://github.com/SebBastiaans/proof-of-concept/blob/b913f9ba7c7a2fcff098f4181e8cfb9934a254ef/public/styles/styles.css#L605-L611
Op groot scherm worden de antwoord mogelijkheden horizontaal gestyled, in plaats van verticaal.

**Client-side JS**
https://github.com/SebBastiaans/proof-of-concept/blob/b913f9ba7c7a2fcff098f4181e8cfb9934a254ef/public/scripts/client.js#L2-L8
Dit houdt bij hoeveel je van het totale aantal vragen goed hebt.
https://github.com/SebBastiaans/proof-of-concept/blob/b913f9ba7c7a2fcff098f4181e8cfb9934a254ef/public/scripts/client.js#L10-L24
https://github.com/SebBastiaans/proof-of-concept/blob/b913f9ba7c7a2fcff098f4181e8cfb9934a254ef/public/scripts/client.js#L106-L110
Dit zorgt voor de confetti na het afronden van de quiz. [Gebruikte bron.](https://confettijs.org/)
https://github.com/SebBastiaans/proof-of-concept/blob/b913f9ba7c7a2fcff098f4181e8cfb9934a254ef/public/scripts/client.js#L47-L56
Zorgt ervoor dat de onjuist status op een vraag reset wanner je op 'lees meer' klikt.
https://github.com/SebBastiaans/proof-of-concept/blob/b913f9ba7c7a2fcff098f4181e8cfb9934a254ef/public/scripts/client.js#L58-L113
Dit zorgt ervoor dat de POST in de server.js wordt onderschept, zodat ik het in mijn client.js kan enhancen met bijvoorbeeld een loading state. En het doorscrollen naar de volgende vraag bij een juist antwoord.

## Bronnen
https://github.com/SebBastiaans/proof-of-concept/issues
https://github.com/SebBastiaans/proof-of-concept/issues?q=is%3Aissue%20state%3Aclosed

## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).
