function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  startBtnChangeColor: document.querySelector('[data-start]'),
  stopBtnColor: document.querySelector('[data-stop]'),
  allBody: document.querySelector('body'),
};

refs.startBtnChangeColor.addEventListener('click', changeColor);
refs.stopBtnColor.addEventListener('click', stopChangeColor);
let onChangeColor = 'null';

function changeColor() {
  onChangeColor = setInterval(() => {
    refs.allBody.style.backgroundColor = getRandomHexColor();
  }, 1000);
  refs.startBtnChangeColor.disabled = true;
}

function stopChangeColor() {
  clearInterval(onChangeColor);
  refs.startBtnChangeColor.disabled = false;
}
