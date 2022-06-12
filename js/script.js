'use strict';
const title = document.getElementsByTagName('h1')
const plusBtn = document.querySelector('.screen-btn')
const percent = document.querySelectorAll('.other-items.percent')
const number = document.querySelectorAll('.other-items.number')

const range = document.querySelector('.rollback [type = "range"]')
const rangeValue = document.querySelector('.rollback .range-value')

const startBtn = document.getElementsByClassName('handler_btn')[0]
const resetBtn = document.getElementsByClassName('handler_btn')[1]

const totalInput = document.getElementsByClassName('total-input')
const total = totalInput[0]
const totalCount = totalInput[1]
const totalCountOther = totalInput[2]
const fulltotalCount = totalInput[3]
const totalCountRollback = totalInput[4]

let screens = document.querySelectorAll('.screen')


const appData = {
   title: '',
   screens: [],
   screenPrice: 0,
   adaptive: true,
   rollback: 10,
   allServicePrices: 0,
   fullPrice: 0,
   servicePercentPrice: 0,
   services: {},
   asking: function () {
      appData.title = prompt("Как называется ваш проект?");

      while (appData.isString(appData.title)) {
         appData.title = prompt("Как называется ваш проект?");
      }

      for (let i = 0; i < 2; i++) {
         let name = prompt("Какие типы экранов нужно разработать?");
         while (appData.isString(name)) {
            name = prompt("Какие типы экранов нужно разработать?");
         }

         let price = 0;
         do {
            price = prompt("Сколько будет стоить данная работа?");
            while (appData.isString(name)) {
               name = prompt("Какие типы экранов нужно разработать?");
            }
         } while (!appData.isNumber(price));
         price = price.replace(/\s/g, '');

         appData.screens.push({ id: i, name: name, price: price })
      }

      for (let i = 0; i < 2; i++) {
         let name = prompt("Какой дополнительный тип услуги нужен?");
         while (appData.isString(name)) {
            name = prompt("Какой дополнительный тип услуги нужен?");
         }
         let price = 0;

         price = prompt("Сколько это будет стоить?")
         if (price !== null) {
            price = price.replace(/\s/g, '')
         }
         while (!appData.isNumber(price)) {
            price = prompt("Сколько это будет стоить?")
            if (price !== null) {
               price = price.replace(/\s/g, '')
            }
         }
         appData.services[name] = +price
      }

      appData.adaptive = confirm("Нужен ли адаптив на сайте?");
   },
   addPrices: function () {
      for (let screen of appData.screens) {
         appData.screenPrice += +screen.price
      }

      for (let key in appData.services) {
         appData.allServicePrices += appData.services[key]
      }
   },
   isNumber: function (num) {
      if (num !== null) {
         num = num.replace(/\s/g, '');
      }
      return !isNaN(parseFloat(num)) && isFinite(num)
   },
   isString: function (str) {
      return !isNaN(Number(str))
   },
   getFullPrice: function () {
      appData.fullPrice = +appData.screenPrice + appData.allServicePrices;
   },
   getServicePercentPrices: function () {
      appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));
   },
   getTitle: function () {
      appData.title = appData.title.trim()[0].toUpperCase() + appData.title.trim().substring(1).toLowerCase();
   },
   getRollbackMessage: function (price) {
      if (price >= 30000) {
         return "Даем скидку в 10%"
      } else if (price >= 15000 && price < 30000) {
         return "Даем скидку в 5%"
      } else if (price >= 0 && price < 15000) {
         return "Скидка не предусмотрена"
      } else {
         return "Что-то пошло не так"
      }
   },
   start: function () {
      appData.asking();
      appData.addPrices();
      appData.getFullPrice();
      appData.getServicePercentPrices();
      appData.getTitle();
      appData.logger();
   },
   logger: function () {
      console.log(appData.fullPrice)
      console.log(appData.servicePercentPrice)
      console.log(appData.screens)
      for (let key in appData) {
         console.log(key)
      }
   }
}

appData.start()

