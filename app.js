    // ES5
// function car (name, model, owner, year, phone, image) {
//     return {
//         name, model, owner, year, phone, image
//     }
// }

    // ES6
const car = (name, model, owner, year, phone, image) => ({name, model, owner, year, phone, image})
const log = (text, type, date = new Date()) => ({text, type, date})

const cars = [
  car('Багги', 'на рыбалку', 'Васян', 2016, '8 904 123 34 45', 'images/zpmm7C1VSdc.jpg'),
  car('Будущие', 'я у мамки инженер', 'Алешка', 2017, 'Потерял, только мамке не говорите', 'images/Wg7NYTZsOoM.jpg'),
  car('Бобик', 'За хлебушком', 'Иришка', 2018, '8 906 465 28 44', 'images/i-m-LUEi5kg.jpg'),
  car('Любимая встречает', 'Зарплату ждет...', 'Манька', 2018, '8 906 465 28 44', 'images/D7xzUAwF6RM.jpg'),
]

new Vue({
  el: '#app', // Инициализация всего приложения
  data: {     // Данные, которые будут использованны с шаблоне
    cars: cars,
    car: cars[0],   // активная
    logs: [],
    selectedCarIndex: 0,
    phoneVisibility: false,
    search: '',
    modalVisibility: false
  },
  methods: {
    selectCar: function (index) {
      this.car = cars[index]
      this.selectedCarIndex = index
    },
    newOrder () {
      this.modalVisibility = false
      this.logs.push(   // Метод push добавляет в конец новый элемент
        log(`Подтвержденный заказ: ${this.car.name} - ${this.car.model}`, 'ok')
      )
    },
    cancelOrder () {
      this.modalVisibility = false
      this.logs.push(   // Метод push добавляет в конец новый элемент
        log(`Отмененный заказ: ${this.car.name} - ${this.car.model}`, 'cancel')
      )
    }
  },
  computed: {     // Что-то вычисленное(нужно для оптимизации Vue прилодений)
    //В данной разделе создаются функции, которые впоследствие будут являться в шаблоне(без круглых скобок) переменными, которые сможем использовать.
    //Особенность этих функций заключается в том, что они будут реагировать только на те значения, которые в них уже указаны.

    phoneBtnText () {
      return this.phoneVisibility ? 'Спрятать телефон' : 'Показать телефон'
    },
    filterCars () {
        // ES5
      // var self = this
      // const filtered = this.cars.filter(function(cars) { // Есил создаем новую функцию с помощью ключ. слова function, то она создает свой собственный контекст и ключ. слово this в ней будет как раз от этой фунции. А не от инстанса Vue, поэтому var self = this и обращаться не к this, а к self.
      //   return car.name.indexOf(self.search) > -1
      // })
      // return filtered

      // ES6
      return this.cars.filter(car => {
        return car.name.indexOf(this.search) > -1 || car.model.indexOf(this.search) > -1
      })
    }
  },
  filters: {
    date (value) {
      return value.toLocaleString()
    }
  }
})