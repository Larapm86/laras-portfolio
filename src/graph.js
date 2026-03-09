/**
 * Graph portfolio: canvas-based node graph with pan/zoom and info panel.
 * Embedded in About section; uses container dimensions and portfolio colors.
 */

const nodes = [
  {
    id: 'lara', label: 'Lara Perez', sub: 'Designer', cat: 'center',
    shape: 'starburst', color: '#1a1a1a', r: 14,
    data: { eyebrow: 'Product Designer · Remote, Spain', title: 'Lara Perez', body: 'Designer specialized in turning messy problems into thoughtful, human-centered solutions that people — and businesses — actually love.', tags: [] }
  },
  {
    id: 'info', label: 'Information', sub: '', cat: 'about',
    shape: 'circle-fill', color: '#1a1a1a', r: 8,
    data: { eyebrow: 'About', title: 'Information', body: 'Based in Spain, working remotely across Europe. I combine behavioral psychology with strong visual craft to create products that feel effortless. Available for freelance and full-time opportunities.', tags: ['Remote', 'Spain', 'Open to work'] }
  },
  {
    id: 'contact', label: 'Contact', sub: 'lperezmolines@gmail.com', cat: 'about',
    shape: 'circle-fill', color: '#1a1a1a', r: 7,
    data: { eyebrow: 'Contact', title: 'Say Hola', body: 'lperezmolines@gmail.com\n\nLinkedIn: linkedin.com/in/larapmolines\nGithub: github.com/Larapm86', tags: [] }
  },
  {
    id: 'behavioral', label: 'Behavioral\nDesign', sub: 'Area of Practice', cat: 'area',
    shape: 'hexagon', color: '#1a1a1a', r: 10,
    data: { eyebrow: 'Area of Practice', title: 'Behavioral Design', body: 'Applying psychology principles — habit loops, motivation theory, nudge design — to create products that change behavior sustainably.', tags: ['Psychology', 'Habits', 'Persuasion'] }
  },
  {
    id: 'growth', label: 'Growth\nDesign', sub: 'Area of Practice', cat: 'area',
    shape: 'hexagon', color: '#1a1a1a', r: 10,
    data: { eyebrow: 'Area of Practice', title: 'Growth Design', body: 'Designing for acquisition, activation, retention, and revenue. Bridging design thinking with data-driven growth methodology.', tags: ['Funnels', 'Retention', 'Conversion'] }
  },
  {
    id: 'systems', label: 'Systems\nThinking', sub: 'Area of Research', cat: 'area',
    shape: 'hexagon', color: '#1a1a1a', r: 10,
    data: { eyebrow: 'Area of Research', title: 'Systems Thinking', body: 'Mapping causal loops and leverage points to understand complex product and organizational problems before reaching for solutions.', tags: ['Causal Loops', 'Strategy', 'Org Design'] }
  },
  {
    id: 'ux', label: 'UX Research', sub: 'Discipline', cat: 'discipline',
    shape: 'square', color: '#1a1a1a', r: 8,
    data: { eyebrow: 'Discipline', title: 'UX Research', body: 'Qualitative and quantitative research: user interviews, diary studies, usability testing, and survey design to ground design decisions in real user needs.', tags: [] }
  },
  {
    id: 'strategy', label: 'Product\nStrategy', sub: 'Discipline', cat: 'discipline',
    shape: 'square', color: '#1a1a1a', r: 8,
    data: { eyebrow: 'Discipline', title: 'Product Strategy', body: 'Shaping product direction, prioritization frameworks, and roadmaps. Working alongside founders and PMs to align design with business outcomes.', tags: [] }
  },
  {
    id: 'ops', label: 'Design Ops', sub: 'Discipline', cat: 'discipline',
    shape: 'square', color: '#1a1a1a', r: 8,
    data: { eyebrow: 'Discipline', title: 'Design Operations', body: 'Building the systems, processes, and culture that let design teams work at their best — from design systems governance to critique culture.', tags: [] }
  },
  {
    id: 'habit', label: 'Habit Loops', sub: 'Gamification · Habit Formation', cat: 'work', year: '2024',
    shape: 'triangle', color: '#1a1a1a', r: 9,
    data: { eyebrow: 'Work · 2024', title: 'Designing meaningful habit loops', body: 'Designing gamification systems that build genuine intrinsic motivation rather than short-lived streaks. Led end-to-end design from discovery to launch. 40% improvement in 30-day retention.', tags: ['Gamification', 'Habit Formation'] }
  },
  {
    id: 'drink', label: '0→1 Product', sub: 'Mindful Drinking', cat: 'work', year: '2024',
    shape: 'triangle', color: '#1a1a1a', r: 9,
    data: { eyebrow: 'Work · 2024', title: 'Building a 0→1 product for mindful drinking habits', body: 'Led design from blank canvas to public launch in 6 months. Shaped product vision alongside the founding team. The onboarding alone went through 14 iterations.', tags: ['Product Launch', 'Design Leadership'] }
  },
  {
    id: 'maturity', label: 'UX Maturity', sub: 'Design Operations', cat: 'work', year: '2024',
    shape: 'triangle', color: '#1a1a1a', r: 9,
    data: { eyebrow: 'Work · 2024', title: 'Improving UX maturity at scale', body: 'Audited and transformed design practice across 4 product squads. Design cycle time decreased 30%, cross-functional satisfaction significantly improved.', tags: ['UX Strategy', 'Design Ops'] }
  },
  {
    id: 'systemic', label: 'Systemic\nProblems', sub: 'System Thinking · Growth', cat: 'work', year: '2024',
    shape: 'triangle', color: '#1a1a1a', r: 9,
    data: { eyebrow: 'Work · 2024', title: 'Mapping growth systemic problems', body: 'Applied causal loop diagrams to uncover non-obvious leverage points in a SaaS growth plateau. One insight reduced support tickets 22% and improved activation 18%.', tags: ['System Thinking', 'Growth'] }
  },
  {
    id: 'onboarding', label: 'Onboarding\nFunnels', sub: 'Behavioral · Conversion', cat: 'work', year: '2023',
    shape: 'triangle', color: '#1a1a1a', r: 9,
    data: { eyebrow: 'Work · 2023', title: 'Accelerating time-to-value in onboarding funnels', body: 'Redesigned onboarding funnel applying JTBD research and behavioral design. Reduced time-to-activation by 35%. Template later rolled out across two other product lines.', tags: ['Behavioral Design', 'Conversion'] }
  },
  {
    id: 'retention', label: 'Premium\nRetention', sub: 'Behavioral · Retention', cat: 'work', year: '2023',
    shape: 'triangle', color: '#1a1a1a', r: 9,
    data: { eyebrow: 'Work · 2023', title: 'Enhancing user journey for premium retention', body: 'Mapped full premium user journey and identified critical "post-purchase anxiety" window. Designing for this window alone contributed to a 12-point improvement in 90-day retention.', tags: ['Behavioral Design', 'Retention'] }
  },
]

const edges = [
  { from: 'lara', to: 'info', dash: false },
  { from: 'lara', to: 'contact', dash: true },
  { from: 'lara', to: 'behavioral', dash: false },
  { from: 'lara', to: 'growth', dash: false },
  { from: 'lara', to: 'systems', dash: true },
  { from: 'lara', to: 'ux', dash: false },
  { from: 'lara', to: 'strategy', dash: false },
  { from: 'lara', to: 'ops', dash: true },
  { from: 'behavioral', to: 'habit', dash: false },
  { from: 'behavioral', to: 'onboarding', dash: true },
  { from: 'behavioral', to: 'retention', dash: true },
  { from: 'growth', to: 'systemic', dash: false },
  { from: 'growth', to: 'onboarding', dash: false },
  { from: 'growth', to: 'drink', dash: true },
  { from: 'systems', to: 'systemic', dash: false },
  { from: 'ops', to: 'maturity', dash: false },
  { from: 'strategy', to: 'drink', dash: false },
  { from: 'ux', to: 'habit', dash: true },
  { from: 'ux', to: 'retention', dash: false },
]

const layout = {
  lara: { x: 0.45, y: 0.46 },
  info: { x: 0.45, y: 0.22 },
  contact: { x: 0.62, y: 0.18 },
  behavioral: { x: 0.22, y: 0.34 },
  growth: { x: 0.65, y: 0.30 },
  systems: { x: 0.58, y: 0.62 },
  ux: { x: 0.28, y: 0.56 },
  strategy: { x: 0.62, y: 0.50 },
  ops: { x: 0.38, y: 0.72 },
  habit: { x: 0.10, y: 0.28 },
  drink: { x: 0.74, y: 0.22 },
  maturity: { x: 0.32, y: 0.80 },
  systemic: { x: 0.72, y: 0.62 },
  onboarding: { x: 0.12, y: 0.52 },
  retention: { x: 0.15, y: 0.68 },
}

const PORTFOLIO_COLORS = {
  ink: '#1a1a1a',
  inkSoft: '#5c5c5c',
  inkFaint: '#8a8a8a',
  edge: 'rgba(26, 26, 26, 0.15)',
  edgeDim: 'rgba(26, 26, 26, 0.08)',
  edgeHighlight: 'rgba(26, 26, 26, 0.45)',
}

let vp = { x: 0, y: 0, scale: 1 }
let isDragging = false, dragStart = { x: 0, y: 0 }, vpStart = { x: 0, y: 0 }
let hoveredNode = null
let focusedNodeId = null
let legendHighlightCat = null
let W, H
let container = null
let canvas, ctx, centerLabel

function nodeMatchesLegendCat(node) {
  if (!legendHighlightCat) return true
  if (legendHighlightCat === 'all') return node.cat === 'center'
  return node.cat === legendHighlightCat
}

function worldPos(node) {
  const base = layout[node.id]
  if (!base) return { x: 0, y: 0 }
  return {
    x: base.x * W * vp.scale + vp.x,
    y: base.y * H * vp.scale + vp.y
  }
}

function drawShape(shape, x, y, r, color, hovered) {
  ctx.beginPath()
  if (shape === 'starburst') {
    const spikes = 8, outerR = r, innerR = r * 0.55
    for (let i = 0; i < spikes * 2; i++) {
      const angle = (i * Math.PI / spikes) - Math.PI / 2
      const rad = i % 2 === 0 ? outerR : innerR
      const px = x + Math.cos(angle) * rad
      const py = y + Math.sin(angle) * rad
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
    }
    ctx.closePath()
    ctx.fillStyle = color
    ctx.fill()
    if (hovered) { ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5; ctx.stroke() }
    return
  }
  if (shape === 'triangle') {
    const h = r * 1.6
    ctx.moveTo(x, y - h * 0.65)
    ctx.lineTo(x + r, y + h * 0.35)
    ctx.lineTo(x - r, y + h * 0.35)
    ctx.closePath()
  } else if (shape === 'square') {
    ctx.rect(x - r, y - r, r * 2, r * 2)
  } else if (shape === 'hexagon') {
    for (let i = 0; i < 6; i++) {
      const a = (i * Math.PI) / 3 - Math.PI / 6
      const px = x + Math.cos(a) * r
      const py = y + Math.sin(a) * r
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
    }
    ctx.closePath()
  } else if (shape === 'circle-fill') {
    ctx.arc(x, y, r, 0, Math.PI * 2)
  } else {
    ctx.arc(x, y, r, 0, Math.PI * 2)
  }
  if (shape === 'hexagon') {
    ctx.strokeStyle = color
    ctx.lineWidth = hovered ? 1.8 : 1.2
    ctx.stroke()
    if (hovered) { ctx.fillStyle = 'rgba(26,26,26,0.06)'; ctx.fill() }
  } else if (shape === 'circle-fill') {
    ctx.fillStyle = color
    ctx.fill()
    if (hovered) { ctx.strokeStyle = 'rgba(255,255,255,0.4)'; ctx.lineWidth = 1.5; ctx.stroke() }
  } else {
    ctx.strokeStyle = color
    ctx.lineWidth = hovered ? 1.8 : 1.1
    ctx.stroke()
    if (hovered) { ctx.fillStyle = 'rgba(26,26,26,0.06)'; ctx.fill() }
  }
}

function getNodePos(id) {
  const n = nodes.find(n => n.id === id)
  return n ? worldPos(n) : null
}

function draw() {
  if (!ctx || W == null) return
  ctx.clearRect(0, 0, W, H)
  const highlightIds = legendHighlightCat
    ? new Set(nodes.filter(n => nodeMatchesLegendCat(n)).map(n => n.id))
    : null

  edges.forEach(e => {
    const a = getNodePos(e.from), b = getNodePos(e.to)
    if (!a || !b) return
    const edgeHighlighted = highlightIds
      ? highlightIds.has(e.from) || highlightIds.has(e.to)
      : true
    if (highlightIds && !edgeHighlighted) ctx.globalAlpha = 0.25
    ctx.beginPath()
    const mx = (a.x + b.x) / 2 + (b.y - a.y) * 0.04
    const my = (a.y + b.y) / 2 - (b.x - a.x) * 0.04
    ctx.moveTo(a.x, a.y)
    ctx.quadraticCurveTo(mx, my, b.x, b.y)
    if (e.dash) ctx.setLineDash([3, 5])
    else ctx.setLineDash([])
    const isHighlighted = hoveredNode && (e.from === hoveredNode.id || e.to === hoveredNode.id)
    ctx.strokeStyle = isHighlighted ? PORTFOLIO_COLORS.edgeHighlight : edgeHighlighted ? PORTFOLIO_COLORS.edge : PORTFOLIO_COLORS.edgeDim
    ctx.lineWidth = isHighlighted ? 1.2 : 0.8
    ctx.stroke()
    ctx.setLineDash([])
    if (highlightIds && !edgeHighlighted) ctx.globalAlpha = 1
  })

  nodes.forEach(n => {
    const pos = worldPos(n)
    const hovered = hoveredNode && hoveredNode.id === n.id
    const legendHighlight = highlightIds ? highlightIds.has(n.id) : true
    if (highlightIds && !legendHighlight) ctx.globalAlpha = 0.3
    drawShape(n.shape, pos.x, pos.y, n.r * (hovered ? 1.25 : 1), n.color, hovered || legendHighlight)
    if (highlightIds && !legendHighlight) ctx.globalAlpha = 1
  })

  ctx.save()
  ctx.font = "12px Inter, system-ui, sans-serif"
  const lineHeight = 16
  nodes.forEach(n => {
    if (n.id === 'lara') return
    const pos = worldPos(n)
    const hovered = hoveredNode && hoveredNode.id === n.id
    const legendHighlight = highlightIds ? highlightIds.has(n.id) : true
    if (highlightIds && !legendHighlight) ctx.globalAlpha = 0.3
    const lines = n.label.split('\n')
    const offsetY = n.r * (hovered ? 1.3 : 1.1) + 6
    ctx.textAlign = 'center'
    ctx.fillStyle = PORTFOLIO_COLORS.ink
    ctx.font = `${hovered || legendHighlight ? '500' : '400'} ${hovered ? 13 : 12}px Inter, system-ui, sans-serif`
    lines.forEach((line, i) => {
      ctx.fillText(line, pos.x, pos.y + offsetY + i * lineHeight)
    })
    if (n.sub) {
      ctx.font = '400 11px Inter, system-ui, sans-serif'
      ctx.fillStyle = PORTFOLIO_COLORS.inkSoft
      ctx.fillText(n.sub.split('\n')[0], pos.x, pos.y + offsetY + lines.length * lineHeight + 2)
    }
    if (n.year) {
      ctx.font = '400 10px Inter, system-ui, sans-serif'
      ctx.fillStyle = PORTFOLIO_COLORS.inkFaint
      ctx.fillText(n.year, pos.x, pos.y - n.r * 1.4)
    }
    if (highlightIds && !legendHighlight) ctx.globalAlpha = 1
  })
  ctx.restore()
}

function updateCenterLabel() {
  if (!centerLabel || !container) return
  const pos = getNodePos('lara')
  if (!pos) return
  centerLabel.style.left = pos.x + 'px'
  centerLabel.style.top = (pos.y + 44) + 'px'
  centerLabel.classList.remove('graph-center-label-hidden')
}

function hitTest(mx, my) {
  if (!container) return null
  const rect = container.getBoundingClientRect()
  const x = mx - rect.left
  const y = my - rect.top
  for (let i = nodes.length - 1; i >= 0; i--) {
    const n = nodes[i]
    const pos = worldPos(n)
    const dx = x - pos.x, dy = y - pos.y
    if (Math.sqrt(dx * dx + dy * dy) < n.r * 2.2) return n
  }
  return null
}

function showPanel(n) {
  const d = n.data
  const eyebrow = document.getElementById('graph-panel-eyebrow')
  const title = document.getElementById('graph-panel-title')
  const body = document.getElementById('graph-panel-body')
  const tags = document.getElementById('graph-panel-tags')
  const panel = document.getElementById('graph-panel')
  if (!eyebrow || !title || !body || !tags || !panel) return
  eyebrow.textContent = d.eyebrow
  title.textContent = d.title
  body.textContent = d.body
  tags.innerHTML = (d.tags || []).map(t => `<span class="graph-ptag">${t}</span>`).join('')
  panel.classList.add('visible')
}

function resize() {
  if (!container || !canvas || !ctx) return
  W = container.offsetWidth
  H = container.offsetHeight
  const dpr = Math.min(2, window.devicePixelRatio || 1)
  canvas.width = W * dpr
  canvas.height = H * dpr
  canvas.style.width = W + 'px'
  canvas.style.height = H + 'px'
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.scale(dpr, dpr)
  draw()
  updateCenterLabel()
}

function resetView() {
  vp.x = 0
  vp.y = 0
  vp.scale = 1
  draw()
  updateCenterLabel()
}

const ZOOM_FACTOR = 1.15
const MIN_SCALE = 0.4
const MAX_SCALE = 2.5

function zoomAtCenter(factor) {
  const cx = W / 2
  const cy = H / 2
  vp.x = cx - (cx - vp.x) * factor
  vp.y = cy - (cy - vp.y) * factor
  vp.scale *= factor
  vp.scale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, vp.scale))
  draw()
  updateCenterLabel()
}

function zoomIn() {
  zoomAtCenter(ZOOM_FACTOR)
}

function zoomOut() {
  zoomAtCenter(1 / ZOOM_FACTOR)
}

const FOCUS_SCALE = 1.85

function focusOnNode(node) {
  const base = layout[node.id]
  if (!base) return
  focusedNodeId = node.id
  vp.scale = FOCUS_SCALE
  vp.x = W / 2 - base.x * W * vp.scale
  vp.y = H / 2 - base.y * H * vp.scale
  draw()
  updateCenterLabel()
  const closeBtn = document.getElementById('graph-focus-close')
  if (closeBtn) closeBtn.hidden = false
}

function exitFocus() {
  focusedNodeId = null
  resetView()
  const closeBtn = document.getElementById('graph-focus-close')
  if (closeBtn) closeBtn.hidden = true
  document.getElementById('graph-panel')?.classList.remove('visible')
}

export function initGraph() {
  container = document.getElementById('about-graph-wrap')
  canvas = document.getElementById('graph-canvas')
  if (!container || !canvas) return
  ctx = canvas.getContext('2d')
  centerLabel = document.getElementById('graph-center-label')

  const recenterBtn = document.getElementById('graph-recenter-btn')
  if (recenterBtn) {
    recenterBtn.addEventListener('click', () => {
      exitFocus()
    })
  }

  const focusCloseBtn = document.getElementById('graph-focus-close')
  if (focusCloseBtn) {
    focusCloseBtn.addEventListener('click', exitFocus)
  }

  const panelClose = document.getElementById('graph-panel-close')
  if (panelClose) {
    panelClose.addEventListener('click', () => {
      document.getElementById('graph-panel')?.classList.remove('visible')
    })
  }

  canvas.addEventListener('mousedown', (e) => {
    const hit = hitTest(e.clientX, e.clientY)
    if (!hit) {
      isDragging = true
      dragStart = { x: e.clientX, y: e.clientY }
      vpStart = { ...vp }
      canvas.style.cursor = 'grabbing'
    }
  })

  canvas.addEventListener('mousemove', (e) => {
    if (isDragging) {
      vp.x = vpStart.x + (e.clientX - dragStart.x)
      vp.y = vpStart.y + (e.clientY - dragStart.y)
      draw()
      updateCenterLabel()
      return
    }
    const hit = hitTest(e.clientX, e.clientY)
    if (hit !== hoveredNode) {
      hoveredNode = hit
      canvas.style.cursor = hit ? 'pointer' : 'default'
      draw()
      updateCenterLabel()
    }
  })

  canvas.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false
      canvas.style.cursor = 'default'
    }
  })

  canvas.addEventListener('click', (e) => {
    const hit = hitTest(e.clientX, e.clientY)
    if (hit) {
      focusOnNode(hit)
      showPanel(hit)
    }
  })

  const zoomInBtn = document.getElementById('graph-zoom-in')
  const zoomOutBtn = document.getElementById('graph-zoom-out')
  if (zoomInBtn) zoomInBtn.addEventListener('click', zoomIn)
  if (zoomOutBtn) zoomOutBtn.addEventListener('click', zoomOut)

  canvas.addEventListener('touchstart', (e) => {
    vpStart = { ...vp }
    dragStart = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }, { passive: true })

  canvas.addEventListener('touchmove', (e) => {
    e.preventDefault()
    const t = e.touches[0]
    vp.x = vpStart.x + (t.clientX - dragStart.x)
    vp.y = vpStart.y + (t.clientY - dragStart.y)
    draw()
    updateCenterLabel()
  }, { passive: false })

  canvas.addEventListener('touchend', (e) => {
    const t = e.changedTouches[0]
    if (t && Math.abs(t.clientX - dragStart.x) + Math.abs(t.clientY - dragStart.y) < 6) {
      const hit = hitTest(t.clientX, t.clientY)
      if (hit) {
        focusOnNode(hit)
        showPanel(hit)
      }
    }
  })

  document.querySelectorAll('.graph-legend-item').forEach(item => {
    const row = item.querySelector('.graph-legend-row')
    const toggle = item.querySelector('.graph-legend-toggle')
    if (!row || !toggle) return
    row.addEventListener('click', (e) => {
      if (e.target.closest('.graph-legend-link-btn')) return
      const wasExpanded = item.classList.contains('expanded')
      document.querySelectorAll('.graph-legend-item').forEach(other => {
        const t = other.querySelector('.graph-legend-toggle')
        if (other !== item) {
          other.classList.remove('expanded')
          if (t) { t.textContent = '+'; t.setAttribute('aria-label', 'Expand') }
        }
      })
      if (!wasExpanded) {
        item.classList.add('expanded')
        toggle.textContent = '−'
        toggle.setAttribute('aria-label', 'Collapse')
        legendHighlightCat = item.getAttribute('data-cat')
      } else {
        item.classList.remove('expanded')
        toggle.textContent = '+'
        toggle.setAttribute('aria-label', 'Expand')
        legendHighlightCat = null
      }
      draw()
    })
  })

  window.addEventListener('resize', resize)
  const ro = new ResizeObserver(resize)
  ro.observe(container)
  resize()

  function idleDrift() {
    draw()
    updateCenterLabel()
    requestAnimationFrame(idleDrift)
  }
  idleDrift()
}
