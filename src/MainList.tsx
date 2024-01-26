import React, { FC, ReactElement, useState } from 'react';
import { Button, Keyboard, Pressable, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { ListEntry } from './ListEntry';
import { PalState } from './reducers/types';
import { ID, IdMap, Pal } from './types';
import { useDispatch, useSelector } from 'react-redux';
import { addPal, updateSearch } from './reducers/reducer';
import { createSelector } from '@reduxjs/toolkit';
import { SearchBar } from '@rneui/themed';

type Parameters = {
  style: StyleSheet.NamedStyles<any>;
}

type State = {
  palList: Array<ID>,
}

export const MainList: FC<Parameters> = ({
  style,
}): ReactElement => {
  const { palList }: State = useSelector(mapStateToProps());
  const searchText: string = useSelector(selectSearchText);
  const dispatch = useDispatch();
  const [data, setData] = useState([{}]);

  function addNewEntry () {
    setData([...data, {}])
    dispatch(addPal({}));
  }

  function setSearchText (text: string) {
    dispatch(updateSearch({text}));
  }

  return (
    <Pressable style={{width:'100%', height: '80%'}} onPress={Keyboard.dismiss} accessible={false}>
      <View style={{paddingVertical: 20, paddingHorizontal: 20, backgroundColor: '#ddd', width:'100%'}}>
        <Text style={{fontSize: 30}}>Track caught Pals</Text>
        <View style={{flexDirection: 'row'}}>
          <SearchBar containerStyle={styles.searchBar}
            placeholder="Type Here..."
            onChangeText={setSearchText}
            value={searchText}>
          </SearchBar>
          <Pressable
            style={styles.addButton}
            onPress={addNewEntry}
            aria-label="Add a new tracking entry"
          >
            <Text>Add Entry</Text>
          </Pressable>
        </View>
        <ScrollView>
          {palList.map((id, i) => {
            return <ListEntry id={id} key={i}/>
          })}
        </ScrollView>
        

      </View>
    </Pressable>
  );
};

const mapStateToProps = () => {
  return createSelector([
      selectAllPals,
      selectSearchText
    ],
    (allPals: IdMap<Pal>, searchText: string) => {
      return {
        palList: Object.values(allPals).filter((pal: Pal) => {
          return (pal.name.toLowerCase().includes(searchText.toLowerCase()));
        }).map ((pal) => pal.id)
      }
  })
}

const selectAllPals = ({pal}: {pal: PalState}) => {
  return pal.allPals;
}

const selectSearchText = ({pal}: {pal: PalState}) => {
  return pal.searchText;
}

const styles = {
  searchBar: {
    flex: 2,
    borderRadius: 10,
    margin: 2,
  },
  addButton: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#2196F3',
    alignItems: 'center' as const,
    justifyContent: 'center',
    paddingVertical: 5,
    borderRadius: 10,
    margin: 2,
  }
}

export default MainList;