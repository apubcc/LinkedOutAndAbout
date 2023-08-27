// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {Counters} from "@openzeppelin/contracts/utils/Counters.sol";
import {IMailbox} from "./interfaces/IMailbox.sol";
import {IInterchainGasPaymaster} from "./interfaces/IInterchainGasPaymaster.sol";

contract Post_V2 {
    using Counters for Counters.Counter;
    Counters.Counter private _postIds;

    address public interchainGasPaymasterAddress;
    address public mailboxAddress;

    uint256 public gasAmount = 550000;

    // Structs
    struct PostStruct {
        string postContent;
        uint256 postAttestCount;
        uint256 postDate;
        address postCreator;
        string postSector;
    }

    // Mappings
    mapping(uint256 => PostStruct) private idToPosts;
    mapping(address => uint256[]) private userToPostIds;

    // Events
    event PostCreated(
        uint256 postId,
        string postContent,
        uint256 postDate,
        address postCreator,
        string postSector
    );
    event InterchainGasPaymasterUpdated(
        address newInterchainGasPaymasterAddress
    );
    event MailboxUpdated(address newMailboxAddress);
    event CallDispatched(
        uint32 indexed destinationDomain,
        bytes32 indexed recipientAddress,
        bytes messageBody
    );
    event InterchainGasPaid(
        bytes32 indexed messageId,
        uint32 indexed destinationDomain,
        uint256 gasAmount,
        address indexed sender
    );

    // Constructor
    constructor(
        address _interchainGasPaymasterAddress,
        address _mailboxAddress
    ) {
        interchainGasPaymasterAddress = _interchainGasPaymasterAddress;
        mailboxAddress = _mailboxAddress;
    }

    // Create Post
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

        idToPosts[postId] = PostStruct({
            postContent: _postContent,
            postAttestCount: 0,
            postDate: _postDate,
            postCreator: msg.sender,
            postSector: _postSector
        });

        userToPostIds[msg.sender].push(postId);

        emit PostCreated(
            postId,
            _postContent,
            _postDate,
            msg.sender,
            _postSector
        );
    }

    // Change Gas Amount (consider adding onlyOwner)
    function changeGasAmount(uint256 _gasAmount) external {
        gasAmount = _gasAmount;
    }

    // Change Interchain Gas Paymaster Address (consider adding onlyOwner)
    function changeInterchainGasPaymasterAddress(address _newAddress) external {
        interchainGasPaymasterAddress = _newAddress;
        emit InterchainGasPaymasterUpdated(_newAddress);
    }

    // Change Mailbox Address (consider adding onlyOwner)
    function changeMailboxAddress(address _newAddress) external {
        mailboxAddress = _newAddress;
        emit MailboxUpdated(_newAddress);
    }

    // Send Interchain Call
    function sendInterchainCall(
        uint32 _destinationDomain,
        bytes32 _recipientAddress,
        bytes calldata _messageBody
    ) external payable {
        IMailbox mailbox = IMailbox(mailboxAddress);
        IInterchainGasPaymaster igp = IInterchainGasPaymaster(
            interchainGasPaymasterAddress
        );

        bytes32 messageId = mailbox.dispatch(
            _destinationDomain,
            _recipientAddress,
            _messageBody
        );
        emit CallDispatched(
            _destinationDomain,
            _recipientAddress,
            _messageBody
        );

        igp.payForGas{value: msg.value}(
            messageId,
            _destinationDomain,
            gasAmount,
            msg.sender
        );

        emit InterchainGasPaid(
            messageId,
            _destinationDomain,
            gasAmount,
            msg.sender
        );
    }

    // Get Post
    function getPost(uint256 postId) external view returns (PostStruct memory) {
        require(postId <= _postIds.current(), "Post does not exist");
        return idToPosts[postId];
    }

    // Get All Posts with Pagination
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

    // Get All Posts by User with Pagination
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

    // Get Total Number of Posts by a User
    function getTotalPostsByUser(address user) external view returns (uint256) {
        return userToPostIds[user].length;
    }

    // Get the Last Used Post ID
    function getLastPostId() external view returns (uint256) {
        return _postIds.current();
    }
}
