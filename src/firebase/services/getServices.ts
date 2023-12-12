import { db, auth } from '../config';
import {
  collection,
  query,
  where,
  getDocs,
  getCountFromServer,
} from 'firebase/firestore';
import { getLocalUser } from '../../utils/localStorage';
import { localKeys } from '../../constants/localStorage';

const user = getLocalUser(localKeys.AUTH);

// GET
