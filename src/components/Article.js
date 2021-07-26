import axios from 'axios';
import React, { useState } from 'react';
import DeleteArticle from './DeleteArticle';

const Article = ({ article }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [editContent, setEditContent] = useState(" ")

    const dateParser = (date) =>{
        let newDate = new Date(date).toLocaleDateString('fr-Fr', {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "long",
            minute: "numeric",
            second: "numeric"
         })
        return newDate
    }

    const handleEdit = () => {
        // On peu préparé un objet est envoyé
        const data = {
            author: article.author,
            //content: "Nouveau texte", on rend dynamique (state)
            content: editContent ?  editContent : article.content,
            date: article.date
        }
        axios.put("http://localhost:3004/articles/" + article.id , data)
        setIsEditing(false);
       // axios.put("https://restcountries.eu/rest/v2/all?fields=name;population;region;capital;flag/" + article.id)
       // setIsEditing(false);
    }
    return (
        <div className="article" style={{background: isEditing ? "#f3feff" : "white"}}>
           <div className="card-header">
               <h3>{article.author}</h3>
               <em>Posté le {dateParser(article.date)}</em>
           </div>
           {isEditing ? (
              /*  ici , on le pose la question avec la tairenaire es ce qu'on est entrain d'editer ? si oui  */
              /* autoFocus dés qu'on est dedans */
               <textarea  onChange={(e) => setEditContent(e.target.value)} autoFocus defaultValue={editContent ?  editContent :article.content}></textarea>
           ):(
             /*  sinon on lui remet le contenu de base  */
             /* On fait en sorte que le content s'affiche pour en tenir compte de la modification */
             /* Esque editeContent est sur true alors afficle le moi sinon affiche le contenu original de l'article */
            <p>{editContent ?  editContent :  article.content}</p>
          
           )}
           <div className="btn-container">
               {isEditing ? (
                   <button onClick={handleEdit()}>Valider</button>
               ): (
                  /* Le buton de édit est fait juste pour révéler la texte area */
                 <button onClick={() => setIsEditing(true)}>Edit</button>

               )}
                <DeleteArticle id={article.id}/>
             </div>
        </div>
    
    );
};

export default Article;