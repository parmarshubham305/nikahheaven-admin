import { query, collection, where, orderBy, limit } from 'firebase/firestore';
import { db } from './config';
import { firebaseDataType } from '../constants/other';

// Firebase Operators
export const firebaseQueryOperators = {
  LESS_THAN: '<',
  LESS_THAN_EQUAL_TO: '<=',
  EQUAL_TO: '==',
  GREATER_THAN: '>',
  GREATER_THAN_EQUAL_TO: '>=',
  NOT_EQUAL_TO: '!=',
  ARRAY_CONTAINS: 'array-contains',
  ARRAY_CONTAINS_ANY: 'array-contains-any',
  IN: 'in',
  NOT_IN: 'not-in',
};

export const DEFAULT_DATA_LIMIT=100;

export const firebaseQueryBuilder = (dataType: string | any, collectionName: string, userId: string | number, orderByObj: any = null, dataLimit:number=DEFAULT_DATA_LIMIT) => {
  switch (dataType) {
    case firebaseDataType.METADATA:
      return query(collection(db, collectionName), (orderByObj && orderBy(orderByObj?.property, orderByObj?.value)) || null, limit(dataLimit));
    case firebaseDataType.STUDENT_DATA:
      return query(collection(db, collectionName), where('createdBy', '==', userId), where('deleteDocument', '==', false));
    default:
      return;
  }
};
