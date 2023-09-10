// pehle html code likho fir dekho ki kis element pe js lagane ki need h so use that

const inputSlider=document.querySelector("[data-lengthSlider"); // custom attribute fetching

const lengthDisplay=document.querySelector("[data-lengthNumber]");

const passwordDisplay=document.querySelector("[data-passwordDisplay]");

const copyBtnDisplay=document.querySelector("[data-copy]");

const copyMsg=document.querySelector("[data-copyMsg]");

const uppercaseCheck=document.querySelector("#uppercase");

const lowercaseCheck=document.querySelector("#lowercase");

const numbersCheck=document.querySelector("#numbers");

const symbolsCheck=document.querySelector("#symbols");

const indicator=document.querySelector("[data-indicator]");

const generateBtn=document.querySelector(".generateBtn");

const allCheckBox=document.querySelectorAll("input[type=checkbox");

let password="";  // start me password empty
let passwordLength=10;// start me password length 10 given
let checkCount=0;  // for taking checkcount edge case like if checkcount<displaylength,etc
// set strength circle color to grey

setIndicator("#ccc");

handleSlider();
// set passsword length

// do changes on ui

function handleSlider(){
    inputSlider.value=passwordLength;
    lengthDisplay.innerText=passwordLength;

    // for background-color of input display

    const min=inputSlider.min;
    const max=inputSlider.max;

    //  100% se pehle wala part width btaega and 100% height btaega

    // (passwordLength*100/totaLength) =% of color of background
    
    inputSlider.style.backgroundSize=((passwordLength-min)*100/(max-min))+"% 100%";

    // inputSlider.style.backgroundSize=((passwordLength-min)*100/(max-min))+"%  till here it is width 100% height";

}

// set indicator of password

function setIndicator(color){
    indicator.style.backgroundColor=color;
    
    // shadow
    indicator.style.boxShadow=`0px 0px 12px 1px ${color}`;
}

// get random integer : serves to all random number,lowercase,uppercase

function getRndInteger(min,max){

    return Math.floor(Math.random() * (max - min)) + min; // now ans is b/w 0 to max-min as Math.random generates no b/w 0 and 1
    //  as floating number possibility so floor it also + min will give (0+min,max-min+min)
}

// generate random number : generate random number between 0 and 9

function getRandomNumber(){
    return getRndInteger(0,9);
}

// generate random lowercase

function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123));  // gives random number which is further converted into character (passed value is ascii of a,ascii of z)
}

// generate random uppercase

function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91));
}

// generate random symbol

// take random symbol strings and ek random number generate karwake b/w 0 and symbols.length me symbols string se us particular index wale char ko access krlia

const symbols='~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

function generateSymbol(){
    const randomNumber=getRndInteger(0,symbols.length);
    return symbols.charAt(randomNumber);
}

// generate password strength

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSymbol = false;

    // initally all boxes are assumed to be false if any of them is checked then mark these variables as true which means we are including that part in password

    if (uppercase.checked) hasUpper = true;
    if (lowercase.checked) hasLower = true;
    if (numbers.checked) hasNumber = true;
    if (symbols.checked) hasSymbol = true;

    if (hasUpper && hasLower && (hasNumber || hasSymbol) && passwordLength >= 8) {
        setIndicator("#0f0");  // setting different colors 
    } 
    else if (
        (hasLower || hasUpper) &&
        (hasNumber || hasSymbol) &&
        passwordLength >= 6
    ) {
        setIndicator("#ff0");
    } 
    
    else {
        setIndicator("#f00");
    }
}

// navigator.clipboard.writeText is method(writeText():async function ) which copies text to cliboard , return promise ,if promise is resolved show copied text after promise is resolved so use await keyword

// await karna ke lie use async 

// now no need to write resolve or reject it will automatically do it
async function copyContent(){

    // there can be error so use try catch

    try{
        await navigator.clipboard.writeText(passwordDisplay.value);  // returns a promise , promise ya to resolve hoga ya reject hoga

        // after resolved show copied text

        copyMsg.innerText="copied";
    }

    catch(e){
        copyMsg.innerText="Failed";
    }
   
    // to make copy vala span visisble 

    copyMsg.classList.add("active");

    // make copy vala text after 2s invisible

  
    setTimeout(()=>{
        copyMsg.classList.remove("active");
    },2000);


}

// if checkbox changed starting se check karo ki total changed checkboxes 

function handleCheckBoxChange(){
    checkCount=0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked)
        checkCount++;
    })

    // special condition
    
    if(passwordLength<checkCount){
        passwordLength=checkCount;

        // AS PASSWORDlENGTH CHANGE SO call handle slider to update on ui
        handleSlider();
    }
}

// shuffling k lie algo : Fisher Yates's Method
// here kis array pe lagao aur use shuffle karo


// shuffle algorithm is the Fisher-Yates (aka Knuth) Shuffle.
// Shuffle the array randomly - Fisher Yates Method

// last index se start karke 0 pe jaega and we find random index here and swap j with i

function shufflePassword(array) {

    // random j find out using random function

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));  // j becomes from 0 to i+1 where 0 is inclusive and i+1 is exclusive
        const temp = array[i];

        // swap number at i index and j index

        array[i] = array[j];
        array[j] = temp;
    }

    // empty string me array se value le ke add kardi and return kardi

    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

// adding event listener

// working on input event

inputSlider.addEventListener('input',(e)=>{
    passwordLength=e.target.value; // when sliding new value comes  , e.target this element and it' vlaue is copied in password length
    handleSlider();
})

// copy btn pe event listener

copyBtnDisplay.addEventListener('click',()=>{
    if(passwordDisplay.value) // if nonempty{
        copyContent();
    
})

// checkbox pe listenr so as to keep track of how many checkboxes ticked

allCheckBox.forEach(function(checkbox){
    checkbox.addEventListener('change',handleCheckBoxChange);
})

// generate password

generateBtn.addEventListener('click',()=>{

    // none of the checkbox selected  no password

    if(checkCount<=0)return; // edge case that' why had CheckCount created

    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }

    // let's start the journey to find new password

    // remove old password

    password="";

    // let's put the stuff mentioned by the checkboxes

    // if(uppercaseCheck.checked){
    //     password+=generateUpperCase();
    // }

    // if(lowercaseCheck.checked){
    //     password+=generateLowerCase();
    // }

    // if(numbersCheck.checked){
    //     password+=getRandomNumber();
    // }

    // if(symbolsCheck.checked){
    //     password+=generateSymbol();
    // }

    // Inside the loop, it attempts to call a function at index i of the  funcArr array. 
    
    let funcArr=[];


    if(uppercaseCheck.checked){
        funcArr.push(generateUpperCase);
    }

    if(lowercaseCheck.checked){
            funcArr.push(generateLowerCase);
    }

   
    if(numbersCheck.checked){
        funcArr.push(getRandomNumber);
    }

    if(symbolsCheck.checked){
        funcArr.push(generateSymbol);
    }

    // compuslary addition

    for(let i=0;i<funcArr.length;i++){

        // calling func arr vala

        password+=funcArr[i]();
    }

    // remaining addition

    for(let i=0;i<passwordLength-funcArr.length;i++){
        let randIndex=getRndInteger(0,funcArr.length);
        password+=funcArr[randIndex]();
    }
   
    // shuffle the password as pehle checkbox vale nahito fixed hojenge if they are selected linewise

    password=shufflePassword(Array.from(password));

    // show in ui
    passwordDisplay.value=password;

    // calculation strength
    calcStrength();
})

