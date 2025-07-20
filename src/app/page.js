'use client';
import { useState, useEffect, useRef } from 'react';
import ChatWindow from '../components/ChatWindow';
import InputBox from '../components/InputBox';
import styles from './page.module.css';
// Importa la biblioteca de Google Generative AI
import { GoogleGenerativeAI } from '@google/generative-ai';

export default function Home() {
  // Clave de API de Google Generative AI
  const [apiKey] = useState('AIzaSyDz6lUlv9CDjdBdKWByQ2KGM5bW3C2Rc4g');

  // Estado para almacenar los mensajes del chat
  const [messages, setMessages] = useState([]);

  // Referencia para el contenedor del chat para hacer scroll al final
  const chatWindowRef = useRef(null);
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const addMessage = (text, sender) => {
    setMessages(prev => [...prev, { sender, text }]);
  };

  const handleSend = async (text) => {
    addMessage(text, 'user');

    addMessage('Escribiendo...', 'bot');

    const userMessage = { text: text, sender: 'user', time: new Date() };
    // setInput('');
    // setIsLoading(true);

    try {
      const startTime = Date.now();

      // Inicializa el cliente de Google Generative AI con la clave de API
      const genAI = new GoogleGenerativeAI(apiKey);

      // Se define que el modelo debe responder en formato JSON
      const model = genAI.getGenerativeModel({
        model: 'gemini-2.0-flash',
        generationConfig: {
          responseMimeType: 'application/json', 
      }});

      // Mensaje de sistema para establecer el contexto de Mónica
      const prompt = `
        Eres Monica, una enfermera virtual de atención primaria. Tu rol es ayudar con temas de salud general, síntomas leves, primeros auxilios y consejos médicos básicos.

        Las especialidades médicas disponibles en la clínica son: pediatría, ginecología, medicina general, nutrición, optometrista, neurologo, cardiologo y dermatología.

        Si te preguntan acerca de los horarios de la clínica son de lunes a viernes de 9:00am a 6:00pm. No debes agendar citas, siempre refiere a una enfermera, sino te preguntan, no lo menciones.

        No debes responder preguntas fuera del ámbito médico. Si te preguntan sobre política, tecnología, deportes o cualquier otro tema, responde educadamente que no puedes responder a eso. Sé profesional, clara, amable y empática. Tu estilo es cercano y respetuoso.
        
        Usuario: ${text}
      `;

      const result = await model.generateContent(prompt);
      // Devuelve el texto de la respuesta en formato JSON y se convierte a un objeto y se extrae el texto de Mónica
      // El cual tiene una estructura como { "response": "respuesta" }
      const responseText = await JSON.parse(result.response.text()).response;

      // Se imprime la respuesta en la consola para depuración
      console.log(responseText);
      
      const endTime = Date.now();
      const responseTime = (endTime - startTime) / 1000;

      
      const botMessage = {
        text: responseText,
        sender: 'bot',
        time: new Date(),
        responseTime: responseTime
      };

      setMessages(prev => [...prev, botMessage]);
      setMessages(prev => prev.filter(m => m.text !== 'Escribiendo...'));
  

    } catch (error) {
      const errorMessage = {
        text: `Error: ${error.message}`,
        sender: 'error',
        time: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }

    // setIsLoading(false);

    

  };

  return (
    <main className={styles.main_container}>
      <h1 className={styles.title}>
        Asistente Virtual de Salud
      </h1>

      {/* <div
        ref={chatWindowRef}
        style={{}}
      > */}
        
      <div className={styles.chat_window} ref={chatWindowRef} style={{ overflowY: 'auto'}}>
        <ChatWindow messages={messages} />
      </div>

      <InputBox onSend={handleSend} />
    </main>
  );
}
