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
        box.rotation.y += 0.01;
        box.rotation.z += 0.01;
        box.rotation.x += 0.01;
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    function checkKey(e) {
        var left = 37;
        var up = 38;
        var right = 39;
        var down = 40;
        var increment = 1;

        e = e || window.event;

        if (e.keyCode === up) {
            camera.position.z -= increment;
        }
        else if (e.keyCode === down) {
            camera.position.z += increment;
        }
        else if (e.keyCode === left) {
            camera.position.x -= increment;
        }
        else if (e.keyCode === right) {
            camera.position.x += increment;
        }
    }

    window.onload = initScene;
    window.onkeydown = checkKey;

    return {
        scene: scene // for ease of debugging, it's good to have access.
    };

}());