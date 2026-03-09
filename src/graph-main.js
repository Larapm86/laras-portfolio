import './graph.css'
import { initGraph } from './graph.js'

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => initGraph())
} else {
  initGraph()
}
