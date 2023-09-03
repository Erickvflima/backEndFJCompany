import mssql from 'mssql';
import configDb from '../settings/dbSettings.js';
import sleep from '../helper/sleep.js';

class DataBase {
  constructor() {
    this.data = null;
    this.connect();
  }

  async connect() {
    try {
      this.data = await mssql.connect(configDb);
      console.log('Database is connected');
    } catch (error) {
      console.error(error);
      console.error('Error connecting to SQL Server');
      console.error('Retrying in 20 seconds');
      await sleep(20000);
      await this.connect();
    }
  }

  static getInstance() {
    if (!DataBase.instance) {
      console.log('Creating a new instance');
      DataBase.instance = new DataBase();
    }
    return DataBase.instance;
  }
}

export default DataBase;
