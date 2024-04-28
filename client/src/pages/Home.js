import supabase from "../client"
import { useEffect, useState } from "react"
import Card from "../components/Card"

const Home = () => {
  const [fetchError, setFetchError] = useState(null)
  const [Contentmates,setContentmates] = useState(null)
  
  
  const handleDelete = async (id) => {
    setContentmates(prevContentmates =>  { 
      return prevContentmates.filter(Contentmate => Contentmate.id !== id)
    }
  )
  }

  useEffect(() => {
    const fetcContentmates = async () => {
        const {data, error } = await supabase
          .from('Contentmates')
          .select()

        if (error) {
          setFetchError('Could not fetch Contentmates')
          setContentmates(null)
          console.error(error)
          
        }
        if(data){
          setContentmates(data)
          console.log(data)
          setFetchError(null)
        }
      }
      fetcContentmates()
  }, [])


  return (
    <div className="page home">
      {fetchError && <p className="fetch-error">{fetchError}</p>}
      {Contentmates && (
        <div className="Contentmates">

          <div className="Contentmate-grid">
            {Contentmates.map(Contentmate => (
              <Card key ={Contentmate.id}Contentmate={Contentmate} 
              onDete = {handleDelete} />
          ))}
        </div>
      </div>
      )}
    </div>
  )
}

export default Home