import { FC, ReactElement, useEffect, useRef } from "react"
import { FilteredGroup, sorter } from "./grouper"
import { palJson } from "../constants"
import { useDispatch, useSelector } from "react-redux"
import { populateFilteredAuras } from "./state/reducer"
import { PassiveGroupState } from "./state/types"
import { createSelector } from "@reduxjs/toolkit"
import { ScrollView } from "react-native"
import { GroupList } from "./GroupList"

interface Parameters {

}

export const PassiveGroups: FC<Parameters> = ({
}): ReactElement => {
  const groups = useSelector(mapStateToProps());
  const dispatch = useDispatch();
  const scrollView = useRef(null);

  useEffect(() => {
    dispatch(populateFilteredAuras({filteredGroups: sorter(palJson)}));
  },[])

  return (
  <ScrollView ref={scrollView}>
    {groups.map((i) => {
      return <GroupList key={i} index={i} scrollView={scrollView}></GroupList>
    })}
  </ScrollView>)
}

const selectGroupedAuras = ({ aura }: { aura: PassiveGroupState}) => {
  return aura.filteredGroups;
}

const mapStateToProps = () => {
  return createSelector([
    selectGroupedAuras,
    ],
    (filteredGroups: Array<FilteredGroup>) => {
      return filteredGroups.map((group, i) => i)  
    }
  )
}
