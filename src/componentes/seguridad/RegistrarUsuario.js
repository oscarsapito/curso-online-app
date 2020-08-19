import React, { useState } from "react";
import {Container, Typography, Grid, TextField, Button} from "@material-ui/core";
import style from "../Tool/Style";
import { registrarUsuario } from "../../actions/UsuarioAction";
import { useStateValue } from '../../contexto/store';

const RegistrarUsuario = () => {
  const [{ sesionUsuario }, dispatch] = useStateValue();
  const [usuario, setUsuario] = useState({
    //Variable de estado 'usuario'
    NombreCompleto: "",
    Email: "",
    Password: "",
    ConfirmaPassword: "",
    UserName: "",
  });

  const ingresarValoresMemoria = (e) => {
    const { name, value } = e.target;
    setUsuario((anterior) => ({
      ...anterior,
      [name]: value,
      //NombreCompleto : 'vaxi drez'
    }));
  };

  // const registrarUsuario = e => {
  //     e.preventDefault();
  //     console.log('imprime los valores de memoria temporal de usuario',usuario);
  // }

  const registrarUsuarioBoton = (e) => {
    e.preventDefault();

    registrarUsuario(usuario).then((response) => {
      console.log('esta es la data del objeto response del usuario actual', Object.keys(response.data.errors));
      if(response.status === 200) {        //reponse.ok
        dispatch({
          type: "OPEN_SNACKBAR",
          openMensaje: {
            open: true,
            mensaje:
              "Se guardaron exitosamente los cambios en Registro Usuario"
          }
        })
        window.localStorage.setItem("token_seguridad", response.data.token);
      } else {
        dispatch({
          type: "OPEN_SNACKBAR",
          openMensaje: {
            open: true,
            mensaje:
              "Errores al intentar guardar en :" +
              Object.keys(response.data.errors)
          }
        })
      }
    })
  }

  return (
    <Container component="main" maxWidth="md" justify="center">
      <div style={style.paper}>
        <Typography component="h1" variant="h5">
          Registro de Usuario
        </Typography>
        <form style={style.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <TextField
                name="NombreCompleto"
                value={usuario.NombreCompleto}
                onChange={ingresarValoresMemoria}
                variant="outlined"
                fullWidth
                label="Ingrese su nombre y apellidos"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="Email"
                value={usuario.Email}
                onChange={ingresarValoresMemoria}
                variant="outlined"
                fullWidth
                label="Ingrese su email"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="UserName"
                value={usuario.UserName}
                onChange={ingresarValoresMemoria}
                variant="outlined"
                fullWidth
                label="Ingrese su username"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="Password"
                value={usuario.Password}
                onChange={ingresarValoresMemoria}
                type="password"
                variant="outlined"
                fullWidth
                label="Ingrese password"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="ConfirmaPassword"
                value={usuario.ConfirmaPassword}
                onChange={ingresarValoresMemoria}
                type="password"
                variant="outlined"
                fullWidth
                label="Confirme password"
              />
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Grid item xs={12} md={6}>
              <Button
                type="submit"
                onClick={registrarUsuarioBoton}
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                style={style.submit}
              >
                Enviar
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default RegistrarUsuario;
