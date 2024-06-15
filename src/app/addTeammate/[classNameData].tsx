import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  SafeAreaView,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
  Text,
  Alert
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Header from "@components/Header/header";
import Title from "@components/Title/Tittle";
import Subtitle from "@components/Subtitle/Subtitle";
import Button from "@components/Button/Button";
import Tabs from "@components/Tabs/Tabs";
import Participant from "@components/Participant/Participant";
import { ClassEntity } from "@common/types/ClassEntity";
import { storage } from "@/services/storage";

export default function AddTeammate() {
  const router = useRouter();
  const { classNameData } = useLocalSearchParams<{ classNameData: string }>();

  const [activeTeam, setActiveTeam] = useState<"TIME A" | "TIME B">("TIME A");

  const classes = storage.getObject<ClassEntity[]>("classes") ?? [];
  const [participant, setParticipant] = useState<string>("");
  const currentClass = classes.find((item) => item.name === classNameData);
  const currentTeamParticipants =
    activeTeam === "TIME A" ? currentClass?.teamA : currentClass?.teamB;

  if (!classNameData) {
    router.back();
    return;
  }

  const handleRemoveClass = (name: string) => {
    const newClasses = classes.filter((c) => name !== c.name);
    storage.setObject<ClassEntity[]>("classes", newClasses);
  };

  const handleAddParticipant = (
    name: string,
    currentTeam: "TIME A" | "TIME B"
  ) => {
    if (currentTeam === "TIME A") {
      const newClasses = classes.map((classData) =>
        classData.name === classNameData
          ? { ...classData, teamA: [...classData.teamA, name] }
          : classData
      );
      storage.setObject<ClassEntity[]>("classes", newClasses);
      setParticipant("");
    }
    if (currentTeam === "TIME B") {
      const newClasses = classes.map((classData) =>
        classData.name === classNameData
          ? { ...classData, teamB: [...classData.teamB, name] }
          : classData
      );
      storage.setObject<ClassEntity[]>("classes", newClasses);
      setParticipant("");
    }
  };

  const handleRemoveParticipant = (
    name: string,
    currentTeam: "TIME A" | "TIME B"
  ) => {
    if (currentTeam === "TIME A") {
      const newClasses = classes.map((classData) =>
        classData.name === classNameData
          ? {
              ...classData,
              teamA: classData.teamA.filter((teammate) => teammate !== name)
            }
          : classData
      );
      storage.setObject<ClassEntity[]>("classes", newClasses);
    }
    if (currentTeam === "TIME B") {
      const newClasses = classes.map((classData) =>
        classData.name === classNameData
          ? {
              ...classData,
              teamB: classData.teamB.filter((teammate) => teammate !== name)
            }
          : classData
      );
      storage.setObject<ClassEntity[]>("classes", newClasses);
    }
  };

  const validateParticipant = (name: string) => {
    if (!name) {
      return {
        title: "Nome inválido",
        message: "Adicione um nome não vazio para esse participante"
      };
    }
    if (currentTeamParticipants?.includes(name)) {
      return {
        title: "Nome inválido",
        message: "Já existe um participante com esse nome"
      };
    }

    return undefined;
  };

  return (
    <SafeAreaView className="bg-base-gray-600 text-center flex-1 w-full justify-center items-center pb-6">
      <Header hasComeBackBtn />
      <View className="w-11/12 justify-center items-center">
        <View className="w-full">
          <View className="text-center items-center flex mt-8">
            <Title style={{ marginBottom: 5 }}> Nome da turma </Title>
            <Subtitle> Adicione a galera e separe os times </Subtitle>
          </View>

          <View className="w-full h-fit mt-8 mb-6">
            <TextInput
              value={participant}
              onChangeText={(value) => setParticipant(value)}
              className="py-4 bg-base-gray-700 rounded-md w-full px-4  text-white relative"
              placeholder="Nome do participante"
              placeholderTextColor={"#7C7C8A"}
            />
            <TouchableOpacity
              onPress={() => {
                const error = validateParticipant(participant);
                if (error) {
                  return Alert.alert(error.title, error.message);
                }
                handleAddParticipant(participant, activeTeam);
              }}
              className="absolute right-0 mr-2 top-1/2 "
              style={{ transform: [{ translateY: -12 }] }}
            >
              <Ionicons name="add" size={24} color="#00B37E" />
            </TouchableOpacity>
          </View>

          <Tabs activeTab={activeTeam} setActiveTab={setActiveTeam} />

          <FlatList
            className="my-4 h-[300px] flex-grow-0"
            data={currentTeamParticipants}
            keyExtractor={(item) => item}
            renderItem={({ item: name }) => (
              <Participant
                name={name}
                style={{ marginBottom: 8 }}
                onRemove={() => {
                  Alert.alert(
                    "Remover",
                    `Remover o participante ${name} da turma ${classNameData}?`,
                    [
                      {
                        text: "Sim",
                        onPress: () => {
                          handleRemoveParticipant(name, activeTeam);
                          Alert.alert("Participante removido");
                          router.replace("/");
                        }
                      },
                      { text: "Não", style: "cancel" }
                    ]
                  );
                }}
              />
            )}
            ListEmptyComponent={() => (
              <Text className="text-white text-center w-[200px] my-8 mx-auto">
                Não há nenhuma participante nessa time no momento
              </Text>
            )}
          />
        </View>

        <Button
          onPress={() => {
            Alert.alert("Remover", `Remover o turma ${classNameData}?`, [
              {
                text: "Sim",
                onPress: () => {
                  handleRemoveClass(classNameData);
                  Alert.alert("Turma removida");
                  router.replace("/");
                }
              },
              { text: "Não", style: "cancel" }
            ]);
          }}
          style={{ backgroundColor: "#AA2834" }}
        >
          Remover Turma
        </Button>
      </View>
    </SafeAreaView>
  );
}
