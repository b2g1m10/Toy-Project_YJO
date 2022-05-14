
  insertTxt(data)

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
	function insertTxt(data) {
      historyList.appendChild(itemPrice)
      history.appendChild(historyList)
    }
    daySpend.textContent = `${totalPrice.toLocaleString('en-US')}원 지출`
    dayUseWrap.appendChild(itemWrap)

    itemWrap.appendChild(dayTotal)
	function insertTxt(data) {

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
