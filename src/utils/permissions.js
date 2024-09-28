import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

export const getUserPermissions = async () => {
  const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
  if (userDoc.exists()) {
    const { role, year } = userDoc.data();
    if (role === 'docente' || year === '3') {
      return ['global', 'year3', 'year2', 'year1'];
    } else if (year === '2') {
      return ['global', 'year2', 'year1'];
    } else if (year === '1') {
      return ['global', 'year1'];
    }
  }
  return ['global'];
};