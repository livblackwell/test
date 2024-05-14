// Define variables
let scene, camera, renderer, controls, dodecahedronCenter;

// Initialize the scene, camera, and renderer
function init() {
    console.log("init() called");
    // Create the scene
    scene = new THREE.Scene();

    // Create and position the camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 30); // Adjusted camera position

    // Create the renderer and set its size
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('container').appendChild(renderer.domElement);

    // Add orbit controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI / 2;

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
    scene.add(ambientLight);

    // Load the background texture
    var backgroundTexture = new THREE.TextureLoader().load('backgroundimage.jpg');

    // Create the sphere geometry for the skybox
    var sphereGeometry = new THREE.SphereGeometry(100, 32, 32); // Large radius to encompass the scene

    // Reverse the normals to invert the sphere
    sphereGeometry.scale(-1, 1, 1);

    // Create the material with the background texture
    var skyboxMaterial = new THREE.MeshBasicMaterial({ map: backgroundTexture });

    // Create the skybox mesh
    var skybox = new THREE.Mesh(sphereGeometry, skyboxMaterial);

    // Add the skybox to the scene
    scene.add(skybox);

    // Load images and create textures for the dodecahedron faces
    var imageUrls = [
        "final images/finalimage 1.JPG",
        "final images/finalimage 2.JPG",
        "final images/finalimage 3.JPG",
        "final images/finalimage 4.JPG",
        "final images/finalimage 5.JPG",
        "final images/finalimage 6.JPG",
        "final images/finalimage 7.JPG",
        "final images/finalimage 8.JPG",
        "final images/finalimage 9.JPG",
        "final images/finalimage 10.JPG",
        "final images/finalimage 11.JPG",
        "final images/finalimage 12.JPG"
    ];

    // Create the dodecahedron geometry
    const dodecahedronGeometry = new THREE.DodecahedronGeometry(10);
    console.log("Dodecahedron geometry created successfully.");

    // Create 12 meshes with individual materials for each face
    for (var i = 0; i < 12; i++) {
        // Load texture
        var texture = new THREE.TextureLoader().load(imageUrls[i]);

        // Create material with texture
        var material = new THREE.MeshBasicMaterial({ map: texture });

        // Create mesh with material
        var dodecahedron = new THREE.Mesh(dodecahedronGeometry, material);

        // Rotate the mesh to align with the face
        var angle = (i * Math.PI * 2) / 12; // Calculate angle for each face
        dodecahedron.position.x = Math.cos(angle) * 15; // Adjust position based on dodecahedron radius
        dodecahedron.position.y = Math.sin(angle) * 15; // Adjust position based on dodecahedron radius
        dodecahedron.position.z = 0; // Keep the dodecahedron at the center of the scene
        dodecahedron.lookAt(new THREE.Vector3()); // Look at the center of the scene

        scene.add(dodecahedron);

        // Calculate the center of the dodecahedron
        dodecahedronCenter = new THREE.Vector3();
        dodecahedron.getWorldPosition(dodecahedronCenter);
    }

    // Set orbit control target to the center of the dodecahedron
    controls.target.copy(dodecahedronCenter);
}

// Function to render the scene
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Update orbit controls
    renderer.render(scene, camera);
}

// Call the init function to set everything up
init();
animate(); // Call animate function to start rendering loop
