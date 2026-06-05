// const initTimeline = () => {
//     const articles = document.querySelectorAll('.timeline-articles li')
//     const navLinks = document.querySelectorAll('.timeline nav a')

//     // smooth scroll bij klikken
//     navLinks.forEach((link) => {
//         link.addEventListener('click', (event) => {
//             event.preventDefault()
//             const target = document.querySelector(link.getAttribute('href'))
//             target.scrollIntoView({ behavior: 'smooth' })
//         })
//     })

//     // actieve nav item bij scrollen
//     const observer = new IntersectionObserver((entries) => {
//         entries.forEach((entry) => {
//             if (entry.isIntersecting) {
//                 navLinks.forEach((link) => link.classList.remove('active-year'))
//                 const activeLink = document.querySelector(`.timeline nav a[href="#${entry.target.id}"]`)
//                 if (activeLink) activeLink.classList.add('active-year')
//             }
//         })
//     }, { threshold: 0.5 })

//     articles.forEach((article) => observer.observe(article))
// }

// initTimeline()