import DataBase from '../../dataBase/index.js';

export const getList = async payload => {
  const instance = DataBase.getInstance().data.request();

  let query = 'SELECT * FROM "message"';

  if (payload.status) {
    query += ' WHERE status = @statusList';
    instance.input('statusList', payload.status);
  }

  if (payload.teamId) {
    query += payload.status
      ? ' AND teamId = @teamId'
      : ' WHERE teamId = @teamId';
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

// export const postTeam = async ({ name, status }) => {
//   const instance = DataBase.getInstance().data.request();
//   const validNameTeam = await getList({ name: name });

//   if (validNameTeam.rowsAffected[0] === 1) {
//     return {
//       status: 'error',
//       message: 'Nome de equipe já esta cadastrada.',
//     };
//   }
//   const query = `insert into "team" ( name, status )
//   values ( @nameTeam, @statusTeam );`;

//   instance.input('nameTeam', name);
//   instance.input('statusTeam', status);

//   const { rowsAffected } = await instance.query(query);

//   const resultTeam = await getList({ name: name });

//   if (rowsAffected[0] === 1) {
//     return {
//       status: 'success',
//       message: 'Equipe cadastrada com sucesso.',
//       document: resultTeam.document,
//       rowsAffected,
//     };
//   }

//   return {
//     status: 'error',
//     message: 'Erro ao cadastrar equipe',
//     rowsAffected,
//   };
// };
