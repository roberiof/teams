import { Text, View, FlatList, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import React from "react";
import Header from "@components/Header/header";
import Title from "@components/Title/Tittle";
import Subtitle from "@components/Subtitle/Subtitle";
import Button from "@components/Button/Button";
import { storage } from "@/services/storage";
import { ClassEntity } from "@common/types/ClassEntity";
import ClassComponent from "./components/ClassComponent";

export default function Home() {
  const classes = storage.getObject<ClassEntity[]>("classes");
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-base-gray-600 text-center w-full h-screen  justify-center items-center pb-6">
      <Header />
      <View className="w-11/12 flex-1 items-center justify-center">
        <View className="text-center items-center flex mt-8">
          <Title style={{ marginBottom: 5 }}> Turmas </Title>
          <Subtitle> Jogue com sua turmas </Subtitle>
        </View>

        <FlatList
          className="my-8 w-full"
          data={classes}
          keyExtractor={(item) => item.name}
          renderItem={({ item: classData }) => (
            <ClassComponent name={classData.name} />
          )}
          ListEmptyComponent={() => (
            <Text className="text-white text-center">
              Não há nenhuma turma no momento
            </Text>
          )}
        />

        <Button
          onPress={() => {
            router.push("/addClass");
          }}
        >
          Criar nova turma
        </Button>
      </View>
    </SafeAreaView>
  );
}
