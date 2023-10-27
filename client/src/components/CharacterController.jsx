import { Billboard, CameraControls, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { CapsuleCollider, RigidBody, vec3 } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import { Character } from "./AnimatedMan";
import ThirdPersonCharacterControls from "react-three-third-person";

export const CharacterController = (props) => {

    const handleMove = () => {

    }

    const handleStop = () => {

    }

    return <>
        <Character {...props} />
    </>

}


// const PlayerInfo = ({ state }) => {
//     const health = state.health;
//     const name = state.profile.name;
//     return (
//         <></>
//         // <Billboard position={[0, 2.5, 0}>
//         //     <Text position-y={0.36} fontSize={0.4}>
//         //         {name}
//         //         <meshBasicMaterial color={state.profile.color} />
//         //     </Text>
//         //     <mesh position-z={-0.1}>
//         //         <planeGeometry args={[1, 0.2]} />
//         //         <meshBasicMaterial color="black" transparent opacity={0.5} />
//         //     </mesh>
//         //     <mesh scale-x={health / 100} position-x={-0.5 * (1 - health / 100)}>
//         //         <planeGeometry args={[1, 0.2]} />
//         //         <meshBasicMaterial color="red" />
//         //     </mesh>
//         // </Billboard>
//     );
// };