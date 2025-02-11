import { Room } from "./room.tsx";
import { CollaborativeEditor } from "./editor.tsx";

export default function Page() {
  return (
    <Room>
      <CollaborativeEditor />
    </Room>
  );
}