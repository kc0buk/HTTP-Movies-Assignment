import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'

const initialMovieInfo = {
    id: '',
    director: '',
    metascore: '',
    stars: [],
    title: ''
}

const UpdateMovieForm = props => {
    const history = useHistory()
    const { id } = useParams()
    const [movieInfo, setMovieInfo] = useState(initialMovieInfo)
    const { movies, setMovieList } = props

    const changeHandler = (e) => {
        setMovieInfo({
            ...movieInfo,
            [e.target.name] : e.target.value
        })
    }

    useEffect( () => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then( res => {
                console.log(res)
                setMovieInfo(res.data)
            })
            .catch( err => console.error(err))
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios
            .put(`http://localhost:5000/api/movies/${id}`, movieInfo)
            .then( res => {
                const newArr = movies.map(movie => {
                    if (movie.id === res.data.id) {
                        return res.data
                    } else {
                        return movie
                    }
                })
                setMovieList(newArr)
                setMovieInfo(initialMovieInfo)
                history.push('/')
            })
            .catch( err => console.error(err))
    }

    return (
        <section>
            <h3>Update Movie</h3>
            <form onSubmit={handleSubmit}>
            <div>
                <input 
                    disabled
                    type='text'
                    name='id'
                    value={movieInfo.id}
                />
                </div>
                <div>
                <input 
                    type='text'
                    name='title'
                    onChange={changeHandler}
                    placeholder='Movie Title'
                    value={movieInfo.title}
                />
                </div>
                <div>
                <input 
                    type='text'
                    name='director'
                    onChange={changeHandler}
                    placeholder='Director'
                    value={movieInfo.director}
                />
                </div>
                <div>
                <input 
                    type='number'
                    name='metascore'
                    onChange={changeHandler}
                    placeholder='Metascore'
                    value={movieInfo.metascore}
                />
                </div>
                <div>
                <textarea 
                    rows='10'
                    name='stars'
                    onChange={changeHandler}
                    placeholder='Who were the stars of the movie?'
                    value={movieInfo.stars}
                />
                </div>
                <div>
                    <button>Submit</button>
                </div>
            </form>
        </section>
    )
}

export default UpdateMovieForm