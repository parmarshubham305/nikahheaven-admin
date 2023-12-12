import { collection, deleteDoc, doc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../config';
import { C_CONVERSATION, C_MATCH, C_SWIPE_CARDS } from '../constants';

const checkSwipeCardExitForOther = (uid: string, other_uid: string) => {
  return new Promise(async (resolve, reject) => {
    const q = query(collection(db, C_SWIPE_CARDS), where('uid', '==', other_uid), where('other_uid', '==', uid), where('action', 'in', ['like', 'superLike']));
    const q1 = query(collection(db, C_SWIPE_CARDS), where('uid', '==', uid), where('other_uid', '==', other_uid));

    let swipedcards: any = [];

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      data.id = doc.id;
      swipedcards.push(data);
    });

    const querySnapshot1 = await getDocs(q1);
    querySnapshot1.forEach((doc) => {
      let data = doc.data();
      data.id = doc.id;
      swipedcards.push(data);
    });

    if (swipedcards.length > 0) resolve(swipedcards);
    else reject(false);
  });
};

const checkMatchesExit = (uid: string, other_uid: string) => {
  return new Promise((resolve) => {
    const q = query(
      collection(db, C_MATCH),
      where('members', 'in', [
        [uid, other_uid],
        [other_uid, uid],
      ]),
    );

    return onSnapshot(q, (querySnapshot: any) => {
      let matches: any = [];
      querySnapshot.forEach((doc: any) => {
        let matche = doc.data();
        matche.id = doc.id;
        matches.push(matche);
      });
      resolve(matches);
    });
  });
};

const checkConversationExit = (uid: string, other_uid: string) => {
  return new Promise((resolve) => {
    const q = query(
      collection(db, C_CONVERSATION),
      where('members', 'in', [
        [uid, other_uid],
        [other_uid, uid],
      ]),
    );

    return onSnapshot(q, (querySnapshot) => {
      let conversations: any = [];
      querySnapshot.forEach((doc) => {
        let conversation = doc.data();
        conversation.id = doc.id;
        conversations.push(conversation);
      });
      resolve(conversations);
    });
  });
};

const deleteSwipe = (swipe: any) => {
  return new Promise(async (resolve) => {
    await deleteDoc(doc(db, C_SWIPE_CARDS, swipe.id));
    resolve(true);
  });
};

const deleteMatch = async (match: any) => {
  return new Promise(async (resolve) => {
    await deleteDoc(doc(db, C_MATCH, match.id));
    resolve(true);
  });
};

const deleteConversation = async (conversation: any) => {
  return new Promise(async (resolve) => {
    await deleteDoc(doc(db, C_CONVERSATION, conversation.id));
    resolve(true);
  });
};

export const deleteSwipeCard = (uid: string, other_uid: string) => {
  return new Promise((resolve, reject) => {
    checkSwipeCardExitForOther(uid, other_uid)
      .then((response: any) => {
        if (response.length > 1) {
          checkMatchesExit(uid, other_uid).then((matches: any) => {
            if (matches.length > 0) {
              checkConversationExit(uid, other_uid).then((conversations: any) => {
                if (conversations.length > 0) {
                  deleteSwipe(response[1]).then((xy) => {
                    deleteMatch(matches[0]).then((yz) => {
                      deleteConversation(conversations[0]).then((response) => {
                        resolve(response);
                      });
                    });
                  });
                } else {
                  deleteSwipe(response[1]).then((xy) => {
                    deleteMatch(matches[0]).then((response) => {
                      resolve(response);
                    });
                  });
                }
              });
            } else {
              deleteSwipe(response[1]).then((response) => {
                resolve(response);
              });
            }
          });
        } else if (response > 0) {
          deleteSwipe(response[0]).then((response) => {
            resolve(response);
          });
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};


// For Match Delete
export const deleteMatchRecord = (uid:string, other_uid:string) => {
    return new Promise((resolve) => {
        checkMatchesExit(uid, other_uid).then((matches:any) => {
            if (matches?.length > 0) {
                checkConversationExit(uid, other_uid).then((conversations:any) => {
                    if (conversations?.length > 0) {
                        deleteMatch(matches[0]).then((yz:any) => {
                            deleteConversation(conversations[0]).then((response) => {
                                resolve(response);
                            });
                        });
                    } else {
                        deleteMatch(matches[0]).then((yz) => {
                            resolve(yz);
                        });
                    }
                });
            }
        }).catch(err=>resolve(err));
    });
};