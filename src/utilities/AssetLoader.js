import { SceneLoader } from '@babylonjs/core/Loading/sceneLoader'
// import WebWorker from 'utilities/WorkerSetup'
import Messenger from 'components/Messenger'

let delayed = false
const MyWorker = require('worker-loader!./Worker.js')
class AssetLoader {
  getBrowserName () {
    const userAgent = navigator.userAgent.toLowerCase()
    const browser = {
      safari: /webkit/.test(userAgent),
      opera: /opera/.test(userAgent),
      msie: /msie/.test(userAgent) && !/opera/.test(userAgent),
      mozilla: /mozilla/.test(userAgent) && !/(compatible|webkit)/.test(userAgent)
    }
    if (browser.safari) return 'webkit'
    if (browser.opera) return 'opera'
    if (browser.msie) return 'ie'
    if (browser.mozilla) return 'firefox'
  }

  constructor (scene, slots) {
    this.worker = new MyWorker()
    this.waitingQueue = []
    this.runningQueue = []
    Messenger.publish('send_scene', {
      scene
    })

    const browserName = this.getBrowserName()
    if (browserName === 'webkit') {
      this.slotLimit = 6
    } else if (browserName === 'opera') {
      this.slotLimit = 6
    } else if (browserName === 'ie') {
      this.slotLimit = 6
    } else if (browserName === 'firefox') {
      this.slotLimit = 4
    }
    this.slotLimit = slots || this.slotLimit
  }

  updateRunningQueue () {
    while ((this.runningQueue.length < this.slotLimit) && this.waitingQueue.length) {
      const element = this.waitingQueue.shift()
      this.runningQueue.push(element)

      const onLoadHandler = ({ meshes, elm }) => {
        var index = this.runningQueue.indexOf(elm)
        this.runningQueue.splice(index, 1)
        elm.onLoad(meshes, elm.index)
      }
      if (!delayed) {
        this.loadAsset(element, onLoadHandler)
        delayed = true
      }
      setTimeout(() => {
        delayed = false
      }, 100)
    }
  }

  loadAsset (elm, onLoad) {
    SceneLoader.ImportMeshAsync(
      null,
      elm.url,
      elm.name,
      elm.scene
    ).then(({ meshes }) => {
      onLoad({ meshes, elm })
    })

    this.worker.postMessage('load')
    this.worker.addEventListener('message', (e) => {
      console.log(e)
    })
  }

  addToQueue (element, isPriority) {
    if (isPriority) {
      this.waitingQueue.unshift(element)
    } else {
      this.waitingQueue.push(element)
    }
    // return element
  }

  stopLoading () {
    // todo
  }
}

export default AssetLoader
