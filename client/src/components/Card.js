import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../client';

const Card = ({ board, onDelete }) => {
    const [commentText, setCommentText] = useState('');
  const [votes, setVotes] = useState(board.upvote || 0);

  const handleDelete = async () => {
    const { data, error } = await supabase
      .from('board')
      .delete()
      .eq('id', board.id);
    if (error) {
      console.error(error);
    }
    if (data) {
      console.log(data);
      onDelete(board.id);
    }
  };
  //https://aepdknvadsqojtqwaimk.supabase.co/storage/v1/object/public/photos/1714338611514-6_1.png
  //const url = "https://aepdknvadsqojtqwaimk.supabase.co/storage/v1/object/public/photos/" 

  const handleUpvote = async () => {
    try {
      // Update the upvote count in the component state
      setVotes(votes + 1);
      
      // Send the upvote count to the server
      const { data, error } = await supabase
        .from('board')
        .update({ upvote: votes + 1 }) // Increment upvote count
        .eq('id', board.id);

      if (error) {
        console.error('Error updating upvote:', error.message);
      } else {
        console.log('Upvote successful');
      }
    } catch (error) {
      console.error('Error updating upvote:', error.message);
    }
  };
  function postComment(ev) {
    ev.preventDefault();
    supabase.from('post')
    .insert({
        content: commentText,
        parent: board.id,
    })
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
  return (
    <div className="board-card">
      <h2>{board.title}</h2>
      {/*<img src={url + photos.name} alt={photos.name} />*/}
      <img src = "https://aepdknvadsqojtqwaimk.supabase.co/storage/v1/object/public/photos/1714338611514-6_1.png" className = "small-image"/>
      <p>{board.content}</p>
      <h4>{board.name}</h4>
      <p>{board.created_at}</p>
      <form className = "commenttext" onSubmit ={postComment}>
      <input value = {commentText} onChange = {ev => setCommentText(ev.target.value)}></input>
      </form>
      <button onClick={handleUpvote}>Upvote ({votes})</button>
      <Link to={'/' + board.id}> - comment </Link>
      <Link to={'/' + board.id}> - edit </Link>
      <Link to={'/' + board.id} className="delete" onClick={handleDelete}>- Delete </Link>
      
      </div>
  );
};

export default Card;
