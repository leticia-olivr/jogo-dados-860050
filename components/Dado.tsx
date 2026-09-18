import React from 'react';
import { Image, StyleSheet } from 'react-native';

type DadoProps = {
  valor: 1 | 2 | 3 | 4 | 5 | 6;
};

const imagens = {
  1: require('../assets/dados/dado1.png'),
  2: require('../assets/dados/dado2.png'),
  3: require('../assets/dados/dado3.png'),
  4: require('../assets/dados/dado4.png'),
  5: require('../assets/dados/dado5.png'),
  6: require('../assets/dados/dado6.png'),
};

export default function Dado({ valor }: DadoProps) {
  return (
    <Image
      source={imagens[valor]}
      style={styles.dado}
      resizeMode="contain"
    />
  );
}

const styles = StyleSheet.create({
  dado: {
    width: 70,
    height: 70,
  },
});