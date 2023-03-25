import React, { useState, useCallback } from "react";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { GroupCard } from "@components/GroupCard";

import { Container } from "./styles";
import { FlatList } from "react-native";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";

import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { groupsGetAll } from "@storage/group/groupsGetAll";
import { Loading } from "@components/Loading";

export function Groups() {
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<string[]>([]);

  const navigation = useNavigation();

  function handleNewGroup() {
    navigation.navigate("new");
  }

  function handleOpenGroup(group: string) {
    navigation.navigate("players", { group });
  }

  async function fetchGroups() {
    try {
      setIsLoading(true);

      const data = await groupsGetAll();
      setGroups(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchGroups();
    }, [])
  );

  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subtitle="jogue com a sua turma" />

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={groups}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <GroupCard title={item} onPress={() => handleOpenGroup(item)} />
          )}
          ListEmptyComponent={() => (
            <ListEmpty message="Que tal cadastrar a primeira turma?" />
          )}
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
          showsVerticalScrollIndicator={false}
        />
      )}

      <Button title="Criar nova turma" onPress={handleNewGroup} />
    </Container>
  );
}
