import { FC, ReactElement, useEffect, useRef, useState } from "react"
import { palJson } from "../constants"
import { useDispatch, useSelector } from "react-redux"
import { createSelector } from "@reduxjs/toolkit"
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { GroupList } from "./GroupList"
import { WORK_TYPE, WorkFilterState, WorkType } from "./state/types"
import { PalState } from "../CoreState/types"
import { IdMap, Pal } from "../types"
import { PalEntry } from "./PalEntry"
import { CheckBox, Image } from "@rneui/themed"
import { WorkTogglable } from "./WorkToggable"
import { updateExclusiveFilter } from "./state/reducer"

interface Parameters {

}

export const WorkFilter: FC<Parameters> = ({
}): ReactElement => {
  const { matchingPalIDs, exclusiveFilter } = useSelector(mapStateToProps());
  const dispatch = useDispatch();
  const scrollView = useRef(null);

  function toggleOnlyFilter () {
    dispatch(updateExclusiveFilter({exclusive: !exclusiveFilter}))
  }

  return (
    <View style={styles.overall}>
      <View style={styles.iconList}>
        {Object.values(WORK_TYPE).map((workType, i) => {
          return <WorkTogglable key={i} type={workType}></WorkTogglable>
        })}
        <CheckBox 
          containerStyle={{backgroundColor: 'transparent'}}
          onPress={toggleOnlyFilter} 
          checked={exclusiveFilter}
          title="Only" />
      </View>
      <ScrollView ref={scrollView}>
        {matchingPalIDs.map((id, i) => {
          return <PalEntry key={i} index={i} id={id}></PalEntry>
        })}
      </ScrollView>
    </View>)
}

const selectAllPals = ({ core }: { core: PalState}) => {
  return core.allPals;
}

const selectFilters = ({ work }: { work: WorkFilterState}) => {
  return work.activeFilters;
}

const selectExclusive = ({ work }: { work: WorkFilterState}) => {
  return work.exclusiveFilter;
}

const mapStateToProps = () => {
  return createSelector([
    selectAllPals,
    selectFilters,
    selectExclusive
    ],
    (allPals: IdMap<Pal>, filters: Array<WorkType>, exclusive: boolean) => {
      let somePalsMatch = Object.values(allPals).filter((pal) => {
        return filters.every((filter) => {
          return pal.suitability.some((palWork) => {
            return palWork.type === filter;
          })
        })
      });

      if (exclusive) {
        somePalsMatch = somePalsMatch.filter((pal) => {
          return pal.suitability.every((palWork) => {
            return filters.includes(palWork.type)
          })
        })
      }

      somePalsMatch.sort((palA, palB) => {
        return palA.suitability.length - palB.suitability.length;
      })
      
      return {
        matchingPalIDs: somePalsMatch.map((pal) => pal.id),
        exclusiveFilter: exclusive,
      }
    }
  )
}

const styles = StyleSheet.create({
  overall: {
    backgroundColor: '#eee',
    height: '100%',
  },
  iconList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
})
