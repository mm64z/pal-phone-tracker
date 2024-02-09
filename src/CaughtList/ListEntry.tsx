import { FC, ReactElement, useEffect } from "react";
import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Pal, ID } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@rneui/themed";
import { createSelector } from "@reduxjs/toolkit";
import { updatePal } from "./state/reducer";
import { PalState } from "../CoreState/types";
import { CaughtPalState } from "./state/types";
import store from "../CoreState/store";

interface Parameters {
  id: ID,
}

interface State {
  image: string,
  name: string,
  numberCaught: number,
}

export const ListEntry: FC<Parameters> = ({
  id,
}): ReactElement => {
  const { image, name, numberCaught }: State = useSelector(mapStateToProps(id));
  const dispatch = useDispatch();



  function setValue (newValue: string) {
    const toSet = parseInt(newValue);
    updateValue(isNaN(toSet) ? 0 : toSet);
  }

  function incValue () {
    updateValue(numberCaught+1);
  }
  function decValue () {
    updateValue(numberCaught-1);
  }

  function updateValue (newValue: number) {
    dispatch(updatePal({
      id: id,
      pal: {
        numberCaught: newValue,
      },
    }))
  } 

  const iconSize = 15;

  return (
     <View style={styles.overall}>
      <Image
        source={image}
        resizeMode='cover'
        style={{width: 50, height: 50}}
      ></Image>
      <Text
        style={styles.input}
      >{name}</Text>
      <View style={styles.buttonContainer}>
        <Icon
            color="#2196F3"
            reverseColor="#000"
            name="remove"
            onPress={decValue}
            raised
            reverse
            size={iconSize}
            type="material"
            aria-label="remove one"
          />
      </View>
      <TextInput
        key={id}
        style={styles.numberInput}
        inputMode="numeric"
        textAlign="center"
        onChangeText={setValue}
        value={numberCaught.toString()}
      />
      <View style={styles.buttonContainer}>
        <Icon
            color="#2196F3"
            reverseColor="#000"
            name="add"
            onPress={incValue}
            raised
            reverse
            size={iconSize}
            type="material"
            aria-label="add one"
          />
      </View>
    </View>
  )
}

const selectId = (state, id) => id;
const selectCorePals = ({ core }: { core: PalState }) => core.allPals;
const selectCaughtPals = ({ caught }: { caught: CaughtPalState }) => caught.allPals;
const selectCorePal = createSelector([selectCorePals, selectId], (corePals, id) => corePals[id])
const selectCaughtPalNumber = createSelector([selectCaughtPals, selectId], (caught, id) => caught[id]?.numberCaught);

const selectListInfo = createSelector([selectCorePal, selectCaughtPalNumber], 
  (corePal, numberCaught) => {
    return {
      name: corePal.name,
      image: corePal.image,
      numberCaught: numberCaught || 0,
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