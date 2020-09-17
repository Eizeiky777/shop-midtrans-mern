import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Nav, Navbar,
} from 'react-bootstrap';
import { FaShoppingCart, FaShekelSign } from 'react-icons/fa';
import { connect } from 'react-redux';

const NavBar = ({add, auth}) => {

    let history = useHistory()
    const submitQuit = () => {
        localStorage.clear();
        history.push('/signin');
        window.location.reload(false);
    }

    return (
        <div>
            <Navbar bg="light" expand="lg" fixed="" >
                <Navbar.Brand>
                    <Link to='/'>
                        <FaShekelSign />
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        {
                            Object.keys(auth.data).length !== 0 ? 
                            (<>
                                <Navbar.Brand style={{fontSize: 15,}}>
                                <span style={{color:'gray', cursor:'pointer'}} onClick={() => submitQuit()}>
                                    SignOut
                                </span>
                                </Navbar.Brand>
                            </>
                            )   : 
                            ( <>
                                <Navbar.Brand style={{fontSize: 15,}}>
                                    <Link to='/signin' style={{color:'gray'}}>
                                        SignIn
                                    </Link>
                                </Navbar.Brand>
                                <Navbar.Brand style={{fontSize: 15,}}>
                                    <Link to='/signup' style={{color:'gray'}}>
                                        SignUp
                                    </Link>
                                </Navbar.Brand>
                            </>
                            )
                        }
                        <Navbar.Brand style={{fontSize: 15,}}>
                            <Link to='/products' style={{color:'gray'}}>
                                Products
                            </Link>
                        </Navbar.Brand>
                        {
                            auth.data ? auth.data.user ? auth.data.user.role === 1 ? 
                        <Navbar.Brand style={{fontSize: 15,}}>
                            <Link to='/admin' style={{color:'gray'}}>
                                Admin
                            </Link>
                        </Navbar.Brand>
                            : null : null : null
                        }
                        <Navbar.Brand style={{fontSize: 15,}}>
                            <Link to='/transactions' style={{color:'gray'}}>
                                Transaction
                            </Link>
                        </Navbar.Brand>
                    </Nav>
                    <Link to='/transactions'>
                    <div style={{position:'relative'}}>
                            <FaShoppingCart style={{fontSize: 25, cursor: 'pointer'}}/>
                            <div style={{position: 'absolute', top: 0, right: '0', backgroundColor: add.data.length ? 'yellow' : 'none', borderRadius: '50%', width: 15, height: 15}}>
                                <span style={{ color:'red',fontSize:12, fontWeight: 700, paddingLeft: 4, paddingBottom: 4, position:'absolute', top:0}}>{add.data.length}</span>
                            </div>
                    </div>
                    </Link>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        add: state.addCart,
        auth: state._auth
    };
};

export default connect(mapStateToProps)(NavBar);

