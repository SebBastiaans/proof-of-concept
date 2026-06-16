function fireConfetti() {
	const end = Date.now() + 3000
	const interval = setInterval(() => {
		if (Date.now() > end) {
			clearInterval(interval)
			return
		}
		confetti({
			particleCount: 60,
			spread: 70,
			origin: { y: 0.6 }
		})
	}, 250)
}

document.addEventListener('DOMContentLoaded', () => {
	const rightAnswer = document.querySelector('.right-answer')
	const wrongAnswer = document.querySelector('.wrong-answer')

	// Auto-scroll to the correct question on page reload
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

    // Reset wrong-answer state when clicking the feedback link
	document.addEventListener('click', (event) => {
		const link = event.target.closest('.wrong-answer a')
		if (!link) return

		document.querySelectorAll('.wrong-answer').forEach(item => {
			item.classList.remove('wrong-answer')
		})
		history.replaceState(null, '', '/')
	})

	// Enhance answer form — intercept submit and handle client-side
	document.addEventListener('submit', async (event) => {
		const form = event.target

		// Only enhance forms with data-enhanced attribute
		if (!form.hasAttribute('data-enhanced')) return

		event.preventDefault()

        // Add loading state to the clicked list item
        const clickedListItem = form.closest('li')
        clickedListItem.classList.add('is-loading')

		const formData = new FormData(form)
		if (event.submitter) {
			formData.append(event.submitter.name, event.submitter.value)
		}

		// POST to the server just like the browser would
		const response = await fetch(form.action, {
			method: form.method,
			body: new URLSearchParams(formData)
		})

		// Parse the returned HTML into a new DOM
		const responseText = await response.text()
		const parser = new DOMParser()
		const responseDOM = parser.parseFromString(responseText, 'text/html')

		// Find the updated answer list in the new DOM and replace it in the page
		const enhancedKey = form.getAttribute('data-enhanced')
		const newState = responseDOM.querySelector(`[data-enhanced="${enhancedKey}"]`)
        const currentList = document.querySelector(`[data-enhanced="${enhancedKey}"]`)

		if (newState) {
			currentList.outerHTML = newState.outerHTML

            // After update, scroll to next question if THIS question was answered correctly
			const updatedArticle = document.querySelector(`[data-enhanced="${enhancedKey}"]`)
			const rightAnswer = updatedArticle?.querySelector('.right-answer')
			if (rightAnswer) {
				const currentQuestion = updatedArticle.closest('li[id^="vraag-"]')
				const nextQuestion = currentQuestion?.nextElementSibling
				if (nextQuestion) {
					nextQuestion.scrollIntoView({ behavior: 'smooth' })
				}

				const allArticles = document.querySelectorAll('article[data-enhanced^="question-"]')
				const allCorrect = [...allArticles].every(a => a.querySelector('.right-answer'))
				if (allCorrect) {
					fireConfetti()
				}
			}
		}
	})
})