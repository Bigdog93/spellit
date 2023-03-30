/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 Furball.glb -T --shadows
Author: tamminen (https://sketchfab.com/tamminen)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/furball-721f04cb8f4f42e9bb8b58981bef5aa4
Title: Furball
*/

import { useGLTF } from '@react-three/drei'


export default function Furball(props) {
  const { nodes, materials } = useGLTF('./homeglb/Furball.glb')
	console.log(nodes)
  return (
    <group {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.Object_4.geometry} material={materials['Scene_-_Root']} />
      <mesh castShadow receiveShadow geometry={nodes.Object_5.geometry} material={materials['Scene_-_Root']} />
      <mesh castShadow receiveShadow geometry={nodes.Object_6.geometry} material={materials['Scene_-_Root']} />
    </group>
  )
}

