import { Box, Button, Fab, Grid, Modal, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React, { useState } from 'react';
import { InputDefault, InputName } from '../inputDefault';
import { useAppDispatch } from '../../store/hoocks';
import { v4 as uuid} from 'uuid';
import { adicionarNovoRecado } from '../../store/modules/recados/recadosSlice';

export const MainHome = ()=>{

    const dispatch = useAppDispatch();
    const [mode, setMode] = useState<'edit'|'delete'|'create'>('create')

    const styleFAB = {
        margin: 0,
        right: 20,
        bottom: 20,
        position: 'fixed',
    };

    const styleModal = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      };

    const [open, setOpen] = useState(false);
    
    const handleOpen = () => {
        setOpen(true);
        setMode('create')
    }
    
    const handleClose = () => setOpen(false);

    const [detail, setDetail] = useState('');
    const [description, setDescription] = useState('');

    const handleChange = (value: string, key: InputName) =>{
        switch (key) {
            case 'detail':
                setDetail(value);
                break;
            case 'description':
                setDescription(value);              
                break;
            default:
        }
    }

    const createRecado = () => {
        const newRecado = {
            id: uuid(),
            description,
            detail
        }
        dispatch(adicionarNovoRecado(newRecado))
    }

    return(
        <>
        <Box sx={styleFAB}> 
            <Fab onClick={handleOpen} color="primary" aria-label="add">
                <AddIcon />
            </Fab>
        </Box>
        
        <Modal sx={styleModal} open={open} onClose={handleClose}>
        <Box style={{ backgroundColor: 'white', width:'100%', height:'100%', padding:'20px' }}>
            <Typography variant="h6">ADICIONAR NOVO RECADO</Typography>
            <Typography>Preencha todos os campos</Typography>
            <Grid container direction='row' spacing={2} alignItems="center" sx={{mt:1}}>
                <Grid item xs={12}> 
                    <InputDefault type="text" label="Digite o motivo" name='detail' value={detail} handleChange={handleChange}/>
                </Grid>
                <Grid item xs={12}>
                    <InputDefault type="text" label="Digite a descrição" name='description' value={description} handleChange={handleChange}/>
                </Grid>
                <Grid item xs={12}>
                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                        <Button variant="outlined" onClick={createRecado}>Inserir</Button>
                        <Button variant="outlined" onClick={handleClose}>Fechar</Button>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
        </Modal>     
     </>        
    )
}