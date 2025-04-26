import '@picocss/pico/css/pico.min.css'
import './App.css'
import { type FormEvent, useEffect, useLayoutEffect, useState } from 'react'

const loremIpsum = `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren`

export default function App() {
  const [text, setText] = useState(loremIpsum.replace(/\n/g, ' '))
  const [caret, setCaret] = useState(0)

  const handleBeforeInput = (event: FormEvent<HTMLParagraphElement>) => {
    if (!hasData(event.nativeEvent)) return

    const { data } = event.nativeEvent

    if (typeof data !== 'string') return
    if (data.length === 0) return

    setText((prev) => {
      const start = prev.slice(0, caret)
      const end = prev.slice(caret)

      return `${start}${data}${end}`
    })
    setCaret((prev) => prev + data.length)

    event.preventDefault()
  }

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

  useLayoutEffect(() => {
    const textarea = document.getElementById('textarea')
    if (!textarea) return

    const selection = window.getSelection()
    if (!selection) return

    // Find the text node inside the #textarea
    const textNode = textarea.firstChild
    if (!textNode || textNode.nodeType !== Node.TEXT_NODE) return

    // Set the selection range to the current caret position
    const range = document.createRange()
    range.setStart(textNode, caret)
    range.setEnd(textNode, caret)

    selection.removeAllRanges()
    selection.addRange(range)
  }, [caret])

  return (
    <main className="content">
      <h1>Textarea</h1>
      <p
        id="textarea"
        contentEditable="true"
        suppressContentEditableWarning
        spellCheck={false}
        onBeforeInput={handleBeforeInput}
      >
        {text}
      </p>
      <h1>State</h1>
      <p style={{ fontFamily: 'monospace' }}>
        <strong>Caret:</strong> {caret}
        <br />
        <strong>Text:</strong> {text}
      </p>
    </main>
  )
}

function hasData(event: Event): event is InputEvent {
  return 'data' in event
}
