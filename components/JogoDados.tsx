import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';
import Dado from './Dado';

type Jogador = {
  dados: [1 | 2 | 3 | 4 | 5 | 6, 1 | 2 | 3 | 4 | 5 | 6];
  pontos: number;
};

function sortearDado(): 1 | 2 | 3 | 4 | 5 | 6 {
  return (Math.floor(Math.random() * 6) + 1) as 1 | 2 | 3 | 4 | 5 | 6;
}

export default function JogoDados() {
  const [rodada, setRodada] = useState(1);
  const [jogadorAtual, setJogadorAtual] = useState(1);

  const [jogador1, setJogador1] = useState<Jogador>({
    dados: [1, 1],
    pontos: 0,
  });

  const [jogador2, setJogador2] = useState<Jogador>({
    dados: [1, 1],
    pontos: 0,
  });

  const [resultadoRodada, setResultadoRodada] = useState('');
  const [partidaFinalizada, setPartidaFinalizada] = useState(false);

  function jogar(jogador: number) {
    const dado1 = sortearDado();
    const dado2 = sortearDado();

    if (jogador === 1) {
      setJogador1({
        dados: [dado1, dado2],
        pontos: jogador1.pontos,
      });

      setJogadorAtual(2);
    } else {
      const soma1 = jogador1.dados[0] + jogador1.dados[1];
      const soma2 = dado1 + dado2;

      let novoPonto1 = jogador1.pontos;
      let novoPonto2 = jogador2.pontos;

      if (soma1 > soma2) {
        novoPonto1++;
        setResultadoRodada('Jogador 1 venceu a rodada!');
      } else if (soma2 > soma1) {
        novoPonto2++;
        setResultadoRodada('Jogador 2 venceu a rodada!');
      } else {
        setResultadoRodada('A rodada empatou!');
      }

      setJogador2({
        dados: [dado1, dado2],
        pontos: novoPonto2,
      });

      setJogador1((atual) => ({
        ...atual,
        pontos: novoPonto1,
      }));

      if (rodada === 5) {
        setPartidaFinalizada(true);
      } else {
        setRodada((atual) => atual + 1);
        setJogadorAtual(1);
      }
    }
  }

  function jogarNovamente() {
    setRodada(1);
    setJogadorAtual(1);

    setJogador1({
      dados: [1, 1],
      pontos: 0,
    });

    setJogador2({
      dados: [1, 1],
      pontos: 0,
    });

    setResultadoRodada('');
    setPartidaFinalizada(false);
  }

  function resultadoFinal() {
    if (jogador1.pontos > jogador2.pontos) {
      return 'Jogador 1 venceu a partida!';
    }

    if (jogador2.pontos > jogador1.pontos) {
      return 'Jogador 2 venceu a partida!';
    }

    return 'A partida terminou empatada!';
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Jogo de Dados</Text>

      {!partidaFinalizada ? (
        <>
          <Text style={styles.rodada}>
            Rodada {rodada} de 5
          </Text>

          <View style={styles.jogadores}>
            {/* JOGADOR 1 */}
            <View style={styles.jogador}>
              <Text style={styles.nome}>Jogador 1</Text>

              <View style={styles.dados}>
                <Dado valor={jogador1.dados[0]} />
                <Dado valor={jogador1.dados[1]} />
              </View>

              <Text style={styles.soma}>
                Soma: {jogador1.dados[0] + jogador1.dados[1]}
              </Text>

              <Pressable
                style={[
                  styles.botao,
                  jogadorAtual !== 1 && styles.botaoDesabilitado,
                ]}
                disabled={jogadorAtual !== 1}
                onPress={() => jogar(1)}
              >
                <Text style={styles.textoBotao}>Jogar</Text>
              </Pressable>
            </View>

            {/* JOGADOR 2 */}
            <View style={styles.jogador}>
              <Text style={styles.nome}>Jogador 2</Text>

              <View style={styles.dados}>
                <Dado valor={jogador2.dados[0]} />
                <Dado valor={jogador2.dados[1]} />
              </View>

              <Text style={styles.soma}>
                Soma: {jogador2.dados[0] + jogador2.dados[1]}
              </Text>

              <Pressable
                style={[
                  styles.botao,
                  jogadorAtual !== 2 && styles.botaoDesabilitado,
                ]}
                disabled={jogadorAtual !== 2}
                onPress={() => jogar(2)}
              >
                <Text style={styles.textoBotao}>Jogar</Text>
              </Pressable>
            </View>
          </View>

          {resultadoRodada !== '' && (
            <Text style={styles.resultado}>
              {resultadoRodada}
            </Text>
          )}

          <Text style={styles.placar}>
            Placar: {jogador1.pontos} × {jogador2.pontos}
          </Text>
        </>
      ) : (
        <View style={styles.final}>
          <Text style={styles.finalTitulo}>
            Fim de jogo!
          </Text>

          <Text style={styles.resultadoFinal}>
            {resultadoFinal()}
          </Text>

          <Text style={styles.placar}>
            Placar final: {jogador1.pontos} × {jogador2.pontos}
          </Text>

          <Pressable
            style={styles.botaoNovamente}
            onPress={jogarNovamente}
          >
            <Text style={styles.textoBotao}>
              Jogar Novamente
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 20,
    justifyContent: 'center',
  },

  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },

  rodada: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 30,
  },

  jogadores: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },

  jogador: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
  },

  nome: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  dados: {
    flexDirection: 'row',
    gap: 5,
  },

  soma: {
    fontSize: 17,
    marginVertical: 12,
  },

  botao: {
    backgroundColor: '#4f6f52',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },

  botaoDesabilitado: {
    backgroundColor: '#aaa',
  },

  textoBotao: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },

  resultado: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 25,
  },

  placar: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },

  final: {
    alignItems: 'center',
  },

  finalTitulo: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  resultadoFinal: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  botaoNovamente: {
    backgroundColor: '#4f6f52',
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 10,
    marginTop: 30,
  },
});