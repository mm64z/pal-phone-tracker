import { FC, ReactElement, useState } from "react"
import { Pal } from "./types"
import { View, Image, Text, StyleSheet, Modal, Pressable } from "react-native"
import { ID } from "../types";
import { createSelector } from "@reduxjs/toolkit";
import { PalState } from "../CoreState/types";
import { useSelector } from "react-redux";
import { Icon } from "@rneui/themed";
import { AddToTeamDropdown } from "../TeamList/AddToTeamDropdown";


interface Parameters {
  id: ID,
  index: number,
  extra: string,
}

export const PalEntry: FC<Parameters> = ({
  id,
  index,
  extra,
}): ReactElement => {
  const { name, image, aura, craft, extraText } = useSelector(mapStateToProps(id, extra))
  const rowStyle = (index % 2) ? styles.evenRow : styles.oddRow;
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <View style={{...styles.row, ...rowStyle}}>
      <Image
        source={image}
        style={styles.image}
      ></Image>
      <Text
        style={styles.name}
      >{name}</Text>
      <Text 
        style={styles.aura}
      >
        {aura}
      </Text>
      {extra && <Text>
        ({extraText})
        </Text>}
      <View style={styles.craft}>
        {craft ? <Icon
          name="hammer"
          size={30}
          type="material-community"
          aria-label="craft required"
        /> : <></>}
      </View>
      <Pressable style={styles.add} onPress={() => setModalOpen(!modalOpen)}>
        <Icon
          name="add"
          size={30}
          type="material"
          aria-label="add to team">
        </Icon>
      </Pressable>
      <Modal animationType="slide"
        transparent={false}
        visible={modalOpen}
        onRequestClose={() => {
          setModalOpen(!modalOpen);
        }}>
        <AddToTeamDropdown pal={id} success={() => {
          setModalOpen(!modalOpen)
        }}></AddToTeamDropdown>
      </Modal>
    </View>);

}

const selectId = (state, id) => id;
const selectCorePals = ({ core }: { core: PalState }) => core.allPals;
const selectCorePal = createSelector([selectCorePals, selectId], (corePals, id) => corePals[id])
const selectExtra = (state, id, extra) => extra;

function extractInfo (obj, str) {
  return str.split('.').reduce((value, acc) => {
    return value[acc];
  }, obj)
}

const selectPalInfo = createSelector([selectCorePal, selectExtra], 
  (corePal, extra) => {
    return {
      name: corePal.name,
      image: corePal.image,
      aura: corePal.aura.description,
      craft: !!corePal.aura.tech,
      extraText: extra ? extractInfo(corePal, extra) : undefined,
    }
  });

const mapStateToProps = (id: ID, extra: string) => {
  return (state) => selectPalInfo(state, id, extra);
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    padding: 1,
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
    textAlign: 'center',
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
  }
})