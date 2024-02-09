import React, { FC, ReactElement } from 'react';
import { Keyboard, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { ID, IdMap, Pal } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { SearchBar } from '@rneui/themed';
import { PalState } from '../CoreState/types';
import { DropsSearcherState } from './state/types';
import { updateSearch } from './state/reducer';
import { PalEntry } from './PalEntry';

type Parameters = {
  // style: StyleSheet.NamedStyles<any>;
}

type State = {
  palList: Array<ID>,
}

export const DropsSearcher: FC<Parameters> = ({
}): ReactElement => {
  const { palList }: State = useSelector(mapStateToProps());
  const searchText: string = useSelector(selectSearchText);
  const dispatch = useDispatch();

  function setSearchText (text: string) {
    dispatch(updateSearch({text}));
  }

  return (
    // <Pressable style={styles.overall} onPress={Keyboard.dismiss} accessible={false}>
    <Pressable style={styles.overall} accessible={false}>
        <Text style={{fontSize: 30}}>Search Drops</Text>
        <View style={{flexDirection: 'row'}}>
          <SearchBar 
            containerStyle={styles.searchBar}
            placeholder="Type Here..."
            onChangeText={setSearchText}
            value={searchText}>
          </SearchBar>
        </View>
        <ScrollView>
          {palList.map((id, i) => {
            return <PalEntry id={id} key={i} index={i}/>
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
      if (searchText === "") {
        return {palList: []}
      } else {
        const regex = new RegExp(searchText, 'i');
        const palList = Object.values(allPals).filter((pal) => {
          return pal.drops.some((drop) => {
            return regex.exec(drop)
          })
        }).map((pal) => pal.id)
        return { palList: palList };
      }
  })
}

const selectAllPals = ({ core }: { core: PalState}) => {
  return core.allPals;
}

const selectSearchText = ({ drops }: { drops: DropsSearcherState}) => {
  return drops.searchText;
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
}
