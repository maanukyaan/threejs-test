import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber'; // Аналог requestAnimationFrame в контексте React и Three.js
import { useRef, useState } from 'react';
import { Mesh } from 'three';

function Box() {
	const [boxColor, setBoxColor] = useState('orange');
	const handleClick = () =>
		setBoxColor(boxColor === 'orange' ? 'red' : 'orange');
	const [hovered, setHovered] = useState(false);
	const ref = useRef<Mesh>(null);

	useFrame(() => {
		ref.current!.rotation.x += 0.01;
		ref.current!.rotation.y += 0.01;
	});

	return (
		<mesh
			ref={ref}
			position={[-2, 1, 0]}
			castShadow
			receiveShadow
			onClick={handleClick}
			onPointerOver={() => setHovered(true)}
			onPointerOut={() => setHovered(false)}
		>
			<boxGeometry args={[1, 1, 1]} />
			<meshPhongMaterial color={boxColor} />
			{hovered && (
				<Html position={[0, 0, 0]}>
					<b style={{ color: '#fff', fontSize: 23, whiteSpace: 'nowrap' }}>
						This is box! <br />
						Color: {boxColor}
					</b>
				</Html>
			)}
		</mesh>
	);
}

function Sphere() {
	const [sphereColor, setSphereColor] = useState('blue');
	const [hovered, setHovered] = useState(false);

	const handleClick = () => {
		setSphereColor(sphereColor === 'blue' ? 'aqua' : 'blue');
	};

	return (
		<mesh
			position={[0, 1, 0]}
			castShadow
			receiveShadow
			onClick={handleClick}
			onPointerOver={() => setHovered(true)}
			onPointerOut={() => setHovered(false)}
		>
			<sphereGeometry args={[0.75, 32, 32]} />
			<meshLambertMaterial color={sphereColor} />
			{hovered && (
				<Html position={[0, 1, 0]} color='#fff'>
					<b style={{ color: '#fff', fontSize: 23, whiteSpace: 'nowrap' }}>
						This is sphere! <br />
						Color: {sphereColor}
					</b>
				</Html>
			)}
		</mesh>
	);
}

function Cylinder() {
	const [cylinderColor, setCylinderColor] = useState('lime');
	const [hovered, setHovered] = useState(false);

	const handleClick = () => {
		setCylinderColor(cylinderColor === 'lime' ? 'violet' : 'lime');
	};

	return (
		<mesh
			position={[2, 1, 0]}
			castShadow
			receiveShadow
			onClick={handleClick}
			onPointerOver={() => setHovered(true)}
			onPointerOut={() => setHovered(false)}
		>
			<cylinderGeometry args={[0.5, 0.5, 1, 32]} />
			<meshStandardMaterial color={cylinderColor} />
			{hovered && (
				<Html position={[0, 1, 0]}>
					<b style={{ color: '#fff', fontSize: 23, whiteSpace: 'nowrap' }}>
						This is cylinder! <br />
						Color: {cylinderColor}
					</b>
				</Html>
			)}
		</mesh>
	);
}

function Ground() {
	return (
		<mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
			<planeGeometry args={[20, 20]} />
			<meshStandardMaterial color='#f1f1f1' />
		</mesh>
	);
}

export { Box, Cylinder, Ground, Sphere };

