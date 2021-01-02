import React, {useState, useEffect} from 'react';
import style from './Match.module.css';
import $ from 'jquery';

let Symbole=["A","E","F","T"];
let idSwap=new Array(4);
let idOrigin="";
let grille=new Array(10);
for(let i=0;i<grille.length;i++){
    grille[i]=new Array(10);
    for(let j=0;j<grille.length;j++){   
        let impossible=[];
        if(i>1){        
            if(grille[i-2][j]===grille[i-1][j]){
                impossible.push(grille[i-2][j]);
            }
        }
        if(j>1){
            if(grille[i][j-2]===grille[i][j-1]){
                impossible.push(grille[i][j-2]);
            }
        }
        do{
        let alea=Math.floor(Math.random()*4);
        grille[i][j]=Symbole[alea];
        }while(impossible.includes(grille[i][j]));
    }
}
let idCoord=new Array(2);
let idOriginCoord=new Array(2);


console.log(grille);
function Match3() {
    const [affichageGrille, setaffichageGrille] = useState(false);
    
    function remplacement(){
        $(".caseMatch").css("background-color","white");
        for(let i=0;i<grille.length;i++){
            for(let j=0;j<grille.length;j++){
                if(grille[j][i]==="O"){
                    for(let k=j;k>0;k--){
                        grille[k][i]=grille[k-1][i];
                    }
                    let alea=Math.floor(Math.random()*4);
                    grille[0][i]=Symbole[alea];
                }
            }
        }
        }
    
        
        const selected=(ligne,colonne)=>{
            let id=ligne+"A"+colonne;
            idCoord=[ligne,colonne];
            $(".caseMatch").css("background-color","white");
            //console.log(idSwap);
            if(idSwap.includes(id)){
                idOriginCoord=idOrigin.split("A");
                let tempElement=grille[idCoord[0]][idCoord[1]];
                grille[idCoord[0]][idCoord[1]]=grille[idOriginCoord[0]][idOriginCoord[1]]
                grille[idOriginCoord[0]][idOriginCoord[1]]=tempElement;
                remplacement();
                setaffichageGrille(!affichageGrille);
                let bool=verifChangement();
                if(!bool){
                    setTimeout(()=>{
                        tempElement=grille[idCoord[0]][idCoord[1]];
                        grille[idCoord[0]][idCoord[1]]=grille[idOriginCoord[0]][idOriginCoord[1]]
                        grille[idOriginCoord[0]][idOriginCoord[1]]=tempElement;
                        remplacement();
                        setaffichageGrille(!affichageGrille);
                    },2000);
                }else{
                    remplacement();
                    setaffichageGrille(!affichageGrille);
                    NewMatch();
                }
            }else{
                idOrigin=id;
                let coordonnee=id.split("A");
                $("#"+ligne+"A"+colonne).css("background-color","darkred");
                $("#"+coordonnee[0]+"A"+(coordonnee[1]-1)).css("background-color","green");
                $("#"+coordonnee[0]+"A"+(Number(coordonnee[1])+1)).css("background-color","green");
                $("#"+(Number(coordonnee[0])+1)+"A"+coordonnee[1]).css("background-color","green");
                $("#"+(coordonnee[0]-1)+"A"+coordonnee[1]).css("background-color","green");
                idSwap=new Array(4);
                idSwap.push(coordonnee[0]+"A"+(coordonnee[1]-1));
                idSwap.push(coordonnee[0]+"A"+(Number(coordonnee[1])+1));
                idSwap.push((Number(coordonnee[0])+1)+"A"+coordonnee[1]);
                idSwap.push((coordonnee[0]-1)+"A"+coordonnee[1]);
            }
        }
        
        
        function verifChangement(){
            let bool=false;
            let bool1=verifCellule(idCoord);
            let bool2=verifCellule(idOriginCoord);
            bool=bool1 || bool2;
        return bool;
        }
        
        function verifCellule([y,x]){
            y=Number(y);
            x=Number(x);
            let element=grille[y][x];
            let booly=false;
            let boolx=false;
            if(y>0 && grille[y-1][x]===element){
                if(y>1 && grille[y-2][x]===element){
                    grille[y-1][x]="O";
                    grille[y-2][x]="O";
                    booly=true;
                    if(y<9 && grille[y+1][x]===element){
                        grille[y+1][x]="O";
                        if(y<8 && grille[y+2][x]===element){
                            grille[y+2][x]="O";
                        }
                    }
                }else if(y<9 && grille[y+1][x]===element){
                    grille[y+1][x]="O";
                    grille[y-1][x]="O";
                    booly=true;
                    if(y<8 && grille[y+2][x]===element){
                        grille[y+2][x]="O";
                    }
                }
            }else if(y<8 && grille[y+1][x]===element && grille[y+2][x]===element){
                grille[y+1][x]="O";
                grille[y+2][x]="O";
                booly=true;
            }
            if(x>0 && grille[y][x-1]===element){
                if(x>1 && grille[y][x-2]===element){
                    grille[y][x-1]="O";
                    grille[y][x-2]="O";
                    boolx=true;
                    if(x<9 && grille[y][x+1]===element){
                        grille[y][x+1]="O";
                        if(x<8 && grille[y][x+2]===element){
                            grille[y][x+2]="O";
                        }
                    }
                }else if(x<9 && grille[y][x+1]===element){
                    grille[y][x+1]="O";
                    grille[y][x-1]="O";
                    boolx=true;
                    if(x<8 && grille[y][x+2]===element){
                        grille[y][x+2]="O";
                    }
                }
            }else if(x<8 && grille[y][x+1]===element && grille[y][x+2]===element){
                grille[y][x+1]="O";
                grille[y][x+2]="O";
                boolx=true;
            }
            if(boolx || booly){
                grille[y][x]="O";
            }
            return boolx || booly;
        }
        
        function NewMatch(){
            let coordASuppr=[];
            let bool=false;
            let compteurX=1;
            let compteurY=1;
            for(let i=0;i<10;i++){
                compteurX=1;
                compteurY=1;
                for(let j=1;j<10;j++){
                    if(grille[i][j-1]===grille[i][j]){
                        compteurX++;
                    }else{
                        if(compteurX>=3){
                            for(let k=j-compteurX;k<j;k++){
                                coordASuppr.push({x:k,y:i});
                            }
                        }
                        compteurX=1;
                    }
                    if(grille[j-1][i]===grille[j][i]){
                        compteurY++;
                    }else{
                        if(compteurY>=3){
                            for(let k=j-compteurY;k<j;k++){
                                coordASuppr.push({x:i,y:k});
                            }
                        }
                        compteurY=1;
                    }
                }
                if(compteurX>=3){
                    for(let k=10-compteurX;k<10;k++){
                        coordASuppr.push({x:k,y:i});
                    }
                }
                if(compteurY>=3){
                    for(let k=10-compteurY;k<10;k++){
                        coordASuppr.push({x:i,y:k});
                    }
                }
            }
            setaffichageGrille(!affichageGrille);
            for(let coord of coordASuppr){
                //grille[coord.y][coord.x]="S";
                console.log("Blue");
                $("#"+coord.y+"A"+coord.x).css("background-color","blue");
                console.log("AS : "+coord.y+" vs "+coord.x);
            }
            if(coordASuppr.length>0){
                bool=true;
            }
            if(bool){
                console.log("Separator");
                setTimeout(()=>{
                    RemoveTuile(coordASuppr);
                    NewMatch();
                },1500);
            }
        }
        
        function RemoveTuile(coordASuppr){
            /*for(let i=0;i<10;i++){
                for(let j=0;j<10;j++){
                    if(grille[i][j]==="S"){
                        console.log("RT : "+i+" vs "+j);
                        grille[i][j]="O";
                    }
                }
            }*/
            for(let coord of coordASuppr){
                grille[coord.y][coord.x]="O";
                $("#"+coord.y+"A"+coord.x).css("background-color","white");
            }
            remplacement();
            setaffichageGrille(!affichageGrille);
        }
        useEffect(() => {
            console.log(grille);
        }, [affichageGrille])
    return (
        <table>
            <tbody>
            {grille.map((ligne,indexL)=>{
    return <tr key={indexL}>
    {ligne.map((cellule,indexC)=>{
       return <td className={"caseMatch "+style.caseMatch} onClick={()=>selected(indexL,indexC)} id={indexL+"A"+indexC} key={indexL+"A"+indexC} ><img className={style.img} alt="cellule" src={"image/"+cellule+".jpg"} /></td>
    })}
    </tr>
})}
    </tbody>
        </table>
    )
}

export default Match3
