import '@picocss/pico/css/pico.min.css'
import './App.css'
import { useEffect, useState } from 'react'

export default function App() {
  const [caret, setCaret] = useState(0)

  useEffect(() => {
    function handleSeletionChange() {
      const selection = window.getSelection()

      if (selection == null) return
      if (!selection.isCollapsed) return

      const { anchorNode, anchorOffset } = selection

      if (anchorNode == null) return
      if (anchorNode.nodeType !== Node.TEXT_NODE) return
      if (anchorNode.parentElement?.getAttribute('id') !== 'textarea') return

      setCaret(anchorOffset)
    }

    document.addEventListener('selectionchange', handleSeletionChange)

    return () => {
      document.removeEventListener('selectionchange', handleSeletionChange)
    }
  })

  return (
    <main className="content">
      <h1>Textarea</h1>
      <p id="textarea">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
        clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
        amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
        nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
        sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
        rebum. Stet clita kasd gubergren
      </p>
      <h1>State</h1>
      <pre>{JSON.stringify({ caret })}</pre>
    </main>
  )
}
