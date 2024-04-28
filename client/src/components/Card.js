import React from 'react'
import {Link} from 'react-router-dom'
import supabase from '../client'

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
    return (
        <div className = "board-card">
            {/*<p>{crewmate.id}</p>*/}
           
            <h4>{board.title}</h4>
            <p>{board.content}</p>
            <h2>{board.name}</h2>
            
            <Link to = {'/'+ board.id}>| edit |</Link>
            <Link to = {'/'+ board.id}className ="delete" onClick = {handleDelete} >| Delete |</Link>
        </div>
    )
}
export default Card