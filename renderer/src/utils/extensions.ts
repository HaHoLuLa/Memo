import BulletList from "@tiptap/extension-bullet-list";
import Color from "@tiptap/extension-color";
import Document from "@tiptap/extension-document";
import Dropcursor from "@tiptap/extension-dropcursor";
import Focus from "@tiptap/extension-focus";
import FontFamily from "@tiptap/extension-font-family";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Image from "@tiptap/extension-image";
import OrderedList from "@tiptap/extension-ordered-list";
import Paragraph from "@tiptap/extension-paragraph";
import Placeholder from "@tiptap/extension-placeholder";
import Subscript from "@tiptap/extension-subscript";
import Table from "@tiptap/extension-table";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Typography from "@tiptap/extension-typography";
import Underline from "@tiptap/extension-underline";
import Text from "@tiptap/extension-text";
import ListItem from "@tiptap/extension-list-item";
import TableCell from "@tiptap/extension-table-cell";
import Blockquote from "@tiptap/extension-blockquote";
import HardBreak from "@tiptap/extension-hard-break";
import Youtube from "@tiptap/extension-youtube";
import Bold from "@tiptap/extension-bold";
import Code from "@tiptap/extension-code";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import ListKeymap from "@tiptap/extension-list-keymap";
import History from "@tiptap/extension-history";
import BubbleMenu from "@tiptap/extension-bubble-menu";
import { all, createLowlight } from "lowlight";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import php from "highlight.js/lib/languages/php";
import java from "highlight.js/lib/languages/java";
import "highlight.js/styles/atom-one-dark.css";
import CustomLink from "./extends/CustomLink";
import CustomSuperscript from "./extends/CustomSuperscript";
import CustomHeading from "./extends/CustomHeading";
import CustomCodeBlockLowlight from "./extends/CustomCodeBlockLowlight";
import CustomHighlight from "./extends/CustomHighlight";
import Gapcursor from "@tiptap/extension-gapcursor";

const lowlight = createLowlight(all);
lowlight.register("css", css);
lowlight.register("js", js);
lowlight.register("ts", ts);
lowlight.register("html", html);
lowlight.register("php", php);
lowlight.register("java", java);

export const extensions = [
  BulletList,
  CustomCodeBlockLowlight.configure({
    lowlight,
  }),
  Color,
  CustomHighlight,
  CustomLink,
  CustomSuperscript,
  CustomHeading,
  Document,
  Dropcursor.configure({
    color: "var(--color-primary)",
  }),
  Focus,
  FontFamily,
  HorizontalRule,
  Image.configure({
    inline: true,
    allowBase64: true,
  }),
  OrderedList,
  Paragraph,
  Placeholder.configure({
    placeholder: ({ node, editor }) => {
      let placeholderText;
      switch (node.type.name) {
        case "taskList":
          placeholderText = "       할 일";
          break;
        case "paragraph":
          if (editor.isFocused) placeholderText = "글 작성하기";
          break;
        case "heading":
          placeholderText = `제목${node.attrs.level}`;
          break;
        case "bulletList":
        case "orderedList":
          placeholderText = "리스트";
          break;
        case "codeBlock":
          placeholderText = " 코드 블럭";
          break;
        case "blockquote":
          placeholderText = "인용문";
          break;
        default:
          placeholderText = "";
      }

      return placeholderText || "";
    },
  }),
  Subscript,
  Table.configure({
    resizable: true,
    allowTableNodeSelection: true,
  }),
  TableHeader,
  TableRow,
  TaskItem,
  TaskList,
  // CustomCheckbox,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  TextStyle,
  Typography,
  Underline,
  Text,
  ListItem,
  TableCell,
  Blockquote,
  HardBreak,
  Youtube,
  Bold,
  Code,
  Italic,
  Strike,
  ListKeymap,
  History,
  BubbleMenu,
  Gapcursor,
];
