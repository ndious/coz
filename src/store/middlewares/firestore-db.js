import { firestore, store } from '../../utils/firebase'
import {
  LOAD_MARKERS, CREATE_MARKER_AT_POSITION, TOGGLE_VISIBILITY, KILL, DELETE, CHANGE_SKIN, SET_SIZE,
  updateMarker, addMarker, setIsLoaded, deleteMarker, setUserInfo,
} from '../../actions'
import { getMousePosition } from '../../utils/mapbox'
import { flashErrorMsg } from '../../utils/flash'
import { createMiddleware } from '../../utils/app-func'

const markerStore = store("markers")

const firestoreDb = createMiddleware({
  name: 'Firestore',
  middleware: {
    [LOAD_MARKERS]: async ({ state, dispatch }) => {
      if (state.app.isLoaded) { return }

      const user = await firestore.collection('users').doc(state.app.user.uid).get()
      dispatch(setUserInfo(user.data()))

      /**
       * Add database listener
       */
      firestore.collection('markers').where('active', '==', true).onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const marker = { uid: change.doc.id, ...change.doc.data() }

          switch (change.type) {
            case 'added':
              dispatch(addMarker(marker))
              return
            case 'modified':
              dispatch(updateMarker(marker))
              return
            case 'removed':
              dispatch(deleteMarker(marker))
              return
            default:
              flashErrorMsg('This is crap', change)
              return
          }
        })
        dispatch(setIsLoaded())
      })
    },
    [CREATE_MARKER_AT_POSITION]: ({ state, action }) => {
      const { lng, lat } = getMousePosition(action.payload, state.app.map)
      markerStore.create({
        position: { latitude: lat, longitude: lng },
        active: true,
        owner: state.app.user.uid,
        token: action.payload.token,
      })
    },
    [TOGGLE_VISIBILITY]: ({ action }) => markerStore.update(action.payload),
    [CHANGE_SKIN]: ({ action }) => markerStore.update(action.payload),
    [SET_SIZE]: ({ action }) => markerStore.update(action.payload),
    [KILL]: ({ action }) => markerStore.update({ uid: action.payload, isDead: true }),
    [DELETE]: ({ action }) => markerStore.remove(action.payload),
  }
})

export default firestoreDb