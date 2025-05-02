export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  try {
    // Verificar que el body exista y mostrarlo en logs
    console.log("Datos recibidos:", req.body);

    const { equipo, numeroFlag, flagIngresada } = req.body;

    const banderasCorrectas = {
      rojo: ['flag1_rojo', 'flag2_rojo', 'flag3_rojo', 'flag4_rojo'],
      azul: ['flag1_azul', 'flag2_azul', 'flag3_azul', 'flag4_azul'],
      morado: ['flag1_morado', 'flag2_morado', 'flag3_morado', 'flag4_morado'],
    };

    const correcta = banderasCorrectas?.[equipo]?.[numeroFlag - 1] === flagIngresada;

    return res.status(200).json({ correcta });
  } catch (error) {
    console.error("Error en verificar.js:", error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
}

// Configuración para habilitar el body parser
export const config = {
  api: {
    bodyParser: true,
  },
};
