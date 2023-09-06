import DataBase from '../../dataBase/index.js';

export const getList = async payload => {
  const instance = DataBase.getInstance().data.request();

  let query = 'SELECT * FROM "user"';

  if (payload.status) {
    query += ' WHERE status = @statusList';
    instance.input('statusList', payload.status);
  }

  if (payload.cpf) {
    query += payload.status ? ' AND cpf = @cpfList' : ' WHERE cpf = @cpfList';
    instance.input('cpfList', payload.cpf);
  }
  instance.input('status', payload.status);
  const { recordset, rowsAffected } = await instance.query(query);

  return {
    status: 'success',
    message: 'Lista retornada com sucesso.',
    document: recordset,
    rowsAffected,
  };
};
export const postSignin = async ({ cpf }) => {
  const instance = DataBase.getInstance().data.request();
  const query = `SELECT * FROM "user" where cpf = @cpf and status = 'Ativo'`;
  instance.input('cpf', cpf);

  const { rowsAffected, recordset } = await instance.query(query);

  if (rowsAffected[0] === 1) {
    return {
      status: 'success',
      message: 'Usuario cadastrado e ativo.',
      document: recordset[0],
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
  const validCpf = await getList({ cpf: cpf });

  if (validCpf.rowsAffected[0] > 0) {
    return {
      status: 'error',
      message: 'CPF já esta cadastrado em nossa base.',
    };
  }

  const query = `
  insert into "user" ( name, cpf, "typeOfAccess", "teamId", status )
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

export const patchUser = async (cpf, payload) => {
  try {
    const instance = DataBase.getInstance().data.request();

    if (!cpf) {
      return {
        status: 'error',
        message: 'CPF do usuário não informado.',
      };
    }
    const validCpf = await getList({ cpf: cpf });

    if (validCpf.rowsAffected[0] === 0) {
      return {
        status: 'error',
        message: 'CPF não esta cadastrado em nossa base.',
      };
    }

    if (!payload || Object.keys(payload).length === 0) {
      return {
        status: 'error',
        message: 'Nenhum dado de atualização fornecido.',
      };
    }

    let query = 'UPDATE "user" SET ';

    const setStatements = Object.keys(payload)
      .filter(field => field !== 'cpf')
      .map(field => {
        instance.input(field, payload[field]);
        return `"${field}" = @${field}`;
      })
      .join(', ');

    query += setStatements + ` WHERE "cpf" = @cpf;`;

    instance.input('cpf', cpf);

    const queryResult = await instance.query(query);

    const newData = await getList({ cpf: cpf, status: payload.status });
    if (queryResult.rowsAffected[0] === 1) {
      return {
        status: 'success',
        message: 'Usuário atualizado com sucesso.',
        document: newData.document[0],
        rowsAffected: queryResult.rowsAffected,
      };
    }
    return {
      status: 'error',
      message: 'Erro ao atualizar o usuário.',
    };
  } catch (error) {
    throw error;
  }
};
