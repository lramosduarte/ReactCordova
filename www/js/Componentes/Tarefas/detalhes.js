var React = require('react');
var ReactDOM = require('react-dom');
var $ = require("jquery");

var Detalhes = React.createClass({
  loadCommentsFromServer: function(){
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
  getInitialState: function(){
    return {data: []}
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    document.addEventListener("backbutton", function(){
      ReactDOM.render(<Main /> , document.getElementById('root'));
    }, false);
  },
  handleConcluidoChange: function(status){
    console.log(status);
    this.setState({concluido: !status});
  },
  render: function(){
    return (
      <div className="container">
        <div className="row">
          <h1> Detalhes da tarefa </h1>
          <hr />
        </div>
        <div className="row">
          <h2> <span> {this.state.data.id} </span> - {this.state.data.descricao} </h2>
          <ItemConcluido status={this.state.data.concluido} onConcluidoChange={this.handleConcluidoChange} />
        </div>
      </div>
    );
  }
});

var ItemConcluido = React.createClass({
  onConcluidoChange: function(event){
    console.log(event.target.checked);
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
