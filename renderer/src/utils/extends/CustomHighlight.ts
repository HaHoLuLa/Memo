import Highlight from "@tiptap/extension-highlight";

const CustomHighlight = Highlight.extend({
  addKeyboardShortcuts() {
    return {
      "Mod-h": () => this.editor.commands.toggleHighlight()
    }
  }
})

export default CustomHighlight