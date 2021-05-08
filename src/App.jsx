import React, { Component, useContext, useEffect, useState } from 'react'

const appContext = React.createContext(null)
const store = {
  state: {
    user: { name: 'mize', age: 20 }
  },
  setState(newState) {
    store.state = newState
    store.listeners.map(fn => fn(store.state))
  },
  listeners: [],
  subscribe(fn) {
    const l = store.listeners;
    console.log(l)
    l.push(fn)
    return () => {
      const i = l.indexOf(fn)
      l.splice(i, 1)
    }
  }
}

const connect = (Component) => (props) => {
  const { state, setState } = useContext(appContext)
  const [, update] = useState({})
  useEffect(() => {
    store.subscribe(() => {
      update({})
    })
  }, [])
  const dispatch = (action) => {
    setState(reducer(state, action))
  }
  return <Component {...props} dispatch={dispatch} state={state} />
}

export const App = () => {
  return (
    <appContext.Provider value={store}>
      <A />
      <B />
      <C />
    </appContext.Provider>
  )
}

const A = () => {
  return <section>A <UserA /></section>
}
const B = () => {
  return <section>B <UserModifier name='Input' /> </section>
}
const C = () => {
  return <section>C <UserC /> </section>
}
const UserA = connect(({ state, dispatch }) => {
  console.log('A Update', Math.random())
  return <div>User: {state.user.name}</div>
})
const UserC = () => {
  console.log('C Update', Math.random())
  const { state } = useContext(appContext)
  return <div>User: {state.user.name}</div>
}

const reducer = (state, { type, payload }) => {
  if (type === 'updateUser') {
    return {
      ...state,
      user: { ...state.user, ...payload }
    }
  } else {
    return state
  }
}

const UserModifier = connect(({ dispatch, state, ...rest }) => {
  console.log('B Update', Math.random())
  const onChange = (e) => {
    // 1. 
    // state.user.name = e.target.value
    // setState({ ...state })
    // 2. 
    // setState(reducer(state, { type: 'updateUser', payload: { name: e.target.value } }))
    // Now
    dispatch({ type: 'updateUser', payload: { name: e.target.value } })
  }
  return (
    <>
      <input value={state.user.name} onChange={onChange}></input>
    </>
  )
})