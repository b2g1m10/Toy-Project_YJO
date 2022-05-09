// day-money
const dayUseWrap = document.querySelector('.day-use__wrap')
const history = document.querySelector('.history')
const dayilyCtx = document.getElementById('daily-canvas').getContext('2d')
let gradient = dayilyCtx.createLinearGradient(0, 0, 0, 400)
gradient.addColorStop(0, 'rgba(0,189,178,1')
gradient.addColorStop(1, 'rgba(17,242,229,0.1')
getData()

async function getData() {
  const response = await fetch('https://eulsoo.github.io/list.json')
  // console.log(response)
  const data = await response.json()
  // console.log(data)
  length = data.length
  // console.log(length)

  labels = []
  values = []
  label = []
  averageVal = []
  sum = 0
  for (i = 0; i < length; i++) {
    label.push(data[i].item)
    labels.push(data[i].date)
    values.push(data[i].price)
    averageVal.push((sum = sum + data[i].price) / length)
  }

  // Daily-canvas
  new Chart(dayilyCtx, {
    data: {
      labels: labels,
      datasets: [
        {
          type: 'bar',
          label: '일간 리포트',
          backgroundColor: gradient,
          data: values,
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
      scales: {
        // y: {
        //   ticks: {
        //     callback: function (val) {
        //       return val + 'k'
        //     },
        //   },
        // },
      },
    },
  })

  // Month-canvas
  new Chart(document.getElementById('month-canvas'), {
    type: 'doughnut',
    data: {
      datasets: [
        {
          label: '6월 지출 패턴',
          backgroundColor: [
            '#3e95cd',
            '#8e5ea2',
            '#3cba9f',
            '#e8c3b9',
            '#c45850',
            '#CD5C5C',
            '#40E0D0',
          ],
          data: values,
        },
      ],
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: '원',
      },
    },
  })

  insertTxt(data)
}

/* 
  insrertTxt 

  1. data를 받아온다
  2. 날짜를 비교해서 오늘 / 어제 / 그제 를 나눈다
  3. 오늘 날짜에 해당하는 item과 price를 textContent로 넣어준다
*/

function insertTxt(data) {
  // console.log(data[0].date)
  let totalPrice = 0

  const daySpend = document.createElement('h3')
  daySpend.classList.add('day-spend')

  for (let i = 0; i < data.length; i++) {
    const liHistory = document.createElement('li')
    liHistory.classList.add('history_list')
    const historyItem = document.createElement('h3')
    historyItem.classList.add('item')
    const historyPrice = document.createElement('h3')
    historyPrice.classList.add('price')

    if (data[i].date === '2021.9.1') {
      historyItem.textContent = data[i].item
      historyPrice.textContent = data[i].price
      totalPrice = totalPrice + data[i].price
      // console.log(totalPrice)

      liHistory.appendChild(historyItem)
      liHistory.appendChild(historyPrice)
      history.appendChild(liHistory)
    } else if (data[i].date === '2021.9.2') {
      historyItem.textContent = data[i].item
      historyPrice.textContent = data[i].price
      totalPrice = totalPrice + data[i].price
      liHistory.appendChild(historyItem)
      liHistory.appendChild(historyPrice)
      history.appendChild(liHistory)
    }
  }
  daySpend.textContent = `${totalPrice}원 지출`
  dayUseWrap.appendChild(daySpend)
}
