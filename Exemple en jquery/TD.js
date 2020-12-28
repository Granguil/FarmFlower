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
    if(alea==0 && chemin.y-1>=0 && grilleTD[chemin.y-1][chemin.x]!="O" ){
        chemin.y--;
    }else if(alea==1 && chemin.y+1<taille[0] && grilleTD[chemin.y+1][chemin.x]!="O" ){
        chemin.y++;
    }else{
        chemin.x--;
    }

}
grilleTD[chemin.y][chemin.x]="O";
if(grilleTD[3][4]!="O"){
grilleTD[3][4]="T";
}
if(grilleTD[1][2]!="O"){
grilleTD[1][2]="T";
}

let tableauTD="";
grilleTD.map((ligne,indexL)=>{
    tableauTD+="<tr>";
    ligne.map((cellule,indexC)=>{
        if(cellule=="X"){
            tableauTD+="<td class='bord cellule' id="+indexL+"B"+indexC +"></td>";
        }else if(cellule=="O"){
            tableauTD+="<td class='chemin cellule' id="+indexL+"B"+indexC +"></td>";
        }else if(cellule=="T"){
            tableauTD+="<td class='bord cellule' id="+indexL+"B"+indexC +"><div class='tour feu' >F</div></td>";
        }
    })
    tableauTD+="</tr>";
})
let deltaX=[5];
let deltaY=[0];
$("#TD").append(tableauTD);
let ennemi=$("<div>");
ennemi.attr("class","ennemi ennemiCC");
$("#TD").append(ennemi);
let caseE1=[{x:7,y:2}];
let move=setInterval(()=>{
    $(".ennemi").each(function(index){
    let distanceX=Number($(this).css("right").split("px")[0]);
    let distanceY=Number($(this).css("top").split("px")[0]);
    if((distanceX%40==0 && distanceX%80==40 && distanceY%40==0 & distanceY%80==40) || ((distanceX+25)%40==0 && (distanceX+25)%80==40 && (distanceY-25)%40==0 && (distanceY-25)%80==40) || ((distanceX-25)%40==0 && (distanceX-25)%80==40 && (distanceY+25)%40==0 && (distanceY+25)%80==40)){
        if(caseE1[index].y>0 && grilleTD[caseE1[index].y-1][caseE1[index].x]=="O" && deltaY[index]<=0){
            deltaY[index]=-5;
            deltaX[index]=0;
            caseE1[index].y--;
        }else if(caseE1[index].y<taille[0]-1 && grilleTD[caseE1[index].y+1][caseE1[index].x]=="O" && deltaY[index]>=0){
            deltaY[index]=5;
            deltaX[index]=0;
            caseE1[index].y++;
        }else{
            deltaX[index]=5;
            deltaY[index]=0;
            caseE1[index].x--;
        }
    }$(this).css("right",distanceX+deltaX[index]+"px");
    $(this).css("top",distanceY+deltaY[index]+"px");
    if(distanceX>=660){
        $(this).remove();
        deltaX.splice(index,1);
        deltaY.splice(index,1);
        caseE1.splice(index,1);
        if($(".ennemi").length==0){
            clearInterval(move);
        }
    }
    })
},250)
setTimeout(()=>{
    let ennemi2=$("<div>");
    $("#TD").append(ennemi2);
    ennemi2.attr("class","ennemi ennemiCH");
    deltaX.push(5);
    deltaY.push(0);
    caseE1.push({x:7,y:2});
    setTimeout(()=>{
        let ennemi3=$("<div>");
        $("#TD").append(ennemi3);
        ennemi3.attr("class","ennemi ennemiCB");
        deltaX.push(5);
        deltaY.push(0);
        caseE1.push({x:7,y:2});
    },3500)
},3500);

let AttackTour=setInterval(()=>{
$(".tour").each(function(index){
    let distance=new Array();
    let that=this;
    if($(".ennemi").length>0){
    $(".ennemi").each(function(indexE){
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
        Missile(distance[0],that);
    if(distance[0].numero==0){
        PV1-=1;
        $("#PV1").text("Ennemi 1 : "+PV1);
    }else if(distance[0].numero==1){
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

function Missile({distance,numero,ET,ER,TT,TR}){
    let missile=$("<div>");
    missile.attr("class","missile");
    $('body').append(missile);
    missile.css("top",TT+"px");
    missile.css("left",TR+"px");
    let DY=-(TT-ET+2*deltaY[numero]);
    let DX=-(TR-ER+2*deltaX[numero]);
    let compteur=0;
    let send=setInterval(()=>{
        compteur++;
        missile.css("top",(TT+DY*compteur/4)+"px");
        missile.css("left",(TR+DX*compteur/4)+"px");
        if(compteur==5){
            clearInterval(send);
            missile.remove();
        }
    },vitesse/5)
}