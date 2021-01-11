import React,{useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import style from './TD.module.css';
import Ennemi from './Ennemi';
import { generateNewTD, selectEnnemis, selectGrilleTD, startVague, selectNbTours, placementTour} from './TDSlice';


function TD() {
    const dispatch=useDispatch();
    useEffect(() => {
        dispatch(generateNewTD());
    }, [])
    const ennemis=useSelector(selectEnnemis);
    const grilleTD=useSelector(selectGrilleTD);
    const nbTours=useSelector(selectNbTours);
    /*const nbParvague=useSelector(selectNbParVague);
    const finvague=useSelector(selectFinVague);
    const vagueEnCours=useSelector(selectVagueEnCours);
    const portee=useSelector(selectPortee);
    const vitesse=useSelector(selectVitesse);*/
    const start=()=>{
        dispatch(startVague());
    }
    return (
        <div>
            <div><button onClick={()=>start()}>Lancer</button></div>
            <div id="PV">{ennemis.map((ennemi,index)=>{
                return ennemi.pv>0 && ennemi.traverse===0? "PV"+(index+1)+" : "+ennemi.pv+",":null;
            })}</div>
            <table id={style.TD}>
                <tbody>
                    {grilleTD.map((element,indexL)=>{
                        return <tr key={"TD"+indexL}>
                        {element.map((cellule,indexC)=>{
                            if(cellule==="X"){
                                return <td onClick={nbTours>0?()=>{dispatch(placementTour({x:indexC,y:indexL}))
                            alert(nbTours);
                            }:null} className={`${style.bord} ${style.cellule}`} id={indexL+"B"+indexC} key={indexL+"B"+indexC}></td>;
                            }else if(cellule==="O"){
                                return <td className={`${style.chemin} ${style.cellule}`} id={indexL+"B"+indexC} key={indexL+"B"+indexC}></td>;
                            }else if(cellule==="T"){
                                return <td className={`${style.bord} ${style.cellule}`} id={indexL+"B"+indexC} key={indexL+"B"+indexC}><div className={`${style.tour} ${style.feu}`} key={indexL+"T"+indexC} >F</div></td>;
                            }else{
                                return null;
                            }
                        })}
                        </tr>
                    })}
                    <tr>
                        {ennemis.map((ennemi,index)=>{
                            return <td key={"E"+index}>{ennemi.traverse===0 && ennemi.pv>0?<Ennemi key={index} style={style.ennemi} caracteristique={ennemi}/>:null}</td>
                        })}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TD
