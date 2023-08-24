import React from 'react';
import { useRouter } from "next/router";


const BackArrow = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/index.tsx"); // Replace "/index.tsx" with the actual route of your index page
  };

}

export default BackArrow;