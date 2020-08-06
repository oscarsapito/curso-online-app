import React ,{ useState } from 'react';
import style from '../Tool/Style';
import {Container,Typography,Grid, TextField,Button} from '@material-ui/core';

const PerfilUsuario = () => {
    const [usuario, setUsuario] = useState({
        NombreCompleto : '',
        Email          : '',
        Password       : '',
        ConfirmarPassword : ''
    })

    const ingresarValoresMemoria = e=> {
        const {name , value} = e.target;
        setUsuario(anterior => ({
            ...anterior,
            [name] : value
        }));
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
                        <TextField name="NombreCompleto" value={usuario.NombreCompleto} onChange={ingresarValoresMemoria} variant="outlined" fullWidth label="Ingrese nombre y apellidos"/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField name="Email" value={usuario.Email} onChange={ingresarValoresMemoria} variant="outlined" fullWidth label="Ingrese email"/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField name="Password" value={usuario.Password} type="password" onChange={ingresarValoresMemoria} variant="outlined" fullWidth label="Ingrese password"/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField name="ConfirmarPassword"  value={usuario.ConfirmarPassword} type="password" onChange={ingresarValoresMemoria} variant="outlined" fullWidth label="confirme password"/>
                    </Grid>
                    <Grid container justify="center">
                        <Grid item xs={12} md={6}>
                            <Button type="submit" fullWidth variant="contained" size="large" color="primary" style={style.submit}>
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