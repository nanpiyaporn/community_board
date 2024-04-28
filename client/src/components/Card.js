import React from 'react'
import {Link} from 'react-router-dom'
import supabase from '../client'

const Card =({Contentmate, onDelete}) => {


    const handleDelete = async () => {
        const {data, error} = await supabase
            .from('Contentmates')
            .delete()
            .eq('id', Contentmate.id)
        if (error) {
            console.error(error)
        }
        if (data) {
            console.log(data)
            onDelete(Contentmate.id)
        }
    }
    return (
        <div className = "Contentmate-card">
            {/*<p>{Contentmate.id}</p>*/}
            <h2>{Contentmate.name}</h2>
            <h4>{Contentmate.title}</h4>
            <p>{Contentmate.color}</p>
            <div className = "rating"> {Contentmate.rating}</div>
            <Link to = {'/'+ Contentmate.id}>| edit |</Link>
            <Link to = {'/'+ Contentmate.id}className ="delete" onClick = {handleDelete} >| Delete |</Link>
        </div>
    )
}
export default Card