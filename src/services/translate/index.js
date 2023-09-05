import axios from 'axios';

export const postText = async text => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo-0613',
        messages: [
          {
            role: 'user',
            content: `Traduza a menssagem ,${text}, para portugues.`,
          },
        ],
        temperature: 0.2,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.ACCESS_KEY_OPENIA}`,
        },
      },
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Erro ao traduzir texto:', error);
    return 'Erro na tradução';
  }
};
