'use strict';
const title = document.getElementsByTagName('h1')[0]
const buttonPlus = document.querySelector('.screen-btn')
const otherItemsPercent = document.querySelectorAll('.other-items.percent')
const otherItemsNumber = document.querySelectorAll('.other-items.number')

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
   rollback: 0,
   servicePricesPercent: 0,
   servicePricesNumber: 0,
   fullPrice: 0,
   servicePercentPrice: 0,
   servicesPercent: {},
   servicesNumber: {},
   screenCount: 0,
   startBtnStatus: false,
   init: function () {
      appData.addTitle()
      startBtn.addEventListener('click', appData.start)
      buttonPlus.addEventListener('click', appData.addScreenBlock)
      appData.getRollback()
   },
   addTitle: function () {
      document.title = title.textContent
   },
   start: function () {
      appData.checkValue()
      if (appData.startBtnStatus) {
         appData.addScreens()
         appData.addServices()
         appData.addPrices()
         // appData.logger();
         appData.showResult()
         console.log(appData)
      }
   },
   showResult: function () {
      total.value = appData.screenPrice
      totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber
      fulltotalCount.value = appData.fullPrice
      totalCountRollback.value = appData.servicePercentPrice
      totalCount.value = appData.screenCount
   },
   addScreens: function () {
      let screens = document.querySelectorAll('.screen')
      screens.forEach(function (screen, index) {
         const select = screen.querySelector('select')
         const input = screen.querySelector('input')
         const selectName = select.options[select.selectedIndex].textContent
         appData.screens.push({
            id: index,
            name: selectName,
            price: +select.value * +input.value,
            count: +input.value
         })
      })
   },
   checkValue: function () {
      let screens = document.querySelectorAll('.screen')
      screens.forEach(function (screen) {
         const sel = screen.querySelector('select')
         const inp = screen.querySelector('input')

         if (inp.value.length != 0 && sel.value.length != 0) {
            appData.startBtnStatus = true
         } else {
            appData.startBtnStatus = false
         }
      })
   },
   addServices: function () {
      otherItemsPercent.forEach(function (item) {
         const check = item.querySelector('input[type=checkbox]')
         const label = item.querySelector('label')
         const input = item.querySelector('input[type=text]')

         if (check.checked) {
            appData.servicesPercent[label.textContent] = +input.value
         }
      })
      otherItemsNumber.forEach(function (item) {
         const check = item.querySelector('input[type=checkbox]')
         const label = item.querySelector('label')
         const input = item.querySelector('input[type=text]')

         if (check.checked) {
            appData.servicesNumber[label.textContent] = +input.value
         }
      })
   },
   addScreenBlock: function () {
      const cloneScreen = screens[0].cloneNode(true)
      screens[screens.length - 1].after(cloneScreen)
   },
   addPrices: function () {
      for (let screen of appData.screens) {
         appData.screenPrice += +screen.price
      }

      for (let key in appData.servicesNumber) {
         appData.servicePricesNumber += appData.servicesNumber[key]
      }

      for (let key in appData.servicesPercent) {
         appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100)
      }

      appData.fullPrice = +appData.screenPrice + appData.servicePricesNumber + appData.servicePricesPercent

      appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));

      for (let screen of appData.screens) {
         appData.screenCount += +screen.count
      }
   },
   getRollback: function () {
      range.addEventListener('input', function (event) {
         appData.rollback = event.target.value
         rangeValue.textContent = appData.rollback
      })
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

appData.init()

