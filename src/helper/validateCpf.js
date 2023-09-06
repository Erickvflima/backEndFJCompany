const validateCpf = cpfParams => {
  let cpf = String(cpfParams);
  let soma;
  let resto;
  let i;
  soma = 0;
  cpf = cpf.replace(/\D/g, '');
  if (
    cpf.length !== 11 ||
    cpf === '00000000000' ||
    cpf === '11111111111' ||
    cpf === '22222222222' ||
    cpf === '33333333333' ||
    cpf === '44444444444' ||
    cpf === '55555555555' ||
    cpf === '66666666666' ||
    cpf === '77777777777' ||
    cpf === '88888888888' ||
    cpf === '99999999999'
  ) {
    return false;
  }
  if (cpf === '00000000000') return false;

  for (i = 1; i <= 9; i++) {
    soma += parseInt(cpf.toString().substring(i - 1, i), 10) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.toString().substring(9, 10), 10)) return false;
  soma = 0;
  for (i = 1; i <= 10; i++) {
    soma += parseInt(cpf.toString().substring(i - 1, i), 10) * (12 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) {
    resto = 0;
  }
  if (resto !== parseInt(cpf.toString().substring(10, 11), 10)) return false;
  return true;
};

export default validateCpf;
