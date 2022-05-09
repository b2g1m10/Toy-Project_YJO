// day-money
const dayUseWrap = document.querySelector('.day-use__wrap')

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
        itemPrice.textContent = value[i].price + '원'
      } else {
        itemPrice.classList.add('price-in')
        itemPrice.textContent = '+ ' + value[i].price + '원'
      }

      const historyList = document.createElement('li')
      historyList.classList.add('history_list')

      historyList.appendChild(itemName)
      historyList.appendChild(itemPrice)
      history.appendChild(historyList)
    }
    daySpend.textContent = `총 ${totalPrice}원`
    dayUseWrap.appendChild(itemWrap)

    itemWrap.appendChild(dayTotal)
    dayTotal.appendChild(day)
    dayTotal.appendChild(daySpend)
    itemWrap.appendChild(history)
  }

  //
  const length = data.length
  // console.log(length)
  let labels = []
  let values = []
  let label = []
  // averageVal = []
  // sum = 0
  for (i = 0; i < length; i++) {
    label.push(data[i].item)
    // averageVal.push((sum = sum + data[i].price) / length)
  }
  for (const x in dateArr) {
    labels.push(x)
    totalPrice = 0
    // console.log('x', x)
    for (let i = 0; i < dateArr[x].length; i++) {
      totalPrice = totalPrice + dateArr[x][i].price
      // console.log(dateArr[x][i].item)
    }
    values.push(totalPrice)
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
}
