var React = require('react');
var ReactDOM = require('react-dom');
var $ = require("jquery");

var BoxTarefas = require('./Tarefas/tarefas.js');

var Main = React.createClass({
  getInitialState: function(){
    return {data:[]};
  },
  componentWillMount: function(){
    document.addEventListener("deviceready", function(){
      alert('Iniciando app!');
    }, false);
  },
  componentDidMount: function(){

  },
  render: function(){
    return (
      <BoxTarefas url="http://10.0.0.105/teste/api/teste" intervalo={500} />
      // <BoxTarefas url="http://localhost:57594/api/teste" intervalo={500} />
    );
  }
});

module.exports = Main;
