import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addDragon, selectDragons, removeDragon, reverse } from './DragonSlice'
import Style from './Dragon.module.css';

function Dragon() {
    const dragons=useSelector(selectDragons);
    const dispatch = useDispatch();
    const newDragon=(name)=>{
        dispatch(addDragon(name));
        newName("");
    }
    const [name,newName]= useState("");   
    return (
        <div className={Style.display}>
            <div className={Style.col}>
                <label htmlFor="new">Nouveau Dragon</label><br/>
                <input id="new" type="text" value={name} onChange={(e)=>newName(e.target.value)}/><br/>
                <button onClick={()=>newDragon(name)}>Ajouter</button><br/>
                <button onClick={()=>dispatch(reverse())}>Inverser Liste</button>         
                </div>
            <div className={Style.col}>
                <ul>
                    {dragons.length>0?
                    
                    dragons.map((dragon,index)=>{
                        return <li key={index}>{dragon} <button className={Style.button} onClick={()=>dispatch(removeDragon(index))}>X</button></li>
                    }):
                    <li>Aucun Dragon</li>
                }
                </ul>
            </div>
        </div>
    )
}

export default Dragon
