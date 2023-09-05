import axios from 'axios';

const getMessageAdvice = async () => {
  try {
    const response = await axios.get('https://api.adviceslip.com/advice');
    return response.data.slip.advice;
  } catch (error) {
    console.error('Erro ao integrar com advice', error);
    return 'Erro na tradução';
  }
};

export default getMessageAdvice;
