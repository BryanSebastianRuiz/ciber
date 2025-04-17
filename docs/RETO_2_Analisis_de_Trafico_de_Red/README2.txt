README - Reto Análisis de Tráfico con Wireshark (Nivel Intermedio)
------------------------------------------------------------------

Introducción
------------
Bienvenidos al reto de Análisis de Tráfico. Este desafío tiene como objetivo introducirte al análisis de paquetes de red con la herramienta Wireshark. En este reto deberás analizar un archivo `.pcap` que contiene tráfico entre un cliente y un servidor.

Objetivo del reto:
- Analizar el archivo de captura de red `red_fantasma.pcap` usando únicamente Wireshark.
- Encontrar la flag oculta en una comunicación HTTP.

Herramienta a Utilizar:
- Wireshark: Herramienta gráfica para analizar paquetes de red en profundidad.
- Base64Code: Herramienta para poder pasar texto plano a formatos.

Instrucciones Paso a Paso
-------------------------

Paso 1: Abrir el archivo .pcap
- Asegúrate de tener instalado Wireshark.
- Abre el archivo `red_fantasma.pcap` en Wireshark.

Paso 2: Aplicar filtro de tráfico HTTP
- En la barra de filtros de Wireshark, escribe:
  http
- Esto mostrará únicamente el tráfico HTTP (comunicaciones web).

Paso 3: Examinar los paquetes HTTP
- Revisa los paquetes de respuesta HTTP.
- Haz clic en cada uno y revisa cada una de las pestañas.

Paso 4: Buscar la flag
- Entre los paquetes HTTP hay una respuesta que contiene una cadena especial.

Paso 5: Ingreso de la flag
- Copia la flag tal como aparece en el paquete.
- Pasala al siguiente link "https://www.base64decode.org/" y encuentra la bandera en los formatos.

Reglas del Reto
---------------
1. NO USAR INTELIGENCIA ARTIFICIAL.
2. Solo utilizar Wireshark y Base64Code
3. No modificar el archivo `.pcap`.
4. No compartir la solución con otros participantes.

Consejos Finales
----------------
- La flag está en texto plano, no necesitas decodificar nada.
