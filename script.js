'use strict';
let title = prompt("Как называется ваш проект?");
let screens = prompt("Какие типы экранов нужно разработать?");
let screenPrice = +prompt("Сколько будет стоить данная работа?");
let adaptive = confirm("Нужен ли адаптив на сайте?");
let service1 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice1 = +prompt("Сколько это будет стоить?");
let service2 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice2 = +prompt("Сколько это будет стоить?");
let rollback = 10.5;

let fullPrice = screenPrice + servicePrice1 + servicePrice2;
let servicePercentPrice = Math.ceil(fullPrice - rollback);

console.log("Тип данных переменной title: " + typeof title);
console.log("Тип данных переменной fullPrice: " + typeof fullPrice);
console.log("Тип данных переменной adaptive: " + typeof adaptive);

console.log("Длина строки из переменной screens: " + screens.length);
console.log("Стоимость верстки экранов " + screenPrice + " рублей");
console.log("Стоимость разработки сайта " + fullPrice + " рублей");

console.log(screens.toLowerCase().split(", "));
console.log("Процент отката посреднику за работу " + fullPrice * (rollback / 100) + " рублей");

console.log("Итоговая стоимость " + servicePercentPrice + " рублей");
if (fullPrice >= 30000) console.log("Даем скидку в 10%");
if (fullPrice >= 15000 && fullPrice < 30000) console.log("Даем скидку в 5%");
if (fullPrice <= 0) console.log("Что то пошло не так");