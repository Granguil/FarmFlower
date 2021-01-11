import { createSlice } from '@reduxjs/toolkit';
import style from './TD.module.css';
import $ from 'jquery';

const findIndex=(tab,id)=>{
    let compteur=0;
    let index=0;
    for(let i=0;i<tab.length;i++){
        if(tab[i].pv>0 && tab[i].traverse===0){
            if(compteur===id){
                index=i;
            }
            compteur++;
        }
    }
    return index;
}

export const TDSlice = createSlice({
  name: 'TD',
  initialState: {
    taille:[5,8],
    portee:150,
    vitesse:750,
    nbParvague:5,
    grille:[],
    chemin:{x:7,y:2},
    nbToursRestantes:2,
    ennemis:[],
    finVague:0,
    vagueEnCours:0,
  },
  reducers: {
    generateTD:(state)=>{
        let taille=state.taille;
        let grilleTD=new Array(taille[0]);
        for(let i=0;i<taille[0];i++){
            grilleTD[i]=new Array(taille[1]);
            for(let j=0;j<taille[1];j++){
                
                    grilleTD[i][j]="X";   
            }
        }
        let chemin={...state.chemin};
        while(chemin.x>0){
            grilleTD[chemin.y][chemin.x]="O";
            
            let alea=Math.floor(Math.random()*8);
            if(alea===0 && chemin.y-1>=0 && grilleTD[chemin.y-1][chemin.x]!=="O" ){
                chemin.y--;
            }else if(alea===1 && chemin.y+1<taille[0] && grilleTD[chemin.y+1][chemin.x]!=="O" ){
                chemin.y++;
            }else{
                chemin.x--;
            }
        }
        grilleTD[chemin.y][chemin.x]="O";
    return {...state,grille:grilleTD};
    },
    placementTour:(state,{payload})=>{
        let {grille,nbToursRestantes}={...state};
        const grilleTD=grille.map((ligne,indexL)=>ligne.map((cellule,indexC)=>{
            if(indexL===payload.y && indexC===payload.x){
                return "T";
            }else{
                return cellule;
            }
        }))
        nbToursRestantes--;
        return {...state,grille:[...grilleTD],nbToursRestantes:nbToursRestantes};
       //return {...state};
    },
    ennemiCreated:(state,{payload})=>{
        let ennemis=[...state.ennemis];
        let alea=Math.random()*3;
        let posDepart=200;
        if(alea<1){
            posDepart=175;
        }else if(alea>2){
            posDepart=225;
        }
        ennemis.push({caseActuelle:{x:7,y:2},deltaX:5,deltaY:0,right:"0px",top:posDepart+"px",pv:50,traverse:0});
        return {...state,ennemis:ennemis,vagueEnCours:1};
    },
    moveVague:(state,{payload})=>{
        //alert("P :"+JSON.stringify(payload));
        let ennemis=[...state.ennemis];
        if(ennemis.length>0){
        let grilleTD=[...state.grille];
        let taille=[...state.taille];
        let finVague=state.finVague;
        //alert("ES : "+JSON.stringify(ennemis));
        let ennemisListe=ennemis.map((ennemi,index)=>{
            //alert("E : "+JSON.stringify(ennemi));
        const rightN=Number(ennemi.right.split("px")[0]);
        const topN=Number(ennemi.top.split("px")[0]);
    if((rightN%40===0 && rightN%80===40 && topN%40===0 & topN%80===40) || ((rightN+25)%40===0 && (rightN+25)%80===40 && (topN-25)%40===0 && (topN-25)%80===40) || ((rightN-25)%40===0 && (rightN-25)%80===40 && (topN+25)%40===0 && (topN+25)%80===40)){
        if(ennemi.caseActuelle.y>0 && grilleTD[ennemi.caseActuelle.y-1][ennemi.caseActuelle.x]==="O" && ennemi.deltaY<=0){
           /* ennemi.deltaY=-5;
            ennemi.deltaX=0;
            ennemi.caseActuelle.y--;*/
            ennemi={...ennemi,deltaX:0,deltaY:-5,caseActuelle:{...ennemi.caseActuelle,y:ennemi.caseActuelle.y-1}};
        }else if(ennemi.caseActuelle.y<taille[0]-1 && grilleTD[ennemi.caseActuelle.y+1][ennemi.caseActuelle.x]==="O" && ennemi.deltaY>=0){
            /*ennemi.deltaY=5;
            ennemi.deltaX=0;
            ennemi.caseActuelle.y++;*/
            ennemi={...ennemi,deltaX:0,deltaY:5,caseActuelle:{...ennemi.caseActuelle,y:ennemi.caseActuelle.y+1}};
        }else{
            /*ennemi.deltaX=5;
            ennemi.deltaY=0;
            ennemi.caseActuelle.x--;*/
            ennemi={...ennemi,deltaX:5,deltaY:0,caseActuelle:{...ennemi.caseActuelle,x:ennemi.caseActuelle.x-1}};
        }
    }
    ennemi={...ennemi,right:rightN+Number(ennemi.deltaX)+"px",top:topN+Number(ennemi.deltaY)+"px"};
    if(rightN>=660){
        ennemi={...ennemi,traverse:1};
    }
    return ennemi;
    })
    ennemis=ennemisListe.filter((ennemi)=>ennemi.pv>0 && ennemi.traverse===0);
    if(ennemis.length===0){
        //alert(payload.move);
        //alert("Fin Vague");
        ennemisListe=[...[]];
        finVague=1;
    }
    //alert("EL : "+JSON.stringify(ennemisListe));
    return {...state,ennemis:[...ennemisListe],finVague:finVague}
    }else{
        return {...state};
    }
    },
    newVague:(state)=>{
        return {...state,finVague:0,vagueEnCours:1};
    },
    finDeLaVague:(state)=>{
        return {...state,finVague:0,vagueEnCours:0};
    },
    degat:(state,{payload})=>{
        const ennemis=[...state.ennemis];
        const index=findIndex(ennemis,payload.id);
        //alert("Index : "+index);
        const ennemisListe=ennemis.map((ennemi,index2)=>{
            if(index===index2){
                ennemi={...ennemi,pv:ennemi.pv-5};
            }
            //alert("PV : "+ennemi.pv);
            return ennemi;
        })
        //alert(JSON.stringify(ennemisListe));
        return {...state,ennemis:ennemisListe}
    }
  },
  /*extraReducers:{
    [eatDragon]:(state,action)=>{
      return {...state,carotte:{...state.carotte,number:state.carotte.number-action.payload.niveau*2},avocat:{...state.avocat,number:state.avocat.number-action.payload.niveau}}
    }
  }*/
});

export const {generateTD, placementTour, ennemiCreated, moveVague, newVague, finDeLaVague, degat} = TDSlice.actions;

export const startVague=()=>(dispatch,getState)=>
    {
        const state=getState();
        
        dispatch(ennemiCreated());
        
        
        dispatch(moveStart());
        for(let i=1;i<state.TD.nbParvague;i++){
            
            setTimeout(()=>{
                
                dispatch(ennemiCreated());
            },i*2500);
        }
        
}
export const generateNewTD=()=>dispatch=>{
    dispatch(generateTD());
}

const moveStart=()=>(dispatch)=>{
    dispatch(newVague());
    dispatch(AttackTour());
    const move=setInterval(()=>{
    
    dispatch(moveVague());
    dispatch(endVague(move));
    },250)
}

const endVague=(SI)=>(dispatch,getState)=>{
    const state=getState();
    if(state.TD.ennemis.length===0){
        alert("Fin");
        clearInterval(SI);
        dispatch(finDeLaVague());
    }
}


const AttackTour=()=>(dispatch,getState)=>{
    const vitesse=getState().TD.vitesse;
    const AT=setInterval(()=>{
        dispatch(AttackFunction());
        dispatch(endAttack(AT));
    },vitesse)
};

const endAttack=(EA)=>(dispatch,getState)=>{
    const state=getState();
    if(state.TD.ennemis.length===0){
        alert("EndAttack");
        clearInterval(EA);
    }
}

    const AttackFunction=()=>(dispatch,getState)=>{
    const state=getState();
    const portee=state.TD.portee;
    $("."+style.tour).each(function(index){
        let distance=[];
        let that=this;
        if($("."+style.ennemi).length>0){
        $("."+style.ennemi).each(function(indexE){
            let ET=Number($(this).offset().top+5);
            let ER=Number($(this).offset().left+5);
            let TT=Number($(that).offset().top+40);
            let TR=Number($(that).offset().left+40);
            let distanceEnnemi=Math.sqrt(Math.pow(ET-TT,2)+Math.pow(ER-TR,2));
            distance.push({numero:indexE,distance:distanceEnnemi,ET,ER,TT,TR});
        })
        distance.sort((a,b)=>{
            if(a.distance>=b.distance){
                return 1;
            }else{
                return -1;
            }
        })
        
        if(distance[0].distance<=portee){
            dispatch(Missile(distance[0]));
            dispatch(degat({id:distance[0].numero}));
        }
        }
    })
    }
    
    const Missile=({numero,ET,ER,TT,TR})=>(dispatch,getState)=>{
        const state=getState();
        const vitesse=state.TD.vitesse;
        const ennemis=state.TD.ennemis;
        const index=findIndex(ennemis,numero);
        let missile=$("<div>");
        missile.attr("class",style.missile);
        $('body').append(missile);
        missile.css("top",TT+"px");
        missile.css("left",TR+"px");
        let DY, DX;
        DY=-(TT-ET+3*ennemis[index].deltaY);
        DX=-(TR-ER+3*ennemis[index].deltaX);
        let compteur=0;
        let send=setInterval(()=>{
            compteur++;
            missile.css("top",(TT+DY*compteur/4)+"px");
            missile.css("left",(TR+DX*compteur/4)+"px");
            if(compteur===5){
                clearInterval(send);
                missile.remove();
            }
        },vitesse/5)
    }

export const selectGrilleTD = state => state.TD.grille;
export const selectEnnemis = state => state.TD.ennemis;
export const selectNbTours = state => state.TD.nbToursRestantes;
export const selectNbParVague = state => state.TD.nbParvague;
export const selectFinVague = state => state.TD.finVague;
export const selectVagueEnCours = state => state.TD.vagueEnCours;
export const selectPortee =  state => state.TD.portee;
export const selectVitesse = state => state.TD.vitesse;

export default TDSlice.reducer;