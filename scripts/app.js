var example = (function() {
    "use strict"; 

    Physijs.scripts.worker = 'scripts/physijs_worker.js';
    Physijs.scripts.ammo = 'ammo.js';

    var scene = new Physijs.Scene();
    var renderer = new THREE.WebGLRenderer();
    var light = new THREE.AmbientLight(0xffffff);
    var camera;
    var box, ground;

    function initScene() {
        scene.setGravity(new THREE.Vector3( 0, -50, 0 ));

        renderer.setSize (window.innerWidth, window.innerHeight );
        document.getElementById("wegl-container").appendChild(renderer.domElement);

        scene.add(light);

        camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 1, 1000);
        camera.position.set(80,200,200);
        camera.lookAt(scene.position);
        scene.add(camera);

        var boxMaterial = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({color: 0xFF0000}),
            0, // friction
            0.8 // bounciness
        );

        box = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15,15,15),
            boxMaterial
        );

        box.name = 'box';
        box.position.y = 90;
        box.rotation.z = 90;
        box.rotation.y = 50;

        scene.add(box);

        var groundMaterial = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({color: 0x008888}),
            0, // friction
            0 // bounciness
        );

        ground = new Physijs.BoxMesh(
            new THREE.CubeGeometry(150,5,150),
            groundMaterial, 
            0
        );

        ground.name = 'ground';
        ground.position.y = 25;
        scene.add(ground);

        render();
    }

    function render() {
        scene.simulate();
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    window.onload = initScene;

    return {
        scene: scene // for ease of debugging, it's good to have access.
    };

}());