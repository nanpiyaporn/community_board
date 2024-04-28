import { useState } from 'react'
import supabase from '../client'
import { useNavigate } from 'react-router-dom'

const Create = () => {

  const navigate = useNavigate()
  const [ title, setTitle ] = useState('')
  const [ content, setContent ] = useState('')
  const [ name, setName ] = useState('')
  
  
  const [ formError, setError ] = useState(null)
  const [ message, setMessage ] = useState('') // Add this line


  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name || !title || !content) {
      setError('Please fill in all fields')
      return
    }

    const { data, error } = await supabase
      .from('board')
      .insert([
        { name, title, content }
      ])

    if (error) {
      setError('An error occurred while saving the content. Please try again later.')
      console.error(error)
    }

    if (data) {
      setTitle('')
      setName('')
      setColor('')
      setRating('')
      setError(null)
      setMessage('Successfully created a new content!') // Add this line
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

        <label htmlFor = "content">content</label>
        <input 
          type = "text" 
          id = "content" value = {content} onChange = {e => setContent(e.target.value)} 
          />

        <label htmlFor = "name">Name</label>
        <input 
          type = "text" 
          id = "name" value = {name} onChange = {e => setName(e.target.value)} 
          />
        <button type = "submit">Create</button>
        {formError && <p className="form-error">{formError}</p>}
        {message && <p className="form-success">{message}</p>} 
      

      </form>
    </div>
  )
}

export default Create