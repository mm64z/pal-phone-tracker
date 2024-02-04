import { FC, ReactElement } from "react"
import { Pal } from "../PassiveGrouper/types"
import { View, Image, Text, StyleSheet, Pressable } from "react-native"
import { ID } from "../types";
import { createSelector } from "@reduxjs/toolkit";
import { PalState } from "../CoreState/types";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@rneui/themed";
import { deleteFromTeam } from "./state/reducer";


interface Parameters {
  id: ID,
  index: number,
  team: ID,
}

export const PalTeamEntry: FC<Parameters> = ({
  id,
  index,
  team,
}): ReactElement => {
  const { name, image, aura, craft } = useSelector(mapStateToProps(id))
  const rowStyle = (index % 2) ? styles.evenRow : styles.oddRow;
  const dispatch = useDispatch();

  function removeThisEntry() {
    dispatch(deleteFromTeam({
      team: team,
      pal: id,
    }))
  }

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
      <View style={styles.craft}>
        {craft ? <Icon
          name="hammer"
          size={30}
          type="material-community"
          aria-label="craft required"
        /> : <></>}
      </View>
      <Pressable style={styles.remove}
        onPress={removeThisEntry}>
        <Icon
        name="delete"
        size={30}
        type="material"
        aria-label="remove this pal from this team">
        </Icon>
      </Pressable>
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
      aura: corePal.aura.description,
      craft: !!corePal.aura.tech,
    }
  });

const mapStateToProps = (id: ID) => {
  return (state) => selectPalInfo(state, id);
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
  remove: {
    flex: 1,
    paddingRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  }
})