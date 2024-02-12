import React, { FC, ReactElement, useEffect, useRef, useState } from 'react';
import { Platform, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ListEntry } from './ListEntry';
import { IdMap, Pal } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { addTimer, updateSearch, updateTimers } from './state/reducer';
import { createSelector } from '@reduxjs/toolkit';
import { BossTimerState, PalTimer } from './state/types';
import { PalState } from '../CoreState/types';
import Autocomplete from 'react-native-autocomplete-input';

type Parameters = {
  // style: StyleSheet.NamedStyles<any>;
}

type State = {
  palList: Array<{id: string, title: string}>,
  timers: Array<string>,
  searchText: string,
}

export const BossTimer: FC<Parameters> = ({
}): ReactElement => {
  const { palList, timers, searchText }: State = useSelector(mapStateToProps());
  const dispatch = useDispatch();

  function setSelectedItem(id: string) {
    if (id) {
      dispatch(addTimer({
        pal: parseInt(id),
        startTime: 60*60*1000, //1 hour
      }))
      dispatch(updateSearch({text: ''}))
    }
  }

  function setQuery(text: string) {
    dispatch(updateSearch({text: text}));
  }

  useEffect(() => {
    setInterval(() => {
      dispatch(updateTimers({}))
    }, 1000)
  }, [])

  return (
    // <Pressable style={styles.overall} onPress={Keyboard.dismiss} accessible={false}>
    <View style={styles.container} accessible={false}>
      <Text style={{fontSize: 30}}>Track respawn Timers</Text>
      <View style={styles.autocompleteContainer}>
        <Autocomplete 
          autoCorrect={false}
          data={palList}
          value={searchText}
          onChangeText={setQuery}
          placeholder={"Type a pal's name"}
          flatListProps={{
            keyExtractor: (pal: {id: string, title: string}) => pal.title,
            renderItem: ({ item }) => <Pressable onPress={() => setSelectedItem(item.id)}>
              <Text style={styles.itemText}>{item.title}</Text>
            </Pressable>,
          }} />
      </View>
      <ScrollView>
        {timers.map((id, i) => {
          return <ListEntry id={parseInt(id)} key={i}/>
        })}
      </ScrollView>
    </View>
  );
};

const mapStateToProps = () => {
  return createSelector([
      selectAllPals,
      selectBossTimers,
      selectSearchText,
    ],
    (allPals: IdMap<Pal>, timers: IdMap<PalTimer>, searchText: string ) => {
      const filteredList = (searchText === '') ? [] : 
        Object.values(allPals).filter((pal: Pal) => (pal.name.toLowerCase().includes(searchText.toLowerCase())));
      return {
        palList: filteredList.map((pal) => {
          return {
           id: pal.id.toString(),
           title: pal.name,
        }}),
        timers: Object.keys(timers),
        searchText: searchText,
      }
  })
}

const selectAllPals = ({ core }: { core: PalState}) => {
  return core.allPals;
}

const selectBossTimers = ({ timer }: { timer: BossTimerState}) => {
  return timer.timers;
}

const selectSearchText = ({ timer }: { timer: BossTimerState}) => {
  return timer.searchText;
}

const styles = {
  overall: {
  },
  saveView: {
    flex: 1,
  },
  container: {
    height: '100%',
    position: 'relative',
    backgroundColor: '#eee',
    flex: 1,

    // Android requiers padding to avoid overlapping
    // with content and autocomplete
    paddingTop: 50,

    // Make space for the default top bar
    ...Platform.select({
      android: {
        marginTop: 25,
      },
      default: {
        marginTop: 0,
      },
    }),
  },
  itemText: {
    fontSize: 15,
    margin: 2,
  },
  descriptionContainer: {
    // `backgroundColor` needs to be set otherwise the
    // autocomplete input will disappear on text input.
    backgroundColor: '#F5FCFF',
    marginTop: 8,
  },
  infoText: {
    textAlign: 'center',
  },
  autocompleteContainer: {
    // Hack required to make the autocomplete
    // work on Andrdoid
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
    padding: 5,
  },
}
