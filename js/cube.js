/* Initialize global variables */
var camera, controls, scene, renderer;

init();
animate();

function init() {
	/* Create a scene object */
	scene = new THREE.Scene();
	/* Sets up the camera with parameters (field of view, aspect ratio, near, far) */ 
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
	/* Create a renderer object */
	renderer = new THREE.WebGLRenderer();
	/* Set the renderer size to the full window */
	renderer.setSize( window.innerWidth, window.innerHeight );
	/* Add the renderer element to the HTML document */
	document.body.appendChild(renderer.domElement);
	/* Create the trackball controls object */
	controls = new THREE.TrackballControls(camera);
	/* Add an event listener for when there is a change */
	controls.addEventListener('change', render);
	/* Cube dimensions */
	var cubeDim = 10;
	/* Size of each individual LED */
	var cubeSize = 1;
	/* Space between each LED */
	var cubeSpace = .3;
	/* Start drawing the cubes left of the origin rather than at the origin by shifting it */
	var shiftCube = (cubeDim*(cubeSize+cubeSpace) - cubeSpace)/2 - cubeSize/2;

	/* Define the geometry of the object as a cube with dimensions of cubeSize */
	var geometry = new THREE.BoxGeometry( cubeSize, cubeSize, cubeSize );
	/* Define the material of the object as well as color */
	var material = new THREE.MeshBasicMaterial( { color: 0x00ff00,
												  opacity: 0.1,
												  transparent: true
	 } );

	/* Draw the LED's in the x, y, z directions */
	for (var k = 0; k < cubeDim; k++) {
		for (var j = 0; j < cubeDim; j++) {
			for (var i = 0; i < cubeDim; i++) {
				var cube = new THREE.Mesh(geometry, material);
				/* Position of the LED in the x direction */
				cube.position.x = i*(cubeSize+cubeSpace) - shiftCube;
				/* Position of the LED in the y direction */
				cube.position.y = j*(cubeSize+cubeSpace) - shiftCube;
				/* Position of the LED in the z direction */
				cube.position.z = k*(cubeSize+cubeSpace) - shiftCube;
				/* Add the LED to the scene */
				scene.add(cube);
			}
		}
	}

	/* Position the camera away from the cube by twice the size of the cube */
	camera.position.z = 2*((cubeDim*(cubeSize+cubeSpace) - cubeSpace) - cubeSize/2);
}

function animate() {
	/* Makes sure that that the renderer pauses when user navigates to another tab */
	requestAnimationFrame(animate);
	/* Update the controls before rendering */
	controls.update();
}

/* Function that creates a loop which makes the renderer draw the scene 60 FPS */
function render() {
	/* Render the scene based on the position of the camera*/
	renderer.render(scene, camera);
}

render();


