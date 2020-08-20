import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useForm } from '../hooks/useForm'

const initialMovieInfo = {
    id: '',
    director: '',
    metascore: '',
    stars: [],
    title: ''
}

const AddMovieForm = props => {
    const [formValues, handleChanges, resetForm, setValues] = useForm(initialMovieInfo)
    const [star, setStar] = useState('')
    const { setMovieList } = props
    const history = useHistory()
    
    const submitForm = (e) => {
        e.preventDefault()
        const newMovie = {
            director: formValues.director.trim(),
            metascore: formValues.metascore.trim(),
            stars: formValues.stars,
            title: formValues.title.trim()
        }
        console.log(newMovie)
        axios
            .post('http://localhost:5000/api/movies', newMovie)
            .then( res => {
                setMovieList(res.data)
                resetForm(initialMovieInfo)
                history.push('/')
            })
            .catch(err => console.error(err))
    }

    return (
        <section>
            <h3>Add New Movie</h3>
            <form onSubmit={submitForm}>
                <div>
                <input 
                    type='text'
                    name='title'
                    onChange={handleChanges}
                    placeholder='Movie Title'
                    value={formValues.title}
                />
                </div>
                <div>
                <input 
                    type='text'
                    name='director'
                    onChange={handleChanges}
                    placeholder='Director'
                    value={formValues.director}
                />
                </div>
                <div>
                <input 
                    type='number'
                    name='metascore'
                    onChange={handleChanges}
                    placeholder='Metascore'
                    value={formValues.metascore}
                />
                </div>
                <div>
                <input 
                    type='text'
                    name='stars'
                    onChange={(e) => setStar(e.target.value)}
                    placeholder='Add an actor'
                    value={star}
                />
                <button onClick={(e) => {
                    e.preventDefault()
                        setValues({
                            ...formValues, 
                            stars : [...formValues.stars, star]
                            })
                        setStar('')
                }}>Add Actor</button>
                </div>
                <div>
                    <button>Submit</button>
                </div>
            </form>
        </section>
    )
}

export default AddMovieForm