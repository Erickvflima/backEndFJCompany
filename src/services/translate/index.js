const axios = require('axios');

// Substitua 'YOUR_DEEPL_API_KEY' pela sua chave de API do DeepL
const DEEPL_API_KEY = 'YOUR_DEEPL_API_KEY';

async function translateTextWithDeepL(text, sourceLang, targetLang) {
  try {
    const response = await axios.post(
      'https://api.deepl.com/v2/translate',
      {
        text: text,
        source_lang: sourceLang, // Idioma de origem (por exemplo, 'EN' para inglês)
        target_lang: targetLang, // Idioma de destino (por exemplo, 'PT' para português)
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'DeepL-Auth-Key': DEEPL_API_KEY, // Sua chave de API do DeepL
        },
      },
    );

    // A resposta da API contém a tradução
    return response.data.translations[0].text;
  } catch (error) {
    console.error('Erro ao traduzir texto com DeepL:', error);
    return 'Erro na tradução';
  }
}
