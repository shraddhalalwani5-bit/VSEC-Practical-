let max=0;

function add(){

let n=document.getElementById("name").value;
let i=document.getElementById("id").value;
let p=+document.getElementById("p").value;
let c=+document.getElementById("c").value;
let b=+document.getElementById("b").value;

let t=p+c+b;
let per=(t/300*100).toFixed(1);

let r=tbl.insertRow();
r.insertCell(0).innerHTML=n;
r.insertCell(1).innerHTML=i;
r.insertCell(2).innerHTML=p;
r.insertCell(3).innerHTML=c;
r.insertCell(4).innerHTML=b;
r.insertCell(5).innerHTML=t;
r.insertCell(6).innerHTML=per+"%";

if(t>max){
max=t;
top.innerHTML="Topper: "+n;
r.className="topper";
}
}