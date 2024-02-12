import { FC, ReactElement } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { ID } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { PalState } from "../CoreState/types";
import { BossTimerState } from "./state/types";
import { Icon } from "@rneui/themed";
import { removeTimer } from "./state/reducer";

interface Parameters {
  id: ID,
}

interface State {
  name: string,
  image: string,
  timeLeft: number,
}

export const ListEntry: FC<Parameters> = ({
  id,
}): ReactElement => {
  const { name, image, timeLeft }: State = useSelector(mapStateToProps(id));
  const dispatch = useDispatch();

  function formatTime (timeMillis: number) {
    const minutes = Math.floor(timeMillis / 1000 / 60 );
    const seconds = Math.floor(timeMillis / 1000 % 60);
    return minutes + ":" + seconds;
  }

  function selectRemove () {
    dispatch(removeTimer({id: id}))
  }

  return (
     <View style={styles.row}>
      <Image
        source={image}
        resizeMode='cover'
        style={{width: 50, height: 50}}
      ></Image>
      <Text
        style={styles.name}
      >{name}</Text>
      <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
      <Pressable style={styles.remove} onPress={selectRemove}>
        <Icon
          name="delete"
          size={30}
          type="material"
          aria-label="remove this timer">
        </Icon>
      </Pressable>
      
    </View>
  )
}

const selectId = (state, id) => id;
const selectCorePals = ({ core }: { core: PalState }) => core.allPals;
const selectTimers = ({timer}: {timer: BossTimerState}) => timer.timers
const selectTimer = createSelector([selectTimers, selectId], (timers, id) => timers[id])
const selectCorePal = createSelector([selectCorePals, selectTimer], (corePals, timer) => corePals[timer.pal])

const selectTimerInfo = createSelector([selectCorePal, selectTimer], 
  (corePal, timer) => {
    return {
      name: corePal.name,
      image: corePal.image,
      timeLeft: timer.timeLeft,
    }
  });

const mapStateToProps = (id: ID) => {
  return (state) => selectTimerInfo(state, id);
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    padding: 1,
    alignItems: 'center',
  },
  name: {
    flex: 2,
    padding: 5,
    textAlign: 'left',
    paddingLeft: 10,
  },
  timer: {
    flex: 1,
    textAlign: 'center',
  },
  remove: {
    flex: 1,
    paddingRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  }
});