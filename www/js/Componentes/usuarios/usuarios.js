var React = require('react');
var ReactDOM = require('react-dom');
var $ = require("jquery");

var BoxUsuarios = React.createClass({
  loadCommentsFromServer: function(){
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: this.props.url + '/usuarios',
      success: function(usuarios){
        this.setState({data: usuarios});
      }.bind(this),
      error: function(xhr, status, err){
        alert('Erro ao recuperar lista de usuarios!\n');
      }.bind(this)
    });
  },
  getInitialState: function(){
    return {data: []};
  },
  componentWillMount: function(){
    $('#loading').modal('show');
  },
  componentDidMount: function(){
    this.loadCommentsFromServer();
    $('#loading').modal('hide');
  },
  render: function(){
    return (
      <div className="row">
        <div>
          <ListaUsuarios data={this.state.data} />
        </div>
      </div>
    );
  }
});

var ListaUsuarios = React.createClass({
  render: function(){
    var usuarios = this.props.data.map(function(usuario){
      return <Usuario key={usuario.i_unique}>
              {usuario.st_nome}
             </Usuario>
    });
    return (
      <ul> {usuarios} </ul>
    );
  }
});

var Usuario = React.createClass({
  render: function(){
    return (
      <li> {this.props.children} </li>
    );
  }
});
module.exports = BoxUsuarios;
