import  {createContext , useContext, useMemo} from 'react'
import { io } from 'socket.io-client'

const SocketContext = createContext(null)

export const useSocket =()=>{
    const socket = useContext(SocketContext)
    return socket;
}

export default function SocketProvider(props) {
    // eslint-disable-next-line no-undef
    // const url = process.env.BACKEND_URL ||  "http://localhost:3500"  // TODO: Make this dynamic based on the environment
    const socket = useMemo(() => io('http://localhost:3500'), [])
    
    return <SocketContext.Provider value={socket}>{props.children}</SocketContext.Provider>
}
    // const socket =  useMemo(()=>{io(url)} , [url])
 
