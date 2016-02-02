/*
This function makes an async. HTTP-get call to 'theUrl'
*/
function httpGetAsync(theUrl, callback){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}


/*
This function makes a synchronous HTTP-get call to 'theUrl'
*/
function httpGet(theUrl){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}




/*
Returns true or false, wheter the string 'str' contains characters that is not alphanumeric and could be considered dangerous when making an API-call.
*/
function isDangerous(str){
    var reg = /[^A-Za-z0-9 ]/; // Alphanumeric
    isUnsafe = reg.test(str);
    return isUnsafe;
}



/*
Provided correct credentials, this function will return the entire inventory.
*/
function getInventory(username,password){
    if (isDangerous(username) || isDangerous(password)){
        console.log("Error: Username or password contained potential dangerous characters...");
        return;
    } else{
        url = "http://pub.jamaica-inn.net/fpdb/api.php?username="+username+"&password="+password+"&action=inventory_get"
        response = httpGet(url);
        console.log(response);
        return response;
    }
}








