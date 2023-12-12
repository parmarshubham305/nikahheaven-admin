import { auth, db } from '../config';
import { doc, increment, updateDoc } from 'firebase/firestore';
import { getLocalUser } from '../../utils/localStorage';
import { localKeys } from '@/constants/localStorage';

const user = getLocalUser(localKeys.AUTH);
