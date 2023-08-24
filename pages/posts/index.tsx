import React from 'react'
import { useState } from 'react'

import PostCard  from '../../components/PostCard'
import PostCreate from '../../components/PostCreate'

export default function Posts() {
    const [showCreatePost, setShowCreatePost] = React.useState(true);

    return (
        <div className="mx-[30%]">
            <PostCard />
            <PostCreate show={showCreatePost} setShow={setShowCreatePost} />
        </div>
    )
}