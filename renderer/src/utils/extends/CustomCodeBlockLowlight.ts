import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";

const CustomCodeBlockLowlight = CodeBlockLowlight.extend({
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-c": () => this.editor.commands.toggleCodeBlock()
    }
  }
}) 

export default CustomCodeBlockLowlight