const bdate = document.querySelector("#bdate")

const submit_btn = document.querySelector("#submit-btn");

const output_text = document.querySelector(".output-msg");
const error = document.querySelector(".error-msg");

submit_btn.addEventListener("click", submitHandler);

function submitHandler(){
    
    if(isValidInput()){

    }
}

function checkPalindrome(){

}

function isPalindrome(){

}

function getNextDate(){

}

function getPrevDate(){

}

function isValidInput(){

    if(bdate.value === ""){
        setError("Please select a date")
    }
    else{
        return true;
    }
}

function setError(errorText){
    error.innerText = errorText;
}

function resetError(){
    error.innerText = "";
}

function setOutput(){

}

function resetOutput(){

}

bdate.addEventListener("click", function(){
    resetError();
    resetOutput();
})