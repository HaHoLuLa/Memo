import { Link } from '@tiptap/extension-link';

const CustomLink = Link.extend({
  addKeyboardShortcuts() {
    return {
      'Mod-k': () => {
        const existingLink = this.editor.getAttributes('link');

        // 이미 링크가 있으면 수정
        if (existingLink.href) {
          const url = window.prompt('Edit link', existingLink.href);
          if (url === null) return true; // 취소 시 아무것도 하지 않음
          if (url === '') {
            this.editor.commands.unsetLink(); // 빈 값 입력 시 링크 제거
          } else {
            this.editor.commands.setLink({ href: url });
          }
        } else {
          // 새 링크 추가
          const url = window.prompt('Enter URL');
          if (url) {
            this.editor.commands.setLink({ href: url });
          }
        }

        return true;
      },
    };
  },
});

export default CustomLink;
