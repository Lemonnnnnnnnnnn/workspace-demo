// import { ComponentConfig } from "@cat/components/src/BasicForm/types";
import { NotFound } from "@cat/components";
import yayJpg from "../assets/yay.jpg";
// import { BasicForm, NotFound } from "@cat/components";

export default function HomePage() {
  return (
    <div>
      <h2>Yay! Welcome to umi!</h2>
      <p>
        <img alt="aaa" src={yayJpg} width="388" />
      </p>
      <p>
        To get started, edit <code>pages/index.tsx</code> and save to reload.
      </p>
      <NotFound />
    </div>
  );
}
