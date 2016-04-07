
var React = require('react');
var ReactDOM = require('react-dom');

require("bootstrap-webpack!./bootstrap.config.js");
require("!style!css!less!./style.less");

var $ = require("jquery");
var Main = require('./js/Componentes/main.js');

ReactDOM.render(<Main />, document.getElementById('root'));
