// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {Counters} from "@openzeppelin/contracts/utils/Counters.sol";

contract Post {
    // Sector resolver contract address
    address public sectorResolverAddress;

    modifier onlySectorResolver() {
        require(
            msg.sender == sectorResolverAddress,
            "Only Sector Resolver can call this function"
        );
        _;
    }

    // Events
    event PostCreated(
        uint256 postId,
        string postContent,
        uint postDate,
        address postCreator,
        string postSector
    );
    event PostAttestCountUpdated(
        uint256 postId,
        uint256 postAttestCount,
        address postAttester
    );
    event SectorResolverUpdated(address newSectorResolverAddress);

    // Post structure
    struct PostStruct {
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

    // Update sector resolver address
    function updateSectorResolverAddress(
        address _sectorResolverAddress
    ) external {
        sectorResolverAddress = _sectorResolverAddress;
        emit SectorResolverUpdated(_sectorResolverAddress);
    }

    // Create post
    function createPost(
        string calldata _postContent,
        uint256 _postDate,
        string calldata _postSector
    ) external {
        require(bytes(_postContent).length > 0, "No Post Content!");
        require(bytes(_postSector).length > 0, "No Sector!");
        require(_postDate > 0, "No Date!");

        _postIds.increment();
        uint256 postId = _postIds.current();
        PostStruct storage post = idToPosts[postId];
        post.postContent = _postContent;
        post.postDate = _postDate;
        post.postCreator = msg.sender;
        post.postSector = _postSector;

        userToPostIds[msg.sender].push(postId);

        emit PostCreated(
            postId,
            _postContent,
            _postDate,
            msg.sender,
            _postSector
        );
    }

    // Get post
    function getPost(uint256 postId) external view returns (PostStruct memory) {
        require(postId <= _postIds.current(), "Post does not exist");
        return idToPosts[postId];
    }

    // Get post sector
    function getPostSector(
        uint256 postId
    ) external view returns (string memory) {
        require(postId <= _postIds.current(), "Post does not exist");
        return idToPosts[postId].postSector;
    }

    // Get all posts with pagination
    function getAllPosts(
        uint256 start,
        uint256 end
    ) external view returns (PostStruct[] memory) {
        uint256 lastPostId = _postIds.current();
        require(
            start <= end && end <= lastPostId,
            "Invalid start or end values"
        );

        uint256 length = end - start + 1;
        PostStruct[] memory posts = new PostStruct[](length);

        for (uint256 i = 0; i < length; i++) {
            posts[i] = idToPosts[start + i];
        }

        return posts;
    }

    // Get all posts by user with pagination
    function getAllPostsByUser(
        address user,
        uint256 start,
        uint256 end
    ) external view returns (PostStruct[] memory) {
        uint256[] memory postIds = userToPostIds[user];
        require(
            start <= end && end < postIds.length,
            "Invalid start or end values"
        );

        uint256 length = end - start + 1;
        PostStruct[] memory posts = new PostStruct[](length);

        for (uint256 i = 0; i < length; i++) {
            posts[i] = idToPosts[postIds[start + i]];
        }

        return posts;
    }

    // Get total number of posts by a user
    function getTotalPostsByUser(address user) external view returns (uint256) {
        return userToPostIds[user].length;
    }

    // Function to update attestation count in post
    function updateAttestCount(uint256 postId) external onlySectorResolver {
        require(postId <= _postIds.current(), "Post does not exist");
        idToPosts[postId].postAttestCount++;
        emit PostAttestCountUpdated(
            postId,
            idToPosts[postId].postAttestCount,
            tx.origin
        );
    }

    // Get the last used post ID
    function getLastPostId() external view returns (uint256) {
        return _postIds.current();
    }
}
