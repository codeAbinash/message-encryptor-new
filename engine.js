let input = document.getElementById("write");
let output = document.getElementById("output");
let pass = document.getElementById("pass");


function clearText (){
    input.value = "";
    input.focus()
}

function copyText (){
    output.disabled = false;
    output.select();
    output.setSelectionRange(0, 99999)
    document.execCommand("copy");
    output.disabled = true;
    input.select();
}
const data = "‌‍‎​";
const charEncode = "⁝∶⁚";



function clearText (){
    input.value = "";
    input.focus()
}

function copyText (){
    output.disabled = false;
    output.select();
    output.setSelectionRange(0, 99999)
    document.execCommand("copy");
    output.disabled = true;
    input.select();
}


function encodeCh(ch,p){
    let encoded = ""
    if(p==undefined||Number(p)==NaN)
        ch = ch.charCodeAt(0).toString(4);
    else
        ch = (ch.charCodeAt(0)+Number(p)).toString(4);
    for(i in ch){
        encoded += data[Number(ch[i])];
        // console.log(data[Number(ch[i])]);
    }
    return encoded;
}



function decodeCh(ch,p){
    let num = "";
    for(i in ch)
        num += data.indexOf(ch[i]);
    if(p==undefined||Number(p)==NaN)
        num = parseInt(num,4);
    else
        num = parseInt(num,4) - Number(p);
    return String.fromCharCode(Number(num));
}

function encode(str,p){
    let encoded = codeByLen(str.split(" ").length +1);
    for(i in str)
        encoded += encodeCh(str[i],p) + "‏";
    return encoded;
}

function decode(str,p){
    str = removeFrontCh(str);
    let chars = str.split("‏");
    let decoded = "";
    for(i in chars)
        decoded = decoded + decodeCh(chars[i],p);
    return decoded;
}

function codeByLen(n){
    let code = "";
    for(let i=0;i<n;i++)
        code += charEncode[i%3];
    return code;
}


function removeFrontCh(str){
    for(let i in charEncode)
        while(str.includes(charEncode[i]))
            str = str.replace(charEncode[i],""); 
    return str;
}


//Set Oninput event on input
input.oninput = function(){write();}
pass.oninput = function(){write();}

function write(){
    let message = input.value;
    let password = Number(pass.value);
    let outData = ""
    let searchIn = "‏" + charEncode + data;
    //Decide if it is encoded or not
    let isFound = false;
    for(i in message){
        if(searchIn.indexOf(message[i]) === -1){
            isFound = true;
            break;
        }
    }

    if(password.length == 0)
        password = undefined;

    if(isFound)
        outData = encode(message,password);
    else
        outData = decode(message,password);

    
    output.value = outData;
    document.getElementById("whatsappLink").href = "whatsapp://send?text=" + outData;
}


