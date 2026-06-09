document.addEventListener('DOMContentLoaded', () => {
	const feedbackLinks = document.querySelectorAll('.wrong-answer a')
	const rightAnswer = document.querySelector('.right-answer')
	const wrongAnswer = document.querySelector('.wrong-answer')

    // Auto-scroll to the next question when an answer is correct
	if (rightAnswer) {
		const currentQuestion = rightAnswer.closest('li[id^="vraag-"]')
		const nextQuestion = currentQuestion?.nextElementSibling

		if (nextQuestion) {
			nextQuestion.scrollIntoView({ behavior: 'smooth' })
		}
	}

    // Auto-scroll to the wrong answer question on page reload
	if (wrongAnswer) {
		const wrongQuestion = wrongAnswer.closest('li[id^="vraag-"]')
		wrongQuestion?.scrollIntoView({ behavior: 'smooth' })
	}

    // Remove wrong-answer class and clean URL so the quiz resets
	const resetWrongAnswer = () => {
		document.querySelectorAll('.wrong-answer').forEach(item => {
			item.classList.remove('wrong-answer')
		})
		history.replaceState(null, '', '/')
	}

	feedbackLinks.forEach(link => {
		link.addEventListener('click', resetWrongAnswer)
	})
})