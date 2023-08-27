import { useFrame } from "@react-three/fiber";
import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

function EthLogo(props) {
    const group = React.useRef();
    const { nodes, materials, animations } = useGLTF('/scene.gltf');
    const { actions } = useAnimations(animations, group);
  
    //set for rotation
    const [rotation, setRotation] = React.useState(0);
  
    useFrame(() => {
      setRotation(oldRotation => oldRotation + 0.01);
    });
  
    return React.createElement(
      'group',
      {
        ref: group,
        ...props,
        dispose: null,
        rotation: [0, rotation, 0]
      },
      React.createElement(
        'group',
        { name: "Sketchfab_Scene" },
        React.createElement(
          'group',
          { name: "Sketchfab_model", rotation: [-Math.PI / 2, 0, 0], scale: 1.107 },
          React.createElement(
            'group',
            { name: "161ee2e266e94c7791940d78a5a83d04fbx", rotation: [Math.PI / 2, 0, 0], scale: 0.01 },
            React.createElement(
              'group',
              { name: "Object_2" },
              React.createElement(
                'group',
                { name: "RootNode" },
                React.createElement(
                  'group',
                  { name: "eth", rotation: [-Math.PI, -1.556, -Math.PI], scale: [1, 1, 1.145] },
                  React.createElement(
                    'group',
                    { name: "Pyramid_3", position: [0.217, 73.807, 0.929], rotation: [0, Math.PI / 4, 0] },
                    React.createElement(
                      'mesh',
                      { name: "Pyramid_3_lambert3_0", geometry: nodes.Pyramid_3_lambert3_0.geometry, material: materials.lambert3 }
                    ),
                    React.createElement(
                      'mesh',
                      { name: "Pyramid_3_lambert4_0", geometry: nodes.Pyramid_3_lambert4_0.geometry, material: materials.lambert4 }
                    ),
                    React.createElement(
                      'mesh',
                      { name: "Pyramid_3_lambert2_0", geometry: nodes.Pyramid_3_lambert2_0.geometry, material: materials.lambert2 }
                    )
                  ),
                  React.createElement(
                    'group',
                    { name: "Pyramid_1", position: [-0.108, -36.302, 32.916], rotation: [-Math.PI / 2, 0, -Math.PI] },
                    React.createElement('group', { name: "transform1" })
                  ),
                  React.createElement(
                    'group',
                    { name: "Pyramid_2", position: [-0.108, -36.302, -33.845], rotation: [-Math.PI / 2, 0, 0] },
                    React.createElement('group', { name: "transform2" })
                  )
                ),
                React.createElement(
                  'group',
                  { name: "Pyramid" },
                  React.createElement(
                    'mesh',
                    { name: "Pyramid_Default_Material_0", geometry: nodes.Pyramid_Default_Material_0.geometry, material: materials.Default_Material }
                  ),
                  React.createElement(
                    'mesh',
                    { name: "Pyramid_lambert4_0", geometry: nodes.Pyramid_lambert4_0.geometry, material: materials.lambert4 }
                  ),
                  React.createElement(
                    'mesh',
                    { name: "Pyramid_lambert3_0", geometry: nodes.Pyramid_lambert3_0.geometry, material: materials.lambert3 }
                  )
                )
              )
            )
          )
        )
      )
    );
  }

  export default EthLogo;