import * as fs from 'fs';

export class FileService {
  static async readCSV(file : string) {
    const data = await fs.promises.readFile(file);
    return data;
  }

  static writeCSV(data : string, file : string) {
    fs.writeFile(file, data, (error) => {
      if (error) throw error;
    });
  }
}
