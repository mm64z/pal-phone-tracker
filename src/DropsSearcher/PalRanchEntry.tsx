import { FC, ReactElement } from "react"
import { View, Image, Text, StyleSheet } from "react-native"
import { ID } from "../types";
import { createSelector } from "@reduxjs/toolkit";
import { PalState } from "../CoreState/types";
import { useSelector } from "react-redux";
import { extractRanchSentence } from "./utils";


interface Parameters {
  id: ID,
  index: number,
}

export const PalRanchEntry: FC<Parameters> = ({
  id,
  index,
}): ReactElement => {
  const { name, image, aura} = useSelector(mapStateToProps(id))
  const rowStyle = (index % 2) ? styles.evenRow : styles.oddRow;

  return (
    <View style={{...styles.row, ...rowStyle}}>
      <Image
        source={image}
        style={styles.image}
      ></Image>
      <Text
        style={styles.name}
      >{name}</Text>
      <Text style={styles.text}>
        {aura}
      </Text>
    </View>);

}

const selectId = (state, id) => id;
const selectCorePals = ({ core }: { core: PalState }) => core.allPals;
const selectCorePal = createSelector([selectCorePals, selectId], (corePals, id) => corePals[id])

const selectPalInfo = createSelector([selectCorePal], 
  (corePal) => {
    return {
      name: corePal.name,
      image: corePal.image,
      aura: extractRanchSentence(corePal.aura.description),
    }
  });

const mapStateToProps = (id: ID) => {
  return (state) => selectPalInfo(state, id);
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    padding: 1,
    alignItems: 'center',
  },
  evenRow: {
    backgroundColor: '#DADADA',
  },
  oddRow: {

  },
  image: {
    width: 50,
    height: 50,
  },
  name: {
    flex: 2,
    padding: 5,
    textAlign: 'left',
    paddingLeft: 10,
  },
  text: {
    textTransform: 'capitalize',
    paddingRight: 10,
  }
})