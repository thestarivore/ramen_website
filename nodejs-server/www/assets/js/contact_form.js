const emailField = document.getElementById('email_input_field');
const nameField = document.getElementById('name_input');
const messageField = document.getElementById('message_input');


// After each email change check if it is a real email and inform the user
$("form").on('change',function(e){
    e.preventDefault();
    //ajax code here
    var email = document.getElementById("email_input_field").value; 
    if(!validateEmail(email)){
        $( "#email_input_field" ).replaceWith( `<input class="form-control is-invalid" type="email" name="email" placeholder="Email" id="email_input_field">` );
        document.getElementById("email_input_field").value = email;
        $( "#email_input_msg" ).replaceWith( `<small class="form-text text-danger" id="email_input_msg">Please enter a correct email address.</small>` );
    }
    else{
        $( "#email_input_field" ).replaceWith( `<input class="form-control is-valid" type="email" name="email" placeholder="Email" id="email_input_field">` );
        document.getElementById("email_input_field").value = email;
        $( "#email_input_msg" ).replaceWith( `<small class="form-text text-success" id="email_input_msg">The email address is correct.</small>` );
    }
});

// On button click send the email (email sending not implemented right now)
$("button").on('click',function(e){
    var email = document.getElementById("email_input_field").value; 
    var name = nameField.value; 
    var message = messageField.value; 

    if(validateEmail(email) && name != "" && message != ""){
        alert("Your request has been sent!");
    }
    else{
        e.preventDefault();
        alert("Please insert all the required information!");
    }
});

// Check if the email is correct
function validateEmail(mail) 
{
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
        return true;

    return false;
}
