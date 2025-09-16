import { StyleSheet } from "react-native";

export const colors = {
  primary: "#2A4B5A",
  highlight: "#79B44F",
  background: "#F2F2F2",
  text: "#1A1A1A",
  secondaryText: "#6B7280",
  danger: "#EF4444",
  border: "#E5E7EB",
  white: "#FFFFFF",
};

export const styles = StyleSheet.create({
  form: {
    flexGrow: 1,
    width: "100%",
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: colors.primary,
    textAlign: "center",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: colors.secondaryText,
    textAlign: "center",
    marginBottom: 10,
  },
  productContainer: {
    marginBottom: 15,
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "transparent",
  },
  winnerContainer: {
    borderColor: colors.highlight,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.primary,
    marginBottom: 10,
  },
  inputGroup: {
    gap: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  icon: {
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: colors.text,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  clearButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.secondaryText,
  },
  clearButtonText: {
    color: colors.secondaryText,
  },
  resultContainer: {
    marginTop: 24,
    backgroundColor: colors.highlight,
    padding: 16,
    borderRadius: 8,
  },
  errorContainer: {
    backgroundColor: colors.danger,
  },
  resultText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
