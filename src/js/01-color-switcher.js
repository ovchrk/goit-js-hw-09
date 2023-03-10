function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const bodyRef = document.querySelector('body');
const startBtnRef = document.querySelector('button[data-start]');
const stopBtnRef = document.querySelector('button[data-stop]');

startBtnRef.addEventListener('click', startBtnClickHandler);
stopBtnRef.addEventListener('click', stopBtnClickHandler);

let timerId = null;

function startBtnClickHandler(evt) {
  timerId = setInterval(() => {
    bodyRef.style.backgroundColor = `${getRandomHexColor()}`;
  }, 1000);
  startBtnRef.disabled = true;
}
function stopBtnClickHandler(evt) {
  clearInterval(timerId);
  startBtnRef.removeAttribute('disabled');
  startBtnRef.disabled = false;
  // startBtnRef.removeAttribute('disabled');
}
