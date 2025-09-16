import React, { useState, useEffect, useCallback } from "react";
import { View, Text, FlatList, Alert, TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { styles } from "./styles";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Filter } from "@/components/Filter";
import { Item } from "@/components/Item";
import { Template } from "@/components/Template";
import { itemsStorage, ItemStorage } from "@/storage/itemsStorage";
import { FilterStatus } from "@/types/FilterStatus";

const FILTER_OPTIONS: FilterStatus[] = [
  FilterStatus.PENDING,
  FilterStatus.DONE,
];

export function Home() {
  const [filter, setFilter] = useState<FilterStatus>(FilterStatus.PENDING);
  const [description, setDescription] = useState("");
  const [items, setItems] = useState<ItemStorage[]>([]);
  const [filteredItems, setFilteredItems] = useState<ItemStorage[]>([]);

  async function handleAdd() {
    if (!description.trim()) {
      return Alert.alert("Adicionar", "Informe a descrição para adicionar.");
    }

    const newItem: ItemStorage = {
      id: String(new Date().getTime()),
      description,
      status: FilterStatus.PENDING,
    };

    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    setFilter(FilterStatus.PENDING);
    setDescription("");

    try {
      await itemsStorage.add(newItem);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível salvar o novo item.");
      setItems(items);
    }
  }

  async function handleRemove(id: string) {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);

    try {
      await itemsStorage.remove(id);
    } catch (error) {
      console.error(error);
      Alert.alert("Remover", "Não foi possível remover o item.");
      setItems(items);
    }
  }

  function handleClear() {
    Alert.alert("Limpar", "Deseja remover todos os itens?", [
      { text: "Não", style: "cancel" },
      { text: "Sim", onPress: onClear },
    ]);
  }

  async function onClear() {
    setItems([]);
    try {
      await itemsStorage.clear();
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível remover todos os itens.");
      loadItems();
    }
  }

  async function handleToggleItemStatus(id: string) {
    const updatedItems = items.map((item) =>
      item.id === id
        ? {
            ...item,
            status:
              item.status === FilterStatus.PENDING
                ? FilterStatus.DONE
                : FilterStatus.PENDING,
          }
        : item
    );
    setItems(updatedItems);

    try {
      await itemsStorage.toggleStatus(id);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível atualizar o status do item.");
      setItems(items);
    }
  }

  async function loadItems() {
    try {
      const storedItems = await itemsStorage.get();
      setItems(storedItems);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível carregar os itens da sua lista.");
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadItems();
    }, [])
  );

  useEffect(() => {
    const newFilteredItems = items.filter((item) => item.status === filter);
    setFilteredItems(newFilteredItems);
  }, [items, filter]);

  return (
    <Template>
      <View style={styles.form}>
        <Input
          placeholder="O que você precisa comprar?"
          onChangeText={setDescription}
          value={description}
        />
        <Button title="Adicionar" onPress={handleAdd} />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          {FILTER_OPTIONS.map((status) => (
            <Filter
              key={status}
              status={status}
              isActive={status === filter}
              onPress={() => setFilter(status)}
            />
          ))}

          <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item
              data={item}
              onStatus={() => handleToggleItemStatus(item.id)}
              onRemove={() => handleRemove(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => (
            <Text style={styles.empty}>Nenhum item aqui.</Text>
          )}
        />
      </View>
    </Template>
  );
}
