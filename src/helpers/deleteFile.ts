import fs from 'fs';
import { join } from 'path';
import { serverVars } from '../config';

const deleteFile = async (fileName: string): Promise<void> => {
  await fs.promises.unlink(
    join(
      __dirname,
      '..',
      '..',
      serverVars.NODE_ENV === 'production'
        ? './uploads/'
        : './uploads-development/',
      fileName,
    ),
  );
};

export default deleteFile;
