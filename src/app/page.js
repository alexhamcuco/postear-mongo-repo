// src/app/page.js
"use client";

import MaterialForm from "@/formulario/MaterialForm";
import TranscripcionForm from "@/formulario/TranscripcionForm";
import {
  ChakraProvider,
  CSSReset,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";

export default function Page() {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [isValidPass, setIsValidPass] = useState(false);

  // 👇 SOLO MOVIDO AQUÍ
  const handleLogin = async (e) => {
    e.preventDefault();

    const respuesta = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correo,
        contraseña,
      }),
    });

    if (respuesta.ok) {
      setIsValidPass(true);
    } else {
      console.error("Error al login");
    }
  };
  console.log("isvalid", isValidPass);
  return (
    <ChakraProvider>
      <CSSReset />
      {!isValidPass ? (
        <main className="flex  items-center justify-between pt-4 px-80">
          <FormControl>
            <FormLabel>correos</FormLabel>
            <Input
              type="text"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />

            <FormLabel>contraseña</FormLabel>
            <Input
              type="password"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
            />

            <Button
              type="submit"
              onClick={handleLogin}
              ml="4"
              mt="5"
              border="2px solid red"
              color="red"
              width="auto"
              _hover={{
                bg: "red.500",
                color: "white",
              }}
            >
              acceder
            </Button>
          </FormControl>
        </main>
      ) : (
        <div>
          <main className="flex min-h-screen items-center justify-between p-4">
            <Box w="100%" maxW="8xl">
              <Heading
                as="h1"
                size="xl"
                textAlign="center"
                mb={8}
                color="blue.600"
              >
                🎓 Sistema de Gestión de Contenido Educativo
              </Heading>

              <Tabs isFitted variant="enclosed" colorScheme="blue">
                <TabList mb="1em">
                  <Tab>📚 Materiales Generales</Tab>
                  <Tab>📝 Transcripciones de Clases</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <MaterialForm />
                  </TabPanel>
                  <TabPanel>
                    <TranscripcionForm />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </main>
        </div>
      )}
    </ChakraProvider>
  );
}
