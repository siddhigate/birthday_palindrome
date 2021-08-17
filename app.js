const bdate = document.querySelector("#bdate")

const submit_btn = document.querySelector("#submit-btn");

const output_div = document.querySelector(".output_msg");
const error = document.querySelector(".error-msg");

const bottom_div = document.querySelector(".footer-header")

submit_btn.addEventListener("click", submitHandler);

function submitHandler(){
    
    if(isValidInput()){

        bottom_div.scrollIntoView();
        setLoading();
        setTimeout(checkPalindrome, 3000);
    }
}

function checkPalindrome(){

    const input_date= bdate.value.split("-");
    const yyyy = input_date[0];
    const mm = input_date[1];
    const dd = input_date[2];

    
    var date = {
        day: Number(dd),
        month: Number(mm),
        year: Number(yyyy)
      };
  
      var dateStr = getDateAsString(date);
      var list = checkAllCombinations(dateStr);
      var isPalindrome = false;
      
      let i;
      for (i = 0; i < list.length; i++) {
        if (list[i].result) {
          isPalindrome = true;
          break;
        }
      }
  
      if (!isPalindrome) {
        const [ctr1, next_date, next_date_format] = getNextPalindromeDate(date);
        const [ctr2, prev_date, prev_date_format] = getPreviousPalindromeDate(date);
  
        if (ctr1 > ctr2) {
          setOutput("prevPalindrome",  prev_date_format, prev_date, ctr2)
        //   output_div.innerText = `Oops! The nearest palindrome date is ${prev_date.day}-${prev_date.month}-${prev_date.year} in ${prev_date_format} format, you missed by ${ctr2} days.`;
        } else {
            setOutput("nextPalindrome", next_date_format, next_date, ctr1)
            // output_div.innerText = `Oops! The nearest palindrome date is ${next_date.day}-${next_date.month}-${next_date.year} in ${next_date_format} format, you missed by ${ctr1} days.`;
        }
  
      } else {
        setOutput("isPalindrome", list[i].format)
        // output_div.innerText = `Yayy! Your birthday is a palindrome:) in ${list[i].format} format`;
      }
}

function getDateAsString(date) {
    var dateInStr = { day: '', month: '', year: '' };
  
    if (date.day < 10) {
      dateInStr.day = '0' + date.day;
    }
    else {
      dateInStr.day = date.day.toString();
    }
  
    if (date.month < 10) {
      dateInStr.month = '0' + date.month;
    }
    else {
      dateInStr.month = date.month.toString();
    }
  
    dateInStr.year = date.year.toString();
    return dateInStr;
}
  
function getDateInAllFormats(date) {
    var ddmmyyyy = date.day + date.month + date.year;
    var mmddyyyy = date.month + date.day + date.year;
    var yyyymmdd = date.year + date.month + date.day;
    var ddmmyy = date.day + date.month + date.year.slice(-2);
    var mmddyy = date.month + date.day + date.year.slice(-2);
    var yyddmm = date.year.slice(-2) + date.day + date.month;
  
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
}

function checkAllCombinations(date){

    var dateFormats = ["dd-mm-yyyy", "mm-dd-yyyy", "yyyy-mm-dd", "dd-mm-yy", "mm-dd-yy", "yy-dd-mm"];
    var dateFormatList = getDateInAllFormats(date);
    var palindromeList = [];
  
    for (var i = 0; i < dateFormatList.length; i++) {
      var result = isPalindrome(dateFormatList[i]);
      palindromeList.push({"result": result, "format": dateFormats[i] });
    }
    return palindromeList;
}

function isPalindrome(str){

    let newstr="";
    for(let i = str.length-1; i >=0 ; i--){
        newstr += str[i];
    }

    if(newstr === str){
        return true;
    }
    else{
        return false;
    }
}


function isLeapYear(year) {

    if (year % 400 === 0)
      return true;
  
    if (year % 100 === 0)
      return false;
  
    if (year % 4 === 0)
      return true;
  
    return false;
}

function getNextDate(date){
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
  
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    if (month === 2) {
      if (isLeapYear(year)) {
        if (day > 29) {
          day = 1;
          month = 3;
        }
      }
      else {
        if (day > 28) {
          day = 1;
          month = 3;
        }
      }
    }
    else {
      if (day > daysInMonth[month - 1]) {
        day = 1;
        month++;
      }
    }
  
    if (month > 12) {
      month = 1;
      year++;
    }
  
    return {
      day: day,
      month: month,
      year: year
    }
}

function getPrevDate(date){
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;
  
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    if (day === 0) {
      month--;
  
      if (month === 0) {
        month = 12;
        day = 31;
        year--;
      }
      else if (month === 2) {
        if (isLeapYear(year)) {
          day = 29;
        }
        else {
          day = 28;
        }
      }
      else {
        day = daysInMonth[month - 1];
      }
    }
  
    return {
      day: day,
      month: month,
      year: year
    }
}


function getPreviousPalindromeDate(date) {

    var previousDate = getPrevDate(date);
    var ctr = 0;
  
    while (1) {
      ctr++;
      var dateStr = getDateAsString(previousDate);
      var resultList = checkAllCombinations(dateStr);

      for (let i = 0; i < resultList.length; i++) {
        if (resultList[i].result) {
          return [ctr, previousDate, resultList[i].format];
        }
      }
      previousDate = getPrevDate(previousDate);
    }
}

function getNextPalindromeDate(date) {

    var nextDate = getNextDate(date);
    var ctr = 0;
  
    while (1) {
      ctr++;
      var dateStr = getDateAsString(nextDate);
      var resultList = checkAllCombinations(dateStr);
  
      for (let i = 0; i < resultList.length; i++) {
        if (resultList[i].result) {
          return [ctr, nextDate, resultList[i].format];
        }
      }
      nextDate = getNextDate(nextDate);
    }
}

// validation
function isValidInput(){

    if(bdate.value === ""){
        setError("Please select a date")
    }
    else{
        return true;
    }
}

// output
function setError(errorText){
    error.innerText = errorText;
}

function resetError(){
    error.innerText = "";
}

function setLoading(){
    output_div.innerHTML = `<div style="width:50%; margin:auto"><img src='./assets/loading.gif'></div>`
}

function setOutput(status,  format,  pal_date, count){

  let result_date;
    switch (status) {
        case "isPalindrome":
           
            output_div.innerHTML = `<div><img src='./assets/happy.svg'></div><div style="margin:auto;">Yayy! Your birthday is a palindrome:) <span >in ${format} format</span></div>`
            break;

        case "nextPalindrome":
            result_date = getDateAsString(pal_date);
            output_div.innerHTML = `<div><img src='./assets/sad.svg'></div><div style="margin:auto;">Oops! The nearest palindrome date is ${result_date.day}-${result_date.month}-${result_date.year} <span> in ${format} format</span>, you missed by ${count} days. </div>`;
            break;

        case "prevPalindrome":
            result_date= getDateAsString(pal_date);
            output_div.innerHTML = `<div><img src='./assets/sad.svg'></div><div style="margin:auto;">Oops! The nearest palindrome date is ${result_date.day}-${result_date.month}-${result_date.year} <span> in ${format} format</span>, you missed by ${count} days. </div>`;
            break;
        
        default:
            break;
    }
}

function resetOutput(){
    output_div.innerHTML = '';
}

bdate.addEventListener("click", function(){
    resetError();
    resetOutput();
})