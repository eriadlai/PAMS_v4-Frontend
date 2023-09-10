import { RutaApi, oUpdateToken } from "../api/url";
import {
  oErrorAlert,
  oSuccessAlert,
  oSuccessAlertRedirection,
} from "../components/Alerts/Alerts";

export const CrearPaciente = async (oPaciente, oData) => {
  const SetPaciente = {
    oUserID: oData.user.id,
    oUserRol: oData.user.rol,
    nombre: oPaciente.nombre,
    apellido: oPaciente.apellido,
    fechaNacimiento: oPaciente.fechaNacimiento,
    ocupacion: oPaciente.ocupacion,
    actividadExtra: oPaciente.actividadExtra,
    direccion: oPaciente.direccion,
    telefono: oPaciente.telefono,
    fechaRegistro: "",
    isActive: 1,
    noExpediente: "",
    estadoCivil: oPaciente.estadoCivil,
    AntecedentesClinicos: {
      psicologico: "N/A",
      psiquiatrico: "N/A",
      patologico: "N/A",
    },
    AntecedentesFamiliares: {
      enfermedadGrave: "N/A",
      accidentes: "N/A",
      medicamentos: "N/A",
      intervencionQuirurgica: "N/A",
      discapacidadAuxiliar: "N/A",
    },
    CirculoSocial: {
      social: "N/A",
      laboral: "N/A",
      vivienda: "N/A",
    },
    Problematica: {
      evolucion: "N/A",
      causas: "N/A",
      acciones: "N/A",
      implicaciones: "N/A",
      resultadosObbtenidos: "N/A",
      tratamientos: [
        {
          tratamiento: "N/A",
          aplicacion: "N/A",
          lugar: "N/A",
          duracion: "N/A",
          fechas: "1/1/1",
        },
      ],
    },
    EstadoMental: {
      lenguaje: "N/A",
      emocional: "N/A",
      realidad: "N/A",
      higiene: "N/A",
    },
    Habitos: {
      alimento: "N/A",
      sleep: "N/A",
      antecedentePsiccologico: "N/A",
    },
    HistorialSexual: {
      abuso: "N/A",
      embarazo: "N/A",
      edadEmbarazo: "N/A",
      preferenciaSexual: "N/A",
    },
    Casa: {
      tipo: "N/A",
      cantHabitacion: "N/A",
      cantFamilias: "N/A",
      ingresoFamiliar: "N/A",
      serviciosHogar: ["N/A"],
    },
    Familiar: [
      {
        nombre: "N/A",
        apellido: "N/A",
        parentesco: "N/A",
        ocupacion: "N/A",
        fechaNacimiento: "N/A",
        sustancia: ["N/A"],
      },
    ],
    Sustancia: ["N/A"],
    nivelEscolar: oPaciente.nivelEscolar,
    religion: oPaciente.religion,
    AspectoConsumo: "",
  };
  const oResult = await RutaApi.post("/paciente/insert", SetPaciente);
  if (oResult.status !== 200) {
    oErrorAlert("Ups", "Ha sucedido un error...");
  }
  oUpdateToken(oData, oData.user.token);
  oSuccessAlertRedirection(
    "Paciente  Creado",
    "Se ha registrado satisfactoriamente al usuario",
    "/TablaPacientes"
  );
};
export const EditarPaciente = async (oPaciente, oData) => {
  const SetPaciente = {
    oUserID: oData.user.id,
    oUserRol: oData.user.rol,
    oID: oPaciente.id,
    nombre: oPaciente.nombre,
    apellido: oPaciente.apellido,
    fechaNacimiento: oPaciente.fechaNacimiento,
    ocupacion: oPaciente.ocupacion,
    actividadExtra: oPaciente.actividadExtra,
    direccion: oPaciente.direccion,
    telefono: oPaciente.telefono,
    estadoCivil: oPaciente.estadoCivil,
    Sustancia: ["N/A"],
    nivelEscolar: oPaciente.nivelEscolar,
    religion: oPaciente.religion,
  };
  const oResult = await RutaApi.patch("/paciente/update", SetPaciente);
  if (oResult.status !== 200) {
    oErrorAlert("Ups", "Ha sucedido un error...");
  }
  oUpdateToken(oData, oData.user.token);
  oSuccessAlert(
    "Datos Actualizados",
    "Los datos del paciente han sido actualizados satisfactoriamente"
  );
};
