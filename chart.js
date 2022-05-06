let priceData = []
fetch('https://eulsoo.github.io/list.json')
  .then((res) => res.json())
  .then((data) => loadItems(data))

function loadItems(data) {
  data.filter((price) => {
    priceData.push(price.price)
  })
}
console.log(priceData)

// daily-canvas
const dailyCanvas = new Chart(document.getElementById('daily-canvas'), {
  data: {
    datasets: [
      {
        type: 'line',
        label: 'My First Dataset',
        data: [...priceData],
        fill: false,
        borderColor: '#ff5f00',
        tension: 0.1,
      },
      {
        type: 'bar',
        label: 'Line Dataset',
        data: priceData,
        backgroundColor: '#38C976',

        fill: true,
      },
    ],
    labels: [02, 04, 06, 08, 10, 12, 14, 16, 18, 20, 22, 24],
  },
  options: {
    responsive: true,
    plugins: {
      title: {
        display: false,
      },
    },
  },
})

// month-canvas
const monthCanvas = new Chart(document.getElementById('month-canvas'), {
  type: 'doughnut',
  data: {
    datasets: [
      {
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,

        tension: 0.1,
      },
    ],
    labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
  },
})
