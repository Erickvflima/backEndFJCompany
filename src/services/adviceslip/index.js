import axios from 'axios';

const getMessageAdvice = async () => {
  try {
    const response = await axios.get('https://api.adviceslip.com/advice');
    return {
      messageRandom: response.data.slip.advice,
      idRandom: response.data.slip.id,
    };
  } catch (error) {
    console.error('Erro ao integrar com advice', error);
    return 'Erro na tradução';
  }
};

export default getMessageAdvice;
