import { useEffect } from 'react'
import { io } from 'socket.io-client'
import { atom, useAtom } from 'jotai'

export const socket = io('http://localhost:3001')

export const charactersAtom = atom([])

export const SocketManager = () => {
    const [_characters, setCharacters] = useAtom(charactersAtom)

    useEffect(() => {

        function onConnect() {
            console.log('connected')
        }

        function onDisconnect() {
            console.log('disconnected')
        }

        function onHello() {
            console.log('hello')
        }

        function onCharacter(value) {
            setCharacters(value)
        }

        socket.on('connect', onConnect)
        socket.on('disconnect', onDisconnect)
        socket.on('hello', onHello)
        socket.on('characters', onCharacter)

        return () => {
            socket.off('connect', onConnect)
            socket.off('disconnect', onDisconnect)
            socket.off('hello', onHello)
            socket.on('characters', onCharacter)
        }
    }, [])
}