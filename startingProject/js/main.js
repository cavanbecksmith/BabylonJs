var canvas;
var engine;
var scene;

document.addEventListener("DOMContentLoaded", startGame);

function startGame () {

    canvas = document.getElementById('renderCanvas');
    engine = new BABYLON.Engine(canvas,true);
    scene = createScene();
    
    var toRender = function(){
        scene.render();
    }
    engine.runRenderLoop(toRender);

}


var createScene = function (){ 

    scene = new BABYLON.Scene(engine);
    // scene.clearColor = new BABYLON.Color3(1,0,1); 
    // scene.ambientColor = new BABYLON.Color3(0,1,0);

    // Code here
    // var sphere = BABYLON.Mesh.CreateSphere("mySphere",32,2,scene);

    // Geometries & Materials

    var ground = BABYLON.Mesh.CreateGround("myGround",60,60,50,scene);
    var mirrorMaterial = new BABYLON.StandardMaterial("mirrorMaterial", scene);
    mirrorMaterial.diffuseColor = new BABYLON.Color3(0.4, 1, 0.4);
    mirrorMaterial.specularColor = new BABYLON.Color3.Black;
    mirrorMaterial.reflectionTexture = new BABYLON.MirrorTexture("mirror", 1024, scene, true);
    mirrorMaterial.reflectionTexture.MirrorPlane = new BABYLON.Plane(0, -1.0, 0, -2.0);
    mirrorMaterial.reflectionTexture.level = 1;
    ground.material = mirrorMaterial;

    // Spheres creation


    var spheres = [];
    var sphereMaterials = [];

    for(var i = 0; i < 10; i++) {
        spheres[i] = BABYLON.Mesh.CreateSphere("MySphere"+ i, 32, 2, scene);
        spheres[i].position.x += 3 * i - 9;
        spheres[i].position.y += 2;
        sphereMaterials[i] = new BABYLON.StandardMaterial("sphereMaterial"+i, scene);
        spheres[i].material = sphereMaterials[i];
        mirrorMaterial.reflectionTexture.renderList.push(spheres[i]);
    }

    sphereMaterials[0].ambientColor = new BABYLON.Color3(0,0.5,0);
    sphereMaterials[0].diffuseColor = new BABYLON.Color3(5,0,0);
    sphereMaterials[0].specularColor = new BABYLON.Color3(5,0,0);


    sphereMaterials[1].ambientColor = new BABYLON.Color3(0,0.5,0);
    sphereMaterials[1].diffuseColor = new BABYLON.Color3(5,0,1);
    sphereMaterials[1].specularColor = new BABYLON.Color3(0,0,3);
    sphereMaterials[1].specularPower = 256;


    sphereMaterials[2].ambientColor = new BABYLON.Color3(0,0.5,0);
    sphereMaterials[2].diffuseColor = new BABYLON.Color3(0,0,0);
    sphereMaterials[2].emissiveColor = new BABYLON.Color3(0,0,1);
    // sphereMaterials[2].specularPower = 256;

    sphereMaterials[3].emissiveColor = new BABYLON.Color3.Green;
    sphereMaterials[3].diffuseTexture = new BABYLON.Texture("images/lightning.png", scene);
    // sphereMaterials[3].emissiveColor = new BABYLON.Color3(0,0,1);


    // Lights

    var light = new BABYLON.PointLight("myPointLight", new BABYLON.Vector3(0,10,0, scene));
    light.intensity = .5;

    light.diffuse = new BABYLON.Color3(1,0,0);

    // Scene -> Before render

    var counter = 0;

    scene.registerBeforeRender(function () {

        for (i = 0; i < spheres.length; i++){
            spheres[i].position.z = 2*i * Math.sin((i * counter) / 2);
            counter += .001;
        }
        sphereMaterials[3].diffuseTexture.uOffset += 0.005;
        sphereMaterials[3].diffuseTexture.uScale += 0.03;

    });



    // Camera

    var camera = new BABYLON.FreeCamera("myCamera", new BABYLON.Vector3(0,10,-40), scene);
    camera.attachControl(canvas);


    return scene;
}

window.addEventListener("resize", function(){
    engine.resize();
})