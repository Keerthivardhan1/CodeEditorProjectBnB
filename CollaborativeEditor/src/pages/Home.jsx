import { Button } from '@/components/ui/button'
import { useSocket } from '@/context/SocketProvider'
import { useCallback, useState } from 'react'
export default function Home() {
    const [roomId, setRoomId] = useState(0)
    const [name , setName] = useState("")
    const socket  = useSocket()
  
    const handleSubmition = useCallback((e)=>{
        e.preventDefault()
        console.log(roomId, name , socket);
        if(!name || !Number(roomId)) return;

        socket.emit("room:join",{ roomId: Number(roomId), userName : name })
        
    },[socket, roomId, name])
    
        

    // } ,  [roomId, name])
  return (
    <div>

        <form action="" onSubmit={handleSubmition}>
                <input type="text" value={roomId}  onChange={e => setRoomId(Number(e.target.value))} />
            <input type="text"  value={name} onChange={e=>setName(e.target.value)} placeholder='Your Name'/>
            <Button type="submit" >Join</Button>
        </form>
       
    </div>
  )
}
