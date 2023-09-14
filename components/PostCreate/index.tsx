import { useState } from "react";
import { MouseEvent } from "react";

import { useContractWrite, useNetwork, useAccount } from "wagmi";
import { write } from "fs";

import { contractAddresses } from "../../constants";
import { parseEther } from "ethers/lib/utils";

export default function PostCreate(props: {
  show: boolean;
  setShow: Function;
}) {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const { show, setShow } = props;

  const [textareaInput, setTextareaInput] = useState("");
  const [textCount, setTextCount] = useState(0);
  const [showPleaseLogin, setShowPleaseLogin] = useState(false);
  const [showSuccessPost, setShowSuccessPost] = useState(false);

  const currentChainId = chain?.id;
  const postContractAddress = contractAddresses[currentChainId]?.Post.contractAddress;
  const postContractABI = contractAddresses[currentChainId]?.Post.abi;

  const {
    write: createPost,
  } = useContractWrite({
    address: postContractAddress,
    abi: postContractABI,
    functionName: "createPost",
    args: [textareaInput, (Math.floor(Date.now()/1000)), "Blockchain"],
    onSuccess: () => {
      setShow(false);
      setShowSuccessPost(true);
      setTextareaInput("");
    },
  });

  function handleCancelOnClick(e: any) {
    e.preventDefault();
    
    setShow(false);
  }

  function handleSubmitOnClick(e: any) {
    e.preventDefault();

    if (address === undefined) {
      setShow(false);
      setShowPleaseLogin(true);
      return;      
    }

    createPost(textareaInput);
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
      {showPleaseLogin && (
        <div
        className="formCreate absolute h-screen w-screen top-0 left-0 flex items-center justify-center z-50"
        onClick={() => setShowPleaseLogin(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="formCard flex flex-col px-[10%] py-3 bg-white/50 rounded-xl px-10 py-8"
          >
            <div className="formTitle text-2xl font-bold flex justify-center items-center">
              Please Login!
            </div>
            <button
              onClick={() => setShowPleaseLogin(false)}
              className="formButtonSubmit mt-10 px-8 py-3 text-lg rounded-xl duration-500 text-white font-bold bg-black hover:bg-black/80 hover:shadow-lg">
              Close
              </button>
        </div>
      </div>
      )}
      {showSuccessPost && (
        <div
        className="formCreate absolute h-screen w-screen top-0 left-0 flex items-center justify-center z-50"
        onClick={() => setShowPleaseLogin(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="formCard flex flex-col px-[10%] py-3 bg-white/50 rounded-xl px-10 py-8"
          >
            <div className="formTitle text-2xl font-bold flex justify-center items-center">
              Post Success!
            </div>
            <button
              onClick={() => setShowSuccessPost(false)}
              className="formButtonSubmit mt-10 px-8 py-3 text-lg rounded-xl duration-500 text-white font-bold bg-black hover:bg-black/80 hover:shadow-lg">
              Close
              </button>
        </div>
      </div>
      )}
    </>
  );
}
