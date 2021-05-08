import React, { useContext, useEffect, useState } from 'react'

export const appContext = React.createContext(null)

export const store = {
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

export const connect = (Component) => (props) => {
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
