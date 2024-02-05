import React, { FC, ReactElement } from 'react';
import { Keyboard, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ListEntry } from '../CaughtList/ListEntry';
import { ID, IdMap, Pal } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { updateSearch } from '../CaughtList/reducers/reducer';
import { createSelector } from '@reduxjs/toolkit';
import { SearchBar } from '@rneui/themed';
import { CaughtPalState } from '../CaughtList/reducers/types';
import { PalState } from '../CoreState/types';
import { ChoosePalEntry } from './ChoosePalEntry';

type Parameters = {
  // style: StyleSheet.NamedStyles<any>;
  success: Function,
}

type State = {
  palList: Array<ID>,
}

export const ChoosePalList: FC<Parameters> = ({
  success,
}): ReactElement => {
  const { palList }: State = useSelector(mapStateToProps());
  const searchText: string = useSelector(selectSearchText);
  const dispatch = useDispatch();

  function setSearchText (text: string) {
    dispatch(updateSearch({text}));
  }

  return (
    <Pressable style={styles.overall} onPress={Keyboard.dismiss} accessible={false}>
        <Text style={{fontSize: 30}}>Pick a Pal to Add</Text>
        <View style={{flexDirection: 'row'}}>
          <SearchBar containerStyle={styles.searchBar}
            placeholder="Type Here..."
            onChangeText={setSearchText}
            value={searchText}>
          </SearchBar>
        </View>
        <ScrollView>
          {palList.map((id, i) => {
            return <ChoosePalEntry id={id} key={i} success={success}/>
          })}
        </ScrollView>
    </Pressable>
  );
};

const mapStateToProps = () => {
  return createSelector([
      selectAllPals,
      selectSearchText
    ],
    (allPals: IdMap<Pal>, searchText: string) => {
      const filteredList = (searchText === '') ? Object.values(allPals) : 
        Object.values(allPals).filter((pal: Pal) => (pal.name.toLowerCase().includes(searchText.toLowerCase())));
      return {
        palList: filteredList.map ((pal) => pal.id)
      }
  })
}

const selectAllPals = ({ core }: { core: PalState}) => {
  return core.allPals;
}

const selectSearchText = ({ caught }: { caught: CaughtPalState}) => {
  return caught.searchText;
}

const styles = {
  overall: {
    backgroundColor: '#eee',
    height: '100%',
  },
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
