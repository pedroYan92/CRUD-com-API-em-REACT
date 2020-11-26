import React from 'react';
import Cadastro from './Components/Cadastro/CadastroForm';
import Consultas from './Components/Lista de Consultas/Consultas';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import EditarCadastro from './Components/Editar cadastro/EditarCadastro';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path='/' exact component={Consultas} />
          <Route path='/cadastro' exact component={Cadastro} />
          <Route path='/edit/:id' exact component={EditarCadastro} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
