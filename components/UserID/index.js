import React from 'react';
import { useEnsName } from 'wagmi'

function UserID({ ensName }) {
  const { data, isError, isLoading } = useEnsName({
    address: ensName,
  })

  if (isLoading) return <div className="p-2 bg-gray-200 rounded">Fetching name…</div>
  if (isError) return <div className="p-2 bg-red-500 text-white rounded">Error fetching name</div>
  
  return (
    <div className="p-2 bg-blue-500 text-white rounded">
      Profile Handle: {data}
    </div>
  )
}

export default UserID;
