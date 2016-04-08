var React = require('react');
var ReactDOM = require('react-dom');
var $ = require("jquery");

var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var Detalhes = require('./detalhes.js')

var ListaTarefas = React.createClass({
  deleteElement: function(elemento, index, event){
    let preIndice = index.indexOf('.$') + 2;
    let posIndice = index.indexOf('.', preIndice);
    let indice = index.substring(preIndice, posIndice);
    this.props.removeItem(indice);
  },
  selectElement: function(elemento, index){
    let preIndice = index.indexOf('.$') + 2;
    let posIndice = index.indexOf('.', preIndice);
    let indice = index.substring(preIndice, posIndice);
    this.props.selectElmenet(indice);
  },
  componentWillMount: function(){
    $('#loading').modal('show');
  },
  componentDidMount: function(){
    $('#loading').modal('hide');
  },
  render: function(){
    var listaTarefas = this.props.data;
    var that = this;
    return (
      <ul className="list-group">
        {listaTarefas.map((tarefa) => {
          return (
            <li className="list-group-item-heading" key={tarefa.id}>
              <div className="list-group-item-text">
                <span className="col-xs-7" onClick={this.selectElement}>
                  {tarefa.descricao}
                </span>
                <ItemConcluido status={tarefa.concluido} />
                <button className="btn label label-danger col-xs-2" onClick={this.deleteElement} > Excluir </button>
              </div>
            </li>
          )
        })}
      </ul>
    );
  }
});

var ItemConcluido = React.createClass({
  render: function(){
    var status;
    switch (this.props.status) {
      case '1':
        status = 'col-xs-2 glyphicon glyphicon-ok-circle';
        break;
      default:
        status = 'col-xs-2';
    }
    return (
      <span className={status}>
      </span>
    );
  }
});

var TarefasForm = React.createClass({
  getInitialState: function(){
    return {
      id: 0,
      descricao: "",
      concluido: false
    }
  },
  handleSubmit: function(event){
    event.preventDefault();
    this.props.onTarefaSubmit(this.state);
  },
  handleDescricaoChange: function(event){
    this.setState({descricao: event.target.value});
  },
  handleConcluidoChange: function(event){
    this.setState({concluido: event.target.checked})
  },
  render: function(){
    return (
      <div className="container">
        <form className="" onSubmit={this.handleSubmit}>
        <div className="row cabecalho">
          <div className="col-xs-7">
            <input className="btn" type="text" id="descricao" name="descricao" value={this.state.descricao} placeholder="Descricao..." onChange={this.handleDescricaoChange}/>
          </div>
          <div className="col-xs-1">
            <input className="btn" type="checkbox" id="concluido" name="concluido" value={this.state.concluido} onChange={this.handleConcluidoChange} />
          </div>
          <div className="col-xs-4">
            <input className="btn" type="submit" value="Salvar"/>
          </div>
        </div>
        </form>
      </div>
    );
  }
});
var BoxTarefas = React.createClass({
  loadCommentsFromServer: function(){
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        alert("Impossivel se comunicar com o servidor! \n" + this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleTarefaSubmit: function(tarefa){
    $.ajax({
      url: this.props.url,
      type: 'POST',
      dataType: 'json',
      data: tarefa,
      success: function(data){
        alert("Tarefa incluida com sucesso!");
      }.bind(this),
      error: function(xhr, status, err) {
        alertr(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleRemoveTarefa: function(indice){
    var items = this.state.data.filter(function(itm){
      return indice != itm.id;
    });
    $.ajax({
      url: this.props.url + '/' + indice,
      type: 'DELETE',
      dataType: 'json',
      success: function(data){
        alert("Tarefa Excluida com sucesso!");
        this.setState({data: items});
      }.bind(this),
      error: function(xhr, status, err){
        alert('Não foi possivel estabelecer uma conexao com o servidor! \n' + this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  setElementState: function(url){
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: url,
      success: function(data){
        this.setState({elemento: data, showDetalhes: true});
        this.setComentSelectedElement(data.id);
      }.bind(this),
      error: function(xhr, status, err){
        alert('Não foi possivel estabelecer conexão!\n');
      }.bind(this)
    });
  },
  setComentSelectedElement: function(tarefa){
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: this.props.url + '/tarefa/' + tarefa + '/comentarios',
      success: function(data){
        this.setState({comentarios: data});
      }.bind(this),
      error: function(xhr, status, err){
        alert('Não foi possivel buscar os comentarios da tarefa selecionada');
      }.bind(this)
    });
  },
  handleChangeSubmit: function(tarefa){
    $.ajax({
      type: 'PUT',
      dataType: 'json',
      url: this.props.url + '/' + tarefa.id,
      data: tarefa,
      success: function(data){

      }.bind(this),
      error: function(xhr, status, err){
        alert('Não foi possivel estabelecer conexão!\n');
      }.bind(this)
    });
  },
  handleSelectElement: function(indice){
    var url = this.props.url + '/' + indice;
    this.setElementState(url);
  },
  toogleShowDetalhes: function(show){
    if(!show){
      $('#modal').modal('hide');
      this.setState({showDetalhes: show});
    }
  },
  getInitialState: function(){
    return {data: [], elemento: [], comentarios: [],showDetalhes: false};
  },
  componentDidMount: function() {
    setInterval(this.loadCommentsFromServer, this.props.intervalo);
  },
  render: function(){
    return (
      <div className="container">
        <div className="row">
          <TarefasForm onTarefaSubmit={this.handleTarefaSubmit} />
        </div>
        <h1> Lista de tarefas </h1>
        <hr/>
        <div className="row">
          <ListaTarefas data={this.state.data} selectElmenet={this.handleSelectElement} removeItem={this.handleRemoveTarefa}/>
        </div>
        { this.state.showDetalhes ? <Detalhes submitChanges={this.handleChangeSubmit} showDetalhes={this.toogleShowDetalhes} data={this.state.elemento} comentarios={this.state.comentarios} /> : null }
      </div>
    );
  }
});

module.exports = BoxTarefas;
