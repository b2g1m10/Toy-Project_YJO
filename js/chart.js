import _ from 'lodash';
// Featch Data
const url =
  'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/4b41cea6-0a74-4f33-86b8-718f24260cc3/data.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220515%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220515T184308Z&X-Amz-Expires=86400&X-Amz-Signature=863b77cd5c7a0c2d121d49479f1a129ac2677cabfbc56c088a1b2bfb0282291c&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22data.json%22&x-id=GetObject';

const getData = async () => {
  const response = await fetch(url);
  const data = await response.json();
  dailyArrData(data);
  monthArrData(data);
};
getData();
// GroupBy 모듈
const groupBy = (data, key) => {
  return data.reduce((carry, el) => {
    let group = el[key];
    if (carry[group] === undefined) {
      carry[group] = [];
    }
    carry[group].push(el);

    return carry;
  }, {});
};

//총 합 구하기 out일 경우에만 더하기
const amount = (list) => {
  const totalPrice = list.reduce((prev, curr) => {
    switch (curr.inOut) {
      case 'out':
        return (prev += curr.price);
      case 'in':
        return +0;
      default:
        break;
    }
  }, 0);
  return totalPrice;
};

/* 

   ###########  일별 지출   ########### 

*/
const dayUseWrap = document.querySelector('.day-use__wrap');
let dailyLabels = [];
let dailyValues = [];

const dailyArrData = (data) => {
  // 일별로 데이터 분류
  // const dateArr = groupBy(data, 'date');
  const lodashDateArr = _.groupBy(data, 'date');

  // 날짜를 기준으로 나머지 데이터 묶음
  for (const [dateText, dailyList] of Object.entries(lodashDateArr)) {
    const totalPrice = amount(dailyList);
    dailyLabels.push(dateText); // 날짜만 push
    dailyValues.push(totalPrice); // 총 합 push

    // 일별 리스트 생성
    const itemWrap = document.createElement('div');
    const dayHistoryUl = document.createElement('ul');

    itemWrap.className = 'itemWrap';
    dayHistoryUl.className = 'history';

    itemWrap.innerHTML = `
      <div class="day-total"> 
        <h3 class="day">${dateText}</h3>
        <h3 class="day-spend">${totalPrice.toLocaleString()}원 지출</h3>
      </div>
    `;

    dayUseWrap.appendChild(itemWrap);
    itemWrap.appendChild(dayHistoryUl);

    dailyList.forEach((item) => {
      const HistoryLi = document.createElement('li');
      HistoryLi.className = 'history_list';

      HistoryLi.innerHTML = `
        <h3 class="item">${item.item}</h3>
        <h3 class="${item.inOut === 'in' ? 'price-in' : 'price-out'}">
          ${
            item.inOut === 'in'
              ? '+' + item.price.toLocaleString()
              : item.price.toLocaleString()
          }원
        </h3>
      `;
      dayHistoryUl.appendChild(HistoryLi);
    });
  }
};

/* 

   ###########  월별 지출 패턴  ########### 

*/
const monthUl = document.querySelector('.month__list');

let monthLabels = [];
let monthValues = [];

// console.log(monthValues);
const monthArrData = (data) => {
  // 4월만 필터하기
  const aprilData = data.filter((e) => {
    return e.date.includes('2022.4');
  });

  // 4월 데이터를 타입으로 분류
  // const aprilTypeArr = groupBy(aprilData, 'type');
  const lodashAprilTypeArr = _.groupBy(aprilData, 'type');

  // 타입을 기준으로 나머지 묶음
  for (const [typeText, typeValue] of Object.entries(lodashAprilTypeArr)) {
    // 타입 총합 구하기
    const totalPrice = amount(typeValue);

    if (typeText !== '') {
      monthLabels.push(typeText); // 타입만 push
    }
    if (totalPrice !== 0) {
      monthValues.push(totalPrice); // 타입 총합 push
    }

    const monthLi = document.createElement('li');
    monthLi.className = 'month__list--li';
    monthUl.appendChild(monthLi);

    typeValue.forEach((e) => {
      if (e.inOut !== 'in') {
        monthLi.innerHTML = `
          <img src="../images/month-${typeText}.svg" alt="${typeText}" class="icon"/>
          <h3 class="title">${typeText}</h3>
          <h3 class="price">${totalPrice.toLocaleString()}원</h3>
        `;
      }
    });
  }
};

/* 

     ###########   Chart  ########### 

*/

// Daily - canvas
const dayilyCtx = document.getElementById('daily-canvas').getContext('2d');
let gradient = dayilyCtx.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, 'rgba(0,189,178,1');
gradient.addColorStop(1, 'rgba(17,242,229,0.1');

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
});

// Month-canvas
const monthCtx = document.getElementById('month-canvas').getContext('2d');
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
});
