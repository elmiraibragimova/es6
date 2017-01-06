/**
 * @fileoverview Sortable table
 */

'use strict';

var goods = [
  {
    'name': 'Ботинки',
    'price': 6300,
    'date': new Date(2017, 0, 12)
  },
  {
    'name': 'Книга',
    'price': 750,
    'date': new Date(2017, 2, 15)
  },
  {
    'name': 'Шарф',
    'price': 1800,
    'date': new Date(2017, 7, 2)
  },
  {
    'name': 'Цветы',
    'price': 2700,
    'date': new Date(2016, 4, 24)
  },
  {
    'name': 'Телефон',
    'price': 30500,
    'date': new Date(2017, 7, 8)
  }
]

var filteredGoods = [];
var appliedFilter;

/**
 * @const {string} - available filters: `name`, `price`, `date`
 */
var DEFAULT_FILTER = 'name';

var template = document.querySelector('template');
var sample;

if ('content' in template) {
  sample = template.content.querySelector('.goods');
} else {
  sample = template.querySelector('.goods');
}

var container = document.querySelector('.goods-list');

/**
 * @param {DateObject} date
 */
function formatDate(date) {
  var month = date.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }

  var day = date.getDate();
  if (day < 10) {
    day = `0${day}`;
  }

  return `${day}.${month}.${date.getFullYear()}`;
}

/**
 * @param {Array.<Object>} data
 */
function renderGoods(data)  {
  container.innerHTML = '';

  data.forEach(function(goods) {
    var goodsItem = sample.cloneNode(true);

    var name = goodsItem.querySelector('.goods__name');
    name.textContent = goods.name;

    var price = goodsItem.querySelector('.goods__price');
    price.textContent = goods.price;

    var date = goodsItem.querySelector('.goods__shipping-schedule');
    date.textContent = formatDate(goods.date);


    container.appendChild(goodsItem);
  })
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
  }
}

var filtersContainer = document.querySelector('.filters');

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
  var goodsToFilter = goodsList.concat();
  appliedFilter = filterType;
  filteredGoods = goodsToFilter.sort(compGenerator(filterType));
  renderGoods(filteredGoods);
}

applyFilter(goods, DEFAULT_FILTER);
