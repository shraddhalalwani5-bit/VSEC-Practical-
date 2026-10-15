function check(){

let p=document.getElementById("pass").value;
let msg="";

if(p.length<8)
msg+="Password must be at least 8 characters.<br>";

if(!/[A-Z]/.test(p))
msg+="Use at least one uppercase letter.<br>";

if(!/[a-z]/.test(p))
msg+="Use at least one lowercase letter.<br>";

if(!/[0-9]/.test(p))
msg+="Use at least one number.<br>";

if(!/[@#$%^&*!]/.test(p))
msg+="Use at least one special symbol.<br>";

if(msg=="")
document.getElementById("msg").innerHTML="✅ Password is Valid";
else
document.getElementById("msg").innerHTML="❌ Invalid Password<br>"+msg;

}