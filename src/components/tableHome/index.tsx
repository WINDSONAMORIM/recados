import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hoocks';
import { buscarUsuarioPorEmail } from '../../store/modules/users/userSlice';
import { adicionarRecados, buscarRecados, deletarRecado } from '../../store/modules/recados/recadosSlice';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { ModalRecado } from '../modalRecado';

export default function CustomizedTables() {
  const navigate = useNavigate();
  const userLogged = useAppSelector((state) => state.userLogged);
  const logged = useAppSelector((state) => buscarUsuarioPorEmail(state, userLogged.email));
  const recados = useAppSelector(buscarRecados);
  const dispatch = useAppDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState<'edit'|'delete'>('edit')
  const [idSelecionado, setIdSelecionado] = useState('');

  useEffect(
    () => {

        if(!userLogged.email) {
            navigate('/')
        } 

        if(logged) {
            dispatch(adicionarRecados(logged.recados))
        }

    },[navigate, userLogged, logged, dispatch]
  )

  const handleEdit = (id: string) => {
    setMode('edit')
    setIdSelecionado(id);
    setOpenModal(true);
}

const handleDelete = (id: string) => {
    setIdSelecionado(id);
    dispatch(deletarRecado(id))
}

const handleCloseModal = () => {
  setOpenModal(false);
}

  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
          <TableCell >#</TableCell>
            <TableCell >Motivo</TableCell>            
            <TableCell >Descrição</TableCell>
            <TableCell align='right'>Ação</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recados.map((row, index) => (
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">{index + 1}</TableCell>
              <TableCell >{row.description}</TableCell>
              <TableCell >{row.detail}</TableCell>
              <TableCell align='right'>
                <Button color='success' variant='contained' sx={{margin: '0 15px 0 0'}} onClick={() => handleEdit(row.id)}>Editar</Button>
                <Button color='error' variant='contained' sx={{margin: '0 15px 0 0 '}} onClick={() => handleDelete(row.id)}>Apagar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <ModalRecado open={openModal} handleClose={handleCloseModal} id={idSelecionado} mode={mode} />
    </>
  );
}
