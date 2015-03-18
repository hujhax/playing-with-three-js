var example = (function() {
    "use strict"; 
    var scene = new THREE.Scene();
    var renderer = new THREE.WebGLRenderer();
    var light = new THREE.AmbientLight(0xffffff);
    var camera;
    var box;

    function initScene() {
        renderer.setSize (window.innerWidth, window.innerHeight );
        document.getElementById("wegl-container").appendChild(renderer.domElement);

        scene.add(light);

        camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 1, 1000);

        camera.position.z = 100;
        scene.add(camera);
    }
}());