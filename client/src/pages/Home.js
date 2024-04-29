import supabase from "../client";
import { useEffect, useState } from "react";
import Card from "../components/Card";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [boards, setBoards] = useState(null);
  const [orderBy, setOrderBy] = useState('created_at');
  const [searchQuery, setSearchQuery] = useState('');

  const handleDelete = async (id) => {
    setBoards(prevBoards =>  { 
      return prevBoards.filter(board => board.id !== id);
    });
  };

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        let query = supabase.from('board').select();
        if (orderBy === 'upvote') {
          query = query.order('upvote', {descending: true}); {/*ascending: false*/}
        } else {
          query = query.order(orderBy, {ascending: false});
        }
        if (searchQuery) {
          query = query.like('title', `%${searchQuery}%`);
        }
        const { data, error } = await query;
  
        if (error) {
          setFetchError('Could not fetch content');
          setBoards(null);
          console.error(error);
        } else {
          setBoards(data);
          setFetchError(null);
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setFetchError('Could not fetch content');
        setBoards(null);
      }
    };

    fetchBoards();
  }, [orderBy, searchQuery]);

  return (
    <div className="page home">
      {fetchError && <p className="fetch-error">{fetchError}</p>}
      {boards && (
        <div className="boards">
          <div className="order-by">
            <p> Order by:
            <button onClick={() => setOrderBy('created_at')}>Created date</button>
            <button onClick={() => setOrderBy('title')}>Title</button>
            <button onClick={() => setOrderBy('upvote')}>Upvote</button>
            </p>
          </div>
          <div className="search-by">
            <p>Search by:  
              <input type="text" placeholder="Search by title" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </p>
          </div>
          <div className="board-grid">
            {boards.map(board => (
              <Card key={board.id} board={board} onDelete={handleDelete} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
