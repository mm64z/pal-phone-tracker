import { FC, ReactElement } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Pal, ID } from "./types";
import { PalState } from "./reducers/types";
import { useDispatch, useSelector } from "react-redux";
import { deletePal, updatePal } from "./reducers/reducer";
import { Icon } from "@rneui/themed";
import { createSelector } from "@reduxjs/toolkit";

interface Parameters {
  id: ID,
}

interface State {
  pal: Pal,
}

export const ListEntry: FC<Parameters> = ({
  id,
}): ReactElement => {
  const { pal }: State = useSelector(mapStateToProps(id));
  const dispatch = useDispatch();

  // const [text, setText] = useState('');
  // const [value, setValue] = useState(0);

  function changeText (newText: string) {
    // setText(newText);
    dispatch(updatePal({
      id: id,
      pal: {
        name: newText,
      },
    }))
  }

  function deleteThis () {
    dispatch(deletePal({id}))
    // setValue(parseInt(newValue));
  }

  function setValue (newValue: string) {
    const toSet = parseInt(newValue);
    updateValue(isNaN(toSet) ? 0 : toSet);
    // setValue(parseInt(newValue));
  }

  function incValue () {
    // setValue(value+1)
    updateValue(pal.numberCaught+1);
  }
  function decValue () {
    // setValue(value-1)
    updateValue(pal.numberCaught-1);
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
      <View style={styles.buttonContainer}>
        <Icon
          color="#f34540"
          reverseColor="#000"
          name="delete"
          onPress={deleteThis}
          raised
          reverse
          size={iconSize}
          type="material"
          aria-label="delete"
        />
      </View>
      <TextInput
        style={styles.input}
        onChangeText={changeText}
        value={pal.name}
      />
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
        style={styles.numberInput}
        inputMode="numeric"
        textAlign="center"
        onChangeText={setValue}
        value={pal.numberCaught.toString()}
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

// const selectItems = state => state.items
// const selectItemId = (state, itemId) => itemId

// const selectItemById = createSelector(
//   [selectItems, selectItemId],
//   (items, itemId) => items[itemId]
// )

// const item = selectItemById(state, 42)

const selectPals = (state: {pal: PalState}) => state.pal.allPals;
const selectPalId = (state: {pal: PalState}, id) => id;

const mapStateToProps = (id: ID) => {
  return createSelector([selectPals], 
    (palList) => {
      return {
        pal: palList[id]
      }
    });
  // return ({pal}: {pal: PalState}): State => {
  //   return {
  //     pal: pal.allPals[id],
  //   }
  // }
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