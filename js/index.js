// DragBtn
const historyWrap = document.querySelector('#history-wrap')
const dragArea = document.querySelector('.drag-area')
const header = document.querySelector('#header')
const adText = document.querySelector('.ad-text')
let isDown = false
let initY
let firstY
// goalBtn
const goalWrap = document.querySelector('.goal-wrap')
const goalSlider = document.querySelector('.goal-slider')
let isLeft = false
let initX
let firstX

// goal Event
goalWrap.addEventListener('mousedown', (e) => {
  e.preventDefault
  isLeft = true
  initX = goalSlider.offsetLeft
  firstX = e.pageX

  goalWrap.style.cursor = 'grabbing'
  goalWrap.addEventListener('mousemove', dragLeft, false)
  window.addEventListener(
    'mouseup',
    () => {
      goalWrap.removeEventListener('mousemove', dragLeft, false)
    },
    false
  )
})
const dragLeft = (e) => {
  // console.log(e)
  goalSlider.style.left = initX + e.pageX - firstX + 'px'
  checkGoalBoundary()
}

// historyWrap event
dragArea.addEventListener('mousedown', (e) => {
  e.preventDefault
  isDown = true
  initY = historyWrap.offsetTop
  firstY = e.pageY
  dragArea.style.cursor = 'grabbing'
  dragArea.addEventListener('mousemove', dragIt, false)

  window.addEventListener(
    'mouseup',
    () => {
      dragArea.removeEventListener('mousemove', dragIt, false)
    },
    false
  )
})

const dragIt = (e) => {
  historyWrap.style.top = initY + e.pageY - firstY + 'px'
  checkboundary()
}
const checkboundary = () => {
  let headerOuter = header.getBoundingClientRect()
  let historyInner = historyWrap.getBoundingClientRect()
  let adOuter = adText.getBoundingClientRect()
  if (historyInner.top <= headerOuter.bottom) {
    historyWrap.style.top = `${headerOuter.top}px`
  } else if (historyInner.top >= adOuter.bottom) {
    historyWrap.style.top = `${adOuter.bottom - 50}px`
  }
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

// PopUp
const graphBtn = document.querySelector('.graph-btn')
const closeBtn = document.querySelector('.chart-close')
const account = document.querySelector('.account-chart')
closeBtn.addEventListener('click', () => {
  account.classList.add('hide')
  setTimeout(() => {
    account.classList.add('display-none')
  }, 300)
})
graphBtn.addEventListener('click', () => {
  account.classList.remove('hide')
  account.classList.remove('display-none')
})
