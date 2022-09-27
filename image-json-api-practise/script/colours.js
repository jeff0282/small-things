/*
Functions to randomly select colors, set them as body background colors, etc
*/

//RANDOM COLOR PICKER
//Builds RBG colors by picking a number between 0-250 3 times
function colorPicker() {
    var rgbColor = [0,0,0]
    for(let i=0; i < rgbColor.length; i++) {
        rgbColor[i] = Math.floor(Math.random() * 250);
    }   
    color = "rgb(" + rgbColor[0] + "," + rgbColor[1] + "," + rgbColor[2] + ")";
    return color;
}

function randomBodyColor() {
    var body = document.getElementById("body");
    body.style.backgroundImage = "none";
    body.style.backgroundColor = colorPicker();
}
