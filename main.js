const dragArea = document.querySelector('.drag-area')

let isDown = false
let startY
let scrollTop

dragArea.addEventListener('touchstart', (e) => {
  console.log(e)
  isDown = true
})
dragArea.addEventListener('touchmove', (e) => {
  isDown = false
})

dragArea.addEventListener('touchend', (e) => {
  if (!isDown) return
  console.log(isDown)
  e.preventDefault
})

// Swiper js
var sectionSwiper = new Swiper('.my-swiper', {
  observer: true, // 추가
  observeParents: true, // 추가
})
