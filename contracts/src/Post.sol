// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {Counters} from "@openzeppelin/contracts/utils/Counters.sol";

contract Post {
    event PostCreated(
        uint256 postId,
        string postContent,
        uint postDate,
        address postCreator,
        string postSector
    );
    event PostAttested(
        uint256 postId,
        uint256 postAttestCount,
        address postAttester
    );

    // strcture of the post
    struct PostStruct {
        uint256 postId;
        string postContent;
        uint256 postAttestCount;
        uint256 postDate;
        address postCreator;
        string postSector;
    }

    using Counters for Counters.Counter;
    Counters.Counter private _postIds;

    mapping(uint256 => PostStruct) private idToPosts;
    mapping(address => uint256[]) private userToPostIds;

    // create post
    function createPost(
        string calldata _postContent,
        uint256 _postDate,
        string calldata _postSector
    ) public {
        require(bytes(_postContent).length > 0, "No Tweet!");
        require(bytes(_postSector).length > 0, "No Sector!");
        require(_postDate > 0, "No Date!");

        //increment by 1
        _postIds.increment();
        // current id
        uint256 postId = _postIds.current();
        PostStruct storage post = idToPosts[postId];
        post.postId = postId;
        post.postContent = _postContent;
        post.postDate = _postDate;
        post.postCreator = msg.sender;
        post.postSector = _postSector;
        //add address to postIds
        userToPostIds[msg.sender].push(postId);

        emit PostCreated(
            postId,
            _postContent,
            _postDate,
            msg.sender,
            _postSector
        );
    }

    //get post
    function getPost(uint256 postId) public view returns (PostStruct memory) {
        return idToPosts[postId];
    }

    //get all posts
    function getAllPosts() public view returns (PostStruct[] memory) {
        PostStruct[] memory posts = new PostStruct[](_postIds.current());
        for (uint256 i = 0; i < _postIds.current(); i++) {
            posts[i] = idToPosts[i + 1];
        }
        return posts;
    }

    //get all posts by user
    function getAllPostsByUser(
        address user
    ) public view returns (PostStruct[] memory) {
        uint256[] memory postIds = userToPostIds[user];
        PostStruct[] memory posts = new PostStruct[](postIds.length);
        for (uint256 i = 0; i < postIds.length; i++) {
            posts[i] = idToPosts[postIds[i]];
        }
        return posts;
    }

    //get all posts by sector
    function getAllPostsBySector(
        string calldata sector
    ) public view returns (PostStruct[] memory) {
        PostStruct[] memory posts = new PostStruct[](_postIds.current());
        uint256 postCount = 0;
        for (uint256 i = 0; i < _postIds.current(); i++) {
            if (
                keccak256(bytes(idToPosts[i + 1].postSector)) ==
                keccak256(bytes(sector))
            ) {
                posts[postCount] = idToPosts[i + 1];
                postCount++;
            }
        }
        return posts;
    }

    //function to update attestation count in post
    function updateAttestCount(uint256 postId) public {
        idToPosts[postId].postAttestCount++;
        emit PostAttested(
            postId,
            idToPosts[postId].postAttestCount,
            msg.sender
        );
    }
}
