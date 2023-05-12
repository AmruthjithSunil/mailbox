import { EditorState } from "draft-js";
import { useRef, useState } from "react";

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// import { Editor } from "draft-js";
// import "draft-js/dist/Draft.css";

import { postMail } from "../utils/firebase";
import { useSelector } from "react-redux";
import { Button, Frame, Input } from "../utils/Compose";

export default function ComposeMail() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [isSending, setIsSending] = useState(false);

  const user = useSelector((state) => state.user.user);

  const email = useRef();
  const subject = useRef();

  async function sendHandler() {
    setIsSending(true);
    const mail = {
      subject: subject.current.value,
      content: editorState.getCurrentContent().getPlainText(),
      to: email.current.value,
      from: user.email,
      new: true,
    };
    await postMail(mail);
    console.log(mail);
    setIsSending(false);
    setEditorState(() => EditorState.createEmpty());
    subject.current.value = "";
  }

  return (
    <Frame>
      <Input type="email" placeholder="To" ref={email} />
      <Input type="text" placeholder="Subject" ref={subject} />
      <Editor editorState={editorState} onEditorStateChange={setEditorState} />
      {isSending ? (
        <>Sending...</>
      ) : (
        <Button onClick={sendHandler}>Send</Button>
      )}
    </Frame>
  );
}
