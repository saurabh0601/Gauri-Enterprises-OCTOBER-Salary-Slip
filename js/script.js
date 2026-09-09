const form=document.getElementById("searchForm");
const input=document.getElementById("employeeId");
const result=document.getElementById("result");

form.addEventListener("submit",e=>{e.preventDefault();searchSlip()});

function searchSlip(){
  const id=input.value.trim().toUpperCase();
  result.innerHTML="";
  if(!id){showError("Please enter your Employee ID.");return;}

  const pdf=`salary-slips/${encodeURIComponent(id)}.pdf`;
  const jpg=`salary-slips/${encodeURIComponent(id)}.jpg`;

  check(pdf,ok=>{
    if(ok){showDownload(id,pdf,`${id}.pdf`);return;}
    check(jpg,ok2=>{
      if(ok2) showDownload(id,jpg,`${id}.jpg`);
      else showError(`Salary slip not found for Employee ID: ${id}`);
    });
  });
}
function check(url,cb){
  fetch(url,{method:"HEAD",cache:"no-store"}).then(r=>cb(r.ok)).catch(()=>cb(false));
}
function showDownload(id,url,name){
  result.innerHTML=`<div class="success-card">
    <div class="success-title">✓ Salary slip found</div>
    <div class="file-name">${escapeHtml(name)}</div>
    <a class="download" href="${url}" download>Download Salary Slip</a>
  </div>`;
}
function showError(msg){result.innerHTML=`<div class="error">${escapeHtml(msg)}</div>`}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
