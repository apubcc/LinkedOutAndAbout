import React from 'react';
import { useEnsAvatar } from 'wagmi';

function ProfileFrame({ ensName }) {
  const { data, isError, isLoading } = useEnsAvatar({
    name: ensName,
  });

  // Styles for the circular avatar container
  const avatarStyles = {
    borderRadius: '50%',   // Makes it circular
    width: '100px',        // You can adjust this
    height: '100px',       // You can adjust this
    overflow: 'hidden',    // Ensures the image stays within the circle
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  if (isLoading) return <div>Fetching avatar…</div>;
  if (isError) return <div>Error fetching avatar</div>;

  // Assuming the `data` contains the URL of the avatar image
  return (
    <div style={avatarStyles}>
      <img src={data} alt="ENS Avatar" />
    </div>
  );
}

export default ProfileFrame;
