import { collection, limit, onSnapshot, orderBy, query, where } from 'firebase/firestore';

import { localKeys } from '../../constants/localStorage';
import { getLocalUser } from '../../utils/localStorage';
import { auth, db } from '../config';
import { DEFAULT_DATA_LIMIT, firebaseQueryBuilder } from '../queryBuilder';

const user: any = getLocalUser(localKeys.AUTH);
// const studentStore = useStudentStore();
// Master Listener

// Array of Objects : e.g [{property:'deleteDocument',operator : firebaseQueryOperators.EQUAL_TO , false}]
// property : name of field
// operator : firebase query operator (added as firebaseQueryOperators)
// value : value of field

export const listenCollectionData = (
  collectionName: string,
  callback: any,
  dataType: string,
  queryList: any = null,
  orderByObj: any = null,
  dataLimit: number = DEFAULT_DATA_LIMIT,
) => {
  const dataBaseQuery = queryList ? queryList.map(({ property, operator, value }: any) => where(property, operator, value)) : null;
  const listenCollectionQuery: any = dataBaseQuery
    ? query(collection(db, collectionName), ...dataBaseQuery, orderByObj ? orderBy(orderByObj?.property, orderByObj?.value) : orderBy('email', 'desc'), limit(dataLimit))
    : firebaseQueryBuilder(dataType, collectionName, auth?.currentUser?.uid || user?.uid, orderByObj);

  return onSnapshot(listenCollectionQuery, (querySnapshot: any) => {
    const data: any = [];
    querySnapshot.forEach((doc: any) => data.push(doc.data()));
    callback(data);
  });
};
