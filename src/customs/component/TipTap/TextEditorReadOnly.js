import {RichTextReadOnly} from "mui-tiptap";
import editorExtension from "./EditorExtension";

const TextEditorReadOnly = (props) => {
    return (
        <>
            <RichTextReadOnly
                ref={props.refId}
                extensions={editorExtension()}
                content={props.text}/>
        </>
    )
}
export default TextEditorReadOnly