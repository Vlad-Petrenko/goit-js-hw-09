import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  btnStart: document.querySelector('[data-start]'),
  timerField: document.querySelector('.timer'),
  selectedDays: document.querySelector('[data-days]'),
  selectedHours: document.querySelector('[data-hours]'),
  selectedMinutes: document.querySelector('[data-minutes]'),
  selectedSeconds: document.querySelector('[data-seconds]'),
};

let selectedTime = '';
let intervalId = null;
let time = '';
// let deltaTime = null;
refs.btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedTime = selectedDates[0];
    if (selectedDates[0] <= options.defaultDate) {
      return Notify.failure('Please choose a date in the future');
    } else {
      refs.btnStart.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

refs.btnStart.addEventListener('click', start);

function start() {
  intervalId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = selectedTime - currentTime;
    time = convertMs(deltaTime);
    onTick(time);
    stop(deltaTime);
  }, 1000);
  refs.btnStart.disabled = true;
}

function stop(deltaTime) {
  if (deltaTime <= 1000) {
    clearInterval(intervalId);
  }
}

function onTick({ days, hours, minutes, seconds } = time) {
  refs.selectedDays.textContent = days;
  refs.selectedHours.textContent = hours;
  refs.selectedMinutes.textContent = minutes;
  refs.selectedSeconds.textContent = seconds;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
