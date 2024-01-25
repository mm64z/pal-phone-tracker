import React, {FC, ReactElement, useState} from 'react';
import {Button, Keyboard, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View} from 'react-native';
import { ListEntry } from './ListEntry';

type Parameters = {
  style: StyleSheet.NamedStyles<any>;
}

export const MainList: FC<Parameters> = ({
  style,
}): ReactElement => {
  const [data, setData] = useState([{}]);

  function addNewEntry () {
    setData([...data, {}])
  }


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{padding: 60}}>
        <Text style={{fontSize: 30}}>Track caught Pals</Text>
        {data.map((datum, i) => {
          return <ListEntry key={i}/>
        })}
        
        <Button
          onPress={addNewEntry}
          title="Add Entry"
          accessibilityLabel="Add a new tracking entry"
        />

      </View>
    </TouchableWithoutFeedback>
  );
};

export default MainList;