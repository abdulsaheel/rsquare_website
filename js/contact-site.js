"use strict";
function submitForm(event) {
    // Call validateCaptcha before proceeding with form submission
    if (validateCaptcha()) {
        // If captcha is valid, proceed with form submission
        $('#successMessage').css('display', 'block');
        event.preventDefault(); // Prevents the default form submission behavior
        var form = document.getElementById("contactForm"); // Get the form element
        var formData = new FormData(form);

        // Perform the AJAX request
        fetch(form.action, {
            method: form.method,
            body: formData,
            mode: 'no-cors'
        });
    } else {
        // If captcha is invalid, display an error message
        alert("Incorrect captcha entered. Please try again.");
    }
}


var code;
function createCaptcha() {
  //clear the contents of captcha div first 
  document.getElementById('captcha').innerHTML = "";
  var charsArray =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%";
  var lengthOtp = 6;
  var captcha = [];
  for (var i = 0; i < lengthOtp; i++) {
    //below code will not allow Repetition of Characters
    var index = Math.floor(Math.random() * charsArray.length + 1); //get the next character from the array
    if (captcha.indexOf(charsArray[index]) == -1)
      captcha.push(charsArray[index]);
    else i--;
  }
  var canv = document.createElement("canvas");
  canv.id = "captcha";
  canv.width = 100;
  canv.height = 50;
  var ctx = canv.getContext("2d");
  ctx.font = "25px Georgia";
  ctx.strokeText(captcha.join(""), 0, 30);
  //storing captcha so that can validate you can save it somewhere else according to your specific requirements
  code = captcha.join("");
  document.getElementById("captcha").appendChild(canv); // adds the canvas to the body element
}
function validateCaptcha() {
  event.preventDefault();
  if (document.getElementById("cpatchaTextBox").value == code) {
    return true
  }else{
    createCaptcha();
    return false
  }
}