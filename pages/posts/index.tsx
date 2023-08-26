import React, { useEffect } from 'react'
import { useState } from 'react'
import { useContractRead } from 'wagmi'

import { contractAddresses } from '../../constants'

import PostCard  from '../../components/PostCard'
import PostCreate from '../../components/PostCreate'

export default function Posts() {
    const [showCreatePost, setShowCreatePost] = useState(false);

    const abi = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"postId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"postAttestCount","type":"uint256"},{"indexed":false,"internalType":"address","name":"postAttester","type":"address"}],"name":"PostAttestCountUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"postId","type":"uint256"},{"indexed":false,"internalType":"string","name":"postContent","type":"string"},{"indexed":false,"internalType":"uint256","name":"postDate","type":"uint256"},{"indexed":false,"internalType":"address","name":"postCreator","type":"address"},{"indexed":false,"internalType":"string","name":"postSector","type":"string"}],"name":"PostCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"newSectorResolverAddress","type":"address"}],"name":"SectorResolverUpdated","type":"event"},{"inputs":[{"internalType":"string","name":"_postContent","type":"string"},{"internalType":"uint256","name":"_postDate","type":"uint256"},{"internalType":"string","name":"_postSector","type":"string"}],"name":"createPost","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"start","type":"uint256"},{"internalType":"uint256","name":"end","type":"uint256"}],"name":"getAllPosts","outputs":[{"components":[{"internalType":"string","name":"postContent","type":"string"},{"internalType":"uint256","name":"postAttestCount","type":"uint256"},{"internalType":"uint256","name":"postDate","type":"uint256"},{"internalType":"address","name":"postCreator","type":"address"},{"internalType":"string","name":"postSector","type":"string"}],"internalType":"struct Post.PostStruct[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"start","type":"uint256"},{"internalType":"uint256","name":"end","type":"uint256"}],"name":"getAllPostsByUser","outputs":[{"components":[{"internalType":"string","name":"postContent","type":"string"},{"internalType":"uint256","name":"postAttestCount","type":"uint256"},{"internalType":"uint256","name":"postDate","type":"uint256"},{"internalType":"address","name":"postCreator","type":"address"},{"internalType":"string","name":"postSector","type":"string"}],"internalType":"struct Post.PostStruct[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getLastPostId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"postId","type":"uint256"}],"name":"getPost","outputs":[{"components":[{"internalType":"string","name":"postContent","type":"string"},{"internalType":"uint256","name":"postAttestCount","type":"uint256"},{"internalType":"uint256","name":"postDate","type":"uint256"},{"internalType":"address","name":"postCreator","type":"address"},{"internalType":"string","name":"postSector","type":"string"}],"internalType":"struct Post.PostStruct","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"postId","type":"uint256"}],"name":"getPostSector","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getTotalPostsByUser","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sectorResolverAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"postId","type":"uint256"}],"name":"updateAttestCount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_sectorResolverAddress","type":"address"}],"name":"updateSectorResolverAddress","outputs":[],"stateMutability":"nonpayable","type":"function"}]

    const postContract = contractAddresses[421613]["Post"]
    const contract = {
            addressOrName: postContract["contractAddress"],
            // contractInterface: postContract["abi"]
            contractInterface: abi
        }
    async function getLastPostId() {
        const data = await useContractRead(
            contract,
            "getLastPostId"
        )

        console.log(data)
        console.log('hello')
    }

    function loadMorePosts() {
        console.log("load more posts")
        // getLastPostId();
    }

    function handlePostsOnScroll(e: any) {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        bottom && loadMorePosts();
    }

    useEffect(() => {
        loadMorePosts();
        // getLastPostId();
    }, [])
    
    getLastPostId();

    return (
        <div className='flex flex-row justify-center'>
            <div className='w-[30%]'>
                <div className='bg-white/30 shadow-md p-7 mx-[15%] mt-[20%] rounded-xl'>
                    <div className="font-bold text-black text-xl mb-4">Create your post now.</div>
                    <button className="bg-white/50 hover:bg-white/30 text-black font-bold py-2 px-4 rounded-xl shadow-md hover:shadow-lg duration-200" onClick={() => setShowCreatePost(true)}>Create Post</button>
                </div>
            </div>
            <div 
                className="w-[70%] h-screen flex flex-col gap-5 overflow-y-scroll pr-[20%] py-3 snap-y"
                onScroll={(e) => {handlePostsOnScroll(e)}}
            >
                <PostCard/>
                <PostCard/>
                <PostCard/>
                <PostCard/>
                <PostCard/>
                <PostCard/>
                <PostCard/>
                <PostCard/>
                <PostCard/>
                <PostCard/>
                <PostCard/>
                <PostCard/>
            </div>
            <PostCreate show={showCreatePost} setShow={setShowCreatePost} />
        </div>
    )
}