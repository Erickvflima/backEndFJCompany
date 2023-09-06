import validateCpf from './validateCpf.js';

const validateCpfSchema = (value, message, messageText = 'CPF inválido') => {
  if (validateCpf(value)) {
    return value;
  }
  return message({ custom: messageText });
};
export default validateCpfSchema;
