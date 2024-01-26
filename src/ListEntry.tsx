import { FC, ReactElement } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Pal, ID } from "./types";
import { PalState } from "./reducers/types";
import { useDispatch, useSelector } from "react-redux";
import { deletePal, updatePal } from "./reducers/reducer";

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
    updateValue(toSet);
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

  return (
     <View style={styles.overall}>
      <View style={styles.buttonContainer}>
        <Pressable 
          onPress={deleteThis}
          style={styles.buttonStyle}
          accessibilityLabel="Delete this entry">
          <Text style={styles.buttonText}>X</Text>
        </Pressable>
      </View>
      <TextInput
        style={styles.input}
        onChangeText={changeText}
        value={pal.name}
      />
      <View style={styles.buttonContainer}>
        <Pressable 
          onPress={decValue}
          style={styles.buttonStyle}
          accessibilityLabel="Subtract one">
          <Text style={styles.buttonText}>-</Text>
        </Pressable>
      </View>
      <TextInput
        style={styles.numberInput}
        inputMode="numeric"
        textAlign="center"
        onChangeText={setValue}
        value={pal.numberCaught.toString()}
      />
      <View style={styles.buttonContainer}>
        <Pressable 
          onPress={incValue}
          style={styles.buttonStyle}
          accessibilityLabel="Add one">
          <Text style={styles.buttonText}>+</Text>
        </Pressable>
      </View>
    </View>
  )
}

const mapStateToProps = (id: ID) => {
  return ({PalReducer}: {PalReducer: PalState}): State => {
    return {
      pal: PalReducer.palList[id],
    }
  }
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
  },
  buttonStyle: {
    width: 30,
    height: 30,
    backgroundColor: '#2196F3',
    alignItems: 'center',
    justifyContent: 'center',
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