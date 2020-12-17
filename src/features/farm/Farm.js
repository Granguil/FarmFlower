import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {increment,sell, buy, selectFlower, selectField, selectMoney, selectTick, growing, selectGrowing, chrono} from './farmSlice';
import styles from './Farm.module.css';

export function Farm() {
  const fields = useSelector(selectField);
  const flowers = useSelector(selectFlower);
  const moneys = useSelector(selectMoney);
  const tick = useSelector(selectTick);
  const isGrowing = useSelector(selectGrowing);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(chrono())
  },[]);
   useEffect(() => {
       if(isGrowing===true){
            dispatch(increment());
       }
   }, [tick,dispatch,isGrowing]) 
  return (
    <div>
      <div className={styles.row}>
        <div><span>Champs : </span><span>{fields}</span></div>
        <div><span>Fleurs : </span><span>{flowers}</span></div>
        <div><span>Argent : </span><span>{moneys}$</span></div>
        
        <button
        onClick={()=>dispatch(growing())}>Fleur</button>
        <button
          className={styles.button}
          aria-label="Vendre Fleurs"
          onClick={() => dispatch(sell())}
        >
          Vendre Fleurs
        </button>
        
        <button
          className={styles.button}
          aria-label="Acheter Champ"
          onClick={() => dispatch(buy())}
        >
          Acheter Champ
        </button>
      </div>

    </div>
  );
}
