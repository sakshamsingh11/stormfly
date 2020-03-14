import { SceneLoader } from '@babylonjs/core/Loading/sceneLoader'
import Game from 'components/Game'

onmessage = (e) => {
  console.log(SceneLoader)
  SceneLoader.ImportMeshAsync(
    null,
    'assets/models/',
    'IronMan.obj',
    Game.getScene()
  ).then(({ meshes }) => {
    console.log(meshes)
  })
}
