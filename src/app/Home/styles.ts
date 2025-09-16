import { StyleSheet } from "react-native";

const colors = {
  primary: "#2A4B5A",
  highlight: "#79B44F",
  background: "#F2F2F2",
  white: "#FFFFFF",
  text: "#1A1A1A",
  secondaryText: "#6B7280",
  danger: "#EF4444",
  border: "#E5E7EB",
};

export const styles = StyleSheet.create({
  form: {
    width: "100%",
    paddingHorizontal: 24,
    gap: 8,
    marginTop: 30,
  },
  content: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 32,
    marginTop: 24,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 16,
  },
  clearButton: {
    marginLeft: "auto",
    padding: 4,
  },
  clearText: {
    fontSize: 14,
    color: colors.danger,
    fontWeight: "600",
  },
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 12,
  },
  listContent: {
    paddingTop: 24,
    paddingBottom: 100,
  },
  empty: {
    fontSize: 14,
    color: colors.secondaryText,
    textAlign: "center",
    marginTop: 48,
  },
});
