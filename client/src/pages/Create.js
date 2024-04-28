import { useState } from 'react'
import supabase from '../client'
import { useNavigate } from 'react-router-dom'

const Create = () => {

  const navigate = useNavigate()
  const [ title, setTitle ] = useState('')
  const [ name, setName ] = useState('')
  const [ color, setColor ] = useState('')
  const [ rating, setRating ] = useState('')
  const [ formError, setError ] = useState(null)
  const [ message, setMessage ] = useState('') // Add this line


  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name || !title || !color || !rating) {
      setError('Please fill in all fields')
      return
    }

    const { data, error } = await supabase
      .from('crewmates')
      .insert([
        { name, title, color, rating }
      ])

    if (error) {
      setError('An error occurred while saving the crewmate')
      console.error(error)
    }

    if (data) {
      setTitle('')
      setName('')
      setColor('')
      setRating('')
      setError(null)
      setMessage('Successfully created a new crewmate!') // Add this line
      setTimeout(() => {
        setMessage('') // Clear the message after 3 seconds
        navigate('/')
      }, 3000)
    }
  }

  return (
    <div className="page create">
      <form onSubmit ={handleSubmit}>
        <label htmlFor = "name">Name</label>
        <input 
          type = "text" 
          id = "name" value = {name} onChange = {e => setName(e.target.value)} 
          />

        <label htmlFor = "title">Title</label>
        <input 
          type = "text" 
          id = "title" value = {title} onChange = {e => setTitle(e.target.value)} 
          />

        <label htmlFor = "color">Color</label>
        <input 
          type = "text" 
          id = "color" value = {color} onChange = {e => setColor(e.target.value)} 
          />

        <label htmlFor = "rating">Rating</label>
        <input 
          type = "number" 
          id = "rating" value = {rating} onChange = {e => setRating(e.target.value)} 
          />
        <button type = "submit">Create</button>
        {formError && <p className="form-error">{formError}</p>}
        {message && <p className="form-success">{message}</p>} 
      

      </form>
    </div>
  )
}

export default Create