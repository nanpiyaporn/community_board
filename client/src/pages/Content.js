import React, { useState, useEffect } from 'react';
import supabase from '../client';

const Content = () => {
  const [Content, setContent] = useState([]);
  const [statistics, setStatistics] = useState({});

  useEffect(() => {
    const fetchContent = async () => {
      const { data, error } = await supabase
        .from('Contentmates')
        .select('*');

      if (error) {
        console.error(error);
        return;
      }

      setContent(data);
    };

    fetchContent();
  }, []);

  useEffect(() => {
    if (Content.length > 0) {
      const totalRating = Content.reduce((total, mate) => total + mate.rating, 0);
      const averageRating = totalRating / Content.length;

      setStatistics({
        totalContentmates: Content.length,
        totalRating,
        averageRating,
      });
    }
  }, [Content]);

  return (
    <div>
      <h1>Content Statistics</h1>
      <p>Total Contentmates: {statistics.totalContentmates}</p>
      <p>Total Rating: {statistics.totalRating}</p>
      <p>Average Rating: {statistics.averageRating}</p>
    </div>
  );
};

export default Content;