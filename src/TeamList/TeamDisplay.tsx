import { FC, ReactElement, Ref, useState } from "react"
import { createSelector } from "@reduxjs/toolkit";
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ID, IdMap } from "../types";
import { Icon } from "@rneui/base";
import { Team, TeamListState } from "./state/types";
import { PalEntry } from "../PassiveGrouper/PalEntry";
import { PalTeamEntry } from "./PallTeamEntry";
import { addToTeam, deleteTeam } from "./state/reducer";
import { ChoosePalEntry } from "./ChoosePalEntry";
import { ChoosePalList } from "./ChoosePalList";

interface Parameters {
  index: ID,
}

export const TeamDisplay: FC<Parameters> = ({
  index,
}): ReactElement => {
  const [expanded, setExpanded] = useState(false);
  const team = useSelector(mapStateToProps(index));
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);

  function selected () {
    setExpanded(!expanded);
  }

  function removeTeam () {
    dispatch(deleteTeam({
      team: team.id
    }));
  }

  const iconSize = 20;
  return (<View style={styles.overall}>
    <Pressable style={styles.rowHeader}
        onPress={selected}>
      <View style={styles.rowTitle}>
        <Text
          style={styles.headerText}
          >{team.name}
        </Text>
        {expanded ? <Icon
          name="menu-up"
          size={iconSize}
          type="material-community"
          aria-label="close"
        /> : <Icon
          name="menu-down"
          size={iconSize}
          type="material-community"
          aria-label="open"
        />}
      </View>
      <Pressable style={styles.removeTeam}
      onPress={removeTeam}>
        <Icon 
          name="remove-circle"
          size={iconSize}
          type="material"
          aria-label="delete team">
        </Icon>
      </Pressable>
    </Pressable>
    {expanded && <View>
      {team.pals.map((palId: ID, index) => {
        return (
        <PalTeamEntry id={palId} team={team.id} index={index} key={index}></PalTeamEntry>)
      })}
      <Pressable style={styles.button}
       onPress={() => setModalOpen(!modalOpen)}>
        <Icon
          name="add"
          size={iconSize}
          type="material"
          aria-label="delete team"
        />
        <Text>
          Add Pal to Team
        </Text>
      </Pressable>
      <Modal animationType="slide"
        transparent={false}
        visible={modalOpen}
        onRequestClose={() => {
          setModalOpen(!modalOpen);
        }}>
        <ChoosePalList success={(pal) => {
          dispatch(addToTeam({
            pal: pal,
            team: team.id
          }))
          setModalOpen(!modalOpen)
        }}></ChoosePalList>
      </Modal>
    </View>}
  </View>)
}

const selectTeams = ({ team }: { team: TeamListState}) => {
  return team.teams;
}

const mapStateToProps = (id: ID) => {
  return createSelector([
    selectTeams,
    ],
    (teams: IdMap<Team>) => teams[id]
  )
}

const styles = StyleSheet.create({
  overall: {
    borderTopWidth: 2,
  },
  rowHeader: {
    padding: 10,
    fontSize: 20,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowTitle: {
    flex: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeTeam: {
    position: 'absolute',
    top: '50%',
    left: '95%',
  },
  headerText: {
    textAlign: 'center',
    fontSize: 20,
  },
  row: {
    flexDirection: 'row',

  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    marginHorizontal: 30,
    backgroundColor: '#beb',
    borderRadius: 10,
  },
})