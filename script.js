const TABLE = document.querySelector('main');
const COLOR_SELECTOR = document.createElement('input');
COLOR_SELECTOR.setAttribute('type', 'color');

let colorSelected = '#000';
let lastCellPainted = 0;

const handleSelectColor = ({ type, target }) => {
  if (type === 'change') {
    colorSelected = target.value;
  }
  COLOR_SELECTOR.style.animation = 'fadeOut ease 0.5s';
  setTimeout(() => {
    COLOR_SELECTOR.remove();
  }, 500);
};

const openColorSelector = event => {
  COLOR_SELECTOR.setAttribute(
    'style',
    `top: ${event.y - 25}px; left: ${event.x - 50}px`
  );
  TABLE.appendChild(COLOR_SELECTOR);
  ['change', 'mouseleave'].forEach(typeEvent =>
    COLOR_SELECTOR.addEventListener(typeEvent, event =>
      handleSelectColor(event)
    )
  );
};

const paintCell = ({ buttons, type, target }) => {
  if (
    buttons === 2 ||
    (type === 'mousemove' && (buttons === 0 || lastCellPainted == target.id))
  )
    return;

  if (!!target.style.backgroundColor) {
    target.style.backgroundColor = '';
  } else {
    target.style.backgroundColor = colorSelected;
  }
  lastCellPainted = target.id;
};

document.addEventListener('contextmenu', event => {
  event.preventDefault();
  openColorSelector(event);
});

for (let index = 0; index < 4500; index++) {
  const CELL = document.createElement('div');
  CELL.setAttribute('id', index);
  ['click', 'mousemove'].forEach(eventType =>
    CELL.addEventListener(eventType, event => {
      event.preventDefault();
      paintCell(event);
    })
  );
  TABLE.appendChild(CELL);
}
