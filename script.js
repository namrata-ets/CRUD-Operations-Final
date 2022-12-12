
var selectedRow=null;
var index=0;
function onFormSubmit() {

        
        if (selectedRow===null){
            storeData();
		}
        else{
            update();
		}
        resetForm();    
}
function storeData(){

  formdata=JSON.parse(localStorage.getItem('formdata'))||[];
  
    formdata.push({
  
      tid:document.getElementById("id").value,
      name:document.getElementById("name").value,
      status:document.getElementById("status").value,
      stime:document.getElementById("start time").value,
      etime:document.getElementById("end time").value,
  
    });
  
    localStorage.setItem('formdata',JSON.stringify(formdata));
   
    showData();
    
  }
  window.onload=showData();
  
  function showData(){
  
 // console.log(localStorage.getItem('formdata'));
  
  if(localStorage.getItem('formdata')){
  
    var output=document.querySelector('tbody');
  
    output.innerHTML="";
    JSON.parse(localStorage.getItem('formdata')).forEach((data,index)=>{
  
      output.innerHTML+=`<tr>
                            <td>${data.tid}</td>
                            <td>${data.name}</td>
                            <td>${data.status}</td>
                            <td>${data.stime}</td>
                            <td>${data.etime}</td>
                            <td><button type="button" onclick="edit(this,${index})"><i class="fa-solid fa-pen-to-square"></i></button>
                            <button type="button" onclick="remove(this,${index})"><i class="fa-solid fa-trash"></i></button></td>
                        </tr>
      `;
  
    })
   }
}

function edit(td,index){
  
 
    selectedRow=td.parentElement.parentElement;
   document.getElementById("id").value=selectedRow.cells[0].innerHTML;
   document.getElementById("name").value=selectedRow.cells[1].innerHTML
  document.getElementById("status").value=selectedRow.cells[2].innerHTML
   document.getElementById("start time").value=selectedRow.cells[3].innerHTML
  document.getElementById("end time").value=selectedRow.cells[4].innerHTML

 
}



function remove(td,index){
  
  if (confirm('Are you sure want to delete this record?')){
   selectedRow=td.parentElement.parentElement;
    var tarr=JSON.parse(localStorage.getItem('formdata'));
   // console.log(tarr);
    document.getElementById('taskdetails').deleteRow(selectedRow.rowIndex);
    tarr.splice(index,1);
   
    localStorage.setItem('formdata',JSON.stringify(tarr));
    resetForm();

}
}
function resetForm() {
    document.getElementById("id").value = '';
    document.getElementById("name").value = '';
    document.getElementById("status").value = '';
    document.getElementById("start time").value = '';
    document.getElementById("end time").value = '';
   selectedRow=null;
}
function update(){

  var taskid = document.getElementById("id").value;
  var tarr=JSON.parse(localStorage.getItem('formdata'));
  var rowIndex;
  console.log(tarr);
 
var temparr=[];

  for(var i=0;i<tarr.length;i++){
      
        temparr+=tarr[i].tid;
         console.log(temparr);

          if(temparr.includes(taskid)){
            rowIndex=i;
            console.log("Row Index of this task in array is: "+rowIndex);
            break;
          }
  }
  
  tarr.splice(rowIndex,1);
  console.log("Array after deleting records"+tarr);
  tarr.push({
  
        tid:document.getElementById("id").value,
        name:document.getElementById("name").value,
        status:document.getElementById("status").value,
        stime:document.getElementById("start time").value,
        etime:document.getElementById("end time").value,
    
      });
 console.log("Array after pushing records"+tarr);
      localStorage.setItem('formdata',JSON.stringify(tarr));
      showData();
  }

function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("taskdetails");
  switching = true;
  //Set the sorting direction to ascending:
  dir = "asc"; 
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount ++;      
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}
function searchTableColumns() {
 
  var input, filter, table, tr, i, j, column_length, count_td;
  column_length = document.getElementById('taskdetails').rows[0].cells.length;
  input = document.getElementById("searchbtn");
  filter = input.value.toUpperCase();
  table = document.getElementById("taskdetails");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) { 
    count_td = 0;
    for(j = 0; j < column_length-1; j++){ 
        td = tr[i].getElementsByTagName("td")[j];
     
        if (td) {
          if ( td.innerHTML.toUpperCase().indexOf(filter) > -1)  {            
            count_td++;
          }
        }
    }
    if(count_td > 0){
        tr[i].style.display = "";
    } else {
        tr[i].style.display = "none";
    }
  }
  
}
function validate(e){

  e.preventDefault();
  var taskid=document.getElementById("id").value;
  var  taskname=document.getElementById("name").value;
  var taskstatus=document.getElementById("status").value;
  var starttime=document.getElementById("start time").value;
  var endtime=document.getElementById("end time").value;

  var arr=[taskid,taskname,taskstatus,starttime,endtime];

  if(arr.includes("")){
     msg.innerHTML="Please enter appropriate data!";
  }else{
   onFormSubmit();
  }

}