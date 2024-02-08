import { FC, ReactElement, useState } from "react"
import { Pal } from "./types"
import { View, Image, Text, StyleSheet, Modal, Pressable } from "react-native"
import { ID } from "../types";
import { createSelector } from "@reduxjs/toolkit";
import { PalState } from "../CoreState/types";
import { useSelector } from "react-redux";
import { Icon } from "@rneui/themed";
import { AddToTeamDropdown } from "../TeamList/AddToTeamDropdown";
import { ImageNumber } from "./ImageNumber";
import { hungerImage, workImages } from "../../public/work-images";


interface Parameters {
  id: ID,
  index: number,
}

export const PalEntry: FC<Parameters> = ({
  id,
  index,
}): ReactElement => {
  const { name, image, hunger, suitability } = useSelector(mapStateToProps(id))
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
      {suitability.map((work, i) => {
        return <ImageNumber key={i} image={workImages[work.type]} level={work.level}></ImageNumber>
      })}

      <View style={styles.hunger}>
        <ImageNumber image={hungerImage} level={hunger}/>
      </View>
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
      hunger: corePal.food,
      suitability: corePal.suitability,
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
  aura: {
    flex: 6,
  },
  craft: {
    flex: 1,
    paddingRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  add: {
    flex: 1,
    paddingRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hunger: {
    justifyContent: 'center',
    paddingRight: 5,
    // borderLeftWidth: 1,
    paddingLeft: 6,
  },
})