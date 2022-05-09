// DragBtn
const historyWrap = document.querySelector('#history-wrap')
const dragArea = document.querySelector('.drag-area')
const header = document.querySelector('#header')
const middleText = document.querySelector('.middle--text')
const dayWrap = document.querySelector('.day-use__wrap')
let isDown = false,
  initY,
  firstY
// goalBtn
const goalWrap = document.querySelector('.goal-wrap')
const goalSlider = document.querySelector('.goal-slider')
let isLeft = false,
  initX,
  firstX
// day-money
const moneyWrap = document.querySelector('.day-money-wrap')
const moneySlider = document.querySelector('.day-money-slider')
const nav = document.querySelector('#nav')
let moneyDown = false,
  moneyY,
  firstMoney
// let moneyMove = false

// historyWrap event
dragArea.addEventListener('mousedown', (e) => {
  e.preventDefault()
  isDown = true
  initY = historyWrap.offsetTop
  firstY = e.pageY
  dragArea.style.cursor = 'grab'
  dragArea.addEventListener('mousemove', dragIt, false)

  window.addEventListener(
    'mouseup',
    () => {
      dragArea.removeEventListener('mousemove', dragIt, false)
      dragArea.style.cursor = 'Default'
    },
    false
  )
})

const dragIt = (e) => {
  historyWrap.style.top = initY + e.pageY - firstY + 'px'
  dragArea.style.cursor = 'grabbbing'
  checkboundary(e)
}
const checkboundary = (e) => {
  let headerOuter = header.getBoundingClientRect()
  let historyInner = historyWrap.getBoundingClientRect()
  let adOuter = middleText.getBoundingClientRect()
  console.log('adOuter.bottom', adOuter.bottom)
  console.log('adOuter.top', adOuter)
  console.log('historyInner.top', historyInner.top)
  console.log(e.clientY)
  // console.log(e)
  if (historyInner.top <= headerOuter.bottom) {
    historyWrap.style.top = `${headerOuter.top}px`
    // moneySlider.style.maxHeight = '500px'
  } else if (historyInner.top >= adOuter.bottom) {
    historyWrap.style.top = `${adOuter.bottom - 50}px`
    // moneySlider.style.maxHeight = '300px'
  }
}

// goal Event
goalWrap.addEventListener('mousedown', (e) => {
  e.preventDefault()
  isLeft = true
  initX = goalSlider.offsetLeft
  firstX = e.pageX

  goalWrap.style.cursor = 'grab'
  goalWrap.addEventListener('mousemove', dragLeft, false)
  window.addEventListener(
    'mouseup',
    () => {
      goalWrap.removeEventListener('mousemove', dragLeft, false)
      goalWrap.style.cursor = 'Default'
    },
    false
  )
})
const dragLeft = (e) => {
  // console.log(e)
  goalSlider.style.left = initX + e.pageX - firstX + 'px'
  goalWrap.style.cursor = 'grabbing'
  checkGoalBoundary()
}
const checkGoalBoundary = () => {
  let goalWrapOuter = goalWrap.getBoundingClientRect()
  let goalSliderInner = goalSlider.getBoundingClientRect()
  if (goalSliderInner.right <= goalWrapOuter.right) {
    goalSlider.style.left = `${
      goalWrapOuter.width - goalSliderInner.width - 10
    }px`
  } else if (parseInt(goalSlider.style.left) >= 0) {
    goalSlider.style.left = `0px`
  }
}
// day-money-drag
// moneyWrap.addEventListener('mousedown', (e) => {
//   e.preventDefault()
//   moneyDown = true
//   moneyY = moneySlider.offsetTop
//   firstMoney = e.pageY

//   moneyWrap.style.cursor = 'grab'
//   moneyWrap.addEventListener('mousemove', dragHistory, false)
//   window.addEventListener(
//     'mouseup',
//     () => {
//       moneyWrap.removeEventListener('mousemove', dragHistory, false)
//       moneyWrap.style.cursor = 'Default'
//     },
//     false
//   )
// })

// const dragHistory = (e) => {
//   // console.log(e)
//   moneySlider.style.top = moneyY + e.pageY - firstMoney + 'px'
//   moneyWrap.style.cursor = 'grabbing'
//   HisotryBoundary()
// }

// const HisotryBoundary = () => {
//   let moneyOuter = moneyWrap.getBoundingClientRect()
//   let moneyInner = moneySlider.getBoundingClientRect()
//   // console.log('------------------ outer')
//   // console.log('moneyOuter-height', moneyOuter.height)
//   // console.log('moneyOuter-bottom', moneyOuter.bottom)
//   // console.log('moneyOuter -top', moneyOuter.top)
//   // console.log('------------------ inner')
//   // console.log('moneyInner -height', moneyInner.height)
//   // console.log('moneyInner -bottom', moneyInner.bottom)
//   // console.log('moneyInner -top', moneyInner.top)

//   let moneyOuterSum = moneyOuter.height - moneyOuter.bottom
//   let innerSum = moneyOuter.height - moneyInner.height
//   if (parseInt(moneySlider.style.top) >= 0) {
//     moneySlider.style.top = `0px`
//   } else if (moneyInner.bottom < moneyOuter.height) {
//     moneySlider.style.top = moneyOuterSum + innerSum + 'px'
//   }
// }
// console.log(moneySlider.clientHeight)
// PopUp
const graphBtn = document.querySelector('.graph-btn')
const closeBtn = document.querySelector('.chart-close')
const popup = document.querySelector('.popup-chart')
const popupSlide = document.querySelector('.popup-slide')
let popupInitY,
  popupDown = false,
  firstPopup

closeBtn.addEventListener('click', (e) => {
  e.preventDefault()
  popup.classList.add('hide')
  setTimeout(() => {
    popup.classList.add('display-none')
  }, 300)
})
graphBtn.addEventListener('click', (e) => {
  e.preventDefault()
  popup.classList.remove('hide')
  popup.classList.remove('display-none')
  popupInit()
})
// drag event

popup.addEventListener('mousedown', (e) => {
  e.preventDefault()
  popupDown = true
  firstPopup = e.pageY
  popupInitY = popupSlide.offsetTop
  popup.style.cursor = 'grab'
  popup.addEventListener('mousemove', dragPopup, false)
})

popup.addEventListener('mouseup', (e) => {
  popupDown = false
  popup.style.cursor = 'Default'
  // console.log(e)
})
const popupInit = () => {
  popupSlide.style.top = 0
}
const dragPopup = (e) => {
  if (!popupDown) return
  popup.style.cursor = 'grabbing'
  popupSlide.style.top = popupInitY + e.pageY - firstPopup + 'px'
  popupBoundary()
}
const popupBoundary = () => {
  let outerPopup = popup.getBoundingClientRect()
  let innerPopup = popupSlide.getBoundingClientRect()
  let navTop = nav.getBoundingClientRect()
  // console.log('outerPopup - height', outerPopup.height)
  // console.log('outerPopup - bottom', outerPopup.bottom)
  // console.log('innerPopup - height', innerPopup.height)
  // console.log('innerPopup - bottom', innerPopup.bottom)
  // console.log(innerSum)
  // console.log(outerSum)
  // console.log(navTop.height)

  // console.log(`${innerPopup.bottom}` - `${innerPopup.height}`)
  if (parseInt(popupSlide.style.top) >= 0) {
    popupSlide.style.top = '0px'
  } else if (innerPopup.bottom + navTop.height < outerPopup.bottom) {
    popupSlide.style.top =
      outerPopup.height - innerPopup.height - navTop.height + 'px'
  }
}
// swiper js
const swiper = new Swiper('.my-swiper', {
  direction: 'horizontal',
  touchStartPreventDefault: false,
  preventClicks: false,
  pagination: {
    el: '.swiper-pagination',
  },
  touchRatio: 0.05,
})

// input range
const changeRange = (e) => {
  console.log('move')
  const rangeBtn = document.querySelector('#account-range')
  let value =
    (rangeBtn.value - rangeBtn.getAttribute('min')) /
    (rangeBtn.getAttribute('max') - rangeBtn.getAttribute('min'))
  console.log(value)
  rangeBtn.style.backgroundImage =
    '-webkit-gradient(linear, left top, right top, ' +
    'color-stop(' +
    value +
    ', #ffdb4c),' +
    'color-stop(' +
    value +
    ', #c4c4c4)' +
    ' );'

  console.log(rangeBtn.style.backgroundImage)
}
