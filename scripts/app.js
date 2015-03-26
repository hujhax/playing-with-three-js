var example = (function() {
    "use strict"; 

    Physijs.scripts.worker = 'scripts/physijs_worker.js';
    Physijs.scripts.ammo = 'ammo.js';

    var scene = new Physijs.Scene();
    var renderer = new THREE.WebGLRenderer();
    var light = new THREE.SpotLight(0xffffff, 1, 750, 0.8);
    light.position.set(20,50,100);
    var sidelight = new THREE.SpotLight(0xffffff, 1, 750, 0.8);
    sidelight.position.set(-200,250,-100);

    var camera;
    var box, ground;

    function initScene() {
        scene.setGravity(new THREE.Vector3( 0, -50, 0 ));

        renderer.setSize (window.innerWidth, window.innerHeight );
        document.getElementById("wegl-container").appendChild(renderer.domElement);

        scene.add(light);
        scene.add(sidelight);

        camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 1, 1000);
        camera.position.set(80,200,200);
        camera.lookAt(scene.position);
        scene.add(camera);
            

        var boxMaterial = Physijs.createMaterial(
            new THREE.MeshPhongMaterial({color: 0x0033FF, ambient: 0x00FF00, specular: 0x444444, shininess: 30}),
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

        box.addEventListener('collision', function(
            otherObject,
            relativeVelocity,
            relativeRotation,
            contactNormal) {
                if (otherObject.name === 'ground') {
                    box.material.color.setHex(Math.floor(Math.random()*16777215))
                }
        });
        var groundMaterial = Physijs.createMaterial(
            new THREE.MeshPhongMaterial({color: 0x008888, ambient: 0x00FF00, specular: 0x444444, shininess: 30}),
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

        // enable shadows
        renderer.shadowMapEnabled = true;
        light.castShadow = true;
        light.shadowDarkness = 0.5;
        sidelight.castShadow = true;
        sidelight.shadowDarkness = 0.5;
        box.castShadow = true;
        ground.receiveShadow = true;

        render();
    }

    function render() {
        scene.simulate();
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    function checkKey(e) {
        var up = 38;

        e = e || window.event;

        if (e.keyCode === up) {
            box.position.y = 90;
            box.rotation.z = Math.random()*2+1;
            box.__dirtyPosition = true;
            box.__dirtyRotation = true;
        }
    }


    window.onload = initScene;
    window.onkeydown = checkKey;

    return {
        scene: scene // for ease of debugging, it's good to have access.
    };

}());