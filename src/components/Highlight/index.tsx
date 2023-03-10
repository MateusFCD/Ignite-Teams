import React from "react";
import { Container, Title, Subtitle } from "./styles";

type PropsHighLight = {
  title: string;
  subtitle: string;
};

export function Highlight({ title, subtitle }: PropsHighLight) {
  return (
    <Container>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </Container>
  );
}
