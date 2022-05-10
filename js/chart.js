// day-money
const dayUseWrap = document.querySelector('.day-use__wrap')
const monthList = document.querySelector('.month__list')
const dayilyCtx = document.getElementById('daily-canvas').getContext('2d')
let gradient = dayilyCtx.createLinearGradient(0, 0, 0, 400)
gradient.addColorStop(0, 'rgba(0,189,178,1')
gradient.addColorStop(1, 'rgba(17,242,229,0.1')
getData()

async function getData() {
  const response = await fetch('../data.json')
  // console.log(response)
  const data = await response.json()
  // console.log(data)

  // console.log(length)

  insertTxt(data)
}

function insertTxt(data) {
  // console.log(data)

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
  const dateArr = groupBy(data, 'date')
  // console.log(dateArr)
  const typeArr = groupBy(data, 'type')
  // console.log(typeArr)

  for (const [key, value] of Object.entries(dateArr)) {
    keyValue(key, value)
    // console.log(key, value)
  }

  function keyValue(key, value) {
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
        itemPrice.textContent = value[i].price.toLocaleString('en-US') + '원'
      } else {
        itemPrice.classList.add('price-in')
        itemPrice.textContent =
          '+ ' + value[i].price.toLocaleString('en-US') + '원'
      }

      const historyList = document.createElement('li')
      historyList.classList.add('history_list')

      historyList.appendChild(itemName)
      historyList.appendChild(itemPrice)
      history.appendChild(historyList)
    }
    daySpend.textContent = `${totalPrice.toLocaleString('en-US')}원 지출`
    dayUseWrap.appendChild(itemWrap)

    itemWrap.appendChild(dayTotal)
    dayTotal.appendChild(day)
    dayTotal.appendChild(daySpend)
    itemWrap.appendChild(history)
  }

  //
  const length = data.length

  let labels = []
  let dailyValues = []
  let monthValues = []
  let label = []

  for (i = 0; i < length; i++) {
    label.push(data[i].item)
  }
  for (const date in dateArr) {
    labels.push(date)
    totalPrice = 0
    // console.log('x', x)
    for (let i = 0; i < dateArr[date].length; i++) {
      totalPrice = totalPrice + dateArr[date][i].price
      // console.log(dateArr[x][i].item)
    }
    dailyValues.push(totalPrice)
    // console.log(dateArr[date])
  }
  for (const type in typeArr) {
    let priceArr = []
    totalPrice = 0

    // console.log(typeArr[type][0].date.includes('2022.4'))
    for (let i = 0; i < typeArr[type].length; i++) {
      if (typeArr[type][i].date.includes('2022.4')) {
        totalPrice = totalPrice + typeArr[type][i].price
      }
    }
    priceArr.push(totalPrice)
    // console.log(priceArr)

    // console.log(filterPrice)
    for (let i = 0; i < priceArr.length; i++) {
      // console.log(priceArr.length)

      if (priceArr[i] > 0) {
        const liEl = document.createElement('li')
        liEl.classList.add('month__list--li')
        monthList.appendChild(liEl)
        const icon = document.createElement('img')
        icon.classList.add('icon')
        const price = document.createElement('price')
        price.classList.add('price')
        const title = document.createElement('h3')
        title.classList.add('title')

        if (typeArr[type][i].type === 'eatout' && priceArr[i] > 0) {
          title.textContent = 'eatout'
          price.textContent = priceArr[i].toLocaleString()
          icon.setAttribute('src', './images/month-eatout.svg')
        } else if (typeArr[type][i].type === 'shopping' && priceArr[i] > 0) {
          // console.log(typeArr[type][i].type)
          title.textContent = 'shopping'
          price.textContent = priceArr[i].toLocaleString()
          icon.setAttribute('src', './images/month-shopping.svg')
        } else if (typeArr[type][i].type === 'mart' && priceArr[i] > 0) {
          title.textContent = 'mart'
          price.textContent = priceArr[i].toLocaleString()
          icon.setAttribute('src', './images/month-mart.svg')
        } else if (typeArr[type][i].type === 'transport' && priceArr[i] > 0) {
          title.textContent = 'transport'
          price.textContent = priceArr[i].toLocaleString()
          icon.setAttribute('src', './images/month-transport.svg')
        } else if (typeArr[type][i].type === 'health' && priceArr[i] > 0) {
          title.textContent = typeArr[type][i].type
          price.textContent = priceArr[i].toLocaleString()
          icon.setAttribute('src', './images/month-health.svg')
        }

        liEl.appendChild(icon)
        liEl.appendChild(title)
        liEl.appendChild(price)
      }
    }
    monthValues.push(totalPrice)
    // console.log(totalPrice)
  }

  // Daily-canvas
  new Chart(dayilyCtx, {
    data: {
      labels: labels,
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
    labels: monthValues,
    data: {
      datasets: [
        {
          label: '4월 지출 패턴',
          backgroundColor: [
            '#BD5B00',
            '#0057BD',
            '#00BDB2',
            '#FEC229',
            '#C4C4C4',
          ],
          data: monthValues,
        },
      ],
    },
    options: {
      legend: { display: true },
      title: {
        display: true,
        text: '원',
      },
    },
  })
}
