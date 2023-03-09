import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hoocks";
import { buscarUsuarioPorEmail } from "../../store/modules/users/userSlice";
import { putModeRecado } from "../../store/modules/recados/recadosSlice";
import { useNavigate } from "react-router-dom";
import { ModalRecado } from "../modalRecado";
import ArchiveIcon from "@mui/icons-material/Archive";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { blue } from "@mui/material/colors";
import { Recado } from "../../store/modules/typeStore";

export default function CustomizedTables() {
  const navigate = useNavigate();
  const userLogged = useAppSelector((state) => state.userLogged);
  const logged = useAppSelector((state) =>
    buscarUsuarioPorEmail(state, userLogged.email)
  );
  // const recados = useAppSelector(buscarRecados);
  const recados = useAppSelector((state) => state.recados);
  const dispatch = useAppDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState<"edit" | "delete">("edit");
  const [idSelecionado, setIdSelecionado] = useState("");
  const [recado, setRecado] = useState({});

  useEffect(() => {
    setRecado(Object.values(recados.entities));
    console.log(Array.isArray(recado) && recado.map((recado) => recado));
  }, [recados]);

  useEffect(() => {
    if (!userLogged.email) {
      navigate("/");
    }
  }, [navigate, userLogged, logged, dispatch]);

  const handleEdit = (id: string) => {
    setMode("edit");
    setIdSelecionado(id);
    setOpenModal(true);
  };

  const handleDelete = (id: string) => {
    setIdSelecionado(id);
    //dispatch(deletarRecado(id));
  };

  const handleArchive = (id: string) => {
    setIdSelecionado(id);
    dispatch(putModeRecado(id));
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead sx={{ backgroundColor: " #040d5e6e " }}>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Motivo</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell align="center">Ação</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(recado) &&
              recado.map((recado, index) => (
                <TableRow
                  key={recado.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell>{recado.description}</TableCell>
                  <TableCell>{recado.detail}</TableCell>
                  <TableCell align="center">
                    <EditIcon
                      sx={{ color: blue[900], marginRight: 2 }}
                      onClick={() => handleEdit(recado.id)}
                    />
                    <DeleteIcon
                      sx={{ color: blue[900], marginRight: 2 }}
                      onClick={() => handleDelete(recado.id)}
                    />
                    <ArchiveIcon
                      sx={{ color: blue[900] }}
                      onClick={() => handleArchive(recado.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ModalRecado
        open={openModal}
        handleClose={handleCloseModal}
        id={idSelecionado}
        mode={mode}
      />
    </>
  );
}
