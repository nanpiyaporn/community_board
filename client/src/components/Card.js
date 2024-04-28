import React from 'react'
import {Link} from 'react-router-dom'
import supabase from '../client'
import {useState} from 'react'



const Card =({board, onDelete}) => {

    


    const handleDelete = async () => {
        const {data, error} = await supabase
            .from('board')
            .delete()
            .eq('id', board.id)
        if (error) {
            console.error(error)
        }
        if (data) {
            console.log(data)
            onDelete(board.id)
        }
    }
    const [votes, setVotes] = useState(0)
    
    const handleUpvote = () => {
        setVotes(votes + 1);
      };

    return (
        <div className = "board-card">
            {/*<p>{crewmate.id}</p>*/}
           
            <h2>{board.title}</h2>
            <p>{board.content}</p>
            <h4>{board.name}</h4>
            <p>{board.created_at}</p>

            <Link to = {board.id} onClick={handleUpvote} >Upvote:   {votes}  </Link>
            <Link to = {'/'+ board.id}> - comment  </Link>
            <Link to = {'/'+ board.id}> - edit  </Link>
            <Link to = {'/'+ board.id} className ="delete" onClick = {handleDelete} >  - Delete </Link>
        </div>
    )
}
export default Card