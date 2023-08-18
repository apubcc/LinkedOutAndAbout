import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const { nodes, materials } = useGLTF('/ethlogo-transformed.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Ethereum_3D_logoObject_0_lambert2_0.geometry} material={materials.lambert2} rotation={[-Math.PI / 2, 0, 0]} scale={[0.004, 0.002, 0.004]} />
    </group>
  )
}

useGLTF.preload('/ethlogo-transformed.glb')
