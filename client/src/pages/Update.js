import React,{useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import supabase from '../client'
import { useNavigate } from 'react-router-dom'

const Update = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [ title, setTitle ] = useState('')
  const [ name, setName ] = useState('')
  const [ content, setContent ] = useState('')
  const [ linking, setLink ] = useState('')
  const [ formError, setFormError ] = useState(null)

  const handleSubmit = async (e) => { 
    e.preventDefault()
    if (!name || !title) {
      setFormError('Please fill in name and titlefields')
      return
    }

    const { data, error } = await supabase
      .from('board')
      .update({ name, title, content, linking })
      .eq('id', id)
      
    if (error) {
      setFormError('An error occurred while saving the content')
      console.error(error)
    }

    if (data) {
      console.log(data)
      setFormError(null)
      navigate('/')
    }
  }

  useEffect(() => {
    const fetchContent = async () => {
      const { data, error } = await supabase  
        .from('board')
        .select()
        .eq('id', id)
        .single()

      if (error) {
        navigate('/', {replace: true})
      }
      
      if (data) {
        setTitle(data.title)
        setName(data.name)
        setContent(data.content)
        setLink(data.linking)
        //console.log(data)
      }
    }
    fetchContent()
  }, [id, navigate])

  return (
    <div className="page update">
      <form onSubmit={handleSubmit}>
        
        <label htmlFor = "title">Title</label>
        <input 
          type = "text" 
          id = "title" 
          value = {title} onChange = {e => setTitle(e.target.value)} 
          />

        <label htmlFor = "content">Content</label>
        <input 
          type = "text" 
          id = "content" 
          value = {content} onChange = {e => setContent(e.target.value)} 
          />

        <label htmlFor = "linking">Linking</label>
        <input 
          type = "text" 
          id = "linking" 
          value = {linking} onChange = {e => setLink(e.target.value)} 
          />

        <label htmlFor = "name">Name</label>
        <input 
          type = "text" 
          id = "name" 
          value = {name} onChange = {e => setName(e.target.value)} 
          />

        <button type = "submit">Update Content</button>
        {formError && <p className="form-error">{setFormError}</p>}
      </form>
    </div>
  )
}

export default Update