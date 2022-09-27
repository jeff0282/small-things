/*

#####################################################
#
# HELLO ALL!!
#
# YES, I AM ABSOLUTELY AWARE THAT THIS JS SUCKS
#
# COMING BACK TO IT MONTHS AFTER, I HAD A PRETTY 
# GOOD CHUCKLE AT HOW CRAP IT IS!
#
# I'VE TIDIED SOME THINGS UP, BUT GIVEN WHAT
# IT IS, I'M NOT GONNA WASTE TOO MUCH TIME ON IT
#
#####################################################


FUNCTIONS TO RETURN IMAGES FROM THEIR RESPECTIVE APIs
+ SOME OTHER STUFF

APIs Used: 
catboys.com/api
waifu.pics
random-d.uk

*/

var imageURL; //declared seperately for scope reasons


//Gets User Desired Images from Form (as string), allows for easy usage of all functions (just call one function display())
function display() {
    clearDisplay();

    if(document.querySelector('input[name="imageType"]:checked')) {
        displayWindow();
        var imageType = document.querySelector('input[name="imageType"]:checked').value;
        configure(imageType);
    } 
}


//Takes user desired image as string, passes to respective function
//(most image types are from waifu.pics api)
function configure(imageType) {

    switch(imageType) {

        case "catboy": 
            getCatboy();
            break;

        case "duck":
            getDuck();
            break;

        case "cat":
            getCat();
            break;

        case "waifu":
        case "cuddle":
        case "catgirl":
            getFromWaifuPics(imageType);
            break;

        default:
            displayError("You Have Not Selected An Image Type");
    }
}


//Get Random Catboy
async function getCatboy() {
    let url = "https://api.catboys.com/img";
    let obj = await(await fetch(url)).json();
    if(obj.error == "error") {
        displayError("An Error Has Occurred :(");
    }
    imageURL = obj.url;
    var artist = "Artist: " + obj.artist + " | From: api.catboys.com";
    displayFinal(imageURL, artist);
}


//Get Random Duck
function getDuck() {
    imageURL = 'https://random-d.uk/api/v2/randomimg?t=' + new Date().getTime();
    var artist = "From: random-d.uk";
    displayFinal(imageURL, artist);
}

//Get random cat
async function getCat() {
    var baseURL = "https://cataas.com/"; //Base URL
    var url = "https://cataas.com/cat?json=true"; //Get Temporary URL to extract partial URL from
    let obj = await(await fetch(url)).json();
    imageURL = baseURL + obj.url;
    var artist = "From: cataas.com";
    displayFinal(imageURL, artist);
}


//Get Random Image from Waifu Pics (Specifically One Requested In @imageType)
//JSON does not contain artist information, so left blank
async function getFromWaifuPics(imageType) {
    var url;
    if(imageType == "catgirl") {
        url = 'https://api.waifu.pics/sfw/neko';
    }
    else if(imageType == "cuddle") {
        url = 'https://api.waifu.pics/sfw/cuddle';
    }
    else if(imageType == "waifu") {
        url = 'https://api.waifu.pics/sfw/waifu';
    }
    
    let obj = await (await fetch(url, {mode: 'cors'})).json();
    if(obj.error != "200") {
        displayError("An Error Has Occurred :(");
    }
    imageURL = obj.url;
    var artist = "Artist: unknown | From: api.waifu.pics";
    displayFinal(imageURL, artist);
}


//Display All Method, Standard Output for all Image Types
function displayFinal(imageURL, artist) {
    var artistText = document.getElementById("artistText"); //Text Under Image in Display Window
    var imageDisplay = document.getElementById("imageDisplay"); //Image Display Element
    //var original = document.getElementById("original");

    artistText.innerHTML = artist;
    imageDisplay.src = imageURL;
    //original.href = imageURL;
}


//Display Error Message If Called
//Changes Main Image Alt Text To Error Message
function displayError(message) {
    document.getElementById("imageDisplay").alt = message;
}


//Resets the Display Window
function clearDisplay() {
    document.getElementById("imageDisplay").src = "";
    document.getElementById("imageDisplay").alt = "Loading...";
    document.getElementById("artistText").innerHTML = "";
}


//Switches from Selection Window to Display Window
function displayWindow() {
    document.getElementById("imageDisplay").alt = "Loading...";
    document.getElementById("selectionWindow").style.display = "none";
    document.getElementById("displayWindow").style.display = "block";
}


//Switches from Display Window back to Selection Window, clears Display Window
function selectionWindow() {
    clearDisplay();
    document.getElementById("selectionWindow").style.display = "block";
    document.getElementById("displayWindow").style.display = "none";
}


//Sets body background to any provided image url
function setBackgroundImage() {
    var body = document.getElementById("body");
    body.style.backgroundImage = "url(" + imageURL + ")";
    body.style.backgroundSize = "cover";
    body.style.backgroundRepeat = "no-repeat";
} 


window.onload = selectionWindow;
