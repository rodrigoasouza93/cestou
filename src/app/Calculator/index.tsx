import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { styles, colors } from "./styles";
import { Template } from "@/components/Template";

type ProductState = {
  quantity: string;
  price: string;
};

type Winner = {
  winner: "A" | "B" | "draw" | "error";
  message: string;
};

export function Calculator() {
  const [productA, setProductA] = useState<ProductState>({
    quantity: "",
    price: "",
  });
  const [productB, setProductB] = useState<ProductState>({
    quantity: "",
    price: "",
  });
  const [result, setResult] = useState<Winner | null>(null);

  const handleCalculate = () => {
    Keyboard.dismiss();
    const quantityA = parseFloat(productA.quantity.replace(",", "."));
    const priceA = parseFloat(productA.price.replace(",", "."));
    const quantityB = parseFloat(productB.quantity.replace(",", "."));
    const priceB = parseFloat(productB.price.replace(",", "."));

    if (
      isNaN(quantityA) ||
      isNaN(priceA) ||
      isNaN(quantityB) ||
      isNaN(priceB) ||
      quantityA <= 0 ||
      priceA <= 0 ||
      quantityB <= 0 ||
      priceB <= 0
    ) {
      setResult({
        winner: "error",
        message: "Por favor, preencha todos os campos com valores válidos.",
      });
      return;
    }

    const pricePerUnitA = priceA / quantityA;
    const pricePerUnitB = priceB / quantityB;

    if (pricePerUnitA < pricePerUnitB) {
      setResult({
        winner: "A",
        message: `O Produto 1 é ${(
          (1 - pricePerUnitA / pricePerUnitB) *
          100
        ).toFixed(0)}% mais barato!`,
      });
    } else if (pricePerUnitB < pricePerUnitA) {
      setResult({
        winner: "B",
        message: `O Produto 2 é ${(
          (1 - pricePerUnitB / pricePerUnitA) *
          100
        ).toFixed(0)}% mais barato!`,
      });
    } else {
      setResult({
        winner: "draw",
        message: "Ambos os produtos têm o mesmo preço por unidade.",
      });
    }
  };

  const handleClear = () => {
    setProductA({ quantity: "", price: "" });
    setProductB({ quantity: "", price: "" });
    setResult(null);
    Keyboard.dismiss();
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        handleClear();
      };
    }, [])
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Template>
        <ScrollView
          style={{ width: "100%" }}
          contentContainerStyle={styles.form}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Compare e Economize</Text>
          <Text style={styles.subtitle}>
            Preencha os dados dos produtos para ver qual vale mais a pena.
          </Text>

          <View
            style={[
              styles.productContainer,
              result &&
                (result.winner === "A" || result.winner === "draw") &&
                styles.winnerContainer,
            ]}
          >
            <Text style={styles.productTitle}>Produto 1</Text>
            <View style={styles.inputGroup}>
              <View style={styles.inputContainer}>
                <Feather
                  name="box"
                  size={20}
                  color={colors.secondaryText}
                  style={styles.icon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Quantidade (ex: 500g, 1L)"
                  keyboardType="numeric"
                  value={productA.quantity}
                  onChangeText={(text) =>
                    setProductA({ ...productA, quantity: text })
                  }
                />
              </View>
              <View style={styles.inputContainer}>
                <Feather
                  name="dollar-sign"
                  size={20}
                  color={colors.secondaryText}
                  style={styles.icon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Preço (R$)"
                  keyboardType="numeric"
                  value={productA.price}
                  onChangeText={(text) =>
                    setProductA({ ...productA, price: text })
                  }
                />
              </View>
            </View>
          </View>

          <View
            style={[
              styles.productContainer,
              result &&
                (result.winner === "B" || result.winner === "draw") &&
                styles.winnerContainer,
            ]}
          >
            <Text style={styles.productTitle}>Produto 2</Text>
            <View style={styles.inputGroup}>
              <View style={styles.inputContainer}>
                <Feather
                  name="box"
                  size={20}
                  color={colors.secondaryText}
                  style={styles.icon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Quantidade (ex: 600g, 1.5L)"
                  keyboardType="numeric"
                  value={productB.quantity}
                  onChangeText={(text) =>
                    setProductB({ ...productB, quantity: text })
                  }
                />
              </View>
              <View style={styles.inputContainer}>
                <Feather
                  name="dollar-sign"
                  size={20}
                  color={colors.secondaryText}
                  style={styles.icon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Preço (R$)"
                  keyboardType="numeric"
                  value={productB.price}
                  onChangeText={(text) =>
                    setProductB({ ...productB, price: text })
                  }
                />
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleCalculate}>
            <Text style={styles.buttonText}>Calcular</Text>
          </TouchableOpacity>

          {result && (
            <TouchableOpacity
              style={[styles.button, styles.clearButton]}
              onPress={handleClear}
            >
              <Text style={[styles.buttonText, styles.clearButtonText]}>
                Limpar
              </Text>
            </TouchableOpacity>
          )}

          {result && (
            <View
              style={[
                styles.resultContainer,
                result.winner === "error" && styles.errorContainer,
              ]}
            >
              <Text style={styles.resultText}>{result.message}</Text>
            </View>
          )}
        </ScrollView>
      </Template>
    </TouchableWithoutFeedback>
  );
}
