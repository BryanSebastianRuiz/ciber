
Simulated WannaCry Network Traffic – CTF Challenge
==================================================

Este reto simula tráfico de red sospechoso que oculta una **bandera** en medio de fragmentos y ruido. 
El archivo `wannacry_simulated.pcap` fue generado con fines educativos y de entrenamiento en análisis de tráfico de red.

Objetivo
--------
Encuentra la bandera oculta con formato:

flag{...}

Herramientas recomendadas
--------------------------
- Python 3 con Scapy
- Wireshark
- Terminal con herramientas como `tcpdump`, `tshark`

Pistas
------
1. Existen varios fragmentos IP que pertenecen al mismo paquete UDP.
2. Uno de esos paquetes contiene un payload codificado en Base64.
3. Hay mucho tráfico de ruido para dificultar la detección.
4. Debes reensamblar los fragmentos correctamente.
5. Solo un flujo contiene la bandera.

Cómo resolverlo
---------------

Opción A – Wireshark GUI
1. Abre `wannacry_simulated.pcap` en Wireshark.
2. Filtra por paquetes fragmentados:
   ip.flags.mf == 1 || ip.frag_offset > 0
3. Sigue el flujo sospechoso (ej. ip.id == XXXX).
4. Reconstruye el payload.
5. Decodifica el resultado (probablemente sea Base64).

Opción B – Python (Scapy)
from scapy.all import rdpcap, IP, UDP, Raw, defragment
import base64

pkts = rdpcap("wannacry_simulated.pcap")
ip_fragments = [p for p in pkts if IP in p and (p[IP].flags.MF or p[IP].frag > 0)]
# (Filtrado y reensamblado personalizado aquí...)

Consejos
--------
- No todos los fragmentos pertenecen al mismo paquete.
- La bandera no está en texto plano.
- Asegúrate de usar las herramientas de seguimiento de fragmentos en Wireshark o agrupar por ip.id.

Archivos incluidos
------------------
- wannacry_simulated.pcap – archivo con tráfico simulado
- README.txt – este documento
- generate_wannacry_sim.py – script generador del tráfico (opcional)

¡Buena suerte y feliz análisis de red! 🕵️‍♂️
