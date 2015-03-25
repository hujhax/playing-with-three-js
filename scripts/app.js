var example = (function() {
    "use strict"; 
    var scene = new THREE.Scene();
    var renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer();
    var light = new THREE.SpotLight(0xffffff, 1, 150, 0.2);
    light.position.set(0,0,90);
    var sideLight = new THREE.SpotLight(0xffffff, 1, 150, 0.2);
    sideLight.position.set(0,90,0);
    var ambientLight = new THREE.AmbientLight(0xaaaa44);
    var camera;
    var box;

    function initScene() {
        renderer.setSize (window.innerWidth, window.innerHeight );
        document.getElementById("wegl-container").appendChild(renderer.domElement);

        scene.add(light);
        scene.add(sideLight);
        scene.add(ambientLight);

        camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 1, 1000);

        camera.position.z = 100;
        scene.add(camera);

        box = new THREE.Mesh(
            new THREE.BoxGeometry(20,20,20),
            new THREE.MeshPhongMaterial({
                map: THREE.ImageUtils.loadTexture('content/lattice.png'),
                specular: 0xdddddd,
                shininess: 10,
                transparent: true,
                side: THREE.DoubleSide
            })
        );

        box.name="box";

        scene.add(box);

        render();
    }

    function render() {
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    window.onload = initScene;

    return {
        scene: scene // for ease of debugging, it's good to have access.
    };

}());