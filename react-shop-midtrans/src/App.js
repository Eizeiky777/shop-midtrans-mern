import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/views/navbar/NavBar';
import LandingPage from './components/views/landingPage/LandingPage';
import ProductPage from './components/views/productPage/ProductPage';
import TransactionPage from './components/views/transactionPage/TransactionPage';
import AdminPage from './components/views/adminPage/AdminPage';
import CheckTransactions from './components/views/adminPage/section/transactions';
import SignUp from './components/views/authPage/SignUp';
import SignIn from './components/views/authPage/SignIn';

// action
import { connect } from "react-redux";
import { authCheck } from './_actions/auth_actions';
import Financial from './components/views/adminPage/section/financial';


const App = ({authCheck, login, auth}) => {
  
  useEffect(() => {
    authCheck() 
  }, [authCheck, login ])

  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/" render={(props) => <LandingPage {...props}  />} />
        <Route path="/products" render={(props) => <ProductPage {...props}  />} />
        <Route path="/transactions" render={(props) => <TransactionPage {...props}  />} />
        {
          auth.data ? auth.data.user ? auth.data.user.role ? 
            <>
            <Route exact path="/admin" render={(props) => <AdminPage  {...props}  />} />
            <Route path="/admin/transactions" render={(props) => <CheckTransactions  {...props}  />} />
            <Route path="/admin/financial" render={(props) => <Financial  {...props}  />} />
            </>
          : null : null : null
        }
        
        <Route path="/signup" render={(props) => <SignUp {...props}  />} />
        <Route path="/signin" render={(props) => <SignIn {...props}  />} />
      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
        auth: state._auth,
        login: state._login
  };
};

export default connect(mapStateToProps, { authCheck })(App);
