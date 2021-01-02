import React from 'react';
import style from './TD.module.css';
import $ from 'jquery';
import Ennemi from './Ennemi';

let taille=[5,8];
let portee=150;
let vitesse=750;
let PV1=100;
let PV2=100;
let PV3=100;

$("#PV1").text("Ennemi 1 : "+PV1);
$("#PV2").text("Ennemi 2 : "+PV2);
$("#PV3").text("Ennemi 2 : "+PV3);

let grilleTD=new Array(taille[0]);
for(let i=0;i<taille[0];i++){
    grilleTD[i]=new Array(taille[1]);
    for(let j=0;j<taille[1];j++){
        
            grilleTD[i][j]="X";
        
    }
}

let chemin={x:7,y:2};

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
if(grilleTD[3][4]!=="O"){
grilleTD[3][4]="T";
}
if(grilleTD[1][2]!=="O"){
grilleTD[1][2]="T";
}

let ennemis=[{caseActuelle:{x:7,y:2},deltaX:5,deltaY:0,right:"0px",top:"200px"}]
setTimeout(()=>{
    ennemis.push({caseActuelle:{x:7,y:2},deltaX:5,deltaY:0,right:"0px",top:"225px"});
    setTimeout(()=>{
        ennemis.push({caseActuelle:{x:7,y:2},deltaX:5,deltaY:0,right:"0px",top:"175px"})
    },2500)
},2500)

let move=setInterval(()=>{
    ennemis.forEach(function(ennemi,index,arrayEnnemis){
    arrayEnnemis[index].rightN=Number(ennemi.right.split("px")[0]);
    arrayEnnemis[index].topN=Number(ennemi.top.split("px")[0]);
    if((arrayEnnemis[index].rightN%40===0 && arrayEnnemis[index].rightN%80===40 && arrayEnnemis[index].topN%40===0 & arrayEnnemis[index].topN%80===40) || ((arrayEnnemis[index].rightN+25)%40===0 && (arrayEnnemis[index].rightN+25)%80===40 && (arrayEnnemis[index].topN-25)%40===0 && (arrayEnnemis[index].topN-25)%80===40) || ((arrayEnnemis[index].rightN-25)%40===0 && (arrayEnnemis[index].rightN-25)%80===40 && (arrayEnnemis[index].topN+25)%40===0 && (arrayEnnemis[index].topN+25)%80===40)){
        if(ennemi.caseActuelle.y>0 && grilleTD[ennemi.caseActuelle.y-1][ennemi.caseActuelle.x]==="O" && ennemi.deltaY<=0){
            arrayEnnemis[index].deltaY=-5;
            arrayEnnemis[index].deltaX=0;
            arrayEnnemis[index].caseActuelle.y--;
        }else if(ennemi.caseActuelle.y<taille[0]-1 && grilleTD[ennemi.caseActuelle.y+1][ennemi.caseActuelle.x]==="O" && ennemi.deltaY>=0){
            arrayEnnemis[index].deltaY=5;
            arrayEnnemis[index].deltaX=0;
            arrayEnnemis[index].caseActuelle.y++;
        }else{
            arrayEnnemis[index].deltaX=5;
            arrayEnnemis[index].deltaY=0;
            arrayEnnemis[index].caseActuelle.x--;
        }
    }
    arrayEnnemis[index].right=(arrayEnnemis[index].rightN+Number(ennemi.deltaX))+"px";
    arrayEnnemis[index].top=(arrayEnnemis[index].topN+Number(ennemi.deltaY))+"px";
    if(arrayEnnemis[index].rightN>=660){
        arrayEnnemis.splice(index,1);
        if(arrayEnnemis.length===0){
            clearInterval(move);
        }
    }
    })
    
},250)

let AttackTour=setInterval(()=>{
    $("."+style.tour).each(function(index){
        console.log(index);
        let distance=[];
        let that=this;
        if($("."+style.ennemi).length>0){
        $("."+style.ennemi).each(function(indexE){
            console.log("E : "+indexE);
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
            if(distance.length>ennemis.length){
                distance[0].numero--;
            }
            Missile(distance[0]);
        if(distance[0].numero===0){
            PV1-=1;
            $("#PV1").text("Ennemi 1 : "+PV1);
        }else if(distance[0].numero===1){
            PV2-=1;
            $("#PV2").text("Ennemi 2 : "+PV2);
        }else{
            PV3-=1;
            $("#PV3").text("Ennemi 3 : "+PV3);
        }
        }
        }else{
    clearInterval(AttackTour);
        }
    })
    },vitesse);
    
    function Missile({numero,ET,ER,TT,TR}){
        console.log("numero : "+numero);
        let missile=$("<div>");
        missile.attr("class",style.missile);
        $('body').append(missile);
        missile.css("top",TT+"px");
        missile.css("left",TR+"px");
        let DY=-(TT-ET+2*ennemis[numero].deltaY);
        let DX=-(TR-ER+2*ennemis[numero].deltaX);
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


function TD() {
    return (
        <div>
            <div id="PV1"></div><div id="PV2"></div><div id="PV3"></div>
            <table id={style.TD}>
                <tbody>
                    {grilleTD.map((element,indexL)=>{
                        return <tr key={"TD"+indexL}>
                        {element.map((cellule,indexC)=>{
                            if(cellule==="X"){
                                return <td className={`${style.bord} ${style.cellule}`} id={indexL+"B"+indexC} key={indexL+"B"+indexC}></td>;
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
                            return <td key={"E"+index}><Ennemi key={index} style={style.ennemi} caracteristique={ennemi}/></td>
                        })}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TD
