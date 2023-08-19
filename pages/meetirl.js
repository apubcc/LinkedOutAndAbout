import { EAS, Offchain, SchemaEncoder,SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from 'ethers';
import dotenv from 'dotenv';
dotenv.config();

export const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26

// Initialize the sdk with the address of the EAS Schema contract address
const eas = new EAS(EASContractAddress);


// // include provider from alchemy
const providerUrl = "https://arb-mainnet.g.alchemy.com/v2/GsuESOViQIC_6Pjpxrfc39lUPXfgQfhh";

const provider = new ethers.providers.JsonRpcProvider(providerUrl)

// const provider = ethers.providers.getDefaultProvider(
//     "sepolia"
//   );

//   console.log(provider);

eas.connect(provider);

// const offchain = await eas.getOffchain();
// console.log(offchain);

// // Initialize SchemaEncoder with the schema string
// const schemaEncoder = new SchemaEncoder("uint256 eventId, uint8 voteIndex");
// const encodedData = schemaEncoder.encodeData([
//   { name: "eventId", value: 1, type: "uint256" },
//   { name: "voteIndex", value: 1, type: "uint8" },
// ]);

// // Signer is an ethers.js Signer instance
// const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// const offchainAttestation = await offchain.signOffchainAttestation({
//   recipient: '0xFD50b031E778fAb33DfD2Fc3Ca66a1EeF0652165',
//   // Unix timestamp of when attestation expires. (0 for no expiration)
//   expirationTime: 0,
//   // Unix timestamp of current time
//   time: 1671219636,
//   revocable: true, // Be aware that if your schema is not revocable, this MUST be false
//   version: 1,
//   nonce: 0,
//   schema: "0xb16fa048b0d597f5a821747eba64efa4762ee5143e9a80600d0005386edfc995",
//   refUID: '0x0000000000000000000000000000000000000000000000000000000000000000',
//   data: encodedData,
// }, signer);

// console.log(offchainAttestation);

const uid = "0xcdcaede4f1a6b40f144fdc7cd64af00cbf66e31b830b4f9aafd64543f0bcc970";

const attestation = await eas.getAttestation(uid);

console.log(attestation);