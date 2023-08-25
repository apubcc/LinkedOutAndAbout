//Define a set of constants such as target contract addresses to interact with, alongside schemas

// Defne the target contract addresses by network
export const contractAddresses = {
  421613: {
    // Arbitrum Goerli
    EAS: {
      contractAddress: "0xaEF4103A04090071165F78D45D83A0C0782c2B2a",
    },
    SchemaRegistry: {
      contractAddress: "0x55D26f9ae0203EF95494AE4C170eD35f4Cf77797",
    },
    Post: {
      contractAddress: "0x4eE36Ac14D03445FC0D21C52EF06F7780c9981e3",
      abi: [
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "postId",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "postAttestCount",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "address",
              name: "postAttester",
              type: "address",
            },
          ],
          name: "PostAttestCountUpdated",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "postId",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "string",
              name: "postContent",
              type: "string",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "postDate",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "address",
              name: "postCreator",
              type: "address",
            },
            {
              indexed: false,
              internalType: "string",
              name: "postSector",
              type: "string",
            },
          ],
          name: "PostCreated",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "newSectorResolverAddress",
              type: "address",
            },
          ],
          name: "SectorResolverUpdated",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_postContent",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "_postDate",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "_postSector",
              type: "string",
            },
          ],
          name: "createPost",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "start",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "end",
              type: "uint256",
            },
          ],
          name: "getAllPosts",
          outputs: [
            {
              components: [
                {
                  internalType: "string",
                  name: "postContent",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "postAttestCount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "postDate",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "postCreator",
                  type: "address",
                },
                {
                  internalType: "string",
                  name: "postSector",
                  type: "string",
                },
              ],
              internalType: "struct Post.PostStruct[]",
              name: "",
              type: "tuple[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "user",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "start",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "end",
              type: "uint256",
            },
          ],
          name: "getAllPostsByUser",
          outputs: [
            {
              components: [
                {
                  internalType: "string",
                  name: "postContent",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "postAttestCount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "postDate",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "postCreator",
                  type: "address",
                },
                {
                  internalType: "string",
                  name: "postSector",
                  type: "string",
                },
              ],
              internalType: "struct Post.PostStruct[]",
              name: "",
              type: "tuple[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getLastPostId",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "postId",
              type: "uint256",
            },
          ],
          name: "getPost",
          outputs: [
            {
              components: [
                {
                  internalType: "string",
                  name: "postContent",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "postAttestCount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "postDate",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "postCreator",
                  type: "address",
                },
                {
                  internalType: "string",
                  name: "postSector",
                  type: "string",
                },
              ],
              internalType: "struct Post.PostStruct",
              name: "",
              type: "tuple",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "postId",
              type: "uint256",
            },
          ],
          name: "getPostSector",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "user",
              type: "address",
            },
          ],
          name: "getTotalPostsByUser",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "sectorResolverAddress",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "postId",
              type: "uint256",
            },
          ],
          name: "updateAttestCount",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_sectorResolverAddress",
              type: "address",
            },
          ],
          name: "updateSectorResolverAddress",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
    },
    SectorResolver: {
      contractAddress: "0x9FC32F730CcD03AFd7E3775F05B8b4a1174522d5",
    },
  },
};

// Define the attestation schemas created
export const schemas = {
  metIRL: {
    schemaUID:
      "0xc59265615401143689cbfe73046a922c975c99d97e4c248070435b1104b2dea7",
    type: "bool",
  },
  isTrue: {
    schemaUID:
      "0x4eb603f49d68888d7f8b1fadd351b35a252f287ba465408ceb2b1e1e1efd90d5",
    type: "bool",
  },
  attestPost: {
    schemaUID:
      "0xbeec0a4053367f404ae11d8025ed30e1e20716134289ed2f2680a4e9fa083a00",
    postId: {
      type: "uint256",
      name: "postId",
    },
    attesterSector: {
      type: "string",
      name: "attesterSector",
    },
  },
  attestProfile: {
    schemaUID:
      "0x9926ce3715bb4844b2b26553f2b1ffcf5ef7d5006ca2360ed13056971e70f331",
    isCredible: {
      type: "bool",
      name: "isCredible",
    },
  },
};
