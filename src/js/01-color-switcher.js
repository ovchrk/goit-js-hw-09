function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const bodyRef = document.querySelector('body');
const startBtnRef = document.querySelector('button[data-start]');
const stopBtnRef = document.querySelector('button[data-stop]');
console.log(stopBtnRef);

startBtnRef.addEventListener('click', startBtnClickHandler);
stopBtnRef.addEventListener('click', stopBtnClickHandler);

function startBtnClickHandler(evt) {
  // timerId = setInterval(() => {
  //   console.log(`I love async JS!  ${Math.random()}`);
  // }, 1000);

  timerId = setInterval(() => {
    bodyRef.style.backgroundColor = `${getRandomHexColor()}`;
  }, 1000);
  startBtnRef.disabled = true;
}
function stopBtnClickHandler(evt) {
  clearInterval(timerId);
  startBtnRef.disabled = true;
  // startBtnRef.removeAttribute('disabled');
}
