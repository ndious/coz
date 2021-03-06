import { useState, memo } from 'react'
import { createPortal } from 'react-dom'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import Emoji from 'a11y-react-emoji'
import isEqual from 'lodash.isequal'

import useMarker from 'components/hooks/marker'
import useAcl from 'components/hooks/acl'
import useIsVisible from 'components/hooks/marker/is-visible'
import useMovement from 'components/hooks/marker/movement'
import { Container } from 'components/map/markers/__style__/token.style'
import { Wrapper } from 'components/map/markers/__style__/marker.style'
import { getSkin, getSpeed, skins } from './skin'

import Menu from 'components/map/markers/menu'

const defaultVisibleAfter = 17.5

const Marker = ({ uid, visibleAfter }) => {
  const { skin, position, isHidden, isOver, isDead, owner, token } = useSelector(state => state.markers.z[uid], isEqual)
  const { canRead, canMove, canEdit } = useAcl({ type: `${token}`, owner })

  const { el, token: tokenRef, map } = useMarker({ position, uid, canMove })
  const isVisible = useIsVisible(map, visibleAfter)
  const [ isMenuOpen, setMenuIsOpen ] = useState(false)
  

  useMovement(tokenRef, map, getSpeed(skin))

  return createPortal(
    <Container className={`z ${isOver ? 'focus' : ''} ${(isHidden && !canRead) ? 'hidden' : ''}`}>
      { isVisible &&
        <Wrapper className="zoom p-token" onClick={() => setMenuIsOpen(!isMenuOpen)} style={{ display: `${isHidden && !canRead ? 'none' : 'block'}`,opacity:`${isHidden ? 0.5 : 1}` }}>
          { !isDead && <Emoji symbol={getSkin(skin)} label="z" /> }
          { isDead && <Emoji symbol="💀" label="z" /> }
        </Wrapper>
      }

      { canEdit && isMenuOpen && 
        <Menu 
          uid={uid}
          closeMenu={() => setMenuIsOpen(false)}
          skin={{ skins }} 
          visibility={{ isHidden }} 
          dead={{ isDead }} 
        /> 
      }
    </Container>,
    el
  )
}

Marker.propTypes = {
  uid: PropTypes.string.isRequired,
  visibleAfter: PropTypes.number,
}

Marker.defaultProps = {
  visibleAfter: defaultVisibleAfter,
}

export default memo(Marker)
