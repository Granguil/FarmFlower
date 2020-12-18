import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {increment,sell, buy, selectMoney, growing, selectGrowing, selectPlayedTimeInS} from './farmSlice';
import styles from './Farm.module.css';


export function Farm({name,number,fields,time}) {
  
  const moneys = useSelector(selectMoney);
  const isGrowing = useSelector(selectGrowing);
  const playedTime = useSelector(selectPlayedTimeInS);
  const dispatch = useDispatch();
  
   useEffect(()=>{
    if(playedTime%time===0 && isGrowing){
      dispatch(increment(name));
    }
   },[playedTime,dispatch,name,time])
  return (
    <div>
      <div className={styles.row}>
        <div><span>Champs : </span><span>{fields}</span></div>
        <div><span>{name} : </span><span>{number}</span></div>
        <div><span>Argent : </span><span>{moneys}$</span></div>
        
        <button
        onClick={()=>dispatch(growing())}>{isGrowing?"Arrêter":"Produire"}</button>
        <button
          className={styles.button}
          aria-label="Vendre"
          onClick={() => dispatch(sell(name))}
        >
          Vendre {name}
        </button>
        
        {moneys>20?<button
          className={styles.button}
          aria-label="Acheter Champ"
          onClick={() => dispatch(buy(name))}
        >
          Acheter Champ
        </button>:null}
      </div>

    </div>
  );
}
