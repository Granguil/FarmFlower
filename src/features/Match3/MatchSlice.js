import { createSlice } from '@reduxjs/toolkit';
import $ from 'jquery';


const NbPoints=(compteur)=>{
    return compteur*compteur;
}

const copy=(tab)=>{
    let grille=new Array(tab.length);
    for(let i=0;i<tab.length;i++){
        grille[i]=new Array(tab[i].length);
        for(let j=0;j<tab[i].length;j++){
            grille[i][j]=tab[i][j];
        }
    }
    return grille;
}

export const MatchSlice = createSlice({
    name: "match",
    initialState:{
        Symbole:["A","E","F","T"],
        idSwap:[],
        idOrigin:"",
        grille:[],
        taille:[10,10],
        points:0,
        dragonFeu:"",
    },
    reducers:{
        generateGrille:(state)=>{
        let grille=new Array(state.taille[0]);
        for(let i=0;i<state.taille[0];i++){
            grille[i]=new Array(state.taille[1]);
            for(let j=0;j<state.taille[1];j++){   
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
                grille[i][j]=state.Symbole[alea];
                }while(impossible.includes(grille[i][j]));
            }
        }
        return {...state,grille:grille}
    },
    remplacementVide:(state)=>{
        let grille=copy([...state.grille]);
        for(let i=0;i<grille[0].length;i++){
            for(let j=0;j<grille.length;j++){
                if(grille[j][i]==="O"){
                    for(let k=j;k>0;k--){
                        grille[k][i]=grille[k-1][i];
                    }
                    let alea=Math.floor(Math.random()*4);
                    grille[0][i]=state.Symbole[alea];
                }
            }
        }
        console.log(grille);
        return {...state,grille:[...grille]}
    },
    newIdSwap:(state)=>{
        return {...state,idSwap:[...[]]};
    },
    newIdOrigin:(state,{payload})=>{
        return {...state,idOrigin:payload}
    },
    majGrille:(state,{payload})=>{
        return {...state,grille:[...payload]}
    },
    dragonFeu:(state,{payload})=>{
        return {...state,dragonFeu:{...payload}}
    },
    addPoints:(state,{payload})=>{
        return {...state,points:state.points+payload}
    },
    idSwapMaj:(state,{payload})=>{
        return {...state,idSwap:[...payload]}
    }
    },
    extraReducers:{

    }
})

export const {generateGrille,remplacementVide,newIdSwap,majGrille,dragonFeu,addPoints,idSwapMaj,newIdOrigin} =MatchSlice.actions;

export const remplacement=()=>(dispatch)=>{
    $(".caseMatch").css("background-color","white");
    dispatch(remplacementVide());
}

export const selected=({ligne,colonne})=>(dispatch,getState)=>{
    const state=getState();
    const grille=copy(state.match.grille);
    let id=ligne+"A"+colonne;
    let idCoord=[ligne,colonne];
    if(state.match.idSwap.includes(id)){
        dispatch(newIdSwap());
        const idOriginCoord=state.match.idOrigin.split("A");
        let tempElement=grille[idCoord[0]][idCoord[1]];
        grille[idCoord[0]][idCoord[1]]=grille[idOriginCoord[0]][idOriginCoord[1]]
        grille[idOriginCoord[0]][idOriginCoord[1]]=tempElement;
        dispatch(majGrille([...grille]));
        //dispatch(remplacement());
        let bool=verifChangement(idCoord,idOriginCoord);
        if(!bool){
            setTimeout(()=>{
                tempElement=grille[idCoord[0]][idCoord[1]];
                grille[idCoord[0]][idCoord[1]]=grille[idOriginCoord[0]][idOriginCoord[1]]
                grille[idOriginCoord[0]][idOriginCoord[1]]=tempElement;
                dispatch(majGrille([...grille]));
            },2000);
        }else{
            dispatch(remplacement());
            dispatch(NewMatch());
        }
    }else{
        dispatch(newIdOrigin(id));
        let coordonnee=id.split("A");
        $("#"+ligne+"A"+colonne).css("background-color","darkred");
        $("#"+coordonnee[0]+"A"+(coordonnee[1]-1)).css("background-color","green");
        $("#"+coordonnee[0]+"A"+(Number(coordonnee[1])+1)).css("background-color","green");
        $("#"+(Number(coordonnee[0])+1)+"A"+coordonnee[1]).css("background-color","green");
        $("#"+(coordonnee[0]-1)+"A"+coordonnee[1]).css("background-color","green");
        let idSwap=[];
        idSwap.push(coordonnee[0]+"A"+(coordonnee[1]-1));
        idSwap.push(coordonnee[0]+"A"+(Number(coordonnee[1])+1));
        idSwap.push((Number(coordonnee[0])+1)+"A"+coordonnee[1]);
        idSwap.push((coordonnee[0]-1)+"A"+coordonnee[1]);
        dispatch(idSwapMaj(idSwap));
    }
}

const verifChangement=(idCoord,idOriginCoord)=>(dispatch,getState)=>{
    let bool=false;
    const state=getState();
    const grille=copy(state.match.grille);
    let [bool1,grille2]=dispatch(verifCellule(idCoord,grille));
    let [bool2,grille3]=dispatch(verifCellule(idOriginCoord,grille2));
    bool=bool1 || bool2;
    if(bool){
        dispatch(majGrille([...grille3]));
    }
return bool;
}

const verifCellule=([y,x],grille)=>(dispatch,getState)=>{
    y=Number(y);
    x=Number(x);
    const state=getState();
    let element=grille[y][x];
    let bonus=1;
    if(element==="F"){
        bonus=state.match.dragonFeu.niveau*2;
    }
    let booly=false;
    let boolx=false;
    let PointsAjoutes=0;
    let compteurX=0;
    let compteurY=0;
    if(y>0 && grille[y-1][x]===element){
        if(y>1 && grille[y-2][x]===element){
            grille[y-1][x]="O";
            grille[y-2][x]="O";
            compteurY=3;
            booly=true;
            if(y<9 && grille[y+1][x]===element){
                grille[y+1][x]="O";
                compteurY++;
                if(y<8 && grille[y+2][x]===element){
                    grille[y+2][x]="O";
                    compteurY++;
                }
            }
        }else if(y<9 && grille[y+1][x]===element){
            grille[y+1][x]="O";
            grille[y-1][x]="O";
            compteurY=3;
            booly=true;
            if(y<8 && grille[y+2][x]===element){
                grille[y+2][x]="O";
                compteurY++;
            }
        }
    }else if(y<8 && grille[y+1][x]===element && grille[y+2][x]===element){
        grille[y+1][x]="O";
        grille[y+2][x]="O";
        compteurY=3;
        booly=true;
    }
    if(x>0 && grille[y][x-1]===element){
        if(x>1 && grille[y][x-2]===element){
            grille[y][x-1]="O";
            grille[y][x-2]="O";
            compteurX=3;
            boolx=true;
            if(x<9 && grille[y][x+1]===element){
                grille[y][x+1]="O";
                compteurX++;
                if(x<8 && grille[y][x+2]===element){
                    grille[y][x+2]="O";
                    compteurX++;
                }
            }
        }else if(x<9 && grille[y][x+1]===element){
            grille[y][x+1]="O";
            grille[y][x-1]="O";
            compteurX=3;
            boolx=true;
            if(x<8 && grille[y][x+2]===element){
                grille[y][x+2]="O";
                compteurX=4;
            }
        }
    }else if(x<8 && grille[y][x+1]===element && grille[y][x+2]===element){
        grille[y][x+1]="O";
        grille[y][x+2]="O";
        compteurX=3;
        boolx=true;
    }
    if(boolx || booly){
        grille[y][x]="O";
        
        PointsAjoutes+=NbPoints(compteurX)+NbPoints(compteurY);
        
        dispatch(addPoints(PointsAjoutes*bonus));
    }
    return [boolx || booly,grille];
}

const NewMatch=()=>(dispatch,getState)=>{
    const state=getState();
    const grille=copy(state.match.grille);
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
    //dispatch(majGrille([...grille]));
    for(let coord of coordASuppr){
        //grille[coord.y][coord.x]="S";
        
        $("#"+coord.y+"A"+coord.x).css("background-color","blue");
        
    }
    if(coordASuppr.length>0){
        bool=true;
    }
    if(bool){
        setTimeout(()=>{
            dispatch(RemoveTuile(coordASuppr));
            dispatch(NewMatch());
        },2500);
    }
}

const RemoveTuile=(coordASuppr)=>(dispatch,getState)=>{
    const state=getState();
    const grille=copy(state.match.grille);
    let pointsAjoutés=0;
    let avY=-1;
    let avX=-1;
    let compteur=1;
    let element;
    let bonus;
    for(let coord of coordASuppr){
        bonus=1;
        let elt=grille[coord.y][coord.x];
        if(element==="F"){
            bonus=state.match.dragonFeu.niveau;
        }
        grille[coord.y][coord.x]="O";
        if((coord.y===avY || coord.x===avX) && elt===element){
            compteur++;
        }else{
            
            if(compteur>=3){
            pointsAjoutés+=NbPoints(compteur)*bonus;
            
            compteur=1;
            }
        }
        avX=coord.x;
        avY=coord.y;
        $("#"+coord.y+"A"+coord.x).css("background-color","white");
        element=elt;
        //alert("Fin Boucle");
    }
    pointsAjoutés+=NbPoints(compteur)*bonus;
    dispatch(addPoints(pointsAjoutés));
    dispatch(majGrille([...grille]));
    dispatch(remplacement());
    
}

export const selectGrille = state => state.match.grille;
export const selectPoints = state => state.match.points;

export default MatchSlice.reducer;