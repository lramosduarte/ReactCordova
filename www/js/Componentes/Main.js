var React = require('react');
var ReactDOM = require('react-dom');
var $ = require("jquery");


var BoxTarefas = require('./Tarefas/tarefas.js');
var BoxUsuarios = require('./usuarios/usuarios.js');

var Main = React.createClass({
  getInitialState: function(){
    return {show: ""};
  },
  componentWillMount: function(){
    document.addEventListener("deviceready", function(){

    }, false);
  },
  componentDidMount: function(){
    console.log(this.state.show);
  },
  handleShowTarefas: function(){
    this.setState({show: "TAREFAS"});
  },
  handleShowUsuarios: function(){
    this.setState({show: "USUARIOS"});
  },
  render: function(){
    return (
      <div className="container">
        <div className="row conteudo">
          { this.state.show == "TAREFAS" ? <BoxTarefas url={this.props.url} intervalo={500} /> : null }
          { this.state.show == "USUARIOS" ? <BoxUsuarios url={this.props.url} /> : null }
        </div>
        <div className="row rodape">
          <div className="col-xs-6">
            <button className="btn btn-default" onClick={this.handleShowTarefas}>
              Tarefas
            </button>
          </div>
          <div className="col-xs-6">
            <button className="btn btn-default" onClick={this.handleShowUsuarios}>
              Usuários
            </button>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Main;
