import { FC, ReactElement, Ref, useState } from "react"
import { PassiveGroupState } from "./state/types";
import { createSelector } from "@reduxjs/toolkit";
import { FilteredGroup } from "./grouper";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
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
    <Pressable style={styles.rowHeader}
        onPress={selected}>
      <Text 
        style={styles.headerText}
        >{group}
      </Text>
      {expanded ? <Icon
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
    </Pressable>
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
    padding: 10,
    fontSize: 20,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    textAlign: 'center',
    fontSize: 20,
  },
  row: {
    flexDirection: 'row',

  },
})