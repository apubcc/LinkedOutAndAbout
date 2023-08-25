import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import jazzicon from '@metamask/jazzicon';
import { useEnsAvatar } from 'wagmi';

function ProfileFrame({ address, ensAvatar, size }) {
  const { data: ensData, isError: ensIsError, isLoading: ensIsLoading } = useEnsAvatar({ name: address });

  const iconRef = useRef();

  useEffect(() => {
    // Create or update the Jazzicon when the component mounts or the ENS data changes
    if (!ensData && !ensIsError && !ensIsLoading) {
      const iconSize = size || 40; // Default size is 40, or use the provided size prop
      const icon = jazzicon(iconSize, parseInt((address || '').slice(2, 10), 16));
      iconRef.current.innerHTML = ''; // Clear any previous icon
      iconRef.current.appendChild(icon);
    }
  }, [address, ensData, ensIsError, ensIsLoading, size]);

  if (ensIsLoading) return <div className={`w-${size} h-${size} bg-gray-200 flex items-center justify-center`}>Loading...</div>;

  if (ensIsError || (!ensAvatar && !ensData)) {
    return (
      <div
        className={`w-${size} h-${size} rounded-full bg-gray-300 flex items-center justify-center`}
        ref={iconRef}
      ></div>
    );
  }

  return (
    <div className={`w-${size} h-${size} rounded-full overflow-hidden`}>
      <div ref={iconRef}></div>
      {ensAvatar ? (
        <Image src={ensAvatar} alt="Profile Avatar" width={size} height={size} />
      ) : (
        <Image src={ensData} alt="Profile Avatar" width={size} height={size} />
      )}
    </div>
  );
}

export default ProfileFrame;
