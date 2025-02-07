import Heading from "@tiptap/extension-heading";

const CustomHeading = Heading.extend({
  addKeyboardShortcuts() {
    return {
      // 'Mod-Alt-0': () => this.editor.commands.setBlockquote(),
      'Mod-Shift-1': () => this.editor.commands.toggleHeading({ level: 1 }),
      'Mod-Shift-2': () => this.editor.commands.toggleHeading({ level: 2 }),
      'Mod-Shift-3': () => this.editor.commands.toggleHeading({ level: 3 }),
      'Mod-Shift-4': () => this.editor.commands.toggleHeading({ level: 4 }),
      'Mod-Shift-5': () => this.editor.commands.toggleHeading({ level: 5 }),
      'Mod-Shift-6': () => this.editor.commands.toggleHeading({ level: 6 }),
    }
  }
})

export default CustomHeading