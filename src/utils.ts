import uuid from 'react-native-uuid';

export function generateID () {
  return uuid.v4();
}