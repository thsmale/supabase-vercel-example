import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import './App.css'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

function App() {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    getAnimals();
  }, []);

  const getAnimals = async () => {
    try {
      console.log('fetching animals from supabase');
      const { data } = await supabase.from('animals').select();
      setAnimals(data);
    } catch (err) {
      console.log(err);
    }
  }

  // Ya in the App.css would be better and there should be better use of clases so it isn't repeated as much in td/th
  const tableStyle = {
    textAlign: 'left',
    padding: '8px'
  }

  return (
    <>
      <p>An example that fetches some data from supabase</p>
      <table>
        <thead>
          <tr>
            <th style={tableStyle}>Name</th>
            <th style={tableStyle}>Genus</th>
            <th style={tableStyle}>Class</th>
          </tr>
        </thead>
        <tbody>
          {animals.map(animal => (
            <tr key={animal.id}>
              <td style={tableStyle}>{animal.name}</td>
              <td style={tableStyle}>{animal.genus}</td>
              <td style={tableStyle}>{animal.class}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App
