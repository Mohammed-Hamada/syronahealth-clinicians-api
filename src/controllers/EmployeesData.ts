import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { SuccessMessages } from '../enums';
import CustomError from '../helpers';
import { validateParam } from '../helpers/validation';
import { ResponseShape, ValidateParams } from '../interfaces';

import data from '../samples/dummyDashboard.json';

/**
 * This controller used to send the employees data to the
 */
const employeesData = async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<Response<ResponseShape> | unknown> => {
  try {
    const { query } = request;
    const validParam = await validateParam(query as ValidateParams);

    if (validParam.q === 'top_features_used') {
      const { top_features_used: topFeaturesUsed } = data;
      return response.json({
        message: SuccessMessages.SUCCESS,
        data: topFeaturesUsed,
      });
    }
    if (validParam.q === 'top_topics_of_interest') {
      const { top_topics_of_interest: topTopicsOfInterest } = data;
      return response.json({
        message: SuccessMessages.SUCCESS,
        data: topTopicsOfInterest,
      });
    }
    if (validParam.q === 'health_conditions') {
      const { health_conditions: healthConditions } = data;
      return response.json({
        message: SuccessMessages.SUCCESS,
        data: healthConditions,
      });
    }
    if (validParam.q === 'gender') {
      const { gender } = data;
      return response.json({
        message: SuccessMessages.SUCCESS,
        data: gender,
      });
    }
    throw new Error();
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'ValidationError') {
        return next(new CustomError(error.message, StatusCodes.BAD_REQUEST));
      }
    }
    return next(error);
  }
};

export default employeesData;
