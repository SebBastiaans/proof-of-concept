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

  const quizquestionsResponse = await fetch('https://fdnd-agency.directus.app/items/teylers_museum_quiz_questions?fields=*')
  const quizquestionsResponseJSON = await quizquestionsResponse.json()

  res.render('index.liquid', {
    exhibits: exhibitResponseJSON.data,
    sections: sectionResponseJSON.data,
    persons: personResponseJSON.data,
    questions: quizquestionsResponseJSON.data,
    success: req.query.success,
    failed: req.query.failed,
    answer: req.query.answer
  })
});

app.post('/', async (req, res) => {
  const { answer, questionId } = req.body

  // Fetch the question to check if the chosen option is correct
  const questionResponse = await fetch(`https://fdnd-agency.directus.app/items/teylers_museum_quiz_questions/${questionId}?fields=*`)
  const questionData = await questionResponse.json()

  // Find the chosen option and check if it's correct
  const chosenOption = questionData.data.options.find(option => option.key === answer)
  const isCorrect = chosenOption?.is_correct === true

  // POST the answer with the correct is_correct value
  await fetch('https://fdnd-agency.directus.app/items/teylers_museum_quiz_answers', {
    method: 'POST',
    body: JSON.stringify({
      question: questionId,
      chosen_option: answer,
      is_correct: isCorrect,
      attempt: 3
    }),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })

  if (isCorrect) {
    res.redirect(303, `/?success=${questionId}&answer=${answer}`)
  } else {
    res.redirect(303, `/?failed=${questionId}&answer=${answer}`)
  }
})

app.set('port', process.env.PORT || 8000)

app.listen(app.get('port'), function () {
  console.log(`Daarna kun je via http://localhost:${app.get('port')}/ jouw interactieve website bekijken.\n\nThe Web is for Everyone. Maak mooie dingen 🙂`)
})