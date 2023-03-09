import { Grid, styled, Switch, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hoocks";
import {
  buscarRecados,
  getRecados,
} from "../../store/modules/recados/recadosSlice";
import { buscarUsuarios } from "../../store/modules/users/userSlice";

export const HeaderHome = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const usersRedux = useAppSelector(buscarUsuarios);
  const userLogged = useAppSelector((state) => state.userLogged);
  const userLoggedRecados = usersRedux.find(
    (user) => user.email === userLogged.email
  );

  const [arquivado, setArquivado] = useState(false);
  const [arquivados, setArquivados] = useState({});
  const recados = useAppSelector(buscarRecados);

  /* useEffect(() => {
    const arquivadosAtualizados = userLoggedRecados?.recados.filter(
      (recado) => recado.archive === arquivado
    );
    if (arquivadosAtualizados) {
      dispatch(adicionarRecados(arquivadosAtualizados));
    }
  }, [arquivado]);*/

  useEffect(() => {
    dispatch(getRecados({ id: userLogged.id, archive: arquivado }));
  }, [arquivado]);

  useEffect(() => {
    if (!userLogged.email) {
      navigate("/");
    }

    if (userLogged) {
    }
  }, [navigate, userLogged, dispatch]);

  const handleChange = () => {
    const { id } = userLogged;
    //receber os arquivos do getRecados
    //se esses arquivos existirem não mostra arquivos quando acionado o evento de arquivar
    //se existirem arquivos no evento de desarquivar verificar se o objeto dos arquivos estão vazio
    dispatch(
      getRecados({
        id: id,
        archive: arquivado,
      })
    );
    setArquivado(!arquivado);
  };

  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
    "&:active": {
      "& .MuiSwitch-thumb": {
        width: 15,
      },
      "& .MuiSwitch-switchBase.Mui-checked": {
        transform: "translateX(9px)",
      },
    },
    "& .MuiSwitch-switchBase": {
      padding: 2,
      "&.Mui-checked": {
        transform: "translateX(12px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(["width"], {
        duration: 200,
      }),
    },
    "& .MuiSwitch-track": {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === "dark"
          ? "rgba(255,255,255,.35)"
          : "rgba(0,0,0,.25)",
      boxSizing: "border-box",
    },
  }));

  return (
    <Grid
      container
      direction="row"
      spacing={2}
      sx={{ bgcolor: "#0f498344", mb: 1 }}
      alignItems="center"
    >
      <Grid item xs={2}>
        <Typography variant="inherit" align="center" color="white">
          {userLogged?.name}
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <Typography variant="h3" color="white">
          Gerenciamento de Recados
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Stack direction="row" spacing={1} alignItems="center">
          <AntSwitch
            defaultChecked={arquivado}
            inputProps={{ "aria-label": "ant design" }}
            onClick={handleChange}
          />
          <Typography sx={{ color: "white" }}>Arquivados</Typography>
        </Stack>
      </Grid>
    </Grid>
  );
};
