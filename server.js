import express from 'express'

import { Liquid } from 'liquidjs';

const app = express()

app.use(express.urlencoded({extended: true}))

app.use(express.static('public'))

const engine = new Liquid()
app.engine('liquid', engine.express())

app.set('views', './views')

// MARK: Routes -------------------------------

app.get('/', async (req, res) => {

    const exhibitResponse = await fetch('https://fdnd-agency.directus.app/items/teylers_museum_exhibits/1?')
    const exhibitResponseJSON = await exhibitResponse.json()

    const sectionResponse = await fetch('https://fdnd-agency.directus.app/items/teylers_museum_exhibits_sections?fields=*')
    const sectionResponseJSON = await sectionResponse.json()

    const personResponse = await fetch('https://fdnd-agency.directus.app/items/teylers_museum_persons')
    const personResponseJSON = await personResponse.json()

    const quizquestionsResponse = await fetch('https://fdnd-agency.directus.app/items/teylers_museum_quiz_questions')
    const quizquestionsResponseJSON = await quizquestionsResponse.json()

    const quizattemptsResponse = await fetch('https://fdnd-agency.directus.app/items/teylers_museum_quiz_attempts')
    const quizattemptsResponseJSON = await quizattemptsResponse.json()

    const quizanswersResponse = await fetch('https://fdnd-agency.directus.app/items/teylers_museum_quiz_answers')
    const quizanswersResponseJSON = await quizanswersResponse.json()

    res.render('index.liquid', {
     exhibits: exhibitResponseJSON.data,
     sections: sectionResponseJSON.data,
     persons: personResponseJSON.data,
     questions: quizquestionsResponseJSON.data,
     attempts: quizattemptsResponseJSON.data,
     answers: quizanswersResponseJSON.data
    })
});


app.set('port', process.env.PORT || 8000)

app.listen(app.get('port'), function () {
  console.log(`Daarna kun je via http://localhost:${app.get('port')}/ jouw interactieve website bekijken.\n\nThe Web is for Everyone. Maak mooie dingen 🙂`)
})


app.use((req, res, next) => {
  res.status(404).render('404.liquid')
})
