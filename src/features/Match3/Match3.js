import React, {useEffect} from 'react';
import { useSelector,useDispatch} from 'react-redux'
import style from './Match.module.css';
import { selectDragonFeu } from '../dragon/DragonSlice';
import { selectGrille, generateGrille,selected, selectPoints, dragonFeu } from './MatchSlice';



function Match3() {
    
    const dragonFeu1 = useSelector(selectDragonFeu);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(generateGrille());
        
    }, [])
    useEffect(() => {
        dispatch(dragonFeu({...dragonFeu1}));
    }, [dragonFeu1])
    const grille=useSelector(selectGrille);
    const Points=useSelector(selectPoints);
    return (
        <div>
        <table>
            <tbody>
                <tr>
                    <th>Points : </th><td>{Points}</td>
                </tr>
            </tbody>
        </table>
        <table>
            <tbody>
            {grille.map((ligne,indexL)=>{
    return <tr key={indexL}>
    {ligne.map((cellule,indexC)=>{
       return <td className={"caseMatch "+style.caseMatch} onClick={()=>dispatch(selected({ligne:indexL,colonne:indexC}))} id={indexL+"A"+indexC} key={indexL+"A"+indexC} >{cellule!=="O" && cellule!=="S"?<img className={style.img} alt="cellule" src={"image/"+cellule+".jpg"} />:null}</td>
    })}
    </tr>
})}
    </tbody>
    </table>
    <table>
        <tbody>
            <tr><th>Element du dragon</th><td>{dragonFeu1.element}</td></tr>
            <tr><th>Nom</th><td>{dragonFeu1.name}</td></tr>
            <tr><th>Niveau/Bonus</th><td>{dragonFeu1.niveau}</td></tr>
        </tbody>
    </table>
        </div>
    )
}

export default Match3
