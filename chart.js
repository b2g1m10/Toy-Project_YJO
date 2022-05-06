// day-money
const dayUseWrap = document.querySelector('.day-use__wrap')
const history = document.querySelector('.history')

getData()

async function getData() {
  const response = await fetch('https://eulsoo.github.io/list.json')
  console.log(response)
  const data = await response.json()
  console.log(data)
  length = data.length
  console.log(length)

  labels = []
  values = []
  for (i = 0; i < length; i++) {
    labels.push(data[i].date)
    values.push(data[i].price)
  }

  // Daily-canvas
  new Chart(document.getElementById('daily-canvas'), {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: '일간리포트',
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

  // Month-canvas
  new Chart(document.getElementById('month-canvas'), {
    type: 'doughnut',
    data: {
      labels: labels,
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
  console.log(data)

  const day = document.createElement('h3')
  day.classList.add('day')
  const daySpend = document.createElement('h3')
  daySpend.classList.add('day-spend')
  const liHistory = document.createElement('li')
  liHistory.classList.add('history_list')
  const historyItem = document.createElement('h3')
  historyItem.classList.add('item')
  const historyPrice = document.createElement('h3')
  historyPrice.classList.add('price')

  for (let i = 0; i < data.length; i++) {
    if (data[i].date === '2021.9.1') {
      day.textContent = '오늘'
      historyItem.textContent = data[i].item
      historyPrice.textContent = data[i].price
      dayUseWrap.appendChild(day)
      liHistory.appendChild(historyItem)
      liHistory.appendChild(historyPrice)
      history.appendChild(liHistory)
    }
  }
}
