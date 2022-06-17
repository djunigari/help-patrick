import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp(functions.config().firebase);

import * as postFunctions from './post';
import * as userFunctions from './user';
import * as facebookFunctions from './facebook'

module.exports = {
    ...postFunctions,
    ...userFunctions,
    ...facebookFunctions
};