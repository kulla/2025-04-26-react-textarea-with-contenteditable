import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'

export default defineConfig({
  html: {
    title: 'React Textarea with ContentEditable',
  },
  output: {
    assetPrefix: '/2025-04-26-react-textarea-with-contenteditable/',
  },
  plugins: [pluginReact()],
})
