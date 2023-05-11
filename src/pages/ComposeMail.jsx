import { EditorState } from "draft-js";
import { useRef, useState } from "react";

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// import { Editor } from "draft-js";
// import "draft-js/dist/Draft.css";

import { postMail } from "../utils/firebase";
import { useSelector } from "react-redux";

export default function ComposeMail() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const user = useSelector((state) => state.user.user);

  const email = useRef();
  const subject = useRef();

  async function sendHandler() {
    const mail = {
      subject: subject.current.value,
      content: editorState.getCurrentContent().getPlainText(),
      to: email.current.value,
      from: user.email,
      new: true,
    };
    await postMail(mail);
    console.log(mail);
  }

  return (
    <div style={{ border: "solid" }}>
      <input
        type="email"
        style={{ width: "100%", minHeight: "32px" }}
        placeholder="To"
        ref={email}
      />
      <input
        type="text"
        style={{ width: "100%", minHeight: "32px" }}
        placeholder="Subject"
        ref={subject}
      />
      <Editor editorState={editorState} onEditorStateChange={setEditorState} />
      <button onClick={sendHandler}>Send</button>
    </div>
  );
}
