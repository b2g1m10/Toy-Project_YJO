// day-money
const dayUseWrap = document.querySelector('.day-use__wrap')
const monthList = document.querySelector('.month__list')
const dayilyCtx = document.getElementById('daily-canvas').getContext('2d')
let gradient = dayilyCtx.createLinearGradient(0, 0, 0, 400)
gradient.addColorStop(0, 'rgba(0,189,178,1')
gradient.addColorStop(1, 'rgba(17,242,229,0.1')

let dailyLabels = []
let dailyValues = []
let monthLabels = []
let monthValues = []
let label = []

// console.log(monthLabels)
getData()

async function getData() {
  const response = await fetch('../data.json')
  const data = await response.json()
  insertTxt(data)
}

function insertTxt(data) {
  // GroubBy -> data를 key를 기준으로 그룹 짓는다
  const groupBy = function (data, key) {
    return data.reduce(function (carry, el) {
      var group = el[key]
      if (carry[group] === undefined) {
        carry[group] = []
      }
      carry[group].push(el)
      return carry
    }, {})
  }

  // Daily Value
  const dateArr = groupBy(data, 'date')
  for (const [key, value] of Object.entries(dateArr)) {
    dailyKeyValue(key, value)
  }
  for (const date in dateArr) {
    dailyLabels.push(date)
    dailyPrice = 0

    for (let i = 0; i < dateArr[date].length; i++) {
      if (dateArr[date][i].inOut !== 'in') {
        dailyPrice = dailyPrice + dateArr[date][i].price
      }
    }
    dailyValues.push(dailyPrice)
  }

  // Month Value
  const typeArr = groupBy(data, 'type')

  for (const [key, value] of Object.entries(typeArr)) {
    // monthKeyValue(key, value)
    if (monthTotalValue(value) !== 0) {
      monthValues.push(monthTotalValue(value))
    }
  }

  function monthTotalValue(value) {
    let totalPrice = 0
    value.map((el) => {
      // console.log(el)
      if (el.inOut === 'out' && el.date.includes('2022.4')) {
        if (el.type) {
          totalPrice = totalPrice + el.price
        }
      }
    })
    return totalPrice
  }

  for (const type in typeArr) {
    // console.log(type)
    if (type !== '') {
      // console.log(type)
      for (const date in typeArr[type]) {
        if (
          typeArr[type][date].date.includes('2022.4') &&
          monthLabels.indexOf(type) === -1
        ) {
          monthLabels.push(type)
        }
      }
    }
  }
  for (let i = 0; i < monthLabels.length; i++) {
    const liEl = document.createElement('li')
    liEl.classList.add('month__list--li')
    monthList.appendChild(liEl)
    const icon = document.createElement('img')
    icon.classList.add('icon')
    const price = document.createElement('price')
    price.classList.add('price')
    const title = document.createElement('h3')
    title.classList.add('title')

    if (monthLabels[i] === 'eatout') {
      title.textContent = 'eatout'
      price.textContent = monthValues[i].toLocaleString()
      icon.setAttribute('src', '../images/month-eatout.svg')
    } else if (monthLabels[i] === 'shopping') {
      title.textContent = 'shopping'
      price.textContent = monthValues[i].toLocaleString()
      icon.setAttribute('src', '../images/month-shopping.svg')
    } else if (monthLabels[i] === 'health') {
      title.textContent = 'health'
      price.textContent = monthValues[i].toLocaleString()
      icon.setAttribute('src', '../images/month-health.svg')
    } else if (monthLabels[i] === 'mart') {
      title.textContent = 'mart'
      price.textContent = monthValues[i].toLocaleString()
      icon.setAttribute('src', '../images/month-mart.svg')
    }
    liEl.appendChild(icon)
    liEl.appendChild(title)
    liEl.appendChild(price)
  }
}

// dayily Insert HTML
function dailyKeyValue(key, value) {
  let totalPrice = 0
  const itemWrap = document.createElement('div')
  itemWrap.classList.add('itemWrap')

  const dayTotal = document.createElement('div')
  dayTotal.classList.add('day-total')

  const day = document.createElement('h3')
  day.classList.add('day')
  day.textContent = key

  const daySpend = document.createElement('h3')
  daySpend.classList.add('day-spend')

  const history = document.createElement('ul')
  history.classList.add('history')

  for (let i = 0; i < value.length; i++) {
    // console.log(value[i].inOut)

    const itemName = document.createElement('h3')
    itemName.classList.add('item')
    itemName.textContent = value[i].item

    const itemPrice = document.createElement('h3')
    if (value[i].inOut === 'out') {
      totalPrice = totalPrice + value[i].price
      itemPrice.classList.add('price-out')
      itemPrice.textContent = value[i].price.toLocaleString() + '원'
    } else {
      itemPrice.classList.add('price-in')
      itemPrice.textContent = '+ ' + value[i].price.toLocaleString() + '원'
    }

    const historyList = document.createElement('li')
    historyList.classList.add('history_list')

    historyList.appendChild(itemName)
    historyList.appendChild(itemPrice)
    history.appendChild(historyList)
  }
  daySpend.textContent = `${totalPrice.toLocaleString()}원 지출`
  dayUseWrap.appendChild(itemWrap)

  itemWrap.appendChild(dayTotal)
  dayTotal.appendChild(day)
  dayTotal.appendChild(daySpend)
  itemWrap.appendChild(history)
}

/* 

     ###########   Chart

*/

// Daily-canvas
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

// Month-canvas
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
