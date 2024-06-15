import React, { useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView, TextInput, View, Alert } from "react-native";
import Header from "@components/Header/header";
import Title from "@components/Title/Tittle";
import Subtitle from "@components/Subtitle/Subtitle";
import Button from "@components/Button/Button";
import { ClassEntity } from "@common/types/ClassEntity";
import { storage } from "../../services/storage";

export default function AddClass() {
  const router = useRouter();
  const classes = storage.getObject<ClassEntity[] | null>("classes");
  const [newClassName, setNewClassName] = useState<string>("");

  const handleAddClass = (newClassName: string) => {
    storage.setObject("classes", [
      ...(classes ?? []),
      {
        name: newClassName,
        teamA: [],
        teamB: []
      }
    ]);
  };

  const validateNewClassName = (newClassName: string) => {
    if (!newClassName) {
      return {
        title: "Nome inválido",
        message: "Digite um nome não vazio para a turma!"
      };
    }

    const currentClassesNames = (classes ?? []).map((item) => item.name);
    if (currentClassesNames.includes(newClassName)) {
      return {
        title: "Nome inválido",
        message: "Esse nome de turma já existe"
      };
    }

    return undefined;
  };

  return (
    <SafeAreaView className="flex-1 bg-base-gray-600 text-center w-full h-screen  justify-center items-center pb-6">
      <Header hasComeBackBtn />
      <View className="w-11/12 flex-1 items-center justify-center -mt-16">
        <View className="text-center items-center flex mt-8">
          <Title style={{ marginBottom: 5 }}> Nova Turma </Title>
          <Subtitle> Crie uma turma para adicionar pessoas </Subtitle>
        </View>

        <TextInput
          value={newClassName}
          onChangeText={(value) => setNewClassName(value)}
          className="py-4 bg-base-gray-700 rounded-md w-full px-4 mt-8 mb-6 text-white"
          placeholder="Nome da turma"
          placeholderTextColor={"#7C7C8A"}
        />

        <Button
          onPress={() => {
            const error = validateNewClassName(newClassName);
            if (error) {
              return Alert.alert(error.title, error.message);
            }
            handleAddClass(newClassName);
            router.push("/");
          }}
        >
          Criar
        </Button>
      </View>
    </SafeAreaView>
  );
}
