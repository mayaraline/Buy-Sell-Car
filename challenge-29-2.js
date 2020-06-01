
(function ($) {
  "use strict";

  var app = (function () {
    return {
      init: function init() {
        console.log("init");
        this.companyInfo();
        this.initEvents();
      },

      initEvents: function initEvents() {
        $('[data-js="form-register"]').on("submit", this.handleSubmit);
      },

      handleSubmit: function handleSubmit(e) {
        e.preventDefault();

        var car = app.setCars();

        console.log("Submit");
        var $tableCar = $('[data-js="table-car"]').get();
        //$tableCar.appendChild(app.createNewCar());
        $tableCar.appendChild(app.createNewCar(car));
        app.postDataStore();
      },

      createNewCar: function createNewCar() {
        var $fragment = document.createDocumentFragment();
        var $tr = document.createElement("tr");
        var $tdImage = document.createElement("td");
        var $image = document.createElement("img");
        var $tdBrand = document.createElement("td");
        var $tdYear = document.createElement("td");
        var $tdPlate = document.createElement("td");
        var $tdColor = document.createElement("td");
        var $tdRemove = document.createElement("td");

        var $buttonRemove = document.createElement("button");
        $buttonRemove.innerHTML = "Remover";
        $buttonRemove.addEventListener("click", this.removeCar, false);
        $tdRemove.appendChild($buttonRemove);

        $image.setAttribute("src", $('[data-js="image"]').get().value);
        $tdImage.appendChild($image);

        $tdBrand.textContent = $('[data-js="brand-model"]').get().value;
        $tdYear.textContent = $('[data-js="year"]').get().value;
        $tdPlate.textContent = $('[data-js="plate"]').get().value;
        $tdColor.textContent = $('[data-js="color"]').get().value;

        $tr.appendChild($tdImage);
        $tr.appendChild($tdBrand);
        $tr.appendChild($tdYear);
        $tr.appendChild($tdPlate);
        $tr.appendChild($tdColor);
        $tr.appendChild($tdRemove);

        return $fragment.appendChild($tr);
      },

      setCars: function setCars(){
        var cars = {
          image: $('[data-js="image"]').get().value,
          brandModel: $('[data-js="brand-model"]').get().value,
          year: $('[data-js="year"]').get().value,
          plate: $('[data-js="plate"]').get().value,
          color: $('[data-js="color"]').get().value
        };
        return cars;
      },

      getCars: function getCars(){
        var ajax = new XMLHttpRequest();
        ajax.open('GET', 'http://localhost:3000/car', true);
        ajax.send();
        ajax.addEventListener('readystatechange', app.handleDataStore, false);
      },

      handleDataStore: function handleDataStore(){
        if(app.isReady()){
          return;
        }
        var cars = JSON.parse(this.responseText);
        var $tableCar = $('[data-js="table-car"]').get();

        cars.forEach(function(car){
          var $fragment = app.createNewCar(car);
          $tableCar.appendChild($fragment);
        });
      },

      postDataStore: function postDataStore(){
        var car = app.setCars();
        var ajax = new XMLHttpRequest();
        ajax.open('POST', 'http://localhost:3000/car', true);
        ajax.setRequestHeader(
          'Content-Type',
          'application/x-www-form-urlencoded'
        );
        ajax.send(
            'image=' +
            car.image +
            '&brandModel=' +
            car.brandModel +
            '&year=' +
            car.year +
            '&plate=' +
            car.plate +
            '&color=' +
            car.color
        );
        ajax.addEventListener('readystatechange', function(){
          console.log('Carro cadastrado com sucesso!');
        }, false);
      },

      removeCar: function removeCar(event) {
        event.target.parentNode.parentNode.remove();
      },

      companyInfo: function companyInfo() {
        var ajax = new XMLHttpRequest();
        ajax.open("GET", "/company.json", true);
        ajax.send();
        ajax.addEventListener("readystatechange", this.getCompanyInfo, false);
      },

      getCompanyInfo: function getCompanyInfo() {
        if (!app.isReady.call(this)) return;

        var data = JSON.parse(this.responseText);
        var $companyName = $('[data-js="company-name"]').get();
        var $companyPhone = $('[data-js="company-phone"]').get();
        $companyName.textContent = data.name;
        $companyPhone.textContent = data.phone;
      },

      isReady: function isReady() {
        return this.readyState === 4 && this.status === 200;
      },
    };
  })();

  app.init();
})(window.DOM);
