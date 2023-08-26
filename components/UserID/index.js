import React from 'react';
import { useEnsResolver } from "wagmi";

const UserID = ({ walletAddress }) => {
  const { data: ensResolverData, loading: ensLoading } = useEnsResolver(walletAddress);

  const displayAddressOrEns = () => {
    if (ensLoading) return "Resolving ENS...";

    const userId = ensResolverData?.ensName || walletAddress || "Address not found";
    return (
      <div>
        <strong>User ID:</strong> {userId}
      </div>
    );
  };

  return (
    <div className="text-lg text-gray-700">
      <div style={{ marginTop: '0.5rem' }}></div>
      {displayAddressOrEns()}
      {/* Add the "Level" component */}
      <p style={{ fontSize: '0.8rem' }}>
      </p>
    </div>
  );
};

export default UserID;
