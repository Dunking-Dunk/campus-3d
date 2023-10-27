import * as Three from 'three'
import { useEffect, useRef } from 'react';
import { Environment, OrbitControls, useCursor } from "@react-three/drei";
import { CharacterController } from './CharacterController';
import { useAtom } from "jotai";
import { charactersAtom, socket } from "./SocketManager";
import { useState } from "react";

export const Experience = () => {
  const [characters] = useAtom(charactersAtom)
  const [onFloor, setOnFloor] = useState(false)

  useCursor(onFloor)

  return (
    <>
      <ambientLight intensity={1} />
      <OrbitControls />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]} onClick={(e) => socket.emit("move", [e.point.x, 0, e.point.z])} onPointerEnter={() => setOnFloor(true)} onPointerLeave={() => setOnFloor(false)}>
        <planeBufferGeometry args={[10, 10, 1]} />
        <meshStandardMaterial color='#f0f0f0' />
      </mesh>

      {characters.map((character) => {
        return <CharacterController key={character.id} topColor={character.topColor} hairColor={character.hairColor} bottomColor={character.bottomColor} position={new Three.Vector3(character.position[0], character.position[1], character.position[2])} />
      })}
    </>
  );
};
