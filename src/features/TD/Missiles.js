import React from 'react';
import $ from 'jquery';
import style from './TD.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectEnnemis, selectPortee, selectVitesse, degat } from './TDSlice';

const AttackTour=(vitesse,portee,ennemis,dispatch)=>{setInterval(()=>{AttackFunction(portee,ennemis,vitesse,dispatch)},vitesse)};

    function AttackFunction(portee,ennemis,vitesse,dispatch){
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
            Missile(distance[0],ennemis,vitesse);
            dispatch(degat({id:distance[0].numero}))
        }
        }else{
    //clearInterval(AttackTour);
        }
    })
    }
    
    function Missile({numero,ET,ER,TT,TR},ennemis,vitesse){
        if(ennemis.length>0){
            if(numero>ennemis.length){
               numero=ennemis.length-1;
            }
        let missile=$("<div>");
        missile.attr("class",style.missile);
        $('body').append(missile);
        missile.css("top",TT+"px");
        missile.css("left",TR+"px");
        let DY, DX;
        if(ennemis[numero]!==undefined){
        DY=-(TT-ET+3*ennemis[numero].deltaY);
        DX=-(TR-ER+3*ennemis[numero].deltaX);
        }else{
        DY=0;
        DX=0;
        }
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
    }

function Missiles() {
    const dispatch=useDispatch();
    const ennemis=useSelector(selectEnnemis);
    const portee=useSelector(selectPortee);
    const vitesse=useSelector(selectVitesse);
    AttackTour(vitesse,portee,ennemis,dispatch);
    return (
        <div>
            
        </div>
    )
}

export default Missiles;
