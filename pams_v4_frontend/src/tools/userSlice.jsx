import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id: "",
    nombre: "",
    username: "",
    rol: "",
    isActive: true,
    isLoged: false,
    token: "",
  },
};

const userSlice = createSlice({
  name: "usuario",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      return {
        ...state,
        user: action.payload,
      };
    },
    updateToken: (state, action) => {
      return {
        ...state,
        user: action.payload,
      };
    },
    logoutUser: (state) => {
      const usuarioDesactivado = {
        id: "",
        nombre: "",
        username: "",
        rol: "",
        isActive: true,
        isLoged: false,
        token: "",
      };
      return {
        ...state,
        user: usuarioDesactivado,
      };
    },
  },
});

export const { loginUser, logoutUser, updateToken } = userSlice.actions;
export default userSlice.reducer;
