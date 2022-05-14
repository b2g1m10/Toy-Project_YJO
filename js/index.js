// DragBtn
const historyWrap = document.querySelector('#history-wrap');
const dragArea = document.querySelector('.drag-area');
const header = document.querySelector('#header');
const middleText = document.querySelector('.middle--text');
const dayWrap = document.querySelector('.day-use__wrap');
let isDown = false;
let initY, firstY;
// goalBtn
const goalWrap = document.querySelector('.goal-wrap');
const goalSlider = document.querySelector('.goal-slider');
let isLeft = false;
let initX, firstX;
// day-money
const moneyWrap = document.querySelector('.day-money-wrap');
const moneySlider = document.querySelector('.day-money-slider');
const nav = document.querySelector('#nav');
let moneyDown = false;
let moneyY, firstMoney;
// let moneyMove = false

// historyWrap event
dragArea.addEventListener('mousedown', (e) => {
  e.stopPropagation();
  isDown = true;
  initY = historyWrap.offsetTop;
  firstY = e.pageY;

  dragArea.style.cursor = 'grab';
  dragArea.addEventListener('mousemove', dragIt, false);

  window.addEventListener(
    'mouseup',
    () => {
      dragArea.removeEventListener('mousemove', dragIt, false);
      dragArea.style.cursor = 'Default';
    },
    false
  );
});
const section = document.querySelector('section');
let initHeight = section.offsetHeight - 163;
const dragIt = (e) => {
  e.stopPropagation();
  historyWrap.style.top = initY + e.pageY - firstY + 'px';
  // console.log(e.pageY)
  // console.log(firstY)
  dragArea.style.cursor = 'grabbbing';

  if (parseInt(historyWrap.style.top) < 349) {
    moneySlider.style.maxHeight =
      initHeight - parseInt(historyWrap.style.top) + 'px';
  }

  checkboundary(e);
};
const checkboundary = () => {
  let headerOuter = header.getBoundingClientRect();
  let historyInner = historyWrap.getBoundingClientRect();
  let adOuter = middleText.getBoundingClientRect();
  let windowY = window.scrollY;
  // console.log(windowY)

  if (windowY > 0) {
    if (historyInner.top <= headerOuter.bottom) {
      historyWrap.style.top = `${headerOuter.top + windowY}px`;
    } else if (historyInner.top >= adOuter.bottom) {
      historyWrap.style.top = `${adOuter.bottom + windowY - 50}px`;
    }
  } else {
    if (historyInner.top <= headerOuter.bottom) {
      historyWrap.style.top = `${headerOuter.top}px`;
    } else if (historyInner.top >= adOuter.bottom) {
      historyWrap.style.top = `${adOuter.bottom - 50}px`;
    }
  }
};

// goal Event
goalWrap.addEventListener('mousedown', (e) => {
  e.stopPropagation();
  isLeft = true;
  initX = goalSlider.offsetLeft;
  firstX = e.pageX;

  goalWrap.style.cursor = 'grab';
  goalWrap.addEventListener('mousemove', dragLeft, false);
  window.addEventListener(
    'mouseup',
    () => {
      goalWrap.removeEventListener('mousemove', dragLeft, false);
      goalWrap.style.cursor = 'Default';
    },
    false
  );
});
const dragLeft = (e) => {
  e.stopPropagation();
  goalSlider.style.left = initX + e.pageX - firstX + 'px';
  goalWrap.style.cursor = 'grabbing';
  checkGoalBoundary();
};
const checkGoalBoundary = () => {
  let goalWrapOuter = goalWrap.getBoundingClientRect();
  let goalSliderInner = goalSlider.getBoundingClientRect();
  if (goalSliderInner.right <= goalWrapOuter.right) {
    goalSlider.style.left = `${
      goalWrapOuter.width - goalSliderInner.width - 10
    }px`;
  } else if (parseInt(goalSlider.style.left) >= 0) {
    goalSlider.style.left = `0px`;
  }
};

/* 

   ///////// PopUp 
  
*/
const graphBtn = document.querySelector('.graph-btn');
const closeBtn = document.querySelector('.chart-close');
const popup = document.querySelector('.popup-chart');
const popupSlide = document.querySelector('.popup-slide');
let popupInitY,
  popupDown = false,
  firstPopup;

closeBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  popup.classList.add('hide');
  setTimeout(() => {
    popup.classList.add('display-none');
  }, 300);
});
graphBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  popup.classList.remove('hide');
  popup.classList.remove('display-none');
  popupInit();
});

// Popup drag event

popup.addEventListener('mousedown', (e) => {
  e.stopPropagation();
  popupDown = true;
  firstPopup = e.pageY;
  popupInitY = popupSlide.offsetTop;
  popup.style.cursor = 'grab';
  popup.addEventListener('mousemove', dragPopup, false);
});

popup.addEventListener('mouseup', (e) => {
  popupDown = false;
  popup.style.cursor = 'Default';
  // console.log(e)
});
const popupInit = () => {
  popupSlide.style.top = 0;
};
const dragPopup = (e) => {
  if (!popupDown) return;
  popup.style.cursor = 'grabbing';
  popupSlide.style.top = popupInitY + e.pageY - firstPopup + 'px';
  popupBoundary();
};
const popupBoundary = () => {
  let outerPopup = popup.getBoundingClientRect();
  let innerPopup = popupSlide.getBoundingClientRect();
  let navTop = nav.getBoundingClientRect();
  if (parseInt(popupSlide.style.top) >= 0) {
    popupSlide.style.top = '0px';
  } else if (innerPopup.bottom + navTop.height < outerPopup.bottom) {
    popupSlide.style.top =
      outerPopup.height - innerPopup.height - navTop.height + 'px';
  }
};

/* 

    /////// swiper js 

*/

// const swiper = new Swiper('.my-swiper', {
//   direction: 'horizontal',
//   touchStartPreventDefault: false,
//   preventClicks: false,
//   pagination: {
//     el: '.swiper-pagination',
//   },
//   touchRatio: 0.05,
// })

/* 

    /////////  input range 

*/
const rangeBtn = document.querySelector('.section1 .account-range');

const progressbar = document.querySelector('.section1 .progress__bar');
// console.log(progressbar)
rangeBtn.oninput = () => {
  let value = rangeBtn.value;
  progressbar.style.width = value + '%';
};
const rangeBtn2 = document.querySelector('.section2 .account-range');

const progressbar2 = document.querySelector('.section2 .progress__bar');
rangeBtn2.oninput = () => {
  let value = rangeBtn2.value;
  progressbar2.style.width = value + '%';
};
