import StarterKit from "@tiptap/starter-kit";
import {LinkBubbleMenuHandler} from "mui-tiptap";
import {Link} from "@tiptap/extension-link";

export default function editorExtension() {
    return(
        [StarterKit, LinkBubbleMenuHandler, Link]
    )
}