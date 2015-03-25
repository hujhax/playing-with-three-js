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
    var controls;
    var clock = new THREE.Clock();

    function initScene() {
        renderer.setSize (window.innerWidth, window.innerHeight );
        document.getElementById("webgl-container").appendChild(renderer.domElement);

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

        controls = new THREE.FlyControls(camera);
        controls.movementSpeed = 100;
        controls.domElement = document.getElementById("webgl-container");
        controls.rollSpeed = Math.PI / 24;

        render();
    }

    function render() {
        // var delta = clock.getDelta();
        // controls.update(delta);

        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    function onDocumentMouseDown(event) {
        if (event===undefined) event= window.event;

        var projector = new THREE.Projector();

        var mouseClickVector = new THREE.Vector3(
            (event.clientX / window.innerWidth) * 2 - 1,
            (event.clientY / window.innerHeight) * 2 + 1,
            0.5);

        mouseClickVector.unproject(camera);

        var raycaster = new THREE.Raycaster(camera.position, 
            mouseClickVector.sub(camera.position).normalize());

        var intersects = raycaster.intersectObjects([box]);

        if (intersects.length > 0) {
            intersects[0].object.material.specular.setHex(Math.random() * 0xffffff);
            alert("clicked!");
        }
    }

    window.onload = initScene;

    document.onclick= onDocumentMouseDown;

    return {
        scene: scene // for ease of debugging, it's good to have access.
    };

}());