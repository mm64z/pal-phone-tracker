import { FC, ReactElement, useEffect } from "react";
import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Pal, ID } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@rneui/themed";
import { createSelector } from "@reduxjs/toolkit";
import { updatePal } from "../CaughtList/reducers/reducer";
import { PalState } from "../CoreState/types";
import { CaughtPalState } from "../CaughtList/reducers/types";
import store from "../CoreState/store";

interface Parameters {
  id: ID,
  success: Function
}

interface State {
  image: string,
  name: string,
}

export const ChoosePalEntry: FC<Parameters> = ({
  id,
  success,
}): ReactElement => {
  const { image, name }: State = useSelector(mapStateToProps(id));

  const iconSize = 15;

  function palSelected () {
    success(id);
  }

  return (
     <Pressable 
      style={styles.overall}
      onPress={palSelected}>
      <Image
        source={image}
        resizeMode='cover'
        style={{width: 50, height: 50}}
      ></Image>
      <Text
        style={styles.input}
      >{name}</Text>
     
    </Pressable>
  )
}

const selectId = (state, id) => id;
const selectCorePals = ({ core }: { core: PalState }) => core.allPals;
const selectCorePal = createSelector([selectCorePals, selectId], (corePals, id) => corePals[id])

const selectListInfo = createSelector([selectCorePal], 
  (corePal) => {
    return {
      name: corePal.name,
      image: corePal.image,
    }
  });

const mapStateToProps = (id: ID) => {
  return (state) => selectListInfo(state, id);
}

const styles = StyleSheet.create({
  overall: {
    flexDirection: 'row',
    // paddingHorizontal: 10,
  },
  input: {
    flex: 3,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    width: 30,
    height: 30,
    backgroundColor: '#2196F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    backgroundColor: '#d31811',
  },
  buttonText: {
    fontSize: 20,
  },
  numberInput: {
    flex: 1,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});