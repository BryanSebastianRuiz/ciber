export default function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ success: false, message: 'Método no permitido' });
    }
  
    const { flag, challengeId } = req.body;
  
    const correctFlags = {
      1: 'flag{pe_hidden_flag}',
      2: 'flag{malicious_traffic_found}',
      3: 'flag{welcome_to_ctf}',
      4: 'flag{digital_shadows}'
    };
  
    if (!flag || !challengeId) {
      return res.status(400).json({ success: false, message: 'Faltan datos' });
    }
  
    const isValid = correctFlags[challengeId] === flag.trim();
  
    return res.json({
      success: isValid,
      message: isValid ? '✅ Flag correcta' : '❌ Flag incorrecta'
    });
  }
  