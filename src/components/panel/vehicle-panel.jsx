import { useDispatch, useSelector } from 'react-redux'
import { createSelectorCreator, defaultMemoize } from 'reselect'

import { getSkin } from 'components/vehicle/skin'
import { List, Wrapper } from './__style__/admin-panel.style'

import { json } from 'utils/app-func'
import { dndMoveVehicleMarker, flyTo } from 'actions'
import { isEqual } from 'lodash'
import Emoji from 'a11y-react-emoji'

import { Li } from './__style__/menu.style'
import styled from 'styled-components'
const ListItem = styled(Li)`
  cursor: pointer;
  display: flex;
  justify-content: space-around;
`

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, (prev, next) => Object.keys(prev || {}).length === Object.keys(next || {}).length) 

const vehicleSelector = createDeepEqualSelector(
  store => store.markers.vehicle,
  vehicleMarkers => Object.keys(vehicleMarkers).map(uid => ({ uid, position: vehicleMarkers[uid].position }))
)

const Vehicle = ({ uid }) => {
  const { skin, token } = useSelector(state => state.markers['vehicle'][uid], isEqual)

  const dispatch = useDispatch()

  const handleDrag = (event) => {
    event.stopPropagation()
    event.dataTransfer.effectAllowed = 'copy'
    event.dataTransfer.setData('text/plain', json`${dndMoveVehicleMarker(uid)}`)
  }

  const handleFlyTo = () => dispatch(flyTo({ token, uid}))

  return (
    <ListItem onClick={handleFlyTo} draggable={true} onDragStart={handleDrag} onDragEnd={() => {}} >
      <Emoji symbol={getSkin(skin)} label="vehicle" />
    </ListItem>
  )
}

export const VehiclePanel = () => {
  const markers = useSelector(vehicleSelector)
  

  return (
    <Wrapper style={{ left: 145 }}>
      <List onDragOver={(e) => e.preventDefault()}>
        { markers.map(({ uid }) => (
          <Vehicle key={uid} uid={uid} />
        )) }
      </List>
    </Wrapper>
  )
}
