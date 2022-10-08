import { useEffect } from 'react';

import * as THREE from 'three';

export default function Canvas({ cardFront, cardBack }) {
	const cardTexture = new THREE.TextureLoader().load(cardFront);
	const cardReverseTexture = new THREE.TextureLoader().load(cardBack);

	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(25, window.innerWidth - 150 / window.innerHeight - 250, 0.1, 5000);

	var renderer;
	var rotate = true;

	useEffect(() => {
		buildCanvas();
	}, [cardFront, cardBack]);

	// Handle Window Resize
	function onWindowsResize() {
		let width = window.innerWidth - 150;
		let height = window.innerHeight - 250;

		if (camera) {
			camera.aspect = width / height;
			camera.updateProjectionMatrix();
		}

		if (renderer) {
			renderer.setSize(width, height);
		}
	}
	window.addEventListener('resize', onWindowsResize);

	// Stop card rotation when clicked or touched.
	window.addEventListener('mousedown', () => (rotate = false));
	window.addEventListener('touchstart', () => (rotate = false));

	window.addEventListener('mouseup', () => (rotate = true));
	window.addEventListener('touchend', () => (rotate = true));

	function createCard(texture, side) {
		const geometry = new THREE.PlaneGeometry(50, 117.5);
		const material = new THREE.MeshBasicMaterial({
			side: side,
			map: texture,
		});

		const plane = new THREE.Mesh(geometry, material);
		scene.add(plane);

		return plane;
	}

	function addLight() {
		const pointLight = new THREE.PointLight(0xffffff);
		pointLight.position.set(0, 85, 20);

		const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
		scene.add(pointLight, ambientLight);
	}

	function buildCanvas() {
		renderer = new THREE.WebGLRenderer({
			alpha: true,
			canvas: document.querySelector('#bg'),
		});

		renderer.setPixelRatio(window.devicePixelRatio);
		onWindowsResize();

		camera.position.setZ(300);

		const card1 = createCard(cardTexture, THREE.FrontSide);
		const card2 = createCard(cardReverseTexture, THREE.BackSide);

		// addLight();

		function animate(time) {
			time *= 0.001;

			const canvas = renderer.domElement;
			camera.aspect = canvas.clientWidth / canvas.clientHeight;
			camera.updateProjectionMatrix();

			requestAnimationFrame(animate);

			if (card1 && card2 && rotate) {
				const yRotation = 0.02;

				card1.rotation.y += yRotation;
				card2.rotation.y += yRotation;
			}

			renderer.render(scene, camera);
		}
		animate();
	}

	return <canvas id="bg"></canvas>;
}
