import getMessageAdvice from '.././../services/adviceslip/index.js';
import DataBase from '../../dataBase/index.js';
import { postText } from '../../services/translate/index.js';

export const getList = async payload => {
  const instance = DataBase.getInstance().data.request();

  let query = `
  SELECT *FROM "message" `;

  if (payload.status) {
    query += ' WHERE message.status = @statusList';
    instance.input('statusList', payload.status);
  }

  if (payload.teamId) {
    query += payload.status
      ? ' AND message.teamId = @teamId'
      : ' WHERE message.teamId = @teamId';
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

export const randomMessage = async payload => {
  const instance = DataBase.getInstance().data.request();
  const queryCountSelect = ` SELECT count(*) as count FROM "logRandomMessage" where userId = @userId and createdAt = @dateRequest;`;

  instance.input('dateRequest', payload.date);
  instance.input('userId', payload.id);

  const resultCount = await instance.query(queryCountSelect);

  if (resultCount.recordset[0].count > 3) {
    return {
      status: 'success',
      message: 'quantidade de menssagens por dia ja esgotado.',
      rowsAffected: resultCount.recordset[0].count,
    };
  } else {
    let retryCount = 0;
    const maxRetries = 8;
    while (retryCount < maxRetries) {
      const resultMessage = await getMessageAdvice();

      const querySelect = ` SELECT "messageId" FROM "logRandomMessage" 
      where messageId = @idRandon and createdAt = @dateRequest and userId = @userId;`;
      instance.input('idRandon', resultMessage.idRandom);
      const resultSelect = await instance.query(querySelect);

      if (resultSelect.rowsAffected[0] === 0) {
        const queryInsert = `Insert into "logRandomMessage" ("userId", "messageId", "createdAt" )
        values ( @userId, @messageId, @dateRequest );`;
        instance.input('messageId', resultMessage.idRandom);

        const resultInsert = await instance.query(queryInsert);
        if (resultInsert.rowsAffected[0] === 1) {
          const returnTranslte = await postText(resultMessage.messageRandom);
          return {
            status: 'success',
            message: 'Mensagem buscada com sucesso',
            document: {
              ptBr: returnTranslte,
              en: resultMessage.messageRandom,
            },
          };
        }
      }
      retryCount++;
    }
  }

  return {
    status: 'error',
    message: 'Erro ao gerar mensagem da sorte.',
  };
};
