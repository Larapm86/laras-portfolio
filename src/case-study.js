// Case study page: optional content switch by ?project= slug
const params = new URLSearchParams(window.location.search)
const project = params.get('project') || 'restaurant-nevel'

document.title = `${project.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} — Case Study | Lara Perez`

// Trigger load animation
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => document.body.classList.add('loaded'))
} else {
  document.body.classList.add('loaded')
}

// Show "Next Case" in floating menu when user reaches end of case study
const floatingNav = document.querySelector('.case-study-back-wrap')
const outro = document.querySelector('.case-study-outro')
const nextInPill = document.querySelector('.case-study-next-in-pill')

if (floatingNav && outro && nextInPill) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          floatingNav.classList.add('has-next-visible')
          nextInPill.setAttribute('aria-hidden', 'false')
        } else {
          floatingNav.classList.remove('has-next-visible')
          nextInPill.setAttribute('aria-hidden', 'true')
        }
      })
    },
    { rootMargin: '-20% 0px 0px 0px', threshold: 0 }
  )
  observer.observe(outro)
}

// Scroll-down reveal: animate content when it enters the viewport
function initScrollReveal() {
  const revealEls = document.querySelectorAll(
    '.case-study-header, .case-study-intro, .case-study-details, .case-study-image--hero, .case-study-sections, .case-study-closing-image-wrap, .case-study-outro'
  )
  if (!revealEls.length) return
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
        }
      })
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0 }
  )
  revealEls.forEach((el) => {
    el.classList.add('scroll-reveal')
    observer.observe(el)
  })
}
initScrollReveal()
