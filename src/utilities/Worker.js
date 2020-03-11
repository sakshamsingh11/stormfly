export default () => {
  // Messenger.subscribe('send_scene', (data) => {
  //   console.log(data)
  // })
  addEventListener('message', e => {
    importScripts('https://preview.babylonjs.com/loaders/babylonjs.loaders.min.js')
    // if (!e) return
    // console.log('BABYLON')
    // // let { url, name, onLoad } = e.data
    // BABYLON.SceneLoader.ImportMeshAsync(
    //   null,
    //   'assets/models/',
    //   'IronMan.obj'
    // ).then(({ meshes }) => {
    //   // onLoad({ meshes, elm })
    //   console.log('here', meshes)
    //   postMessage({
    //     err: err.message
    //   })
    // })
  })
}
