var fullText;
var mistakeCounter = 0;
var displayMistakeCounter = document.getElementById("number-of-mistakes");
var background = document.getElementsByTagName("body");

const url = "file/fullText.txt"
fetch(url)
   .then( r => r.text() )
   .then( t => fullText = t.replace(/[\r\n]+/g, " ").trim().replace("--", "-").replace("  ", " "));

/*
function test(e) {
    if(e.which != 13 || e.which != 8) {
        var input = document.getElementById("textInput").value.replace(/[\r\n]+/g, "").toLowerCase();
        var matchFullText = fullText.substring(0, input.length).toLowerCase();

        if(input == matchFullText) {
            background[0].style.backgroundColor = "rgb(50,50,50)"
        } else {
            if(mistakeCounter >= 3) {
                $("#final-mistake-background").fadeIn(1000);
                $("#final-mistake-foreground").delay(1500).fadeIn(1000);
            } else {
                background[0].style.backgroundColor = "rgb(80,0,0)";
                mistakeCounter++;
                document.getElementById("number-of-mistakes").innerHTML = mistakeCounter;
                $("#mistake-popup").show();
            }
        }
    }
}*/

document.getElementById("textInput").addEventListener('input', (event) => {
	if(event.inputType != 'deleteContentBackward' || event.inputType != 'deleteContentForward') {
        var input = document.getElementById("textInput").value.replace(/[\r\n]+/g, "").toLowerCase();
        var matchFullText = fullText.substring(0, input.length).toLowerCase();

        if(input == matchFullText) {
            background[0].style.backgroundColor = "rgb(50,50,50)"
        } else {
            if(mistakeCounter >= 3) {
                $("#final-mistake-background").fadeIn(1000);
                $("#final-mistake-foreground").delay(1500).fadeIn(1000);
            } else {
                background[0].style.backgroundColor = "rgb(80,0,0)";
                mistakeCounter++;
                document.getElementById("number-of-mistakes").innerHTML = mistakeCounter;
                $("#mistake-popup").show();
            }
        }
    }
})


function challengeStage() {
    $("#welcome-stage").fadeOut(300);
    $("#challenge-stage").delay(200).fadeIn(300);
}

function dismissMistakePopup() {
    $("#mistake-popup").fadeOut(200);
}

/* POTENTIAL REPLACEMENT FOR KEYCODE DETECTION
<input type="text" id="test" />

<script>  
  document.getElementById("test").addEventListener('input', (event) => {
  console.log(event.inputType);
  // Typing of any character event.inputType = 'insertText'
  // Backspace button event.inputType = 'deleteContentBackward'
  // Delete button event.inputType = 'deleteContentForward'
  })
</script>
*/
