import React ,{ useState, useEffect } from 'react';
import style from '../Tool/Style';
import {Container,Typography,Grid, TextField,Button} from '@material-ui/core';
import { obtenerUsuarioActual, actualizarUsuario } from '../../actions/UsuarioAction';
import { useStateValue } from '../../contexto/store';

const PerfilUsuario = () => {
    const [{ sesionUsuario }, dispatch] = useStateValue();
    const [usuario, setUsuario] = useState({
        nombreCompleto : '',
        email          : '',
        password       : '',
        confirmaPassword : '',
        userName        : ''
    })

    const ingresarValoresMemoria = e=> {
        const {name , value} = e.target;
        setUsuario(anterior => ({
            ...anterior,
            [name] : value
        }));
    }

    useEffect(() => {
        obtenerUsuarioActual().then(response => {
            console.log('esta es la data del objeto response del usuario actual', response);
            setUsuario(response.data);
        });
        }, [])

        const guardarUsuario = e =>{
            e.preventDefault();
            actualizarUsuario(usuario).then(response => {

                if(response.status === 200){
                    dispatch({
                        type : "OPEN_SNACKBAR",
                        openMensaje : {
                            open : true,
                            mensaje : "Se guardaron exitosamente los cambios en Perfil Usuario"
                        }
                    })
                    window.localStorage.setItem("token_seguridad", response.data.token);
                }else{
                    dispatch({
                        type : "OPEN_SNACKBAR",
                        openMensaje : {
                            open : true,
                            mensaje : "Errores al intentar guardar en :" + Object.keys(response.data.errors)
                        }
                    })
                }               
                                               
            })
        }

    return (
        <Container component="main" maxWidth="md" justify="center">
            <div style={style.paper}>
                <Typography component="h1" variant="h5">
                    Perfil de Usuario
                </Typography>
            </div>
            <form style={style.form}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <TextField name="nombreCompleto" value={usuario.nombreCompleto} onChange={ingresarValoresMemoria} variant="outlined" fullWidth label="Ingrese nombre y apellidos"/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField name="userName" value={usuario.userName} onChange={ingresarValoresMemoria} variant="outlined" fullWidth label="Ingrese UserName"/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField name="email" value={usuario.email} onChange={ingresarValoresMemoria} variant="outlined" fullWidth label="Ingrese email"/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField name="password" value={usuario.password} type="password" onChange={ingresarValoresMemoria} variant="outlined" fullWidth label="Ingrese password"/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField name="confirmaPassword"  value={usuario.confirmaPassword} type="password" onChange={ingresarValoresMemoria} variant="outlined" fullWidth label="confirme password"/>
                    </Grid>
                    <Grid container justify="center">
                        <Grid item xs={12} md={6}>
                            <Button type="submit"  onClick = {guardarUsuario} fullWidth variant="contained" size="large" color="primary" style={style.submit}>
                                Guardar Datos
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default PerfilUsuario;