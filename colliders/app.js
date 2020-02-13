const canvas = document.getElementById('canvas')
const engine = new BABYLON.Engine(canvas)
const scene = new BABYLON.Scene(engine)

// const camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 0, 0), scene)
// const camera = new BABYLON.ArcRotateCamera('camera1', 0, 0.8, 10, new BABYLON.Vector3(0, 5, -15), scene)
// camera.setTarget(BABYLON.Vector3.Zero()) // target camera towards scene origin
// camera.attachControl(canvas, true) // attach camera to canvas

// Parameters: name, position, scene
var camera = new BABYLON.ArcFollowCamera("FollowCam", 0, Math.PI/6, 0, null, scene);

// The goal distance of camera from target
camera.radius = 30;
camera.noRotationConstraint = true;

// The goal height of camera above local origin (centre) of target
camera.heightOffset = 10;

// The goal rotation of camera around local origin (centre) of target in x y plane
// camera.rotationOffset = 0;

// Acceleration of camera in moving from current to goal position
// camera.cameraAcceleration = 0.005

// The speed at which acceleration is halted
camera.maxCameraSpeed = 10

// This attaches the camera to the canvas
camera.attachControl(canvas, true);

const light = new BABYLON.DirectionalLight('light1', new BABYLON.Vector3(-1, -1, 0), scene)
light.intensity = 0.6
window.light = light // NOTE: make light a global object; temporary

const sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 1, scene) // Params: name, subdivs, size, scene
sphere.position.y = 2
// sphere.checkCollisions = true;
// sphere.applyGravity = true;

const ground = BABYLON.Mesh.CreateGround('ground1', 60, 60, 2, scene) // Params: name, width, depth, subdivs, scene
const material = new BABYLON.StandardMaterial(scene)
material.alpha = 1
material.diffuseColor = new BABYLON.Color3(0, 0.4, 0)
ground.material = material
// ground.wireframe = true;

// NOTE:: SET CAMERA TARGET AFTER THE TARGET'S CREATION AND NOTE CHANGE FROM BABYLONJS V 2.5
// targetMesh created here.
camera.target = sphere;   // version 2.4 and earlier
camera.lockedTarget = sphere; //version 2.5 onwards

const assets = new Array(1).fill(['1','2','3','4','5','6','7','8','9','10']).flat()
let gameObjects = []
let m = []

assets.forEach((val, index) => {
    // gameObjects.push(go)
    BABYLON.SceneLoader.ImportMesh(
        null,
        "assets/",
        `${val}.glb`,
        scene,
        (meshes) => {
             // TODO: find a better way of assigning parent to an imported model
            let go = new BABYLON.Mesh(val, scene)
            meshes.forEach(mesh => { 
                mesh.setParent(go)
                mesh.wireframe = true
                m.push(mesh)
            })
            go.position.x = 60 * Math.random() - 30
            go.position.z = 60 * Math.random() - 30
            go.scaling.x = go.scaling.y = go.scaling.z = 0.01
            // m.append(meshes)
            // gameObjects[index].position.x = 60 * Math.random() - 30
            // gameObjects[index].position.z = 60 * Math.random() - 30
            // gameObjects[index].scaling.x = gameObjects[index].scaling.y = gameObjects[index].scaling.z = 0.01
            // gameObjects[index].wireframe = true;
            // console.log(go)
        }
    )
})
x=0
// scene.gravity = new BABYLON.Vector3(0, -0.9, 0);
// scene.collisionsEnabled = true;

scene.registerBeforeRender(() => {
    x++
    if(x >= 600) {
        x=0;
        m.forEach((go, index) => {
            if(go.intersectsMesh(sphere, false)) {
                console.log("here", go)
            }
        })
    }
})

engine.runRenderLoop(() => {
    scene.render()
})

window.addEventListener('keydown', (e) => {
    switch(e.keyCode) {
        case 37:
            sphere.position.z -= 0.1
            break;
        case 38:
            sphere.position.x -= 0.1
            break;
        case 39:
            sphere.position.z += 0.1
            break;
        case 40:
            sphere.position.x += 0.1
            break;
    }
}, false)
