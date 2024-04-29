

import { useState } from 'react';
import supabase from '../client';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [linking, setLink] = useState('');
  const [formError, setError] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !title) {
      setError('Please fill in name or title fields');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('board')
        .insert([
          { name, title, content, linking }
        ]);

      if (error) {
        setError('An error occurred while saving the content');
        console.error(error);
      }

      if (data) {
        setTitle('');
        setName('');
        setContent('');
        setLink('');
        setError(null);
        setMessage('Successfully created a new content!');
        setTimeout(() => {
          setMessage('');
          navigate('/');
        }, 1000);
      }
    } catch (error) {
      console.error('Error:', error.message);
      setError('An error occurred while saving the content');
    }
  };

  async function addPhoto(ev) {
    const files = ev.target.files;
    for (const file of files) {
      const newName = `${Date.now()}-${file.name}`;
      try {
        const { data, error } = await supabase.storage.from('photos').upload(newName, file);
        if (error) {
          console.error('Error uploading file:', error);
          setError('An error occurred while uploading the file');
        } else {
          console.log('Uploaded file:', {/*data*/});
          // Handle successful file upload
        }
      } catch (error) {
        console.error('Error:', error.message);
        setError('An error occurred while uploading the file');
      }
    }
  }

  return (
    <div className="board-card">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input 
          type="text" 
          id="title" 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
        />
        <label className="photo">Photo</label>
        <input 
          type="file" 
          onChange={addPhoto} 
        />
        <label htmlFor="content">Content</label>
        <input 
          type="text" 
          id="content" 
          value={content} 
          onChange={e => setContent(e.target.value)} 
        />
        <label htmlFor="linking">URL:</label>
        <input 
          type="text" 
          id="linking" 
          value={linking} 
          onChange={e => setLink(e.target.value)} 
        />
        <label htmlFor="name">Name</label>
        <input 
          type="text" 
          id="name" 
          value={name} 
          onChange={e => setName(e.target.value)} 
        />
        <button type="submit">Create</button>
        {formError && <p className="form-error">{formError}</p>}
        {message && <p className="form-success">{message}</p>} 
      </form>
    </div>
  );
};

export default Create;
