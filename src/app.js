// var sub = require('./sub');
// var app = document.createElement('div');
// require('./main.css');

// app.innerHTML = '<h1>Hello kobe</h1>';
// app.append(sub());

// document.body.appendChild(app);

import './main.css';
import genetator from './sub';
import $ from 'jquery';
import moment from 'moment';

let app = document.createElement('h1');

const promise = Promise.resolve(43);
promise.then( (number) => {
    $('body').append('<p>promise result '+ number + 'now is :' + moment().format()+ '</p>')
});
app.innerHTML = 'This is babel compile';
app.append(genetator());
document.body.append(app);