import './style.css'
import './graph.css'
import { initGraph } from './graph.js'

// Load animation: reveal content when DOM is ready
function initLoadAnimation() {
  if (document.readyState !== 'loading') {
    document.body.classList.add('loaded')
  } else {
    document.addEventListener('DOMContentLoaded', () => document.body.classList.add('loaded'))
  }
}
initLoadAnimation()

// About section: interactive graph (pan, zoom, tap nodes)
if (document.readyState !== 'loading') {
  initGraph()
} else {
  document.addEventListener('DOMContentLoaded', () => initGraph())
}

// Copyright year in top bar
const yearEl = document.querySelector('[data-year]')
if (yearEl) yearEl.textContent = new Date().getFullYear()

// Floating menu: active state from scroll or hash
const navLinks = document.querySelectorAll('.floating-menu a[data-section]')
const sections = document.querySelectorAll('section[id]')

function setActiveLink() {
  const hash = window.location.hash.slice(1)
  if (hash === 'top') {
    navLinks.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('data-section') === 'design')
    })
    return
  }
  if (hash && hash !== 'top') {
    navLinks.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('data-section') === hash)
    })
    return
  }
  const scrollY = window.scrollY + 100
  let current = null
  const designSection = document.getElementById('design')
  const inHero = designSection && scrollY < designSection.offsetTop - 80

  if (inHero) {
    current = 'design'
  } else {
    sections.forEach((section) => {
      if (section.id === 'top') return
      const top = section.offsetTop
      const height = section.offsetHeight
      if (scrollY >= top && scrollY < top + height) current = section.id
    })
  }
  navLinks.forEach((link) => {
    link.classList.toggle('is-active', link.getAttribute('data-section') === current)
  })
}

window.addEventListener('scroll', setActiveLink, { passive: true })
window.addEventListener('hashchange', setActiveLink)
setActiveLink()

// Scroll-down reveal: animate content when it enters the viewport
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.project-card, .play, .about, .connect')
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

// Hola rain on sun tap: words fall from top over 4 seconds
const sunWrap = document.querySelector('.hero-sun-wrap')
if (sunWrap) {
  sunWrap.addEventListener('click', (e) => {
    e.preventDefault()
    const container = document.createElement('div')
    container.className = 'hola-rain'
    document.body.appendChild(container)

    const lanes = 6
    const count = 18
    const usedSlots = {} // lane -> next free start time
    for (let i = 0; i < count; i++) {
      const lane = i % lanes
      const baseLeft = (lane / (lanes - 1)) * 85 + 5
      const jitter = (Math.random() - 0.5) * 8
      const delay = usedSlots[lane] ?? 0
      usedSlots[lane] = delay + 0.5 + Math.random() * 0.3

      const word = document.createElement('span')
      word.className = 'hola-rain-word'
      word.textContent = 'hola'
      word.style.left = `${baseLeft + jitter}%`
      word.style.animationDelay = `${delay}s`
      container.appendChild(word)
    }

    setTimeout(() => {
      container.remove()
    }, 4500)
  })
}

// Magic 8 Ball: shake on click (ball or preset question), then show random answer
const eightBall = document.getElementById('eight-ball')
const eightBallAnswer = document.getElementById('eight-ball-answer')
const eightBallWrap = document.querySelector('.eight-ball-wrap')
if (eightBall && eightBallAnswer) {
  const responses = [
    'It is certain.',
    'It is decidedly so.',
    'Without a doubt.',
    'Yes – definitely.',
    'You may rely on it.',
    'As I see it, yes.',
    'Most likely.',
    'Outlook good.',
    'Yes.',
    'Signs point to yes.',
    'Reply hazy, try again.',
    'Ask again later.',
    'Better not tell you now.',
    'Cannot predict now.',
    'Concentrate and ask again.',
    "Don't count on it.",
    'My reply is no.',
    'My sources say no.',
    'Outlook not so good.',
    'Very doubtful.'
  ]
  function shakeBall(message) {
    if (eightBall.classList.contains('eight-ball--shaking')) return
    eightBall.classList.add('eight-ball--shaking')
    eightBallAnswer.textContent = '…'
    eightBallAnswer.classList.remove('eight-ball-answer--reveal')
    setTimeout(() => {
      eightBallAnswer.textContent = message !== undefined
        ? message
        : responses[Math.floor(Math.random() * responses.length)]
      eightBall.classList.remove('eight-ball--shaking')
      eightBallAnswer.classList.remove('eight-ball-answer--reveal')
      void eightBallAnswer.offsetWidth
      eightBallAnswer.classList.add('eight-ball-answer--reveal')
      eightBallAnswer.addEventListener('animationend', () => {
        eightBallAnswer.classList.remove('eight-ball-answer--reveal')
      }, { once: true })
    }, 650)
  }
  eightBall.addEventListener('click', () => shakeBall('Tap a question'))

  function animateQuestionIntoBall(questionEl, thenShake) {
    questionEl.classList.add('eight-ball-question--pressed')
    setTimeout(() => questionEl.classList.remove('eight-ball-question--pressed'), 150)

    const ballRect = eightBall.getBoundingClientRect()
    const toX = ballRect.left + ballRect.width / 2
    const toY = ballRect.top + ballRect.height / 2
    const questionRect = questionEl.getBoundingClientRect()
    const fromX = questionRect.left + questionRect.width / 2
    const fromY = questionRect.top + questionRect.height / 2

    const fly = document.createElement('span')
    fly.className = 'eight-ball-question-fly'
    fly.textContent = questionEl.textContent
    fly.style.setProperty('--fly-from-x', `${fromX}px`)
    fly.style.setProperty('--fly-from-y', `${fromY}px`)
    fly.style.setProperty('--fly-to-x', `${toX}px`)
    fly.style.setProperty('--fly-to-y', `${toY}px`)
    document.body.appendChild(fly)

    fly.addEventListener('animationend', () => fly.remove(), { once: true })
    setTimeout(() => { if (thenShake) shakeBall() }, 1140)
  }

  if (eightBallWrap) {
    eightBallWrap.addEventListener('click', (e) => {
      const questionBtn = e.target.closest('.eight-ball-question')
      if (questionBtn) {
        e.preventDefault()
        animateQuestionIntoBall(questionBtn, true)
      }
    })
  }
}
