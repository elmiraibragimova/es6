/**
 * @fileoverview Sortable table
 */

import { goods } from './goods';

let filteredGoods = [];
let appliedFilter;

/**
 * @const {string} - available filters: `name`, `price`, `date`
 */
const DEFAULT_FILTER = 'name';

let template = document.querySelector('template');
let sample;

if ('content' in template) {
  sample = template.content.querySelector('.goods');
} else {
  sample = template.querySelector('.goods');
}

let container = document.querySelector('.goods-list');

/**
 * @param {DateObject} date
 */
function formatDate(date) {
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }

  let day = date.getDate();
  if (day < 10) {
    day = `0${day}`;
  }

  return `${day}.${month}.${date.getFullYear()}`;
}

/**
 * @param {Array.<Object>} data
 */
function renderGoods(data) {
  container.innerHTML = '';

  data.forEach(function(goods) {
    let goodsItem = sample.cloneNode(true);

    let name = goodsItem.querySelector('.goods__name');
    name.textContent = goods.name;

    let price = goodsItem.querySelector('.goods__price');
    price.textContent = goods.price;

    let date = goodsItem.querySelector('.goods__shipping-schedule');
    date.textContent = formatDate(goods.date);

    container.appendChild(goodsItem);
  });
}

/**
 * @param {string} fieldName
 */
function compGenerator(fieldName) {
  return function(a, b) {
    if (a[fieldName] > b[fieldName]) {
      return 1;
    }

    if (a[fieldName] < b[fieldName]) {
      return -1;
    }

    return 0;
  };
}

let filtersContainer = document.querySelector('.filters');

/**
 * @event
 */
filtersContainer.addEventListener('click', function(event) {
  if (event.target.classList.contains('th')) {
    if (appliedFilter == event.target.dataset.filter) {
      renderGoods(filteredGoods.reverse());
    } else {
      applyFilter(goods, event.target.dataset.filter);
    }
  }
});

/**
 * @param {string} filterType
 */
function applyFilter(goodsList, filterType) {
  let goodsToFilter = goodsList.concat();
  appliedFilter = filterType;
  filteredGoods = goodsToFilter.sort(compGenerator(filterType));
  renderGoods(filteredGoods);
}

applyFilter(goods, DEFAULT_FILTER);
