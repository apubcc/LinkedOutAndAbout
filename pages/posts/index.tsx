import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import { write } from "fs";
import {  useContractRead, useContractWrite, useAccount, useNetwork } from "wagmi";
import { contractAddresses } from "../../constants";

import PostCard from "../../components/PostCard";
import PostCreate from "../../components/PostCreate";

import { Layout } from "../../components";
import { get } from "http";
import { type } from "os";

function Posts() {
  const { chain } = useNetwork();

  var currentChainId = chain?.id;

  const postContractAddress = contractAddresses[currentChainId]?.Post.contractAddress;
  const postContractABI = contractAddresses[currentChainId]?.Post.abi;

  const [lastPostId, setLastPostId] = useState(0);
  const [numberOfPosts, setNumberOfPosts] = useState(13);
  const [showCreatePost, setShowCreatePost] = useState(false);

  useContractRead({
    address: postContractAddress,
    abi: postContractABI,
    functionName: "getLastPostId",
    onSuccess: (data) => {
      setLastPostId(Number(data));
      console.log("Last post id: " + data)
    },
    onError: (error) => {
      console.log(error);
    }
  });

  function getPosts() {
    var posts = [];

    for (var i = lastPostId; i > numberOfPosts; i--) {
      posts.push(<PostCard postNumber={i} key={i} />);
    }

    return posts;
  }

  function loadMorePosts() {
    var numToMinus = 10;
    if (numberOfPosts - numToMinus < 0) {
      numToMinus = numberOfPosts;
    }

    setNumberOfPosts(numberOfPosts - numToMinus);
  }

  function handlePostsOnScroll(e: any) {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    bottom && loadMorePosts();
  }

  useEffect(() => {
    loadMorePosts();
  }, []);

  return (
    <Layout showWalletOptions={true}>
      <div className="flex flex-row justify-center">
        <div className="w-[30%]">
          <div className="bg-white/30 shadow-md p-7 mx-[15%] mt-[20%] rounded-xl">
            <div className="font-bold text-black text-xl mb-4">
              Create your post now.
            </div>
            <button
              className="bg-white/50 hover:bg-white/30 text-black font-bold py-2 px-4 rounded-xl shadow-md hover:shadow-lg duration-200"
                onClick={() => setShowCreatePost(true)}
            >
              Create Post
            </button>
          </div>
        </div>
        <div
          className="w-[70%] h-screen flex flex-col gap-5 overflow-y-scroll pr-[20%] py-3 pt-10 snap-y"
          onScroll={(e) => {
            handlePostsOnScroll(e);
          }}
        >
          {getPosts()}
        </div>
        <PostCreate show={showCreatePost} setShow={setShowCreatePost} />
      </div>
    </Layout>
  );
}

export default dynamic (() => Promise.resolve(Posts), {ssr: false});