import { collection, getCountFromServer, query, where } from 'firebase/firestore';
import { db } from '../config';
import { C_USERS } from '../constants';

export const getAllDataCount = async (collectionName: string = C_USERS, queryList: any = null, qData: any = null) => {
  const nullQuery =
    (queryList && queryList.find((query: any) => query.value === undefined || query.value === null)) || collectionName.includes('undefined') || collectionName === '';

  try {
    const dataBaseQuery = !nullQuery && queryList ? queryList.map(({ property, operator, value }: any) => where(property, operator, value)) : null;
    const listenCollectionQuery: any = dataBaseQuery ? query(collection(db, collectionName), ...dataBaseQuery) : query(collection(db, collectionName));
    const snapshot = await getCountFromServer(listenCollectionQuery);
    return snapshot.data();
  } catch (error) {
    return error;
  }
};
