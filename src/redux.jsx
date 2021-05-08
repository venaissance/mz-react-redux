import React, { useContext, useEffect, useState } from 'react'

export const appContext = React.createContext(null)

export const store = {
    state: {
        user: { name: 'mize', age: 20 }
    },
    setState(newState) {
        store.state = newState
        store.listeners.map(fn => fn(store.state)) // state 修改时，触发每个 connect 组件的 update
    },
    listeners: [],
    subscribe(fn) {
        const l = store.listeners;
        l.push(fn)
        return () => {
            const i = l.indexOf(fn)
            console.log('cancel', fn)
            l.splice(i, 1)
        }
    }
}

export const reducer = (state, { type, payload }) => {
    if (type === 'updateUser') {
        return {
            ...state,
            user: { ...state.user, ...payload }
        }
    } else {
        return state
    }
}

export const connect = (Component) => (props) => {
    const { state, setState } = useContext(appContext)
    const [, update] = useState({})
    useEffect(() => {
        return store.subscribe(() => update({})) // 订阅每一个 connect 组件的 update
    }, [])
    const dispatch = (action) => {
        setState(reducer(state, action))
        update({}) // 需要通过修改 connect 组件的 state 来触发 render
    }
    return <Component {...props} dispatch={dispatch} state={state} />
}

