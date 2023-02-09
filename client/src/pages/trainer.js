import { useParams } from "react-router-dom"
import { GET_TRAINER } from '../utils/queries'
import { useQuery } from '@apollo/client'
import Spinner from '../components/spinner'
import Auth from '../utils/auth'

const Trainer = () => {
    const { id } = useParams()

    const { data, loading, error } = useQuery(GET_TRAINER, {
        variables: {
            _id: id
        }
    })

    
    if(loading) return <Spinner />
    if(error) return <p>Error {error.message}</p>
    
    const trainer = data?.trainer || {}


    return (
        <>
            <h1>{trainer.username}</h1>
            <p>{trainer.email}</p>
            <button onClick={() => Auth.logout()}>Log out</button>

            <h2>Theme Mode</h2>
            <select
            // value={}
            // onChange={}
            >
                {['light', 'dark'].map(mode => {
                    return <option value={mode} key={mode}>{mode}</option>
                })}
            </select>

            <h2>My Pokemon</h2>
            <ul>
                {trainer.pokemon.map((pokemon, i) => {
                    <li key={`${pokemon.name}-${i}`}>{pokemon.name}</li>
                })}
            </ul>
        </>
    )
}

export default Trainer