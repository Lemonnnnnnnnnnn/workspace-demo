import { Button, A, B } from "shared-ui";
import Nav from "./components/Nav";

function App() {
  const items = [
    {
      id: "0",
      name: "A",
      children: <A />,
    },
    {
      id: "1",
      name: "B",
      children: <B />,
    },
  ];
  return (
    <>
      <Button name="123" />
      <Nav items={items} defaultKey="0" />
    </>
  );
}

export default App;
