import { FC, ReactElement, useState } from "react";
import { StyleSheet, TextInput } from "react-native";


interface Entry {

}

interface Parameters {
}

export const ListEntry: FC<Parameters> = ({
}): ReactElement => {

  const [text, setText] = useState('');

  function onChangeText (newText: string) {
    setText(newText);
  }

  return (
    <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
  )

}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});