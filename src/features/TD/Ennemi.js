import React from 'react'

function Ennemi({caracteristique,style}) {
    return (
        <div style={{right:caracteristique.right, top:caracteristique.top}} className={style}>
            
        </div>
    )
}

export default Ennemi
