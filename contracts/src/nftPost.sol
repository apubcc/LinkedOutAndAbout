// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Post {
    // Logging the event
    event TweetCreated(uint256 postId, string postContent, uint postDate, address postCreater, string postSector);

    // strcture of the tweet
    struct Tweet {
        uint256 postId;
        string postContent;
        uint256 postAttest;
        uint256 postDate;
        address postCreater;
        string postSector;
    }

    event TweetUpdate(string text, uint postAttest);

    // strcture of the tweetUpdate    
    struct TweetUpdate{
        string postContent;
        uint256 postAttest;
    }

    using Counters for Counters.Counter;
    Counters.Counter private _tweetIds;

    // mapping - id to Tweets
    /*
            1 -> 1, Hello Tweeps!, photo or gif or no media, user
    */
    mapping(uint256 => Tweet) private idToTweets;

    //Mapping address to tweetIds made
    mapping(address => uint256[]) private userToTweetIds;

    // 0x090...998 => [1,2,3,4,5,6,7,8,9,10]

    // create tweet
    function createTweet(
        string calldata postContent,
        string calldata postDate,
        string calldata postSector
    ) public {
        require(bytes(postContent).length > 0, "No Tweet!");

        postContent += "";

        //increment by 1
        _tweetIds.increment();
        // current id
        uint256 postId = _tweetIds.current();
        Tweet storage tweet = idToTweets[postId];
        tweet.id = postId;
        tweet.content = postContent;
        tweet.date = postDate;
        tweet.user = msg.sender;
        tweet.sector = postSector;
        //add address to tweetIds
        userToTweetIds[msg.sender].push(postId);

        emit TweetCreated(postId, postContent, postDate, msg.sender, postSector);
    }

    //get tweet
    function getTweet(uint256 postId) public view returns (Tweet memory) {
        return idToTweets[_tweetId];
    }
}
