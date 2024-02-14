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
import { PassiveGroupState } from '../PassiveGrouper/state/types';
import { PalRanchEntry } from './PalRanchEntry';
import { extractLastSentence, extractRanchSentence } from './utils';

type Parameters = {
  // style: StyleSheet.NamedStyles<any>;
}

type State = {
  palList: Array<ID>,
  ranchPals: Array<ID>,
}

export const DropsSearcher: FC<Parameters> = ({
}): ReactElement => {
  const { palList, ranchPals }: State = useSelector(mapStateToProps());
  const searchText: string = useSelector(selectSearchText);
  const dispatch = useDispatch();

  function setSearchText (text: string) {
    dispatch(updateSearch({text}));
  }

  return (
    // <Pressable style={styles.overall} onPress={Keyboard.dismiss} accessible={false}>
    <View style={styles.overall} accessible={false}>
      <Text style={{fontSize: 30}}>Search for Materials</Text>
      <View style={{flexDirection: 'row'}}>
        <SearchBar 
          containerStyle={styles.searchBar}
          placeholder="Type here..."
          onChangeText={setSearchText}
          value={searchText}>
        </SearchBar>
      </View>
      <ScrollView>
        {ranchPals.length > 0 ? <Text style={styles.titleBar}>Ranch</Text> : <></>}
        {ranchPals.map((id, i) => {
          return <PalRanchEntry id={id} key={i} index={i}/>
        })}
        {palList.length > 0 ? <Text style={styles.titleBar}>Dropped</Text> : <></>}
        {palList.map((id, i) => {
          return <PalEntry id={id} key={i} index={i}/>
        })}
      </ScrollView>
    </View>
  );
};

const mapStateToProps = () => {
  return createSelector([
      selectAllPals,
      selectSearchText,
      selectRanchPals,
    ],
    (allPals: IdMap<Pal>, searchText: string, allRanchPals: Array<ID>) => {
      if (searchText === "") {
        return {palList: [], ranchPals: []}
      } else {
        const regex = new RegExp(searchText, 'i');
        const palList = Object.values(allPals).filter((pal) => {
          return pal.drops.some((drop) => {
            return regex.exec(drop)
          })
        }).map((pal) => pal.id)

        const ranchPals = allRanchPals.filter((id) => {
          return regex.exec(extractRanchSentence(allPals[id].aura.description));
        })
        return { palList: palList, ranchPals: ranchPals };
      }
  })
}

const selectAllPals = ({ core }: { core: PalState}) => {
  return core.allPals;
}

const selectSearchText = ({ drops }: { drops: DropsSearcherState}) => {
  return drops.searchText;
}

const selectRanchPals = ({ aura }: { aura: PassiveGroupState}) => {
  // hmmm
  return aura.filteredGroups.filter((group) => group.group === "Ranch")[0]?.matchingPals;
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
  titleBar: {
    backgroundColor: '#aaa',
    fontSize: 16,
    padding: 6
  }
}
