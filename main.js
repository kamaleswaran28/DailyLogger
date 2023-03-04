// quote management 
var current_quote_no = Math.floor(Math.random() * 100);
var quote = quotes_json.quotes[current_quote_no].quote;
var author = quotes_json.quotes[current_quote_no].author;
document.getElementById("display_quote").innerText = quote;
document.getElementById("display_author").innerText = author; 
 
// date management 
var date_obj = new Date()
var date = date_obj.getDate()
var month = date_obj.getMonth() + 1
var year = date_obj.getFullYear()
var current_date =`${date}/${month}/${year}`
document.getElementById("current_date").innerText = current_date
  
//stop watch 
var seconds = 0;
var minutes = 0;
var hours = 0;
 
function start_timer(){
    if (seconds != 60){
        seconds++
    }
    else{
        minutes++;
        seconds =0
    }
    if (minutes == 60){
        hours++;
        minutes =0
    }
   
  document.getElementById("stopwatch").innerText = `${hours}:${minutes}:${seconds}`
}
var button_state = 0
var main_btn = document.getElementById("main_btn")
var interval; 

 // Get the modal
 var modal = document.getElementById("myModal");

 // Get the button that opens the modal
 var btn = document.getElementById("main_btn");
 
 // Get the <span> element that closes the modal
 var span = document.getElementsByClassName("close")[0];
 
 // When the user clicks the button, open the modal 

 
 // When the user clicks on <span> (x), close the modal
//  span.onclick = function() {
//    modal.style.display = "none";
//  }
 
 // When the user clicks anywhere outside of the modal, close it
 window.onclick = function(event) {
   if (event.target == modal) {
     modal.style.display = "none";
   }
 }

 function open_model_popup(){
  modal.style.display = "block";
 }
 function close_model_popup(){
  modal.style.display = "none";
 }

function start_btn(){
    if (button_state ==0){
      
         
    interval = setInterval(start_timer,1000)
    button_state =1;
    main_btn.innerText = "STOP"
}
else{ 
    open_model_popup()
    button_state =0;
    clearInterval(interval)
    interval = ""
    main_btn.innerText = "START";
}
}

var day_log = { previous_date:"",day_counter :0, daily_log:[]}
var day_count = 0;
 
var each_day_log = {date:"",hours_spent:0,minutes_spent:0,task_data:""};

function save_btn(){
  close_model_popup()
  if (day_log.previous_date != current_date){
    alert()
    day_count++;
    day_log.day_counter = day_count;
    each_day_log.date = current_date;
    each_day_log.hours_spent = hours;
    each_day_log.minutes_spent = minutes;
    each_day_log.task_data = document.getElementById("user_data").value
    
    day_log.daily_log.push(JSON.stringify(each_day_log))
    reset_timer()
    render_table(day_log)
    day_log.previous_date = current_date
  }
  else{
    alert("You have logged in already",day_count)
    var log_length = day_log.daily_log.length -1
    var previous_day_log = JSON.parse(day_log.daily_log[log_length]);
    console.log(typeof(previous_day_log.hours_spent))
    previous_day_log.hours_spent += hours;
    previous_day_log.minutes_spent += minutes;
    previous_day_log.task_data += `\n ${document.getElementById("user_data").value}`   
    day_log.daily_log[log_length] = JSON.stringify(previous_day_log)
    reset_timer()
    render_table(day_log)
  }

  localStorage.setItem("daily_logger_ls", JSON.stringify(day_log));
}

function reset_timer(){
  minutes = 0
  hours = 0
  seconds= 0
  document.getElementById("stopwatch").innerText = `${hours}:${minutes}:${seconds}`
  document.getElementById("user_data").value = ""
}

var display_table = document.getElementById("display_table")
function render_table(json_arg){
  var full_json = json_arg;
  var days_log = full_json.daily_log;
  var days_count = full_json.daily_log.length;
  var total_min =0
  var total_hours = 0
  
  display_table.innerHTML = ""
  for (let i =0;i<days_log.length;i++){
    var each_element = JSON.parse(days_log[i])
    var table_row = document.createElement("tr")
    var td_data = document.createElement("td")
    td_data.innerText = each_element.date
    table_row.appendChild(td_data)
    var td_time_spend = document.createElement("td")
    td_time_spend.innerText = `${each_element.hours_spent}Hrs ${each_element.minutes_spent}Mins`;
    total_min += each_element.minutes_spent
    total_hours += each_element.hours_spent
    table_row.appendChild(td_time_spend);
    var td_details = document.createElement("td")
    td_details.innerText = each_element.task_data;
    display_table.appendChild(table_row)
    table_row.appendChild(td_details);
  }
  var time_spend = `${total_hours}Hrs ${total_min}Mins`
  
  document.getElementById("dis_day").innerText = days_count;
  document.getElementById("dis_time").innerText = time_spend
}

function render_ls(){
  var ls_string_data = localStorage.getItem("daily_logger_ls")
  console.log(ls_string_data)
  if (ls_string_data != "" && ls_string_data !== null){
    var ls_json = JSON.parse(ls_string_data)
    day_log =ls_json
    console.log(ls_json)
    render_table(ls_json)
  } 
}
