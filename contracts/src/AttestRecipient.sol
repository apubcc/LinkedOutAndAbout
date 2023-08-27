// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity >=0.8.0;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

import {IMessageRecipient} from "./interfaces/IMessageRecipient.sol";
import {IInterchainSecurityModule, ISpecifiesInterchainSecurityModule} from "./interfaces/IInterchainSecurityModule.sol";

interface IEAS {
    /// @notice A struct representing the arguments of the attestation request.
    struct AttestationRequestData {
        address recipient; // The recipient of the attestation.
        uint64 expirationTime; // The time when the attestation expires (Unix timestamp).
        bool revocable; // Whether the attestation is revocable.
        bytes32 refUID; // The UID of the related attestation.
        bytes data; // Custom attestation data.
        uint256 value; // An explicit ETH amount to send to the resolver. This is important to prevent accidental user errors.
    }

    /// @notice A struct representing the full arguments of the attestation request.
    struct AttestationRequest {
        bytes32 schema; // The unique identifier of the schema.
        AttestationRequestData data; // The arguments of the attestation request.
    }

    function attest(
        AttestationRequest calldata request
    ) external payable returns (bytes32);
}

contract AttestRecipient is
    Ownable,
    IMessageRecipient,
    ISpecifiesInterchainSecurityModule,
    IEAS
{
    IEAS public eas;
    IInterchainSecurityModule public interchainSecurityModule;
    bytes32 public lastSender;
    bytes public lastData;

    address public lastCaller;
    AttestationRequest public lastAttestationRequest;

    constructor(address _eas) {
        eas = IEAS(_eas);
    }

    event ReceivedMessage(
        uint32 indexed origin,
        bytes32 indexed sender,
        string message
    );

    event ReceivedEASRequest(
        address indexed caller,
        AttestationRequest attestationRequest
    );

    function handle(
        uint32 _origin,
        bytes32 _sender,
        bytes calldata _data
    ) external virtual override {
        emit ReceivedMessage(_origin, _sender, string(_data));
        lastSender = _sender;
        lastData = _data;
    }

    function attest(
        AttestationRequest memory request
    ) public payable override returns (bytes32) {
        emit ReceivedEASRequest(msg.sender, request);
        lastCaller = msg.sender;
        lastAttestationRequest = request;
        return eas.attest{value: msg.value}(request);
    }

    function setInterchainSecurityModule(address _ism) external onlyOwner {
        interchainSecurityModule = IInterchainSecurityModule(_ism);
    }

    function setEAS(address _eas) external onlyOwner {
        eas = IEAS(_eas);
    }
}
