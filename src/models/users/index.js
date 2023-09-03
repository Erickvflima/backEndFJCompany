/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line import/no-extraneous-dependencies
// import bcrypt from 'bcrypt';
import DataBase from '../../dataBase/index.js';

export const postSignin = async ({ cpf }) => {
  const instance = DataBase.getInstance().data.request();
  const query = 'SELECT * FROM "user" where cpf = @cpf';
  instance.input('cpf', cpf);

  const { rowsAffected } = await instance.query(query);
  // if (result.rowsAffected[0] === 1 && bcrypt.compareSync(cpf, result[0].cpf)) {
  if (rowsAffected[0] === 1) {
    return {
      status: 'success',
      message: 'Usuario cadastrado e ativo.',
      rowsAffected,
    };
  }

  return {
    status: 'error',
    message: 'Usuário não cadastrado',
    rowsAffected: [0],
  };
};

export const postSignup = async ({
  cpf,
  name,
  typeOfAccess,
  teamId,
  status,
}) => {
  const instance = DataBase.getInstance().data.request();
  const query = `
  insert into"user" ( name, cpf, "typeOfAccess", "teamId", status )
  values ( @name, @cpf, @typeOfAccess, @teamId, @status );`;

  instance.input('cpf', cpf);
  instance.input('name', name);
  instance.input('typeOfAccess', typeOfAccess);
  instance.input('teamId', teamId);
  instance.input('status', status);

  const { rowsAffected } = await instance.query(query);

  if (rowsAffected[0] === 1) {
    return {
      status: 'success',
      message: 'Usuario cadastrado com sucesso.',
      rowsAffected,
    };
  }

  return {
    status: 'error',
    message: 'Erro ao cadastrar usuario',
    rowsAffected,
  };
};
