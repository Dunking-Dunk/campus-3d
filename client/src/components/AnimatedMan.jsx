import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame, useGraph } from '@react-three/fiber'
import { SkeletonUtils } from 'three-stdlib'

const MOVEMENT_SPEED = 0.032

export function Character({
  hairColor = 'green',
  topColor = 'red',
  bottomColor = 'red',
  ...props
}) {
  const position = useMemo(() => props.position, [])

  const group = useRef()
  const { scene, materials, animations } = useGLTF('./models/HoodieCharacter.glb')

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes } = useGraph(clone)

  const { actions } = useAnimations(animations, group)
  const [animation, setAnimation] = useState('CharacterArmature|Idle')

  useEffect(() => {
    actions[animation].reset().fadeIn(0.32).play()
    return () => actions[animation]?.fadeOut(0.32)
  }, [animation])

  useFrame(() => {
    if (group.current.position.distanceTo(props.position) > 0.1) {
      const direction = group.current.position.clone().sub(props.position).normalize().multiplyScalar(MOVEMENT_SPEED)
      group.current.position.sub(direction)
      group.current.lookAt(props.position)
      setAnimation('CharacterArmature|Run')
    } else {
      setAnimation('CharacterArmature|Idle')
    }
  })

  return (
    <group ref={group} {...props} position={position} dispose={null}>
      <group name="Root_Scene">
        <group name="RootNode">
          <group name="CharacterArmature" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <primitive object={nodes.Root} />
          </group>
          <group name="Casual_Feet" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <skinnedMesh name="Casual_Feet_1" geometry={nodes.Casual_Feet_1.geometry} material={materials.White} skeleton={nodes.Casual_Feet_1.skeleton} />
            <skinnedMesh name="Casual_Feet_2" geometry={nodes.Casual_Feet_2.geometry} material={materials.Purple} skeleton={nodes.Casual_Feet_2.skeleton} />
          </group>
          <group name="Casual_Legs" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <skinnedMesh name="Casual_Legs_1" geometry={nodes.Casual_Legs_1.geometry} material={materials.Skin} skeleton={nodes.Casual_Legs_1.skeleton} />
            <skinnedMesh name="Casual_Legs_2" geometry={nodes.Casual_Legs_2.geometry} material={materials.LightBlue} skeleton={nodes.Casual_Legs_2.skeleton} />
          </group>
          <group name="Casual_Head" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <skinnedMesh name="Casual_Head_1" geometry={nodes.Casual_Head_1.geometry} material={materials.Skin} skeleton={nodes.Casual_Head_1.skeleton} />
            <skinnedMesh name="Casual_Head_2" geometry={nodes.Casual_Head_2.geometry} material={materials.Eyebrows} skeleton={nodes.Casual_Head_2.skeleton} />
            <skinnedMesh name="Casual_Head_3" geometry={nodes.Casual_Head_3.geometry} material={materials.Eye} skeleton={nodes.Casual_Head_3.skeleton} />
            <skinnedMesh name="Casual_Head_4" geometry={nodes.Casual_Head_4.geometry} material={materials.Hair} skeleton={nodes.Casual_Head_4.skeleton} />
          </group>
          <group name="Casual_Body" position={[0, 0.007, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <skinnedMesh name="Casual_Body_1" geometry={nodes.Casual_Body_1.geometry} material={materials.Purple} skeleton={nodes.Casual_Body_1.skeleton} />
            <skinnedMesh name="Casual_Body_2" geometry={nodes.Casual_Body_2.geometry} material={materials.Skin} skeleton={nodes.Casual_Body_2.skeleton} />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('./models/HoodieCharacter.glb')
