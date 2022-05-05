// 로드 준비
function kSlider(target, option) {
  const toBeLoaded = document.querySelectorAll(`${target} img`)
  let loadedImages = 0
  if (toBeLoaded.length === 0) {
    throw new Error(target + ' 라는 노드를 찾지 못했습니다')
  }
  toBeLoaded.forEach((img) => {
    img.onload = () => {
      loadedImages += 1
      if (loadedImages === toBeLoaded.length) {
        run(target, option)
      }
    }
  })
}
function run(target, option) {
  const OPTION = setOption(option)
  setNode(target)
  setSliding(target, OPTION)
}
// 옵션 준비
function setOption(opt) {
  //항목 점검
  let OPTION = {
    speed: 1000,
    direction: 'horizontal',
  }
  for (prop in opt) {
    if (prop in OPTION) {
      exception(prop, opt[prop])
      OPTION[prop] = opt[prop]
    } else {
      throw new Error(`사용할 수 없는 옵션입니다`)
    }
  }

  function exception(prop, value) {
    switch (prop) {
      case 'speed':
        if (value > 0) break
      case 'direction':
        if (value === 'horizontal' || value === 'vertical') break
      default:
        throw new Error('사용할 수 없는 값입니다')
    }
  }
  return Object.freeze(OPTION)
}
// 노드 준비
function setNode(target) {
  // 만들기
  const slider = document.querySelector(target) // 주인공 찾고
  const kindWrap = document.createElement('div') // 만들고
  const kindSlider = document.createElement('div') //만들고

  // 셋팅하기
  kindWrap.classList = 'kind_wrap'
  kindSlider.classList = 'kind_slider'
  slider.classList.add('k_list')

  // 붙이기
  slider.parentNode.insertBefore(kindWrap, slider)
  kindWrap.appendChild(kindSlider)
  kindSlider.appendChild(slider)
  const slideItems = Array.from(slider.children)
  slideItems.forEach((element) => {
    element.classList.add('k_list_item')
  })
  // 클론 만들기
  const cloneA = slideItems[0].cloneNode(true)
  const cloneC = slideItems[slideItems.length - 1].cloneNode(true)
  slider.insertBefore(cloneC, slideItems[0])
  slider.appendChild(cloneA)

  // Btn 만들기
  const moveButton = document.createElement('div')
  moveButton.classList = 'arrow'
  const nextButton = document.createElement('span')
  const prevButton = document.createElement('span')
  nextButton.classList.add('next')
  prevButton.classList = 'prev'
  nextButton.textContent = '다음'
  prevButton.textContent = '이전'
  moveButton.appendChild(nextButton)
  moveButton.appendChild(prevButton)
  kindWrap.appendChild(moveButton)
}
// 동작준비
function setSliding(target, option) {
  //변수 준비
  let curIndex = 1
  let moveDist = 0
  // 클론포함 셋팅
  const slider = document.querySelector(target)
  // console.log(slider)
  const slideCloneLis = slider.querySelectorAll('.k_list_item')
  const moveButton = document.querySelector('.arrow')

  // 클론포함 넓이 셋팅
  const elWidth = slideCloneLis[0].clientWidth
  const sliderWidth = elWidth * slideCloneLis.length
  slider.style.width = sliderWidth + 'px'

  // 처음위치 잡기
  moveDist = -elWidth
  slider.style.transform = `translateX(${moveDist}px)`
  const POS = { moveDist, elWidth, curIndex }

  // 이벤트 리스너
  moveButton.addEventListener('click', (e) => {
    console.log(e)
    e.preventDefault
    slding(e, option, target, POS)
  })
}
// 동작
function slding(e, option, target, POS) {
  console.log(option)
  console.log(target)
  console.log(POS)
  const slider = document.querySelector(target)
  const slideCloneLis = slider.querySelectorAll('.k_list_item')
  if (e.target.className === 'next') {
    move(-1)
    if (POS.curIndex === slideCloneLis.length - 1) moveTimeOut(1)
  } else {
    move(1)
    if (POS.curIndex === 0) moveTimeOut(slideCloneLis.length - 2)
  }
  function move(direction) {
    POS.moveDist += POS.elWidth * direction
    POS.curIndex += -1 * direction
    slider.style.transform = `translateX(${POS.moveDist}px)`
    slider.style.transition = `all ${option.speed}ms ease-in-out`
  }

  function moveTimeOut(index) {
    setTimeout(() => {
      slider.style.transition = 'all 0ms'
      POS.moveDist = -POS.elWidth * index
      POS.curIndex = index
      slider.style.transform = `translateX(${POS.moveDist}px)`
    }, option.speed)
  }
}
