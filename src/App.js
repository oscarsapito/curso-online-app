import React, { useEffect, useState } from "react";
import { ThemeProvider as MuithemeProvider } from "@material-ui/core/styles";
import theme from "./theme/theme";
import PerfilUsuario from "./componentes/seguridad/PerfilUsuario";
import RegistrarUsuario from "./componentes/seguridad/RegistrarUsuario";
import Login from "./componentes/seguridad/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Grid, Snackbar } from "@material-ui/core";
import AppNavbar from "./componentes/navegacion/AppNavbar";
import { useStateValue } from "./contexto/store";
import { obtenerUsuarioActual } from "./actions/UsuarioAction";

function App() {
  const [{ sesionUsuario, openSnackbar }, dispatch] = useStateValue();  

  const [iniciaApp, setIniciaApp] = useState(false);

  useEffect(() => {
    if (!iniciaApp) {
      obtenerUsuarioActual(dispatch)
        .then((response) => {
          setIniciaApp(true);
        })
        .catch((error) => {
          setIniciaApp(true);
        });
    }
  }, [iniciaApp]);

  return (
    <React.Fragment>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openSnackbar ? openSnackbar.open : false}
        autoHideDuration={3000}
        ContentProps={{ "arial-describedby": "message-id" }}
        message={
          <samp id="message-id">
            {openSnackbar ? openSnackbar.mensaje : ""}
          </samp>
        }
        onClose={() =>
          dispatch({
            type: "OPEN_SNACKBAR",
            openMensaje: {
              open: false,
              mensaje: "",
            },
          })
        }
      ></Snackbar>
      <Router>
        <MuithemeProvider theme={theme}>
          <AppNavbar />
          <Grid container>
            <Switch>
              <Route exact path="/auth/login" component={Login} />
              <Route
                exact
                path="/auth/registrar"
                component={RegistrarUsuario}
              />
              <Route exact path="/auth/perfil" component={PerfilUsuario} />
              <Route exact path="/" component={PerfilUsuario} />
            </Switch>
          </Grid>
        </MuithemeProvider>
      </Router>
    </React.Fragment>
  );
}

export default App;
