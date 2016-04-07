var React = require('react');
var ReactDOM = require('react-dom');
var $ = require("jquery");

var Detalhes = React.createClass({
  getInitialState: function(){
    return {show: false}
  },
  componentDidMount: function() {
    this.onCloseDetalhes();
    $('#modal').modal('show');
  },
  handleConcluidoChange: function(status){
    //todo
  },
  onCloseDetalhes: function(){
    document.addEventListener("backbutton", function(){
      this.closeDetalhes();
    }, false);
  },
  closeDetalhes: function(){
    this.props.showDetalhes(false);
    $('#modal').modal('hide');
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
                <ItemConcluido status={this.props.data.concluido} onConcluidoChange={this.handleConcluidoChange} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" onClick={this.closeDetalhes} className="btn btn-primary">Salvar Alterações</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var ItemConcluido = React.createClass({
  onConcluidoChange: function(event){
    this.props.onConcluidoChange(event.target.checked);
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
