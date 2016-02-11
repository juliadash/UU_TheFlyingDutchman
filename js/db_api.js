/*
 BASE API URL:
 http://pub.jamaica-inn.net/fpdb/api.php?username="+username+"&password="+password+"&action=


 Response structure:

 {
 "type": "type_of_response",
 "payload" : [
 {property1:"abc", property2:"xyz"},                  <---- object 1
 {property1:"abc", property2:"xyz"},                  <---- object 2
 ...
 ...
 {property1:"abc", property2:"xyz"},                  <---- object N-1
 {property1:"abc", property2:"xyz"},                  <---- object N
 ]
 }



 EXAMPLE Query:
 curl http://pub.jamaica-inn.net/fpdb/api.php?username=jorass&password=jorass&action=beer_data_get&beer_id=150103

 */






/*
 TODO:
 fetch beers, create new object with tags etc.... populate DOM.

 */




/*
 This function makes an async. HTTP-get call to 'theUrl'
 */
function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}


/*
 This function makes a synchronous HTTP-get call to 'theUrl'
 */
function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}


/*
 Returns true or false, wheter the string 'str' contains characters that is not alphanumeric and could be considered dangerous when making an API-call.
 */
function isDangerous(str) {
    var reg = /[^A-Za-z0-9 ]/; // Alphanumeric
    isUnsafe = reg.test(str);
    return isUnsafe;
}


/*
 Provided correct admin-credentials, this function will return the entire inventory.
 example credentials: jorass:jorass
 */
function getInventory(username, password) {
    if (isDangerous(username) || isDangerous(password)) {
        console.log("Error: Username or password contained potential dangerous characters...");
        return;
    } else {
        url = "http://pub.jamaica-inn.net/fpdb/api.php?username=" + username + "&password=" + password + "&action=inventory_get"
        response = httpGet(url);
        console.log(response);
        return response;
    }
}


/*
 Gives a list of all purchases made by the specified user 'username'.
 example credentials: aamsta:aamsta
 */
function getPurchases(username, password) {
    if (isDangerous(username) || isDangerous(password)) {
        console.log("Error: Username or password contained potential dangerous characters...");
        return;
    } else {
        url = "http://pub.jamaica-inn.net/fpdb/api.php?username=" + username + "&password=" + password + "&action=purchases_get"
        response = httpGet(url);
        console.log(response);
        return response;
    }
}


/*

 Returns all information available in the system for a specified beer. This includes name, price, alcohol
 volume, etc. The id of the beer for inquiry is a required additional parameter

 example usage:
 txt = getBeerData("aamsta","aamsta",150103);
 obj = JSON.parse(txt);
 nameOfBeer = obj.payload[0].namn;
 */
function getBeerData(username, password, beerID) {
    if (isDangerous(username) || isDangerous(password) || isDangerous(beerID)) {
        console.log("Error: Username or password contained potential dangerous characters...");
        return;
    } else {
        url = "http://pub.jamaica-inn.net/fpdb/api.php?username=" + username + "&password=" + password + "&action=beer_data_get&beer_id=" + beerID
        response = httpGet(url);
        console.log(response);
        return response;
    }
}


function getAvailBeers() {
    beer_list = [];
    invtxt = getInventory("jorass", "jorass");
    obj = JSON.parse(invtxt);
    inv_list = obj.payload;
    for (i = 0; i < inv_list.length; i++) {
        if (inv_list[i].count > 0) {
            b = inv_list[i]
            beer = {"namn": b.namn, "namn2": b.namn2, "price": b.price}
            beer_list.push(beer);
        }
    }
    return beer_list;
}


/*Returns the number of beers with 'beerID'*/
function amountInInventory(username, password, beerID) {
    if (isDangerous(username) || isDangerous(password) || isDangerous(beerID)) {
        console.log("Error: Username or password contained potential dangerous characters...");
        return;
    } else {
        txt = getInventory(username, password);
        obj = JSON.parse(txt);

        for (i = 0; i < obj.payload.length; i++) {
            if (obj.payload[i].beer_id == beerID) // both are strings
                return obj.payload[i].count;
        }
    }
}


/*
 makes a purchase if the amount of beers are more than the amount purchased and the user has enough funds.
 */
function makePurchase(username, password, beerID, amount) {
    if (isDangerous(username) || isDangerous(password) || isDangerous(beerID)) {
        console.log("Error: Username or password contained potential dangerous characters...");
        return;
    } else {
        if (amountInInventory(username, password, beerID) > amount) {

            // check if they have the funds...
            // if so: Make purchase!
            // else: return
        }
        else {
            console.log("not enough items in inventory");
            return;
        }
        return;
    }
}


function populateBeers() {
    var j = 0;
    beers = getAvailBeers();
    var beerString = '<div class="row">';
    for (var i = 0; i < beers.length; i++) {
        b = beers[i];
        if (b.namn == "" || b.namn2 == "" || b.price == "") {
            j--;
        } else {
            if (j % 3 === 2) {
                beerString += '<div class="col-md-3" ondrop="onDrop(event)" ondragover="onDragOver(event)" style="min-height: 176px; border: 1px solid #aaaaaa;">' +
                    '<div id="'+ b.namn + b.namn2 +'" class="card" draggable="true" ondragstart="onDragStart(event)" ondragover="onDragOver(event)" style="border: 1px solid #aaaaaa;">' +
                    '<div class="card-header"></div><div class="card-content"><h3>' + b.namn + "</h3><h4>" + b.namn2 + "</h4><b>" + b.price + ' SEK</b></div></div></div></div></div><div class="row">';
            } else {
                beerString += '</div><div class="col-md-3" ondrop="onDrop(event)" ondragover="onDragOver(event)" style="min-height: 176px; border: 1px solid #aaaaaa;">' +
                    '<div id="'+ b.namn + b.namn2 +'" class="card" draggable="true" ondragstart="onDragStart(event)" ondragover="onDragOver(event)" style="border: 1px solid #aaaaaa;">' +
                    '<div class="card-header"></div><div class="card-content"><h3>' + b.namn + "</h3><h4>" + b.namn2 + "</h4><b>" + b.price + ' SEK</b></div></div></div></div></div>';
            }
        }
        j++;
    }
    beerString = beerString + "</div>";

    $("#beerGrid").html(beerString);
}














