// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Post {

    event PostCreated(uint256 postId, string postContent, uint postDate, address postCreator, string postSector);
    event PostAttested(uint256 postId, uint256 postAttestCount, address postAttester);

    // strcture of the post
    struct Post {
        uint256 postId;
        string postContent;
        uint256 postAttestCount;
        uint256 postDate;
        address postCreator;
        string postSector;
    }


    using Counters for Counters.Counter;
    Counters.Counter private _postIds;


    mapping(uint256 => Post) private idToPosts;
    mapping(address => uint256[]) private userToPostIds;

    // create post
    function createPost(
        string calldata _postContent,
        string calldata _postDate,
        string calldata _postSector
    ) public {
        require(bytes(_postContent).length > 0, "No Tweet!");
        require(bytes(_postDate).length > 0, "No Date!");
        require(bytes(_postSector).length > 0, "No Sector!");

        //increment by 1
        _postIds.increment();
        // current id
        uint256 postId = _postIds.current();
        Post storage post = idToPosts[postId];
        post.postId = postId;
        post.postContent = _postContent;
        post.postDate = _postDate;
        post.postCreator = msg.sender;
        post.postSector = _postSector;
        //add address to postIds
        userToPostIds[msg.sender].push(postId);

        emit TweetCreated(postId, postContent, postDate, msg.sender, postSector);
    }

    //get tweet
    function getPost(uint256 postId) public view returns (Post memory) {
        return idToPosts[postId];
    }

    //get all tweets
    function getAllPosts() public view returns (Post[] memory) {
        Post[] memory posts = new Post[](_postIds.current());
        for (uint256 i = 0; i < _postIds.current(); i++) {
            posts[i] = idToPosts[i + 1];
        }
        return posts;
    }

    //get all tweets by user
    function getAllPostsByUser(address user) public view returns (Post[] memory) {
        uint256[] memory postIds = userToPostIds[user];
        Post[] memory posts = new Post[](postIds.length);
        for (uint256 i = 0; i < postIds.length; i++) {
            posts[i] = idToPosts[postIds[i]];
        }
        return posts;
    }

    //TODO: add attestation

}
