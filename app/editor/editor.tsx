"use client";

import Quill from "quill";
import ReactQuill from "react-quill";
import { QuillBinding } from "y-quill";
import QuillCursors from "quill-cursors";
import * as Y from "yjs";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { useRoom, useSelf } from "@liveblocks/react";
import { useEffect, useRef, useState } from "react";
import styles from "./components/Editor.module.css";

// Collaborative text editor with simple rich text, live cursors, and live avatars
type DataProp = {
  data: string|undefined;
}

// Register cursors module once
if ((Quill as any).__cursors_registered !== true) {
  Quill.register("modules/cursors", QuillCursors);
  (Quill as any).__cursors_registered = true;
}

export function CollaborativeEditor ({ data }: DataProp) {
  const room = useRoom();
  const [doc, setDoc] = useState<Y.Doc>();
  const [text, setText] = useState<Y.Text>();
  const [provider, setProvider] = useState<any>();

  if (!room) {
    return null;
  }
  
  
  

  // Set up Liveblocks Yjs provider
  useEffect(() => {
    if (!room) return;

    const yDoc = new Y.Doc();
    const yText = yDoc.getText("quill");
    const yProvider = new LiveblocksYjsProvider(room, yDoc);
    setDoc(yDoc);
    setText(yText);
    setProvider(yProvider);

    
    return () => {
      yDoc?.destroy();
      yProvider?.destroy();
    };
  }, [room]);

  useEffect(() => {
    console.log('recieved data in editor');
    console.log(data);
    if (data != undefined){
      //const yText = new Y.Text(data)
      
      console.log('setting text')
      text?.delete(0, text.length)
      text?.insert(0, data);
      //setText(yText);
    }
    
  }, [data]);


  if (!text || !provider) {
    return null;
  }

  return <QuillEditor yText={text} provider={provider} />;
}

type EditorProps = {
  yText: Y.Text;
  provider: any;
  
};

function QuillEditor({ yText, provider }: EditorProps) {
  const reactQuillRef = useRef<ReactQuill>(null);

  // Set up Yjs and Quill
  const user = useSelf((me) => me.info);

  // Set user info into awareness
  useEffect(() => {
    if (user) {
      provider.awareness.setLocalStateField("user", {
        name: user.name,
        color: user.color,
      });
    }
  }, [user, provider]);

  useEffect(() => {
    // let quill: ReturnType<ReactQuill["getEditor"]>;
    // let binding: QuillBinding;

    if (!reactQuillRef.current) {
      return;
    }

    const quill = reactQuillRef.current.getEditor();
    const cursors = quill.getModule("cursors");
    const binding = new QuillBinding(yText, quill, provider.awareness);

    // Update awareness on cursor change
    quill.on("selection-change", (range) => {
      if (range) {
        provider.awareness.setLocalStateField("cursor", {
          index: range.index,
          length: range.length,
        });
      }
    });

    // Render remote users' cursors
    const handleAwarenessChange = () => {
      const states = provider.awareness.getStates();
      const myClientID = provider.awareness.clientID;

      cursors.clearCursors();

      states.forEach((state: any, clientID: number) => {
        if (clientID === myClientID) return;

        const { user, cursor } = state;
        if (user && cursor) {
          cursors.createCursor(clientID.toString(), user.name, user.color);
          cursors.moveCursor(clientID.toString(), cursor);
        }
      });
    };

    provider.awareness.on("change", handleAwarenessChange);

    return () => {
      binding.destroy();
      provider.awareness.off("change", handleAwarenessChange);
    };
    
  }, [yText, provider]);

  return (
    <div className="container bg-white dark:bg-black rounded-md p-4">
      <ReactQuill
        className="editor text-black dark:text-white"
        placeholder="Start typing here…"
        ref={reactQuillRef}
        theme="snow"
        modules={{
          cursors: true,
          toolbar: false,
          history: { userOnly: true },
        }}
      />
    </div>
  );
  
}