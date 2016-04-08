var React = require('react');
var ReactDOM = require('react-dom');
var $ = require("jquery");

var Detalhes = React.createClass({
  getInitialState: function(){
    return {data: []}
  },
  componentWillMount: function(){
    document.addEventListener("backbutton", this.closeDetalhes, false);
  },
  componentWillReceiveProps: function(nextProps){

  },
  componentDidMount: function() {
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
              { this.props.comentarios.length > 0 ? <ComentariosBox data={this.props.comentarios} /> : null }
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

var ComentariosBox = React.createClass({
  render: function(){
    var comentarios = this.props.data.map(function(coment){
      return (
        <ItemComentario >
          {coment.comentario1}
        </ItemComentario>
      );
    });
    return (
      <div className="col-xs-10">
        <h5> Lista de comentários </h5>
        <ul>
          {comentarios}
        </ul>
      </div>
    );
  }
});

var ItemComentario = React.createClass({
  render: function(){
    return (
      <li> {this.props.children} </li>
    );
  }
});

function status(concluido){
  if ( concluido == '1' ){
    return true;
  }
  return false;
}

module.exports = Detalhes;
