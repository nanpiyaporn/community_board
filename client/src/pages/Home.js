import supabase from "../client"
import { useEffect, useState } from "react"
import Card from "../components/Card"

const Home = () => {
  const [fetchError, setFetchError] = useState(null)
  const [boards,setBoards] = useState(null)
  
  
  const handleDelete = async (id) => {
    setBoards(prevBoards =>  { 
      return prevBoards.filter(boardse => board.id !== id)
    }
  )
  }

  useEffect(() => {
    const fetcBoards = async () => {
        const {data, error } = await supabase
          .from('board')
          .select()

        if (error) {
          setFetchError('Could not fetch content')
          setBoards(null)
          console.error(error)
          
        }
        if(data){
          setBoards(data)
          console.log(data)
          setFetchError(null)
        }
      }
      fetcBoards()
  }, [])


  return (
    <div className="page home">
      {fetchError && <p className="fetch-error">{fetchError}</p>}
      {boards && (
        <div className="boards">

          <div className="board-grid">
            {boards.map(board => (
              <Card key ={board.id}board={board} 
              onDete = {handleDelete} />
          ))}
        </div>
      </div>
      )}
    </div>
  )
}

export default Home