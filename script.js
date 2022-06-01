'use strict';
let title = prompt("Как называется ваш проект?");
let screens = prompt("Какие типы экранов нужно разработать?");
let screenPrice = +prompt("Сколько будет стоить данная работа?");
let adaptive = confirm("Нужен ли адаптив на сайте?");
let service1 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice1 = +prompt("Сколько это будет стоить?");
let service2 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice2 = +prompt("Сколько это будет стоить?");
let rollback = 10;
let fullPrice;

const showTypeOf = function (variable) {
   console.log(variable, typeof variable);
}

const getRollbackMessage = function (price) {
   if (price >= 30000) {
      return "Даем скидку в 10%"
   } else if (price >= 15000 && price < 30000) {
      return "Даем скидку в 5%"
   } else if (price >= 0 && price < 15000) {
      return "Скидка не предусмотрена"
   } else {
      return "Что то пошло не так"
   }
}

let getAllServicePrices = function () {
   return servicePrice1 + servicePrice2;
}

function getFullPrice() {
   return screenPrice + allServicePrices;
}

function getTitle() {
   title = title[0].toUpperCase() + title.substring(1).toLowerCase();
   title = title.trim();
}

function getServicePercentPrices() {
   return fullPrice - fullPrice * (rollback / 100);
}

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log(screens);

let allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
getTitle();
console.log(getRollbackMessage(fullPrice));
let servicePercentPrice = getServicePercentPrices();
console.log("Итоговая стоимость " + servicePercentPrice + " рублей");
