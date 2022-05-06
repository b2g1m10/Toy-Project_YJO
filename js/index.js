// DragBtn
const historyWrap = document.querySelector('#history-wrap')
const dragArea = document.querySelector('.drag-area')
const header = document.querySelector('#header')
const adText = document.querySelector('.ad-text')

let isDown = false
let initY
let firstY
// console.log(historyWrap.getBoundingClientRect())
// console.log(section.getBoundingClientRect())
dragArea.addEventListener('mousedown', (e) => {
  e.preventDefault
  isDown = true
  initY = historyWrap.offsetTop
  firstY = e.pageY
  dragArea.style.cursor = 'grabbing'
  dragArea.addEventListener('mousemove', dragIt, false)

  window.addEventListener(
    'mouseup',
    function () {
      dragArea.removeEventListener('mousemove', dragIt, false)
    },
    false
  )
})

function dragIt(e) {
  historyWrap.style.top = initY + e.pageY - firstY + 'px'
  checkboundary()
}
function checkboundary() {
  let headerOuter = header.getBoundingClientRect()
  let historyInner = historyWrap.getBoundingClientRect()
  let adOuter = adText.getBoundingClientRect()

  if (historyInner.top <= headerOuter.bottom) {
    historyWrap.style.top = `${headerOuter.top}px`
  } else if (historyInner.top >= adOuter.bottom) {
    historyWrap.style.top = `${adOuter.bottom - 50}px`
  }
  // console.log(adOuter)
  // console.log('header-top', outer.top)
  // console.log('header-bottom', outer.bottom)
  // console.log('history-bottom', historyInner.bottom)
  // console.log('historyinner-top', historyWrap.style.top)
}

// const goalWrap = document.querySelectorAll('.goal-wrap')
// console.log(goalWrap[0])
// goalWrap.forEach((item) => {
//   item.addEventListener('touchstart', (e) => {
//     console.log(e.changedTouches[0])
//   })
// })
// Swiper js
// var sectionSwiper = new Swiper('.my-swiper', {
//   observer: true, // 추가
//   observeParents: true, // 추가
// })

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
