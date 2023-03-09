import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../..";
import { apiGet, apiPost, apiPut } from "../../../services/ApiService";
import { ResponseAPI } from "../../../services/types";
import { GetRecados, Recado, User } from "../typeStore";

const adapter = createEntityAdapter<Recado>({
  selectId: (item) => item.id,
});

export const { selectAll: buscarRecados, selectById: buscarRecadoPorId } =
  adapter.getSelectors((state: RootState) => state.recados);

export const getRecados = createAsyncThunk(
  "users/getRecados",
  async (params: GetRecados) => {
    const resposta = await apiGet(`/users/${params.id}/recado`, params.archive);
    return resposta;
  }
);

export const postRecado = createAsyncThunk(
  "users/postRecado",
  async (dados: any) => {
    const resposta = await apiPost(`/users/${dados.id}/recado`, dados.recado);
    return resposta;
  }
);

export const putModeRecado = createAsyncThunk(
  "users/putModeRecado",
  async (dados: any) => {
    const resposta = await apiPut(`/users/${dados.id}/recado`, dados.recado);
    return resposta;
  }
);

const recadosSlice = createSlice({
  name: "recados",
  initialState: adapter.getInitialState(),
  reducers: {
    /* adicionarNovoRecado: adapter.addOne,
    adicionarRecados: adapter.addMany,
    atualizarRecado: adapter.updateOne,
    deletarRecado: adapter.removeOne,
    limparRecados: adapter.removeAll,*/
  },
  extraReducers: (builder) => {
    builder.addCase(
      postRecado.fulfilled,
      (state, action: PayloadAction<ResponseAPI>) => {
        if (action.payload.success) {
          adapter.addOne(state, action.payload.data);
        }
      }
    );
    builder.addCase(
      getRecados.fulfilled,
      (state, action: PayloadAction<ResponseAPI>) => {
        if (action.payload.success) {
          adapter.addMany(state, action.payload.data);
        }
      }
    );
    builder.addCase(
      putModeRecado.fulfilled,
      (state, action: PayloadAction<ResponseAPI>) => {
        if (action.payload.success) {
          adapter.updateOne(state, action.payload.data);
        }
      }
    );
  },
});

/*export const {
 / adicionarNovoRecado,
  adicionarRecados,
  atualizarRecado,
  deletarRecado,
  limparRecados,
} = recadosSlice.actions;*/
export const recadosReducer = recadosSlice.reducer;
