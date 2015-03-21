var example = (function() {
    "use strict"; 
    var scene = new THREE.Scene();
    var renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer();
    var light = new THREE.AmbientLight(0xffffff);
    var camera;
    var box;

    function initScene() {
        renderer.setSize (window.innerWidth, window.innerHeight );
        document.getElementById("wegl-container").appendChild(renderer.domElement);

        scene.add(light);

        camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 1, 1000);

        camera.position.z = 5;
        scene.add(camera);

        var triangleGeometry = new THREE.Geometry();

        triangleGeometry.vertices.push(new THREE.Vector3( 0.0, 1.0, 0.0 ));
        triangleGeometry.vertices.push(new THREE.Vector3( -1.0, 1.0, 0.0 ));
        triangleGeometry.vertices.push(new THREE.Vector3( 1.0, -1.0, 0.0 ));

        triangleGeometry.faces.push(new THREE.Face3(0, 1, 2));

        var testTriangle = new THREE.Mesh(triangleGeometry);

        scene.add(testTriangle);

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