import { createAction } from '@reduxjs/toolkit'

// USER EVENTS
export const SET_USER = Symbol('SET_USER_@_APP')
export const setUser = createAction(SET_USER, ({ uid, email }) => ({
  payload: {
    uid,
    email,
    date: new Date(),
  },
}))
export const SET_USER_INFO = Symbol('SET_USER_INFO_@_APP')
export const setUserInfo = createAction(SET_USER_INFO)

// APP EVENTS
export const SET_IS_LOADED = Symbol('SET_IS_LOADED_@_APP')
export const setIsLoaded = createAction(SET_IS_LOADED)

// MAP EVENTS
export const SET_MAP = Symbol('SET_MAP_@_APP')
export const setMap = createAction(SET_MAP)

// MARKER EVENTS
export const ADD_MARKER = Symbol('ADD_MARKER_@_MARKER')
export const addMarker = createAction(ADD_MARKER)

export const CREATE_MARKER_AT_POSITION = 'CREATE_MARKER_AT_POSITION'
export const dndCreateMarker = createAction(CREATE_MARKER_AT_POSITION, (token, visibility = false) => ({ payload: { token, visibility } })) 

export const MOVE_PLAYER_MARKER = 'MOVE_PLAYER_MARKER'
export const dndMovePlayerMarker = createAction(MOVE_PLAYER_MARKER, (uid) => ({ payload: { uid: uid } }))

export const MOVE_VEHICLE_MARKER = 'MOVE_VEHICLE_MARKER'
export const dndMoveVehicleMarker = createAction(MOVE_VEHICLE_MARKER, (uid) => ({ payload: { uid: uid } }))

export const LOAD_MARKERS = Symbol('LOAD_MARKERS')
export const loadMarkers = createAction(LOAD_MARKERS)

export const SET_IS_OVER_MARKER = Symbol('SET_IS_OVER_MARKER')
export const setIsOverMarker = createAction(SET_IS_OVER_MARKER)

export const UPDATE_MARKER = Symbol('UPDATE_MARKER_@_MARKER')
export const updateMarker = createAction(UPDATE_MARKER)


export const DELETE_MARKER = Symbol('DELETE_MARKER_@_MARKER')
export const deleteMarker = createAction(DELETE_MARKER)

export const FLY_TO = Symbol('FLY_TO')
export const flyTo = createAction(FLY_TO)

// TOKENS EVENTS
export const TOGGLE_VISIBILITY = Symbol('TOGGLE_VISIBILITY')
export const toggleVisibility = createAction(TOGGLE_VISIBILITY)

export const KILL = Symbol('KILL')
export const kill = createAction(KILL)

export const DELETE = Symbol('DELETE')
export const deleteToken = createAction(DELETE)

export const CHANGE_SKIN = Symbol('CHANGE_SKIN')
export const changeSkin = createAction(CHANGE_SKIN)

export const CHANGE_WEAPON = Symbol('CHANGE_WEAPON')
export const changeWeapon = createAction(CHANGE_WEAPON)

export const SET_SIZE = Symbol('SET_SIZE')
export const saveSize = createAction(SET_SIZE)
