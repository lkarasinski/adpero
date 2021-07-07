/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three';
import React, { useRef } from 'react';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { useFrame } from '@react-three/fiber';

const ANIMATION_SPEED = 0.001;

type GLTFResult = GLTF & {
	nodes: {
		Icosphere_1: THREE.Mesh;
		Icosphere_2: THREE.Mesh;
		Icosphere_3: THREE.Mesh;
		Icosphere001: THREE.Mesh;
	};
	materials: {
		['tectonic plates']: THREE.MeshStandardMaterial;
		Ocean: THREE.MeshStandardMaterial;
		Poles: THREE.MeshStandardMaterial;
		Coluds: THREE.MeshStandardMaterial;
	};
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Model(props: JSX.IntrinsicElements['group']): any {
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const earth = useRef<THREE.Group>(null!);
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const light = useRef<THREE.DirectionalLight>(null!);
	const { nodes, materials } = useGLTF('/lowpoly_earth.glb') as GLTFResult;
	useFrame(() => (earth.current.rotation.y += ANIMATION_SPEED));
	return (
		<>
			<group {...props} dispose={null}>
				<group
					ref={earth}
					position={[0, 0, 0]}
					scale={4.5}
					rotation={[0, 0, 0, 'XYZ']}
				>
					<mesh
						geometry={nodes.Icosphere_1.geometry}
						material={materials['tectonic plates']}
					/>
					<mesh
						geometry={nodes.Icosphere_2.geometry}
						material={materials.Ocean}
					/>
					<mesh
						geometry={nodes.Icosphere_3.geometry}
						material={materials.Poles}
					/>
				</group>
				{/* MOON */}
				<directionalLight
					ref={light}
					color={0xffffff}
					intensity={0.5}
					position={[0, 0, -10]}
				/>
				{/* SUN */}
				<directionalLight
					ref={light}
					color={0xffffff}
					intensity={1.5}
					position={[0, 0, 10]}
				/>
				<ambientLight color={0xffffff} intensity={0.25} />
				<OrbitControls
					minPolarAngle={Math.PI / 2}
					maxPolarAngle={Math.PI / 2}
					enableDamping
					enableZoom={false}
					enablePan={false}
				/>
			</group>
		</>
	);
}

useGLTF.preload('/lowpoly_earth.glb');