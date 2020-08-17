import React , {useState} from 'react';
import style from '../Tool/Style';
import { Container,Avatar, Typography, form, TextField, Button } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {loginUsuario} from '../../actions/UsuarioAction';
const Login = () => {
    const [usuario, setUsuario] = useState({
        email          : '',
        password       : ''
    })

    const ingresarValoresMemoria = e => {
        const {name ,value} = e.target;
        setUsuario(anterior => ({
            ...anterior,
           [name] : value 
        }))
    }

    const loginUsuarioBoton = e =>{
        e.preventDefault();
        loginUsuario(usuario).then(response => {
            console.log('login exitoso', response);
            window.localStorage.setItem("token_seguridad", response.data.token); 
        })
    }
    
    return (
        <Container maxWidth ="xs">
            <div style={style.paper}>
                <Avatar style={style.avatar}>
                    <LockOutlinedIcon style={style.icon}/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login de Usuario
                </Typography>
                <form style={style.form}>
                    <TextField  name="email" value={usuario.email} onChange={ingresarValoresMemoria} variant="outlined" type="email" label="Ingrese Email" fullWidth margin="normal"/>
                    <TextField  name="password" value={usuario.password} onChange={ingresarValoresMemoria} variant="outlined" type="password" label="password" fullWidth margin="normal" />
                    <Button type="submit" onClick={loginUsuarioBoton} fullWidth variant="contained" color="primary" style={style.submit}>
                        Enviar
                    </Button>
                </form>
            </div>
        </Container>
    );
};

export default Login;