var React = require('react');
var ReactDOM = require('react-dom');
var $ = require("jquery");
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
        status = 'V';
        break;
      default:
        status = '';
    }
    return (
      <span className="col-xs-2">
        {status}
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
  loadElementsSelect: function(elemento){
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: this.props.url,
      success: function(data){
        this.setState({data: data})
      }.bind(this),
      error: function(xhr, status, err){
        alert('Não foi possivel estabelecer conexão!\n');
      }.bind(this)
    })
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
    this.setState({showDetalhes: show});
  },
  getInitialState: function(){
    return {data: [], elemento: [], showDetalhes: false};
  },
  componentDidMount: function() {
    setInterval(this.loadCommentsFromServer, this.props.intervalo);
  },
  render: function(){
    return (
      <div className="container">
        <div className="row">
          <TarefasForm onTarefaSubmit={this.handleTarefaSubmit} />;
        </div>
        <h1> Lista de tarefas </h1>
        <hr/>
        <div className="row">
          <ListaTarefas data={this.state.data} selectElmenet={this.handleSelectElement} removeItem={this.handleRemoveTarefa}/>
        </div>
        { this.state.showDetalhes ? <Detalhes showDetalhes={this.toogleShowDetalhes} data={this.state.elemento} /> : null }
      </div>
    );
  }
});

module.exports = BoxTarefas;
