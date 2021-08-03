import { applyMiddleware } from 'redux'

import crashReporter from './crash-report'
import realtimeDb from './realtime-db'
import firestoreDb from './firestart-db'

export default applyMiddleware(
  crashReporter,
  realtimeDb,
  firestoreDb,
)