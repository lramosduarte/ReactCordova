var React = require('react');
var ReactDOM = require('react-dom');
var $ = require("jquery");

var Detalhes = React.createClass({
  getInitialState: function(){
    return {data: []}
  },
  componentDidMount: function() {
    document.addEventListener("backbutton", this.closeDetalhes, false);
    $('#modal').modal('show');
  },
  handleConcluidoChange: function(evento){
    this.props.data.concluido = evento.target.checked;
  },
  handleSubmitChanges: function(){
    this.props.submitChanges(this.props.data);
    this.closeDetalhes();
  },
  closeDetalhes: function(){
    this.setState({data: this.props.data})
    this.props.showDetalhes(false);
  },
  render: function(){
    return (
      <div id="modal" className="modal fade">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1> Detalhes da tarefa </h1>
              <hr />
            </div>
            <div className="modal-body">
              <h3> Codigo - <span> {this.props.data.id} </span> </h3>
              <div className="col-xs-7">
                {this.props.data.descricao}
              </div>
              <div className="col-xs-2">
                <input className="btn" type="checkbox" id="concluido" checked={status(this.props.data.concluido)} onClick={this.handleConcluidoChange} name="concluido" />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" onClick={this.handleSubmitChanges} className="btn btn-primary">Salvar Alterações</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

function status(concluido){
  if ( concluido == '1' ){
    return true;
  }
  return false;
}

var ItemConcluido = React.createClass({
  onConcluidoChange: function(event){
    event.preventDefault();
    console.log(event.target.checked);
  },
  render: function(){
    var status;
    switch (this.props.status) {
      case '1':
        status = true;
        break;
      default:
        status = false;
        break;
    }
    return (
      <span className="col-xs-2">
        <input className="btn" type="checkbox" id="concluido" name="concluido" checked={status} onChange={this.onConcluidoChange} />
      </span>
    );
  }
});

module.exports = Detalhes;
