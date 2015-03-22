var example = (function() {
    "use strict"; 
    var scene = new THREE.Scene();
    var renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer();
    var light = new THREE.SpotLight(0xffffff, 1, 150, 0.2);
    light.position.set(0,0,90);
    var sidelight = new THREE.SpotLight(0xffffff, 1, 150, 0.2);
    sidelight.position.set(0,90,0);
    var camera;
    var box;

    function initScene() {
        renderer.setSize (window.innerWidth, window.innerHeight );
        document.getElementById("wegl-container").appendChild(renderer.domElement);

        scene.add(light);
        scene.add(sidelight);

        camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 1, 1000);

        camera.position.z = 100;
        scene.add(camera);

        box = new THREE.Mesh(
            new THREE.BoxGeometry(20,20,20),
            new THREE.MeshPhongMaterial({color: 0x0033FF, ambient: 0x00FF00, specular: 0x444444, shininess: 30})
        );

        box.name="box";

        scene.add(box);

        render();
    }

    function render() {
        box.rotation.y += 0.01;
        box.rotation.z += 0.01;
        box.rotation.x += 0.01;
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    window.onload = initScene;

    return {
        scene: scene // for ease of debugging, it's good to have access.
    };

}());