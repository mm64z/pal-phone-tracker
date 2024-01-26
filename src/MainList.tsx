import React, {FC, ReactElement, useState} from 'react';
import {Button, Keyboard, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View} from 'react-native';
import { ListEntry } from './ListEntry';
import { PalState } from './reducers/types';
import { IdMap, Pal } from './types';
import { useDispatch, useSelector } from 'react-redux';
import { addPal } from './reducers/reducer';

type Parameters = {
  style: StyleSheet.NamedStyles<any>;
}

type State = {
  palList: IdMap<Pal>,
}

export const MainList: FC<Parameters> = ({
  style,
}): ReactElement => {
  const { palList }: State = useSelector(mapStateToProps());
  const dispatch = useDispatch();
  const [data, setData] = useState([{}]);

  function addNewEntry () {
    setData([...data, {}])
    dispatch(addPal({}));
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{padding: 60}}>
        <Text style={{fontSize: 30}}>Track caught Pals</Text>
        {Object.keys(palList).map((id, i) => {
          return <ListEntry id={id} key={i}/>
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

const mapStateToProps = () => {
  return ({PalReducer}: {PalReducer: PalState}): State => {
    return {
      palList: PalReducer.palList,
    }
  }
}

export default MainList;