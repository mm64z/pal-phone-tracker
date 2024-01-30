import { FC, ReactElement, Ref, useState } from "react"
import { PassiveGroupState } from "./state/types";
import { createSelector } from "@reduxjs/toolkit";
import { FilteredGroup } from "./grouper";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { Pal } from "./types";
import { PalEntry } from "./PalEntry";
import { ID } from "../types";
import { Icon } from "@rneui/base";

interface Parameters {
  index: number,
  scrollView: Ref<ScrollView>,
}

export const GroupList: FC<Parameters> = ({
  index,
  scrollView,
}): ReactElement => {
  const [expanded, setExpanded] = useState(false);
  const {group, matchingPals} = useSelector(mapStateToProps(index));

  function selected () {
    setExpanded(!expanded);
    // scrollView.current.scrollTo()
  }

  const iconSize = 20;
  return (<View style={styles.overall}>
    <Text 
      onPress={selected}
      style={styles.rowHeader}
      >{group} {expanded ? <Icon
        name="menu-up"
        size={iconSize}
        type="material-community"
        aria-label="close"
      /> : <Icon
      name="menu-down"
      size={iconSize}
      type="material-community"
      aria-label="open"
    />}
    </Text>
    {expanded &&
    matchingPals.map((palId: ID, index) => {
      return (
      <PalEntry id={palId} index={index} key={index}></PalEntry>)
    })}
  </View>)
}

const selectGroupedAuras = ({ aura }: { aura: PassiveGroupState}) => {
  return aura.filteredGroups;
}

const mapStateToProps = (index: number) => {
  return createSelector([
      selectGroupedAuras,
    ],
    (filteredGroups: Array<FilteredGroup>) => filteredGroups[index]
  )
}

const styles = StyleSheet.create({
  overall: {
    borderTopWidth: 2,
  },
  rowHeader: {
    textAlign: 'center',
    padding: 10,
    fontSize: 20,
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: 'row',

  },
})