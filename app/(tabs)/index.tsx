import React, { useState } from "react";
import { View, Text } from "react-native";
import { styles } from "../../styles/styles"; 
import Input from "../../comp/input";         
import Botao from "../../comp/botao";         
import * as Crypto from "expo-crypto";        // biblioteca de funções criptográficas
import { Buffer } from "buffer";              // conversão de dados para buffer
import { AES, enc, mode, pad } from "crypto-js"; // biblioteca para criptografia AES

export default function App() {
  
  const [mensagem, setMensagem] = useState("");
  const [resultado, setResultado] = useState("");
  const [textoOriginal, setTextoOriginal] = useState("");

  // Estados para guardar a chave e o IV usados, para depois descriptografar
  const [chaveSalva, setChaveSalva] = useState(null);
  const [ivSalvo, setIvSalvo] = useState(null);

  // Função que criptografa o texto
  async function criptografar(texto) {
    // Gera o hash da chave usando SHA-256
    const chaveHash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      "minha-chave-secreta" // chave base da criptografia
    );

    // Gera um vetor de inicialização (IV) aleatório de 16 bytes
    const ivBytes = await Crypto.getRandomBytesAsync(16);
    const ivHex = Buffer.from(ivBytes).toString("hex"); // transforma para hexadecimal
    const ivWordArray = enc.Hex.parse(ivHex);           // converte para formato aceito pelo crypto-js

    // Realiza a criptografia com AES no modo CBC
    const textoCripto = AES.encrypt(texto, enc.Hex.parse(chaveHash), {
      iv: ivWordArray,
      mode: mode.CBC,
      padding: pad.Pkcs7,
    }).toString();

    // Salva o texto criptografado, a chave e o IV para posterior descriptografia
    setResultado(textoCripto);
    setChaveSalva(chaveHash);
    setIvSalvo(ivHex);
  }

  // Função que descriptografa o texto
  function descriptografar() {
    // Verifica se os dados necessários existem
    if (!resultado || !chaveSalva || !ivSalvo) return;

    const ivWordArray = enc.Hex.parse(ivSalvo); // reconverte o IV salvo

    // Descriptografa o texto
    const bytes = AES.decrypt(resultado, enc.Hex.parse(chaveSalva), {
      iv: ivWordArray,
      mode: mode.CBC,
      padding: pad.Pkcs7,
    });

    // Converte os dados descriptografados para texto legível 
    const texto = bytes.toString(enc.Utf8);
    setTextoOriginal(texto); // salva o texto original
  }

  return (
    <View style={styles.container}>
      <Text>Entre com a mensagem</Text>
      
      <Input
        placeholder="Mensagem"
        value={mensagem}
        onChangeText={setMensagem}
      />
      <Botao texto="Criptografar" onPress={() => criptografar(mensagem)} />

      <Text style={{ marginTop: 20 }}>Resultado criptografado:</Text>
      <Text selectable>{resultado}</Text>

      <Botao texto="Descriptografar" onPress={descriptografar} />

      <Text style={{ marginTop: 20 }}>Texto original:</Text>
      <Text selectable>{textoOriginal}</Text>
    </View>
  );
}
