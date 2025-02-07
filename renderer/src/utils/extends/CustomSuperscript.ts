import Superscript from "@tiptap/extension-superscript"

const CustomSuperscript = Superscript.extend({
  addKeyboardShortcuts() {
    return {
      "Mod-'": () => this.editor.commands.toggleSuperscript()
    }
  }
})

export default CustomSuperscript