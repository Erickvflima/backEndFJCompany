import DataBase from '../../dataBase/index.js';

export const getListTeam = async payload => {
  const instance = DataBase.getInstance().data.request();

  let query = 'SELECT * FROM "team"';

  if (payload.status) {
    query += ' WHERE status = @statusList';
    instance.input('statusList', payload.status);
  }

  if (payload.name) {
    query += payload.status
      ? ' AND name = @nameList'
      : ' WHERE name = @nameList';
    instance.input('nameList', payload.name);
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

export const deleteList = async payload => {
  const instance = DataBase.getInstance().data.request();

  const query = `delete from team where nameTeam = @nameTeam;`;

  instance.input('nameTeam', payload.nameTeam);
  const { recordset, rowsAffected } = await instance.query(query);

  return {
    status: 'success',
    message: 'Registro deletado com sucesso.',
    document: recordset,
    rowsAffected,
  };
};

export const postTeam = async ({ name, status }) => {
  const instance = DataBase.getInstance().data.request();
  const validNameTeam = await getListTeam({ name: name });

  if (validNameTeam.rowsAffected[0] === 1) {
    return {
      status: 'error',
      message: 'Nome de equipe já esta cadastrada.',
    };
  }
  const query = `insert into "team" ( name, status )
  values ( @nameTeam, @statusTeam );`;

  instance.input('nameTeam', name);
  instance.input('statusTeam', status);

  const { rowsAffected } = await instance.query(query);

  const resultTeam = await getListTeam({ name: name });

  if (rowsAffected[0] === 1) {
    return {
      status: 'success',
      message: 'Equipe cadastrada com sucesso.',
      document: resultTeam.document,
      rowsAffected,
    };
  }

  return {
    status: 'error',
    message: 'Erro ao cadastrar equipe',
    rowsAffected,
  };
};
