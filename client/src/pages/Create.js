import { useState } from 'react'
import supabase from '../client'
import { useNavigate } from 'react-router-dom'





const Create = () => {

  const navigate = useNavigate()
  const [ title, setTitle ] = useState('')
  const [ name, setName ] = useState('')
  const [ content, setContent ] = useState('')
  const [ linking, setLink ] = useState('')
  //const [ photo, setPhoto ] = useState('')
  const [ formError, setError ] = useState(null)
  const [ message, setMessage ] = useState('') // Add this line

  
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name || !title ) {
      setError('Please fill in name or title fields')
      return
    }

    const { data, error } = await supabase
      .from('board')
      .insert([
        { name, title, content, linking }
      ])

    if (error) {
      setError('An error occurred while saving the content')
      console.error(error)
    }

    if (data) {
      setTitle('')
      setName('')
      setContent('')
      setLink('')
      setError(null)
      setMessage('Successfully created a new content!') // Add this line
      setTimeout(() => {
        setMessage('') // Clear the message after 3 seconds
        navigate('/')
      }, 3000)
    }
  }

  async function addPhoto(ev) {
    const user = supabase.auth.user;
    
    if (!user) {
      console.error('You must be authenticated to upload files.');
      return;
    }
    
    const files = ev.target.files;
    for (const file of files) {
      const newName = `${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage.from('photos').upload(newName, file);
    
      if (error) {
        console.error('Error uploading file:', error);
      } else {
        console.log('Uploaded file:', data);
      }
    }
  }
  

  return (
    <div className="board-card">
      <form onSubmit ={handleSubmit}>
        

        <label htmlFor = "title">Title</label>
        <input 
          type = "text" 
          id = "title" value = {title} onChange = {e => setTitle(e.target.value)} 
          />
        <label className = "photo">Photo</label>
        <input 
          type = "file" onChange = { addPhoto} 
          />
        <label htmlFor = "content">Content</label>
        <input 
          type = "text" 
          id = "content" value = {content} onChange = {e => setContent(e.target.value)} 
          />

        <label htmlFor = "linking">url:</label>
        <input 
          type = "text" 
          id = "linking" value = {linking} onChange = {e => setLink(e.target.value)} 
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