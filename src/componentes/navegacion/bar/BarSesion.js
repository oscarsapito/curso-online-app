import React from 'react';
import { Toolbar, IconButton,Typography,Button, makeStyles, Avatar } from '@material-ui/core';
import FotoUsuarioTemp from "../../../logo.svg";
import { useStateValue } from "../../../contexto/store";

const useStyles = makeStyles((theme) =>({
    seccionDesktop : {
        display : "none",
        [theme.breakpoints.up("md")] : {
            display : "flex"
        }
    },
    seccionMovil : {
        display : "flex",
        [theme.breakpoints.up("md")] : {
            display : "none"
        }
    },
    grow :  {
        flexGrow : 1
    },
    avatarSize : {
        width : 40,
        height : 40
    }

}))



const BarSesion = () => {
    const clases = useStyles();
    const [{sesionUsuario}, dispatch] = useStateValue();

    return (
        <Toolbar>
            <IconButton color="inherit">
                <i className="material-icons">menu</i>
            </IconButton>

            <Typography variant="h6">Cursos Online</Typography>
            <div className={clases.grow}></div>
            <div className={clases.seccionDesktop}>
                <Button color="inherit">
                    Salir
                </Button>
                <Button color="inherit">
                    {sesionUsuario ? sesionUsuario.usuario.nombreCompleto : ""}
                </Button>
                <Avatar src={FotoUsuarioTemp}>
                </Avatar>
            </div>

            <div className={clases.seccionMovil}>
                <IconButton color="inherit">
                   <i className="material-icons">more_vert</i> 
                </IconButton> 
            </div>
            
        </Toolbar>
    );
};

export default BarSesion; 