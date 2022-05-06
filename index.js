getData()

async function getData() {
  const response = await fetch(
    'https://datausa.io/api/data?drilldowns=Nation&measures=Population'
  )
  console.log(response)
  const data = await response.json()
  console.log(data)
  length = data.data.length
  console.log(length)

  labels = []
  values = []
  for (i = 0; i < length; i++) {
    labels.push(data.data[i].Year)
    values.push(data.data[i].Population)
  }

  new Chart(document.getElementById('bar-chart'), {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Population (millions)',
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
        text: 'U.S population',
      },
    },
  })
}
