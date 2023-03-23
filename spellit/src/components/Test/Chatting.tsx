import { useContext, useState } from 'react'
import { WebSocketContext } from '../../utils/WebsocektProvider'

function Chatting() {
  const ws = useContext(WebSocketContext);
  const [items, setItems] = useState<string[]>([]);

  const addItem = (item: string) => {
      setItems([
        ...items,
        item
      ]);
    };

  ws.current.onmessage = (event: MessageEvent) => {
    const data = JSON.parse(event.data) 
    console.log(data)
    addItem(data.test);
  };

  return (
    <div>
      <button>click</button>
      <ul>
        {
          items.map((message) => {
            return (
              <li>{message}</li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default Chatting