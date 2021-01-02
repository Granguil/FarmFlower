import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addDragon, selectDragons, removeDragon, reverse, rename, eat } from './DragonSlice'
import Style from './Dragon.module.css';

function Dragon() {
    const dragons=useSelector(selectDragons);
    const dispatch = useDispatch();
    const newDragon=(name)=>{
        dispatch(addDragon(name));
        newName("");
    }
    const editId=(id,dragon)=>{
        edit(id);
        newNameEdit(dragon)
    }
    const editDragonName=()=>{
        dispatch(rename({id,name:nameEdit}));
        newNameEdit("");
        edit(-1);
    }
    const [name,newName]= useState("");
    const [id,edit]= useState(-1);
    const [nameEdit,newNameEdit] = useState(""); 
    return (
        <div className={Style.display}>
            <div className={Style.col}>
                <label htmlFor="new">Nouveau Dragon</label><br/>
                <input id="new" type="text" value={name} onChange={(e)=>newName(e.target.value)}/><br/>
                <button onClick={()=>newDragon(name)}>Ajouter</button><br/>
                <button onClick={()=>dispatch(reverse())}>Inverser Liste</button><br/>
                {id!==-1?<button onClick={()=>edit(-1)}>Arrêter Modification</button>:null}        
                </div>
            <div className={Style.col}>
                <ul>
                    {dragons.length>0?
                    
                    dragons.map((dragon,index)=>{
                        
                        return <li key={index}>{index!==id?dragon.name +" de niveau "+ dragon.niveau
                            :<input type="text" value={nameEdit} onChange={(e)=>newNameEdit(e.target.value)}/> }
                            {index!==id?<span><button className={Style.button} onClick={()=>dispatch(eat({id:index,niveau:dragon.niveau}))}>Nourrir</button>
                            <button className={Style.button} onClick={()=>editId(index,dragon.name)}>Edit</button></span>
                            :<button className={Style.button} onClick={()=>editDragonName()}>Valider</button>}
                            {id===-1?<button className={Style.button} onClick={()=>dispatch(removeDragon(index))}>X</button>
                            :null}</li>
                    }):
                    <li>Aucun Dragon</li>
                }
                </ul>
            </div>
        </div>
    )
}

export default Dragon
