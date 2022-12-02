function getDataCompleta(){
    let data = new Date();
    return data;
}

function getDia(){
    let data = new Date();         
    let dia = String(data.getDate()).padStart(2, '0');
    return dia;
}

function getMes(){
    let data = new Date();         
    let mes = String(data.getMonth()).padStart(2, '0');
    return mes;
}

function getAno(){
    let data = new Date();         
    let ano = String(data.getFullYear());
    return ano;
}

function getHora(){
    let data = new Date();
    let hora = data.getHours() < 10 ? "0"+data.getHours() : data.getHours();
    let minuto = (data.getMinutes()) < 10 ? "0"+ (data.getMinutes())  : (data.getMinutes());
    let segundo = data.getSeconds() < 10 ? "0"+data.getSeconds(): data.getSeconds();
    let horaCompleta = hora+":"+minuto+":"+segundo;
    return horaCompleta;
}

function getMesNome(){
    let data = new Date();         
    let mes = String(data.getMonth()).padStart(2, '0');
    let mesNome;
    switch(mes){
        case "00":
            mesNome = "Janeiro"
        break
        case "01":
            mesNome = "Fevereiro"
        break
        case "02":
            mesNome = "Março"
        break
        case "03":
            mesNome = "Abril"
        break
        case "04":
            mesNome = "Maio"
        break
        case "05":
            mesNome = "Junho"
        break
        case "06":
            mesNome = "Julho"
        break
        case "07":
            mesNome = "Agosto"
        break
        case "08":
            mesNome = "Setembro"
        break
        case "09":
            mesNome = "Outubro"
        break
        case "10":
            mesNome = "Novembro"
        break
        case "11":
            mesNome = "Dezembro"
        break

    }
    return mesNome
}

function dataCompleta(dataFuturo){
    let dataCompleta = dataFuturo[3]+dataFuturo[4]+dataFuturo[2]+dataFuturo[0]+dataFuturo[1]+dataFuturo[5]+dataFuturo[6]+dataFuturo[7]+dataFuturo[8]+dataFuturo[9];
    return dataCompleta;
}