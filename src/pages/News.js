import React, { useEffect, useState } from 'react';
import Logo from '../components/Logo';
import Navigation from '../components/Navigation';
import axios from "axios";
import Article from '../components/Article';


const News = () => {

    const [newsData, setNewsData] = useState([])
    const [author, setAuthor] = useState("")
    const [message, setMessage] = useState("")
    const [error, setError] = useState(false)
    

    const getData = () => {
        axios
             .get("http://localhost:3004/articles")
            // .then((res) => console.log(res.data));
             .then((res) => setNewsData(res.data));
    };

    useEffect(() => {
        getData();
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (message.length < 140) {

        } else {

          axios.post("http://localhost:3004/articles", {
                author,
                message,
                date: Date.now()
            }).then(() => { /* une fois que le post est find je vide le formulaire d'ou le then */
               /* On remet le champs en question à false pour effacer l'erreur */
                setError(false)
                setAuthor("");
                setMessage("");
                getData(); // L'appel de la function getData permet d'afficher instatenement
            });
        }


    };

    return (
        <div className="news-container">
            <Navigation/>
            <Logo />
            <h1>News</h1>

            <form onSubmit={handleSubmit}>
                <input 
                onChange={(e) => setAuthor(e.target.value)} 
                type="text"  placeholder="Nom"
                value={author} /* ta value a l'input, ce qui sera ecrit dans le champs author */
                />
                <textarea 
                /* Ici , on gére l'erreur  */
                style={{border: error ? "1px solid red" : "1px solid #61dfb" }}
                onChange={(e) => setMessage(e.target.value)}  

                 placeholder="Message"
                 value={message}
                 ></textarea>
                 {/* On conditionne l'apparition du texte s'il y'a une erreur */}
                {error && <p>Veuillez écrire un minimum de 140 caractères</p>}
                <input type="submit"  value="Envoyer"/>
            </form>
            <ul>
               {newsData.map
              /*  avec la methode sort en parametre a et le plus petit et b , le plus grand */
               /*  .sort((a, b) => b.date - a.date) */
                 ((article) => (
                    <Article key={article.id} article={article}/>
               ))}
             </ul>
        </div>
    );
};

export default News;