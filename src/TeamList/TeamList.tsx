import { createSelector } from "@reduxjs/toolkit";
import React, { FC, ReactElement, useRef, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Team, TeamListState } from "./state/types";
import { TeamDisplay } from "./TeamDisplay";
import { IdMap } from "../types";
import { addToTeam, createTeam } from "./state/reducer";
import { Icon } from "@rneui/themed";

interface Parameters {}

export const TeamList: FC<Parameters> = ({
}): ReactElement => {
  const teamIDs = useSelector(mapStateToProps());
  const scrollView = useRef(null);
  const dispatch = useDispatch();

  function addTeam () {
    dispatch(createTeam({}))
  }

  return (
    <ScrollView ref={scrollView}>
      {teamIDs.map((teamID, i) => {
        return <TeamDisplay key={i} index={parseInt(teamID)}></TeamDisplay>
      })}
      <Pressable style={styles.button} onPress={addTeam}>
        <Icon
          name="add"
          size={30}
          type="material"
          aria-label="delete team"
        />
        <Text>Add New Team</Text>
      </Pressable>
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
      return Object.keys(teams);
    }
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    marginHorizontal: 10,
    backgroundColor: '#bbe',
    borderRadius: 10,
  },
})