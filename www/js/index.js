
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
  },
  render: function(){
    return (
      <div>
        <BoxTarefas url="http://localhost:57594/api/teste" intervalo={500} />
      </div>
    );
  }
});

ReactDOM.render(<Main />, document.getElementById('root'));
