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

const CMS = document.querySelector('#cms-open')
const showCMS = document.querySelector('.hidden-cms-variants')
const other = document.querySelector('.hidden-cms-variants .main-controls__input')
const inputOther = other.querySelector('input[type=text]')
const cmsSelect = document.querySelector('#cms-select')

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
   cmsValue: 0,

   init: function () {
      this.addTitle()
      this.openCMS()
      startBtn.addEventListener('click', this.start.bind(appData))
      resetBtn.addEventListener('click', this.reset.bind(appData))
      buttonPlus.addEventListener('click', this.addScreenBlock)
      this.getRollback()
   },
   addTitle: function () {
      document.title = title.textContent
   },
   start: function () {
      this.checkValue()
      if (this.startBtnStatus) {
         this.addScreens()
         this.addServices()
         this.getOtherValue()
         this.addPrices()
         // appData.logger();
         this.showResult()
         this.blocked()
         console.log(this)
      }
   },
   blocked: function () {
      let screens = document.querySelectorAll('.screen')
      screens.forEach((screen) => {
         const select = screen.querySelector('select')
         const input = screen.querySelector('input')
         select.disabled = true
         input.disabled = true
      })
      startBtn.style.display = 'none'
      resetBtn.style.display = 'block'
   },
   reset: function () {
      this.resetScreens()
      this.zeroing()
      this.showResult()
      this.resetOtherItems()
   },
   resetScreens: function () {
      let screens = document.querySelectorAll('.screen')
      screens.forEach((screen, index) => {
         const select = screen.querySelector('select')
         const input = screen.querySelector('input')
         select.disabled = false
         input.disabled = false
         input.value = ''
         select.value = ''
         if (index != 0) {
            screens[index].remove()
         }
      })
   },
   zeroing: function () {
      this.screens.splice(0, this.screens.length)
      startBtn.style.display = 'block'
      resetBtn.style.display = 'none'
      other.style.display = 'none'
      this.screenPrice = 0
      this.screenCount = 0
      this.servicePricesPercent = 0
      this.servicePricesNumber = 0
      this.fullPrice = 0
      this.servicePercentPrice = 0
      this.screenCount = 0
      this.cmsValue = 0
      inputOther.value = ''
      rangeValue.textContent = '0%'
   },
   resetOtherItems: function () {
      otherItemsPercent.forEach((item) => {
         const check = item.querySelector('input[type=checkbox]')
         if (check.checked) {
            check.checked = false
         }
      })
      otherItemsNumber.forEach((item) => {
         const check = item.querySelector('input[type=checkbox]')
         if (check.checked) {
            check.checked = false
         }
      })
      if (CMS.checked) {
         CMS.checked = false
         showCMS.style.display = 'none'
         cmsSelect.value = ''
      }
   },
   showResult: function () {
      total.value = this.screenPrice
      totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber
      fulltotalCount.value = this.fullPrice
      totalCountRollback.value = this.servicePercentPrice
      totalCount.value = this.screenCount
   },
   addScreens: function () {
      let screens = document.querySelectorAll('.screen')
      screens.forEach((screen, index) => {
         const select = screen.querySelector('select')
         const input = screen.querySelector('input')
         const selectName = select.options[select.selectedIndex].textContent
         this.screens.push({
            id: index,
            name: selectName,
            price: +select.value * +input.value,
            count: +input.value
         })
      })
   },
   checkValue: function () {
      let screens = document.querySelectorAll('.screen')
      screens.forEach((screen) => {
         const sel = screen.querySelector('select')
         const inp = screen.querySelector('input')
         if (inp.value.length != 0 && sel.value.length != 0) {
            this.startBtnStatus = true
         } else {
            this.startBtnStatus = false
         }
      })
   },
   addServices: function () {
      otherItemsPercent.forEach((item) => {
         const check = item.querySelector('input[type=checkbox]')
         const label = item.querySelector('label')
         const input = item.querySelector('input[type=text]')
         if (check.checked) {
            this.servicesPercent[label.textContent] = +input.value
         }
      })
      otherItemsNumber.forEach((item) => {
         const check = item.querySelector('input[type=checkbox]')
         const label = item.querySelector('label')
         const input = item.querySelector('input[type=text]')
         if (check.checked) {
            this.servicesNumber[label.textContent] = +input.value
         }
      })
   },
   openCMS: function () {
      CMS.addEventListener('click', () => {
         if (CMS.checked) {
            showCMS.style.display = 'flex'
         } else {
            showCMS.style.display = 'none'
         }
      })
      cmsSelect.addEventListener('click', () => {
         if (cmsSelect.value == 'other') {
            other.style.display = 'block'
         } else {
            other.style.display = 'none'
         }
      })
   },
   getOtherValue: function () {
      if (cmsSelect.value == 'other') {
         this.cmsValue = inputOther.value
      } else if (cmsSelect.value == '50') {
         this.cmsValue = 50
      }
   },
   addScreenBlock: function () {
      const cloneScreen = screens[0].cloneNode(true)
      screens[screens.length - 1].after(cloneScreen)
   },
   addPrices: function () {
      for (let screen of this.screens) {
         this.screenPrice += +screen.price
      }

      for (let key in this.servicesNumber) {
         this.servicePricesNumber += this.servicesNumber[key]
      }

      for (let key in this.servicesPercent) {
         appData.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100)
      }

      this.fullPrice = (+this.screenPrice + this.servicePricesNumber + this.servicePricesPercent) +
         (+this.screenPrice + this.servicePricesNumber + this.servicePricesPercent) * this.cmsValue / 100

      this.servicePercentPrice = this.fullPrice - (this.fullPrice * (this.rollback / 100));

      for (let screen of this.screens) {
         this.screenCount += +screen.count
      }
   },
   getRollback: function () {
      range.addEventListener('input', (event) => {
         this.rollback = event.target.value
         rangeValue.textContent = this.rollback + '%'
      })
   },
   logger: function () {
      console.log(this.fullPrice)
      console.log(this.servicePercentPrice)
      console.log(this.screens)
      for (let key in this) {
         console.log(key)
      }
   }
}

appData.init()

