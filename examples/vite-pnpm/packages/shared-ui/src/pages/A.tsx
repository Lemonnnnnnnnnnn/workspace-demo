import toast, { Toaster } from "react-hot-toast";

const notify = () => toast("Here is your toast.");

const A = () => {
  return (
    <>
      <div>abccc</div>
      <button onClick={notify}>Make me a toast</button>
      <Toaster />
    </>
  );
};

export default A;
