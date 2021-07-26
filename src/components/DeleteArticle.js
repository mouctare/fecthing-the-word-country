import axios from 'axios'
import React from 'react'

const DeleteArticle = ({ id }) => {

    const handeleDelete = () => {
        axios.delete("http://localhost:3004/articles/" + id);
        window.location.reload();
        // Le reload , c'est pour recharger la page est tenir en compte de la suppression
    }
    return (
        <button onClick={() => {
            if (window.confirm('Voulez-vous supprimer cet article ?')){
                handeleDelete();
            }
        }}>Supprimer</button>
    )
}

export default DeleteArticle