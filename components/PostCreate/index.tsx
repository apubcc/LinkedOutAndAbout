import { MouseEvent } from "react";
import { useState } from "react";
import { useContractWrite, useNetwork, useAccount } from "wagmi";
import { contractAddresses } from "../../constants";
import { write } from "fs";
import { parseEther } from "ethers/lib/utils";

function createPost(textContent: string) {
  console.log(textContent);
  const { chain } = useNetwork();
  const currentChainId = chain?.id;

  //get contract address of Post contract based on chain id
  const postContractAddress =
    contractAddresses[currentChainId].Post.contractAddress;

  //get the abi
  const postContractABI = contractAddresses[currentChainId].Post.abi;

  //use contract write
  const {
    write: createPost,
    data,
    isLoading,
    isSuccess,
  } = useContractWrite({
    address: postContractAddress,
    abi: postContractABI,
    functionName: "createPost",
    args: [textContent, 1693087235, "Blockchain"],
  });

  isLoading && console.log("loading");
  isSuccess && console.log("success", data);
}

export default function PostCreate(props: {
  show: boolean;
  setShow: Function;
}) {
  const { show, setShow } = props;
  const [textareaInput, setTextareaInput] = useState("");
  const [textCount, setTextCount] = useState(0);

  function handleCancelOnClick(e: any) {
    e.preventDefault();
    setShow(false);
  }

  function handleSubmitOnClick(e: any) {
    createPost(textareaInput);

    e.preventDefault();
  }

  function handleTextInput(e: any) {
    e.preventDefault();

    var rawWordCount = e.target.value.length;
    var wordCount = e.target.value.trim().split(" ").length;

    if (e.target.value === "") {
      wordCount = 0;
    }

    if (rawWordCount > 1000 || wordCount > 100) {
      setTextCount(150);
      return;
    }

    setTextCount(wordCount);

    setTextareaInput(e.target.value);
  }

  return (
    <>
      {show && (
        <div
          className="formCreate absolute h-screen w-screen top-0 left-0 flex items-center justify-center z-50"
          onClick={(e) => handleCancelOnClick(e)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="formCard flex flex-col w-[50%] bg-white/50 rounded-xl px-10 py-8"
          >
            <div className="formTitle mb-5 text-xl font-bold">
              Post something...
            </div>
            <form className="flex flex-col">
              <textarea
                className="w-[100%] p-3 rounded-xl bg-white/80 resize-none"
                name="postContent"
                id="postContent"
                rows={10}
                onInput={(e) => handleTextInput(e)}
                value={textareaInput}
              />
              {textCount >= 150 ? (
                <div className="formTextCount self-end my-2 mx-3 text-red-400 font-bold">
                  Try not to type more than 1000 characters or 100 wordcounts!
                </div>
              ) : (
                <div className="formTextCount self-end my-2 mx-3">
                  {textCount}/150
                </div>
              )}
              <div className="formButton mt-5 flex justify-around">
                <button
                  onClick={(e) => handleCancelOnClick(e)}
                  className="formButtonCancel px-8 py-3 text-lg rounded-xl duration-500 text-black font-bold bg-white/80 hover:bg-white/60 hover:shadow-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={(e) => handleSubmitOnClick(e)}
                  className="formButtonSubmit px-8 py-3 text-lg rounded-xl duration-500 text-white font-bold bg-black hover:bg-black/80 hover:shadow-lg"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
