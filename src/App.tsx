import { Loader, OrbitControls, Stats, useProgress } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import { Bloom, EffectComposer, SSAO } from '@react-three/postprocessing';
import { Suspense, useEffect } from 'react';
import { CubeTextureLoader } from 'three';
import {
  Box,
  Cylinder,
  Ground,
  Sphere
} from './components/Objects';

import back from './assets/skybox/back.webp';
import bottom from './assets/skybox/bottom.webp';
import front from './assets/skybox/front.webp';
import left from './assets/skybox/left.webp';
import right from './assets/skybox/right.webp';
import top from './assets/skybox/top.webp';

function SkyBox() {
	const { scene } = useThree();

	useEffect(() => {
		const loader = new CubeTextureLoader();
		const texture = loader.load([right, left, top, bottom, front, back]);

		scene.background = texture;
	}, [scene]);

	return null;
}

function Scene() {
	const { progress } = useProgress();

	// Динамическое отключение SSAO при низкой производительности
	const useSSAO = progress < 100;

	return (
		<Canvas
			shadows
			camera={{
				position: [0, 5, 10],
				fov: 60,
				near: 0.1,
				far: 1000,
			}}
		>
			<ambientLight intensity={0.4} />
			<directionalLight
				position={[5, 10, 5]}
				intensity={1}
				castShadow
				shadow-mapSize-width={512}
				shadow-mapSize-height={512}
			/>
			<Suspense fallback={<Loader />}>
				<SkyBox />
				<OrbitControls enableZoom={true} />
				<Box />
				<Sphere />
				<Cylinder />
				<Ground />
				<EffectComposer>
					<Bloom
						intensity={0.8} 
						luminanceThreshold={0.3}
						luminanceSmoothing={0.7}
					/>
					{useSSAO ? (
						<SSAO
							samples={32}
							radius={0.4}
							intensity={20}
							luminanceInfluence={0.5}
							distanceScaling={true}
							worldDistanceThreshold={0.5}
							worldDistanceFalloff={0.2}
							worldProximityThreshold={0.3}
							worldProximityFalloff={0.1}
						/>
					) : (
						(null as unknown as React.ReactElement)
					)}
				</EffectComposer>
			</Suspense>
		</Canvas>
	);
}

const App = () => {
	return (
		<div className='App'>
			<Scene />
			<Stats />
		</div>
	);
};

export default App;
