import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const Particle = () => {
	const particlesInit = useCallback(async (engine) => {
		await loadFull(engine);
	}, []);

	return (
		<Particles
			id='tsparticles'
			init={particlesInit}
			options={{
				fpsLimit: 120,
				interactivity: {
					events: {
						onClick: {
							enable: false,
							mode: 'push',
						},
						onHover: {
							enable: false,
							mode: 'repulse',
						},
						resize: true,
					},
					modes: {
						push: {
							quantity: 4,
						},
						repulse: {
							distance: 200,
							duration: 0.4,
						},
					},
				},
				particles: {
					color: {
						value: '#32c8c8',
					},
					move: {
						direction: 'none',
						enable: true,
						outModes: {
							default: 'bounce',
						},
						random: false,
						speed: 4,
						straight: false,
					},
					number: {
						density: {
							enable: true,
							area: 800,
						},
						value: 10,
					},
					opacity: {
						value: 0.3,
					},
					shape: {
						type: 'circle',
					},
					size: {
						value: 50,
					},
				},
				detectRetina: true,
			}}
		/>
	);
};

export default Particle;
