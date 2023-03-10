import React from "react";
import { Container, Title, Icon } from "./styles";
import { TouchableOpacityProps } from "react-native";

type PropsGroupCard = TouchableOpacityProps & {
  title: string;
};

export function GroupCard({ title, ...rest }: PropsGroupCard) {
  return (
    <Container {...rest}>
      <Icon />
      <Title>{title}</Title>
    </Container>
  );
}
