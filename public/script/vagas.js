function selecionar(id){
    var vagas= document.getElementsByClassName('lista_vagas');
    for(var i=0; i<vagas.length; i++)
    {
        vagas[i].style["background-color"] = '#FFFFFF';
    }
     document.getElementById('card_'+id).style = 'background-color: #B0BBE1; width: 100%; height: 10rem'
 
     
 
     var selecionada= document.getElementsByClassName('selecionada');
 
     for(var i=0; i<selecionada.length; i++)
    {
        selecionada[i].style["display"] = 'none';
    }
 
     document.getElementById('seleciona_'+id).style["display"] = 'block';;
 }