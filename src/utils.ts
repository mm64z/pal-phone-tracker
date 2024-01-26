import uuid from 'react-native-uuid';

export function generateID (): string {
  return uuid.v4().toString();
}