import { FC, ReactElement, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createSelector } from "@reduxjs/toolkit"
import { ScrollView, StyleSheet, View } from "react-native"
import { WORK_TYPE, WorkFilterState, WorkType } from "./state/types"
import { PalState } from "../CoreState/types"
import { IdMap, Pal } from "../types"
import { PalEntry } from "./PalEntry"
import { CheckBox } from "@rneui/themed"
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
      <View>
        <View style={styles.iconList}>
          {Object.values(WORK_TYPE).slice(0, Object.values(WORK_TYPE).length/2).map((workType, i) => {
            return <WorkTogglable key={i} work={workType}></WorkTogglable>
          })}
        </View>
        <View style={styles.iconList}>
          {Object.values(WORK_TYPE).slice(Object.values(WORK_TYPE).length/2).map((workType, i) => {
            return <WorkTogglable key={i} work={workType}></WorkTogglable>
          })}
        </View>
        <View>
        <CheckBox 
          containerStyle={{backgroundColor: 'transparent', paddingVertical: 4}}
          onPress={toggleOnlyFilter} 
          checked={exclusiveFilter}
          title="Only" />
        </View>
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
            return palWork.type === filter.type;
          })
        })
      });

      if (exclusive) {
        const filtersType = filters.map(filter => filter.type);
        somePalsMatch = somePalsMatch.filter((pal) => {
          return pal.suitability.every((palWork) => {
            return filtersType.includes(palWork.type)
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
    flexWrap: 'nowrap',
    paddingVertical: 4
  }
})
