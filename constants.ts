//Define a set of constants such as target contract addresses to interact with, alongside schemas

// Defne the target contract addresses by network
export const contractAddresses = {
  421613: {
    // Arbitrum Goerli
    EAS: "0xaEF4103A04090071165F78D45D83A0C0782c2B2a",
    SchemaRegistry: "0x55D26f9ae0203EF95494AE4C170eD35f4Cf77797",
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
};
