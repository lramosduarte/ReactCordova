
var React = require('react');
var ReactDOM = require('react-dom');
var $ = require("jquery");
var BoxTarefas = require('./Componentes/Tarefas/tarefas.js');

var Main = React.createClass({
  getInitialState: function(){
    return {data:[]};
  },
  componentDidMount: function(){
    document.addEventListener("deviceready", function(){
      alert('Iniciando app!');
    }, false);
    document.addEventListener("backbutton", function(){
      ReactDOM.render(<Main /> , document.getElementById('root'));
    }, false);
  },
  render: function(){
    return (
      <div>
        <BoxTarefas url="http://10.0.0.105/teste/api/teste" intervalo={500} />
      </div>
    );
  }
});

ReactDOM.render(<Main />, document.getElementById('root'));
