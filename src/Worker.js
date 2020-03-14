// import { SceneLoader } from '@babylonjs/core/Loading/sceneLoader'
// import { getScene } from 'components/Game'

self.addEventListener('message', (e) => {
  console.log(e)
  // if (e.type === 'load') {
  //   console.log(e)
  //   SceneLoader.ImportMeshAsync(
  //     null,
  //     'assets/models/',
  //     'IronMan.obj',
  //     getScene()
  //   ).then(({ meshes }) => {
  //     console.log(meshes)
  //   })
  // }
  let i = 0
  while (i < 100000000) {
    i++
    // console.log('here')
  }
})
