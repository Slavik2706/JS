let title = "JS";
let screens = "Простые, Сложные, Интерактивные";
let screenPrice = 5;
let rollback = 10;
let fullPrice = 10000;
let adaptive = true;

console.log("Тип данных переменной title: " + typeof title);
console.log("Тип данных переменной fullPrice: " + typeof fullPrice);
console.log("Тип данных переменной adaptive: " + typeof adaptive);

console.log("Длина строки из переменной screens: " + screens.length);
console.log("Стоимость верстки экранов " + screenPrice + " рублей");
console.log("Стоимость разработки сайта " + fullPrice + " рублей");

console.log(screens.toLowerCase().split(", "));
console.log("Процент отката посреднику за работу " + fullPrice * (rollback / 100) + " рублей");