import DataBase from '../../dataBase/index.js';

export const getList = async payload => {
  const instance = DataBase.getInstance().data.request();

  let query = `
  SELECT m.*, u.name as nameUser FROM "message" AS m
  INNER JOIN "user" AS u ON m.teamId = u.teamId`;

  if (payload.status) {
    query += ' WHERE m.status = @statusList';
    instance.input('statusList', payload.status);
  }

  if (payload.teamId) {
    query += payload.status
      ? ' AND m.teamId = @teamId'
      : ' WHERE m.teamId = @teamId';
    instance.input('teamId', payload.teamId);
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

export const deleteMessage = async payload => {
  const instance = DataBase.getInstance().data.request();

  const query = 'Delete FROM "message" where id = @idMessage';

  instance.input('idMessage', payload.id);
  const { recordset, rowsAffected } = await instance.query(query);
  if (rowsAffected[0] > 0) {
    return {
      status: 'success',
      message: 'Mensagem deletada com sucesso.',
      document: recordset,
      rowsAffected,
    };
  } else {
    return {
      status: 'error',
      message: 'Nenhuma mensagem foi deletada.',
      document: recordset,
      rowsAffected,
    };
  }
};
export const postMessage = async payload => {
  const instance = DataBase.getInstance().data.request();

  const query = ` insert into 
  message ( description, "teamId", status )
  values ( @description, @teamId, @status );`;

  instance.input('description', payload.description);
  instance.input('teamId', payload.teamId);
  instance.input('status', payload.status);
  const { recordset, rowsAffected } = await instance.query(query);
  if (rowsAffected[0] > 0) {
    return {
      status: 'success',
      message: 'Mensagem inserida com sucesso.',
      document: recordset,
      rowsAffected,
    };
  } else {
    return {
      status: 'error',
      message: 'Erro ao inserir mensagem.',
      document: recordset,
      rowsAffected,
    };
  }
};

export const putMessage = async payload => {
  const instance = DataBase.getInstance().data.request();

  const query = `update message set 
  description = @description,
  status = @status where 
  id = @id`;

  instance.input('id', payload.id);
  instance.input('description', payload.description);
  instance.input('status', payload.status);
  const { recordset, rowsAffected } = await instance.query(query);
  if (rowsAffected[0] > 0) {
    return {
      status: 'success',
      message: 'Mensagem alterada com sucesso.',
      document: recordset,
      rowsAffected,
    };
  } else {
    return {
      status: 'error',
      message: 'Nenhuma mensagem foi encontrada.',
      document: recordset,
      rowsAffected,
    };
  }
};
