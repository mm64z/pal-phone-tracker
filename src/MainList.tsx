import React, { FC, ReactElement, useState } from 'react';
import { Button, Keyboard, Pressable, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
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
    <Pressable onPress={Keyboard.dismiss} accessible={false}>
      <View style={{paddingVertical: 60, marginHorizontal: 30}}>
        <Text style={{fontSize: 30}}>Track caught Pals</Text>
        <Pressable
          style={styles.addButton}
          onPress={addNewEntry}
          aria-label="Add a new tracking entry"
        >
          <Text>Add Entry</Text>
        </Pressable>
        <ScrollView>
          {Object.keys(palList).map((id, i) => {
            return <ListEntry id={id} key={i}/>
          })}
        </ScrollView>
        

      </View>
    </Pressable>
  );
};

const mapStateToProps = () => {
  return ({PalReducer}: {PalReducer: PalState}): State => {
    return {
      palList: PalReducer.palList,
    }
  }
}

const styles = {
  addButton: {
    backgroundColor: '#2196F3',
    alignItems: 'center' as const,
    paddingVertical: 5,
  }
}

export default MainList;