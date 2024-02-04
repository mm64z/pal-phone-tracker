import { createSelector } from "@reduxjs/toolkit";
import React, { FC, ReactElement, useRef } from "react";
import { ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Team, TeamListState } from "./state/types";
import { TeamDisplay } from "./TeamDisplay";
import { ID, IdMap } from "../types";
import { Button } from "@rneui/themed";
import { addToTeam, createTeam } from "./state/reducer";

interface Parameters {
  pal: ID,
  success: Function,
}

export const AddToTeamDropdown: FC<Parameters> = ({
  pal,
  success,
}): ReactElement => {
  const teams = useSelector(mapStateToProps());
  const dispatch = useDispatch();

  function addToNewTeam () {
    dispatch(createTeam({
      pal: pal,
    }));
    success();
  }

  function addToExistingTeam (team) {
    dispatch(addToTeam({
      pal: pal,
      team: team.id,
    }));
    success();
  }

  return (
    <ScrollView>
      {teams.map((team, i) => {
        return <Button key={i} onPress={() => addToExistingTeam(team)}>{team.name}</Button>
      })}
      <Button onPress={addToNewTeam}>Add to New Team</Button>
    </ScrollView>)
}

const selectTeams = ({ team }: { team: TeamListState}) => {
  return team.teams;
}

const mapStateToProps = () => {
  return createSelector([
    selectTeams,
    ],
    (teams: IdMap<Team>) => {
      return Object.values(teams)
    }
  )
}