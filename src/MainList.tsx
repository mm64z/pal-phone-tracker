import React, {FC, ReactElement, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

type Parameters = {
  style: StyleSheet.NamedStyles<any>;
}

export const MainList: FC<Parameters> = ({
  style,
}): ReactElement => {
  const [text, setText] = useState('');
  return (
    <View style={{padding: 10}}>
      <TextInput
        style={{height: 40}}
        placeholder="Type here to translate!"
        onChangeText={newText => setText(newText)}
        defaultValue={text}
      />
      <Text style={{padding: 10, fontSize: 42}}>
        {text}
      </Text>
    </View>
  );
};

export default MainList;