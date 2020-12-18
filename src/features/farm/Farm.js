import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {increment,sell, buy, selectMoney, selectTick, growing, selectGrowing,timer} from './farmSlice';
import styles from './Farm.module.css';


export function Farm({name,number,fields,time, counter}) {
  
  const moneys = useSelector(selectMoney);
  const tick = useSelector(selectTick);
  const isGrowing = useSelector(selectGrowing);
  const dispatch = useDispatch();
  
   useEffect(() => {
       if(isGrowing===true){
          dispatch(timer(name));
       }
   }, [tick,dispatch,isGrowing])
   useEffect(()=>{
    if(counter===time){
      dispatch(increment(name));
    }
   },[counter])
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
        
        <button
          className={styles.button}
          aria-label="Acheter Champ"
          onClick={() => dispatch(buy(name))}
        >
          Acheter Champ
        </button>
      </div>

    </div>
  );
}
