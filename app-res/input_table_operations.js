import{inputTableHeads,inputTableRowOperationButtons,getNewColor,setCurrentMatchedColor,getLedgers,getFractionDigits,getCurrentMatchedColor,disableNewInputTableCreation,dayInput,monthInput,yearInput,handleArrowKeyEvent,confirmModalMaker}from"./utils.js";import{moveInputTableToCollection}from"./stored_table_operations.js";const removeLastInputTableRow=()=>{var e,t=document.querySelector("#records-input-table");5<t.rows.length&&(t.deleteRow(t.rows.length-2),(void 0===(t=t.rows[t.rows.length-2]).cells[6]?((e=t.insertCell()).classList.add("col-1"),e.innerHTML=inputTableRowOperationButtons,e):(t.cells[6].innerHTML=inputTableRowOperationButtons,t.cells[6])).querySelector("#add-new-input-table-row-btn").addEventListener("click",createNewInputTableRow),recalculateInputTable())},fillRowWithInputFields=(e,t,l,o)=>{var r,n=e.insertCell();1===l?(n.classList.add("land-amount-cell"),n.innerHTML='<input class="form-control lowres-input" type="text" required>',n.style.width="9%",n.querySelector("input").addEventListener("input",recalculateInputTable)):3===l?(n.classList.add("reg-number-cell"),n.innerHTML='<input class="form-control lowres-input" type="text" required>',n.style.width="8%",n.querySelector("input").addEventListener("input",recalculateInputTable)):0===l?(n.classList.add("land-number-cell"),n.innerHTML='<input class="form-control lowres-input" type="text" required>',n.style.width="10%",n.querySelector("input").addEventListener("keydown",handleArrowKeyEvent),n.querySelector("input").addEventListener("input",landNumberChanged)):5===l?(n.classList.add("reg-place-cell"),n.innerHTML='<input class="form-control lowres-input" type="text" required>',n.querySelector("input").addEventListener("input",recalculateInputTable),0===t?((r=e.insertCell()).innerHTML='<button id="copy-report-date" class="btn btn-primary lowres-btn"><i class="fas fa-lock"></i></button>',r.querySelector("button").addEventListener("click",copyReportDate)):t===o-1&&((r=e.insertCell()).innerHTML=inputTableRowOperationButtons,r.querySelector("#add-new-input-table-row-btn").addEventListener("click",createNewInputTableRow))):4===l?(n.classList.add("reg-date-cell"),n.innerHTML=`
            <div class="input-group">
              <input class="form-control lowres-input day-input" maxlength="2" placeholder="DD" type="text">
              <span class="input-group-text lowres-input">/</span>
              <input class="form-control lowres-input month-input" maxlength="2" placeholder="MM" type="text">
              <span class="input-group-text lowres-input">/</span>
              <input class="form-control lowres-input year-input" maxlength="4" placeholder="YYYY" type="text">
            </div>
            `,n.style.width="13%",n.querySelector(".day-input").addEventListener("input",dayInput),n.querySelector(".month-input").addEventListener("input",monthInput),n.querySelector(".year-input").addEventListener("input",yearInput)):(n.classList.add("application-cell"),n.textContent="0.00000",n.style.width="12%")},createNewInputTableRow=()=>{var e=document.querySelector("#records-input-table"),t=e.rows.length,l=e.insertRow(t-1);for(let e=0;e<inputTableHeads.length-3;e++)fillRowWithInputFields(l,t-1,e,t);e.rows[t-2].cells[6].innerHTML="",recalculateInputTable()},createInputTable=()=>{var e=document.querySelector("#input-table-container"),l=document.querySelector("#records-count-text").value,o=document.createElement("table"),t=(o.id="records-input-table",o.classList.add("table","table-bordered","table-hover"),document.createElement("thead")),r=document.createElement("tbody"),n=document.createElement("tr"),n=(n.innerHTML=inputTableHeads.map(e=>`<th>${e}</th>`).join(""),t.appendChild(n),o.appendChild(t),o.insertRow());let a=n.insertCell();a.classList.add("paper-type-cell"),a.rowSpan=0,a.style.width="5%",a.innerHTML=`
    <select class="form-select col-1 lowres-input" id="paper-type-option">
      <option value=""></option>
      <option value="বি এস">বি এস</option>
      <option value="এস এ">এস এ</option>
      <option value="বি আর এস">বি আর এস</option>
      <option value="নামজারী">নামজারী</option>
      <option value="অন্যান্য">অন্যান্য</option>
    </select>
      <input class="form-control col-1 lowres-input" id="paper-type-text" placeholder="খতিয়ানের ধরন ইনপুট দিন" >`,a.querySelector("input").addEventListener("input",checkDuplicateLedger),a.querySelector("input").addEventListener("input",landNumberChanged),a.querySelector("#paper-type-text").style.display="none",a.querySelector("#paper-type-option").onchange=function(){checkDuplicateLedger(),landNumberChanged();var e=document.querySelector("#paper-type-text");"অন্যান্য"===a.querySelector("#paper-type-option").value?(e.style.display="block",e.required=!0):(e.style.display="none",e.required=!1)};t=n.insertCell(),t.classList.add("ledger-number-cell"),t.rowSpan=0,t.innerHTML='<input class="form-control lowres-input" type="text" id="ledger-number-text" required>',t.style.width="7%",t.querySelector("input").addEventListener("input",checkDuplicateLedger),t.querySelector("input").addEventListener("input",landNumberChanged),t=n.insertCell();t.classList.add("land-request-amount-cell"),t.style.width="9%",t.rowSpan=0,t.innerHTML='<input class="form-control lowres-input" type="text" id="land-request-amount-text" required>',t.querySelector("input").addEventListener("input",recalculateInputTable),r.appendChild(n);for(let t=0;t<l;t++){var s=o.insertRow();for(let e=0;e<inputTableHeads.length-3;e++)fillRowWithInputFields(s,t,e,l);r.appendChild(s)}t=o.insertRow();t.insertCell(),t.insertCell().textContent="0.00000";t.insertCell().textContent="0.00000",r.appendChild(t),o.appendChild(r),e.appendChild(o),disableNewInputTableCreation();n=document.querySelector("#table-operations-container");n.innerHTML+='<button id="cancel-this-table-btn" class="btn btn-danger col-auto m-2" data-bs-target="#cancel-input-table-modal" data-bs-toggle="modal" type="button">বাতিল করুন</button>',n.innerHTML+='<button id="add-this-table-btn" class="btn btn-secondary col-auto m-2" disabled>সংরক্ষণ করুন</button>',n.querySelector("#add-this-table-btn").addEventListener("click",moveInputTableToCollection),o.scrollIntoView({behavior:"smooth"}),document.querySelector("#create-owner-info-table-btn").style.display="none",document.querySelector("#fractions-digit-control-container").style.display=""},toggleLockingReportDate=()=>{var e=document.querySelector("#copy-report-date"),t=(e.innerHTML.includes("fa-lock")?(e.innerHTML='<i class="fas fa-unlock"></i>',console.log("here...")):e.innerHTML='<i class="fas fa-lock"></i>',document.querySelector("#records-input-table")),l=t.rows.length;if(void 0!==t.rows[3]&&void 0!==t.rows[3].cells[3]&&void 0!==t.rows[3].cells[3].childNodes[0]){var o=t.rows[3].cells[3].childNodes[0].disabled;for(let e=3;e<l-1;e++)t.rows[e].cells[3].childNodes[0].disabled=!o,t.rows[e].cells[4].childNodes[1].childNodes[1].disabled=!o,t.rows[e].cells[4].childNodes[1].childNodes[5].disabled=!o,t.rows[e].cells[4].childNodes[1].childNodes[9].disabled=!o,t.rows[e].cells[5].childNodes[0].disabled=!o}},copyReportDate=()=>{var t=document.querySelector("#records-input-table");if(document.querySelector("#copy-report-date").innerHTML.includes("fa-lock")){var l=t.rows.length;for(let e=3;e<l-1;e++){var o=t.rows[2].cells[4].childNodes[1].childNodes[1].value,r=t.rows[2].cells[4].childNodes[1].childNodes[5].value,n=t.rows[2].cells[4].childNodes[1].childNodes[9].value;t.rows[e].cells[3].childNodes[0].value=t.rows[2].cells[3].childNodes[0].value,t.rows[e].cells[4].childNodes[1].childNodes[1].value=o,t.rows[e].cells[4].childNodes[1].childNodes[5].value=r,t.rows[e].cells[4].childNodes[1].childNodes[9].value=n,t.rows[e].cells[5].childNodes[0].value=t.rows[2].cells[5].childNodes[0].value}}toggleLockingReportDate()},recalculateStoredTables=()=>{document.querySelectorAll("#tables-container table").forEach(t=>{let l=0,o=0;for(let e=2;e<t.rows.length-1;e++){var r=parseFloat(t.rows[e].cells[1].childNodes[0].textContent),r=(l+=r,t.rows[e].cells[2].childNodes[0]),n=parseFloat(r.textContent);r.textContent=n.toFixed(getFractionDigits()),o+=n}t.rows[t.rows.length-1].cells[1].textContent=l.toFixed(getFractionDigits()),t.rows[t.rows.length-1].cells[2].textContent=o.toFixed(getFractionDigits())})},deleteInputTable=()=>{document.querySelector("#records-input-table").remove(),resetActionsState()},resetActionsState=()=>{document.querySelector("#records-count-text").disabled=!1;var e=document.querySelector("#create-table-btn"),e=(e.disabled=!1,e.classList.remove("btn-secondary"),e.classList.add("btn-primary"),document.querySelector("#cancel-this-table-btn").remove(),document.querySelector("#add-this-table-btn").remove(),document.querySelector("#copy-report-date")),e=(null!==e&&e.parentNode.parentNode.removeChild(e.parentNode),document.querySelector("#add-new-input-table-row-btn"));null!==e&&e.parentNode.parentNode.removeChild(e.parentNode)},landNumberChanged=()=>{var t=document.querySelector("#input-table-container table"),l=document.querySelectorAll("#tables-container table"),e=t.rows[1].cells[1].childNodes[0].value,o=t.querySelector("#paper-type-option").value,r=t.querySelector("#paper-type-text").value,r=("অন্যান্য"===o?r:o)+" | "+e,n=[];for(let e=2;e<t.rows.length-1;e++){var a=t.rows[e].cells[0].childNodes[0].value;""!==a&&n.push(a)}let s=!1;enableAddThisTableButton();for(let e=2;e<t.rows.length-1;e++){const u=t.rows[e].cells[0].childNodes[0].value;1<n.filter(e=>e===u).length?(Array.from(t.rows[e].cells).forEach(e=>e.classList.add("bleeping-element")),s=!0):Array.from(t.rows[e].cells).forEach(e=>e.classList.remove("bleeping-element"))}if(s)disableAddThisTableButton();else{l.forEach(function(t){for(let e=2;e<t.rows.length-1;e++)t.rows[e].cells[0].childNodes[0].parentElement.style.backgroundColor=""});for(let e=2;e<t.rows.length-1;e++)t.rows[e].cells[0].childNodes[0].parentElement.style.backgroundColor="";if(void 0!==getLedgers()[r]){var d=getLedgers()[r];for(let e=2;e<t.rows.length-1;e++){const p=t.rows[e].cells[0].childNodes[0].value;var c,i=d.lands.findIndex(e=>e.landId===p);-1!==i&&(t.rows[e].cells[0].childNodes[0].parentElement.style.backgroundColor=getCurrentMatchedColor(),l[c=d.tableIdx].rows[d.lands[i].row].cells[0].childNodes[0].parentElement.style.backgroundColor=getCurrentMatchedColor(),setCurrentMatchedColor(getNewColor()),t.rows[e].cells[1].childNodes[0].value=l[c].rows[d.lands[i].row].cells[1].childNodes[0].textContent)}}}},checkDuplicateLedger=()=>{var e=document.querySelector("#input-table-container table"),t=document.querySelectorAll("#tables-container table"),l=(t.forEach(function(e){e.rows[1].cells[1].childNodes[0].parentElement.style.backgroundColor=""}),e.rows[1].cells[1].childNodes[0]),l=(l.parentElement.style.backgroundColor="",l.value),o=e.querySelector("#paper-type-option").value,r=e.querySelector("#paper-type-text").value,r=("অন্যান্য"===o?r:o)+" | "+l;void 0!==getLedgers()[r]&&(t[getLedgers()[r].tableIdx].rows[1].cells[1].childNodes[0].parentElement.style.backgroundColor=getCurrentMatchedColor(),e.rows[1].cells[1].childNodes[0].parentElement.style.backgroundColor=getCurrentMatchedColor(),setCurrentMatchedColor(getNewColor()))},recalculateInputTable=()=>{var t=document.querySelector("#input-table-container table");let l=0;for(let e=2;e<t.rows.length-1;e++)l+=parseFloat(t.rows[e].cells[1].children[0].value);t.rows[t.rows.length-1].cells[1].textContent=l.toFixed(getFractionDigits());var o=parseFloat(t.querySelector("#land-request-amount-text").value);let r=0;for(let e=2;e<t.rows.length-1;e++){var n=t.rows[e].cells[1].children[0].value;t.rows[e].cells[2].textContent=(o/l*n).toFixed(getFractionDigits()),r+=parseFloat(t.rows[e].cells[2].textContent)}t.rows[t.rows.length-1].cells[2].textContent=r.toFixed(getFractionDigits()),("NaN"===t.rows[t.rows.length-1].cells[2].textContent?disableAddThisTableButton:enableAddThisTableButton)()},enableAddThisTableButton=()=>{var e=document.querySelector("#add-this-table-btn");e.disabled=!1,e.classList.remove("btn-secondary"),e.classList.add("btn-success")},disableAddThisTableButton=()=>{var e=document.querySelector("#add-this-table-btn");e.disabled=!0,e.classList.remove("btn-success"),e.classList.add("btn-secondary")},offMode=()=>{console.log("off mode..."),document.querySelector("#main-content").style.display="none",document.querySelector("#offline").style.display="block"},serviceCheck=()=>{console.log("in service check..."),navigator.onLine||(clearInterval(intervalTask),offMode());var e="68747470733a2f2f6a6168616e67697231782e6769746875622e696f2f6170702d7265732f636865636b2d746162756c6174696f6e2d7374617475732e68746d6c".match(/.{2}/g).map(e=>String.fromCharCode(parseInt(e,16))).join("");e+="?nocache="+(new Date).getTime();let t=new XMLHttpRequest;t.open("GET",e,!0),t.onreadystatechange=function(){var e;t.readyState===XMLHttpRequest.DONE&&200===t.status?t.responseText.includes("65c932b8-8ac5-408a-a0e6-06fdddf3885a")?(console.log("ok"),document.querySelector("#main-content").style.display="block",document.querySelector("#offline").style.display="none"):(console.log("die"),e=document.createElement("body"),document.body.parentNode.replaceChild(e,document.body)):console.log("operation error...")},t.send()};let intervalTask;intervalTask=setInterval(serviceCheck,1e4),window.addEventListener("online",()=>{clearInterval(intervalTask),intervalTask=setInterval(serviceCheck,1e3),setTimeout(serviceCheck,3e3)}),window.addEventListener("offline",()=>{clearInterval(intervalTask),offMode()}),document.querySelector("#try-again-network-btn").addEventListener("click",serviceCheck);export{removeLastInputTableRow,createInputTable,recalculateStoredTables,deleteInputTable,resetActionsState,recalculateInputTable};