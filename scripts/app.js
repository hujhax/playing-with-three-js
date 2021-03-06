var example = (function() {
    "use strict"; 
    var scene = new THREE.Scene();
    var renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer();
    var light = new THREE.AmbientLight(0xffffff);
    var camera;
    var testTriangle;
    var monster;

    function initScene() {
        renderer.setSize (window.innerWidth, window.innerHeight );
        document.getElementById("wegl-container").appendChild(renderer.domElement);

        scene.add(light);

        camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 1, 1000);

        camera.position.z = 150;
        scene.add(camera);

        // var triangleMaterial = new THREE.MeshBasicMaterial({
        //     vertexColors: THREE.VertexColors,
        //     side: THREE.DoubleSide
        // });

        // var triangleGeometry = new THREE.Geometry();

        // triangleGeometry.vertices.push(new THREE.Vector3( 0.0, 1.0, 0.0 ));
        // triangleGeometry.vertices.push(new THREE.Vector3( -1.0, 1.0, 0.0 ));
        // triangleGeometry.vertices.push(new THREE.Vector3( 1.0, -1.0, 0.0 ));

        // triangleGeometry.faces.push(new THREE.Face3(0, 1, 2));

        // triangleGeometry.faces[0].vertexColors[0] = new THREE.Color(0xFF0000);
        // triangleGeometry.faces[0].vertexColors[1] = new THREE.Color(0x00FF00);
        // triangleGeometry.faces[0].vertexColors[2] = new THREE.Color(0X0000FF);

        // var extrusionSettings = {steps: 10, amount: 2, bevelEnabled: false};
        // prismGeometry = THREE.ExtrudeGeometry( triangleGeometry, extrusionSettings );
        // testTriangle = new THREE.Mesh(prismGeometry, triangleMaterial);

        // scene.add(testTriangle);

        // render();

        var loader = new THREE.ColladaLoader(); 
        loader.options.convertUpAxis = true; 
        loader.load('models/monster.dae', function(collada) { 
            monster = collada.scene;
            scene.add(monster);
            render();
        });

    }

    function render() {
        if (monster) {
            monster.rotation.y += 0.02;
        }
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    window.onload = initScene;

    return {
        scene: scene // for ease of debugging, it's good to have access.
    };

}());