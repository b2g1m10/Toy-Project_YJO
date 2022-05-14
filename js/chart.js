const dayUseWrap = document.querySelector('.day-use__wrap')
const monthUl = document.querySelector('.month__list')
const dayilyCtx = document.getElementById('daily-canvas').getContext('2d')
let gradient = dayilyCtx.createLinearGradient(0, 0, 0, 400)
gradient.addColorStop(0, 'rgba(0,189,178,1')
gradient.addColorStop(1, 'rgba(17,242,229,0.1')

getData()

// Featch Data
async function getData() {
  const response = await fetch('../data.json')
  const data = await response.json()
  dailyArrData(data)
  monthArrData(data)
}

// GroupBy 모듈
const groupBy = function (data, key) {
  return data.reduce(function (carry, el) {
    let group = el[key]
    if (carry[group] === undefined) {
      carry[group] = []
    }
    carry[group].push(el)
    return carry
  }, {})
}

/* 
    ----- 일별 지출
*/

let dailyLabels = []
let dailyValues = []

// 일별 데이타 분류 하기
const dailyArrData = (data) => {
  const dateArr = groupBy(data, 'date')
  dailyInsertHtml(dateArr)
}

// dayily Insert HTML
function dailyInsertHtml(dateArr) {
  // console.log(dateArr)

  for (const [dateText, dailyList] of Object.entries(dateArr)) {
    dailyLabels.push(dateText) // 날짜만 push
    // console.log(dailyList)
    //총 합 구하기 out일 경우에만 더하고 values에 push
    const totalPrice = dailyList.reduce((prev, curr) => {
      // console.log(curr)
      switch (curr.inOut) {
        case 'out':
          return (prev += curr.price)
        case 'in':
          return prev
        default:
          break
      }
    }, 0)
    dailyValues.push(totalPrice)

    // 일별 리스트 생성
    const itemWrap = document.createElement('div')
    const dayHistoryUl = document.createElement('ul')

    itemWrap.className = 'itemWrap'
    dayHistoryUl.className = 'history'

    itemWrap.innerHTML = `
      <div class="day-total"> 
        <h3 class="day">${dateText}</h3>
        <h3 class="day-spend">${totalPrice.toLocaleString()}원 지출</h3>
      </div>
    `

    dayUseWrap.appendChild(itemWrap)
    itemWrap.appendChild(dayHistoryUl)

    dailyList.forEach((item) => {
      const HistoryLi = document.createElement('li')
      HistoryLi.className = 'history_list'

      HistoryLi.innerHTML = `
        <h3 class="item">${item.item}</h3>
        <h3 class="${item.inOut === 'in' ? 'price-in' : 'price-out'}">
          ${
            item.inOut === 'in'
              ? '+' + item.price.toLocaleString()
              : item.price.toLocaleString()
          }원
        </h3>
      `
      dayHistoryUl.appendChild(HistoryLi)
    })
  }
}

/* 
   ------ 월별 지출 패턴
*/

let monthLabels = []
let monthValues = []

const monthArrData = (data) => {
  // 4월만 필터하기
  const aprilData = data.filter((e) => {
    return e.date.includes('2022.4')
  })

  // 4월 데이터를 타입으로 분류
  const aprilTypeArr = groupBy(aprilData, 'type')

  for (const [typeText, typeValue] of Object.entries(aprilTypeArr)) {
    monthLabels.push(typeText) // 타입만 push
    // console.log(typeText)
    // console.log(typeValue)

    // 타입 총합 구하기
    const totalPrice = typeValue.reduce((prev, curr) => {
      switch (curr.inOut) {
        case 'out':
          return (prev += curr.price)
        default:
          break
      }
    }, 0)
    // console.log(totalPrice)
    monthValues.push(totalPrice) // 타입 총합 push

    // 월별 리스트 생성
    const monthLi = document.createElement('li')
    monthLi.className = 'month__list--li'
    monthUl.appendChild(monthLi)

    typeValue.forEach(() => {
      monthLi.innerHTML = `
        <img src="../images/month-${typeText}.svg" alt="${typeText}" class="icon"/>
        <h3 class="title">${typeText}</h3>
        <h3 class="price">${totalPrice}</h3>
    `
    })
  }
}

/* 

     ###########   Chart

*/

// Daily - canvas
new Chart(dayilyCtx, {
  data: {
    labels: dailyLabels,
    datasets: [
      {
        type: 'line',
        label: '일간 리포트',
        backgroundColor: '#ff5f00',
        data: dailyValues,
        borderColor: '#ff5f00',
        PointStyle: 'dash',
      },
      {
        type: 'bar',
        label: '일간 리포트',
        backgroundColor: gradient,
        data: dailyValues,
        hoverBackgroundColor: '#09837c',
        PointStyle: 'dash',
      },
    ],
  },

  options: {
    radius: 5,
    legend: { display: false },
    title: {
      display: true,
      text: '원',
    },
    responsive: true,
  },
})

// // Month-canvas
const monthCtx = document.getElementById('month-canvas').getContext('2d')
const myChart = new Chart(monthCtx, {
  type: 'doughnut',
  data: {
    labels: monthLabels,
    datasets: [
      {
        label: '',
        data: monthValues,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        // text: `총 ${monthValues.reduce((c, n) => {
        //   return c + n
        // })}원`,
      },
    },
  },
})
