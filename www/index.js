
var React = require('react');
var ReactDOM = require('react-dom');

require("bootstrap-webpack!./bootstrap.config.js");
require("!style!css!less!./style.less");

var $ = require("jquery");
var MainMenu = require('./js/Componentes/main.js');

ReactDOM.render(<MainMenu url="http://10.0.0.105/teste/api/teste" />, document.getElementById('root'));
// <BoxTarefas url="http://10.0.0.105/teste/api/teste" intervalo={500} />
// <BoxTarefas url="http://localhost:57594/api/teste" intervalo={500} />
