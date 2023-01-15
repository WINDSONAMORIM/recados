import { Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hoocks';
import { buscarUsuarioPorEmail } from '../../store/modules/users/userSlice';


export const HeaderHome = ()=>{
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const userLogged = useAppSelector((state) => state.userLogged)
    const logged = useAppSelector((state) => buscarUsuarioPorEmail(state, userLogged.email))
    

    useEffect(
        () => {

            if(!userLogged.email) {
                navigate('/')
            } 

            if(logged) {
                
            }

        },       
        [navigate, userLogged, logged, dispatch]
    )

    return(
        <Grid container direction='row' spacing={2} sx={{bgcolor:'#0f498344', mb:1}} alignItems="center">
            <Grid item xs={2}> 
                <Typography variant='inherit' align='center' color='white' >{logged?.name}</Typography>
            </Grid>
            <Grid item xs={10}>
                <Typography variant='h3' color='white'> Gerenciamento de Recados</Typography>
            </Grid>
        </Grid>
    )
}