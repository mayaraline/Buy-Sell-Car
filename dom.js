(function(document, window){
'use strict';


function DOM (elements){
  if(!(this instanceof DOM))
    return new DOM(elements);
  this.element = document.querySelectorAll(elements);
}

DOM.prototype.on = function on(event, callback){
  Array.prototype.forEach.call(this.element, function(element){
    element.addEventListener(event, callback);
  });
};

DOM.prototype.off = function of(event, callback){
  Array.prototype.forEach.call(this.element, function(element){
    element.removeEventListener(event, callback);
  });
};

DOM.prototype.get = function get(index){
  if(!index){
    return this.element[0];
  }
  return this.element[index];
};

//metodos

DOM.prototype.forEach = function forEach(callback){
Array.prototype.forEach.apply(event, callback);
}

DOM.prototype.map = function map(callback){
Array.prototype.map.apply(event, callback);
}

DOM.prototype.filter = function filter(callback){
Array.prototype.filter.apply(event, callback);
}

DOM.prototype.reduce = function reduce(callback){
Array.prototype.reduce.apply(event, callback);
}

DOM.prototype.reduceRight = function reduceRight(callback){
Array.prototype.reduceRight.apply(event, callback);
}

DOM.prototype.every = function every(callback){
Array.prototype.every.apply(event, callback);
}

DOM.prototype.some = function some(callback){
Array.prototype.some.apply(event, callback);
}

//

//verificação

DOM.isArray = function isArray(object){
return Object.prototype.toString.call(object) === "[object Array]";
}
var array = [1, 2, 3];

DOM.isObject = function isObject(object){
return Object.prototype.toString.call(object) === "[object Object]";
}
var obj = {'name': 'Mayara', 'age': 17};

DOM.isFunction = function isFunction(func){
return Object.prototype.toString.call(func) === "[object Function]";
}
var func = function(){};

DOM.isNumber = function isNumber(number){
return Object.prototype.toString.call(number) === "[object Number]";
}
var number = 7;

DOM.isString = function isString(string){
return Object.prototype.toString.call(string) === "[object String]";
}
var string = 'HelloWorld';

DOM.isBoolean = function isBoolean(bool){
return Object.prototype.toString.call(bool) === "[object Boolean]";
}
var bool = false;

DOM.isNull = function isNull(n){
return Object.prototype.toString.call(n) === "[object Null]";
}
var n = null;


var $a = new DOM('[data-js="link"]');
$a.on('click', function handleClick(e) {
e.preventDefault();
console.log('clicou');
$a.off('click', handleClick)
});

window.DOM = DOM;
})(document, window);
