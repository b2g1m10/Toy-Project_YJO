const historyWrap = document.querySelectorAll('#history-wrap')
const dragArea = document.querySelector('.drag-area')

let isDown = false
let startY
let scrollTop

dragArea.addEventListener('touchstart', (e) => {
  console.log(historyWrap[0].offsetHeight)
  console.log(e.changedTouches[0].screenY)

  isDown = true
})
dragArea.addEventListener('touchmove', (e) => {
  isDown = false
})
dragArea.addEventListener('touchend', (e) => {
  if (!isDown) return
  e.preventDefault
})

// const goalWrap = document.querySelectorAll('.goal-wrap')
// console.log(goalWrap[0])
// goalWrap.forEach((item) => {
//   item.addEventListener('touchstart', (e) => {
//     console.log(e.changedTouches[0])
//   })
// })
// Swiper js
var sectionSwiper = new Swiper('.my-swiper', {
  observer: true, // 추가
  observeParents: true, // 추가
})

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
