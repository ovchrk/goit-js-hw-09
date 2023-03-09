import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputRef = document.querySelector('input');
const startBtnRef = document.querySelector('button[data-start]');
const daysRef = document.querySelector('span[data-days]');
const hoursRef = document.querySelector('span[data-hours]');
const minutesRef = document.querySelector('span[data-minutes]');
const secondsRef = document.querySelector('span[data-seconds]');
const fieldsRef = document.querySelectorAll('.field');
const valueRef = document.querySelectorAll('.value');
const timerEl = document.querySelector('.timer');

timerEl.style.display = 'flex';
timerEl.style.gap = '30px';
timerEl.style.padding = '30px';
fieldsRef.forEach(field => {
  field.style.display = 'flex';
  field.style.flexDirection = 'column';
});
inputRef.style.padding = '15px';
inputRef.style.margin = '20px';
startBtnRef.style.display = 'inline-clock';
startBtnRef.style.padding = '10px';
startBtnRef.style.borderRadius = '5px';
startBtnRef.style.fontSize = '16px';
valueRef.forEach(value => {
  value.style.fontSize = '30px';
  value.style.textAlign = 'center';
});
let timerId = null;
startBtnRef.disabled = false;
startBtnRef.addEventListener('click', startBtnClickHandler);

let currentTime = null;
let selectedDate = null;

const fp = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  dateFormat: 'Y-m-d H:i',
  defaultDate: '2023 03 08 00:00',

  onClose(selectedDates) {
    console.log(`Selected time and date`, selectedDates[0]);
    if (Date.now() > selectedDates[0].getTime()) {
      Notiflix.Notify.warning('Please choose a date in the future');
    } else {
      currentTime = Date.now();
      selectedDate = selectedDates[0].getTime();
    }
  },
  onChange() {
    startBtnRef.disabled = true;
    fp.close();
  },
});

//Функция конвертирования милисекунд
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

//Функция добавления ноля перед одним числом

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

//Функция обработки клика на кнопке старт
function startBtnClickHandler(evt) {
  timerId = setInterval(() => {
    const deltaTime = selectedDate - currentTime;

    const { days, hours, minutes, seconds } = convertMs(deltaTime);

    currentTime = Date.now();

    daysRef.textContent = `${days}`;
    hoursRef.textContent = `${hours}`;
    minutesRef.textContent = `${minutes}`;
    secondsRef.textContent = `${seconds}`;

    if (deltaTime === 0) {
      clearInterval(timerId);
    }
  }, 1000);
}

// const inputRef = flatpickr(input, {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     console.log(selectedDates[0]);
//   },
// });
