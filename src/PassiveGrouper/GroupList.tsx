import { FC, ReactElement, useState } from "react"
import { PassiveGroupState } from "./state/types";
import { createSelector } from "@reduxjs/toolkit";
import { FilteredGroup } from "./grouper";
import { Image, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { Pal } from "./types";
import { PalEntry } from "./PalEntry";

interface Parameters {
  index: number,
}

export const GroupList: FC<Parameters> = ({
  index,
}): ReactElement => {
  const [expanded, setExpanded] = useState(false);
  const {group, matchingPals} = useSelector(mapStateToProps(index));

  return (<View style={styles.overall}>
    <Text 
      onPress={() => setExpanded(!expanded)}
      style={styles.rowHeader}
      >{group}
    </Text>
    {expanded &&
    matchingPals.map((pal: Pal) => {
      return (
      <PalEntry pal={pal}></PalEntry>)
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