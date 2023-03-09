import Notiflix from 'notiflix';

const delayRef = document.querySelector('input[name=delay]');
const stepRef = document.querySelector('input[name=step]');
const amountRef = document.querySelector('input[name=amount]');
const submitBtn = document.querySelector('button[type=submit]');
submitBtn.addEventListener('click', submitBtnHandler);
delayRef.addEventListener('input', delayInputHandler);
stepRef.addEventListener('input', stepInputHandler);
amountRef.addEventListener('input', amountInputHandler);

let delay = 0;
let step = 0;
let amount = 0;

function delayInputHandler(evt) {
  delay = Number(evt.currentTarget.value);
}

function stepInputHandler(evt) {
  step = Number(evt.currentTarget.value);
}

function amountInputHandler(evt) {
  amount = Number(evt.currentTarget.value);
}

const createPromise = (position, delay) => {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
};

function submitBtnHandler(evt) {
  evt.preventDefault();
  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delay += step;
  }
}
