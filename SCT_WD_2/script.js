const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const clearBtn = document.getElementById('clear');
const equalsBtn = document.getElementById('equals');

let currentInput = "";

function updateDisplay() {
  display.value = currentInput;
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value=button.dataset.value;
    if (value==='%'){
      currentInput+='/100';
    }
    else{
    currentInput += value;
  }
    updateDisplay();
  });
});
//clear button
clearBtn.addEventListener('click', () => {
  currentInput = "";
  updateDisplay();
});
//calculate result
equalsBtn.addEventListener('click', calculate);

function calculate() {
  try {
    currentInput = eval(currentInput).toString();
  } catch (error) {
    currentInput = "Error";
  }
  updateDisplay();
}

// Handle keyboard input
document.addEventListener('keydown', (e) => {
  const validKeys = "0123456789/*-+.()";
  if (validKeys.includes(e.key)) {
    currentInput += e.key;
  } else if (e.key === "Enter") {
    calculate();
  } else if (e.key === "Backspace") {
    currentInput = currentInput.slice(0, -1);
  }
  else if(e.key==='%'){
    currentInput+="/100";
  }
  const deleteBtn=document.getElementById('delete');
  deleteBtn.addEventListener('click',()=>{
    currentInput=currentInput.slice(0,-1);
    updateDisplay();
  });
  updateDisplay();
});
