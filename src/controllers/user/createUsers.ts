import { NextFunction, Request, Response } from 'express';
import CSVtoJSON from 'csvtojson';
import { StatusCodes } from 'http-status-codes';
import { Readable } from 'stream';
import { SuccessMessages } from '../../enums';
import { ResponseShape, UserShape } from '../../interfaces';
import {
  addNewEmployees,
  addNewUsers,
  getCompanyById,
  getUserFromMultipleEmails,
} from '../../services';
import { deleteFile } from '../../helpers';
import { awsVars, serverVars } from '../../config';
import awsS3 from '../../services/aws';

const createUsers = async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<Response<ResponseShape> | unknown> => {
  const {
    file,
    params: { id },
  } = request;
  try {
    await getCompanyById(+id);

    let arrayOfUsers: Array<UserShape> = [];
    if (serverVars.NODE_ENV === 'production') {
      const fileKey = await awsS3.listObjects({
        Bucket: awsVars.AWS_SYRONAHEALTH_UPLOAD_BUCKET,
      });
      const params = {
        Bucket: awsVars.AWS_SYRONAHEALTH_UPLOAD_BUCKET,
        Key:
          fileKey?.Contents
          // eslint-disable-next-line no-unsafe-optional-chaining
          && fileKey?.Contents[fileKey.Contents?.length - 1].Key,
      };

      const objectResponse = await awsS3.getObject(params);

      const stream = objectResponse.Body;

      if (stream instanceof Readable) {
        arrayOfUsers = await CSVtoJSON().fromStream(stream);
      }
    } else {
      arrayOfUsers = await CSVtoJSON().fromFile(file?.path as string);
    }

    const arrayOfEmails: Array<string> = arrayOfUsers.map(
      (user) => user.email as string,
    );

    const existingUsers = await getUserFromMultipleEmails(arrayOfEmails);

    if (existingUsers.length !== 0) {
      await deleteFile(
        serverVars.NODE_ENV === 'development' ? (file?.filename as string) : '',
      );

      return response.status(StatusCodes.BAD_REQUEST).json({
        status: 'Uploading unsuccessful',
        issues: existingUsers.length,
        problemIn: existingUsers.map(
          (user, idx) => `${user.email} is already a user (Line ${idx + 2}, Row ${
            Object.keys(arrayOfUsers[0]).indexOf('email') + 1
          })`,
        ),
      });
    }

    const users = await addNewUsers(arrayOfUsers);

    const arrayOfUsersIdsAndCompanyId: Array<{
      userId: number;
      companyId: number;
    }> = users.map((user) => ({ userId: user?.id as number, companyId: +id }));

    await addNewEmployees(arrayOfUsersIdsAndCompanyId);

    return response.json({
      message: SuccessMessages.SUCCESS,
      status: 'Uploading successful',
      users: arrayOfUsers.length,
    });
  } catch (error) {
    await deleteFile(
      serverVars.NODE_ENV === 'development' ? (file?.filename as string) : '',
    );
    return next(error);
  }
};

export default createUsers;
