import { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Checkbox,
  Input,
  Textarea,
  VStack,
  FormControl,
  FormLabel,
  Select,
  useToast,
} from "@chakra-ui/react";

const MaterialForm = () => {
  const [nivel, setNivel] = useState("");
  const [premium, setPremium] = useState(false);
  const [tipo, setTipo] = useState("");
  const [titulo, setTitulo] = useState("");
  const [urlImagen, setUrlImagen] = useState("");
  const [urlTitulo, setUrlTitulo] = useState("");
  const [palabrasClave, setPalabrasClave] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [descripcionIngles, setDescripcionIngles] = useState("");
  const [contenidoMaterial, setContenidoMaterial] = useState("");
  const [contenidoMaterialIngles, setContenidoMaterialIngles] = useState("");
  const [autor, setAutor] = useState("");
  const [points, setPoints] = useState(0);
  const [sequentialNumber, setSequentialNumber] = useState(1);
  const [urlContenido, setUrlContenido] = useState("");

  // Estado para el título del material a eliminar
  const [tituloEliminar, setTituloEliminar] = useState("");

  // Estado para el título del material a conseguir (GET)
  const [tituloACargar, setTituloACargar] = useState("");

  // Estado para el contenido del correo
  const [emailContent, setEmailContent] = useState("");
  const [emailSubjectContent, setEmailSubjectContent] = useState("");

  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const respuesta = await fetch("/api/materiales", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nivel,
        fecha: new Date(),
        premium,
        tipo,
        titulo,
        urlImagen,
        urlTitulo,
        palabrasClave,
        descripcion,
        descripcionIngles,
        contenidoMaterial,
        contenidoMaterialIngles,
        autor,
        points: 0,
        sequentialNumber,
        urlContenido,
      }),
    });

    if (respuesta.ok) {
      toast({
        title: "Material creado con éxito",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    } else {
      toast({
        title: "Error al crear el material",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const handlePointsButtonClick = () => {
    setPoints(points + 1);
  };

  const handleEditMaterial = async () => {
    if (!titulo) {
      toast({
        title: "El título es obligatorio para modificar",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    const response = await fetch(
      `/api/materiales?title=${encodeURIComponent(titulo)}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nivel,
          premium,
          tipo,
          titulo,
          urlImagen,
          urlTitulo,
          palabrasClave,
          descripcion,
          descripcionIngles,
          contenidoMaterial,
          contenidoMaterialIngles,
          autor,
          points,
          sequentialNumber,
          urlContenido,
        }),
      },
    );

    if (response.ok) {
      toast({
        title: "Material modificado con éxito",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    } else {
      toast({
        title: "Error al modificar el material",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const handleDelete = async () => {
    const response = await fetch(
      `/api/materiales?title=${encodeURIComponent(tituloEliminar)}`,
      {
        method: "DELETE",
      },
    );

    if (response.ok) {
      toast({
        title: "Material eliminado con éxito",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setTituloEliminar("");
    } else {
      toast({
        title: "Error al eliminar el material",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  // Función para conseguir datos del material por título (GET)
  const handleGetMaterial = async () => {
    if (!tituloACargar) {
      toast({
        title: "Debes ingresar un título",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    const response = await fetch(
      `/api/materiales?title=${encodeURIComponent(tituloACargar)}`,
    );
    if (response.ok) {
      const materials = await response.json();
      // asumiendo que la respuesta es un array de materiales
      const material = Array.isArray(materials) ? materials[0] : materials;
      if (material) {
        // Rellenar los estados con los datos del material obtenido
        setNivel(material.nivel || "");
        setPremium(material.premium || false);
        setTipo(material.tipo || "");
        setTitulo(material.titulo || "");
        setUrlImagen(material.urlImagen || "");
        setUrlTitulo(material.urlTitulo || "");
        setPalabrasClave(material.palabrasClave || "");
        setDescripcion(material.descripcion || "");
        setDescripcionIngles(material.descripcionIngles || "");
        setContenidoMaterial(material.contenidoMaterial || "");
        setContenidoMaterialIngles(material.contenidoMaterialIngles || "");
        setAutor(material.autor || "");
        setPoints(material.points || 0);
        setSequentialNumber(material.sequentialNumber || 1);
        setUrlContenido(material.urlContenido || "");

        toast({
          title: "Datos del material cargados con éxito",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
      } else {
        toast({
          title: "No se encontró el material",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
      }
    } else {
      toast({
        title: "Error al obtener el material",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  // Función para enviar el correo masivo
  const handleSendNewsletterToAll = async () => {
    if (!emailContent.trim()) {
      toast({
        title: "El contenido del correo no puede estar vacío",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      const response = await fetch("/api/send-newsletter-to-all", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: emailContent }),
      });

      if (response.ok) {
        toast({
          title: "Correo enviado a todos los suscriptores",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
        setEmailContent(""); // Limpia el contenido del correo después de enviarlo
      } else {
        const error = await response.json();
        throw new Error(error.message || "Error al enviar el correo");
      }
    } catch (error) {
      toast({
        title: error.message || "Error al enviar el correo",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  //aqui localhost
  const handleMesage = async () => {
    const res = await axios.post(
      // "https://spanishwithalex.com/api/users/listEmails",
      "/api/emails",

      {
        subject: emailSubjectContent,
        html: emailContent,
      },
    );
    console.log(emailSubjectContent, emailContent);
  };

  const countEmails = async () => {
    const res = await axios.get(
      "https://spanishwithalex.com/api/users/countEmails",
    );

    console.log(res.data);
  };

  return (
    <Box maxW="xl" mx="auto" p={6}>
      <VStack spacing={4}>
        {/* Campo y botón para conseguir datos del material */}
        <FormControl>
          <FormLabel>Título del material a conseguir</FormLabel>
          <Input
            type="text"
            value={tituloACargar}
            onChange={(e) => setTituloACargar(e.target.value)}
          />
        </FormControl>
        <Button
          onClick={handleGetMaterial}
          ml="4"
          border="2px solid blue"
          color="blue"
          width="auto"
          _hover={{
            bg: "blue.500",
            color: "white",
          }}
        >
          Conseguir Datos Material
        </Button>

        <FormControl>
          <FormLabel>Nivel</FormLabel>
          <Select value={nivel} onChange={(e) => setNivel(e.target.value)}>
            <option value="A1">A1</option>
            <option value="A2">A2</option>
            <option value="B1">B1</option>
            <option value="B2">B2</option>
            <option value="C1">C1</option>
            <option value="C2">C2</option>
          </Select>

          <FormLabel style={{ color: "green" }} pt={6}>
            Premium
          </FormLabel>
          <Checkbox
            isChecked={premium}
            onChange={(e) => setPremium(e.target.checked)}
          >
            Click aqui si es PREMIUM content para Suscriptores
          </Checkbox>
          <FormControl>
            <FormLabel>Sequential Number</FormLabel>
            <Input
              type="number"
              value={sequentialNumber}
              onChange={(e) =>
                setSequentialNumber(parseInt(e.target.value) || "")
              }
              min="1"
            />
          </FormControl>
        </FormControl>
        <FormControl>
          <FormLabel>Tipo</FormLabel>
          <Select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="video">Video</option>
            <option value="podcast">Podcast</option>
            <option value="gramaticas">Gramaticas</option>
            <option value="profesorado">Profesorado</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Título</FormLabel>
          <Input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>URL Imagen</FormLabel>
          <Input
            type="text"
            value={urlImagen}
            onChange={(e) => setUrlImagen(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>URL del Contenido</FormLabel>
          <Input
            type="text"
            value={urlContenido}
            onChange={(e) => setUrlContenido(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>URL Título</FormLabel>
          <Input
            type="text"
            value={urlTitulo}
            onChange={(e) => setUrlTitulo(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Palabras Clave</FormLabel>
          <Input
            type="text"
            value={palabrasClave}
            onChange={(e) => setPalabrasClave(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Descripción</FormLabel>
          <Textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            resize="vertical"
            height="300px" // Ajusta la altura
            width="100%" // Ancho completo del contenedor
            minHeight="150px" // Altura mínima
            maxWidth="800px" // Ancho máximo del cuadro
          />
        </FormControl>

        <FormControl>
          <FormLabel>Descripción Ingles</FormLabel>
          <Textarea
            value={descripcionIngles}
            onChange={(e) => setDescripcionIngles(e.target.value)}
            resize="vertical"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Contenido material</FormLabel>
          <Textarea
            value={contenidoMaterial}
            onChange={(e) => setContenidoMaterial(e.target.value)}
            resize="vertical" // Permite cambiar el tamaño verticalmente
            height="900px" // Ajusta la altura
            width="200%" // Ancho completo del contenedor
            minHeight="150px" // Altura mínima
            maxWidth="1200px" // Ancho máximo del cuadro
          />
        </FormControl>

        <FormControl>
          <FormLabel>Contenido material Ingles</FormLabel>
          <Textarea
            value={contenidoMaterialIngles}
            onChange={(e) => setContenidoMaterialIngles(e.target.value)}
            resize="vertical"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Autor</FormLabel>
          <Textarea
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
            resize="vertical"
          />
        </FormControl>
        {/* Botón para incrementar puntos */}
        <Button
          onClick={handlePointsButtonClick}
          ml="4"
          border="2px solid blue"
          color="blue"
          width="auto"
          _hover={{
            bg: "blue.500",
            color: "white",
          }}
        >
          Award Points
        </Button>
      </VStack>
      <Box mt={4} fontWeight="bold">
        Total Points: {points}
      </Box>
      <Button onClick={handleEditMaterial} colorScheme="orange">
        Modificar Material
      </Button>
      <Button
        type="submit"
        onClick={handleSubmit}
        ml="4"
        border="2px solid green"
        color="green"
        width="auto"
        _hover={{
          bg: "green.500",
          color: "white",
        }}
      >
        Agregar Material
      </Button>

      {/* Campo y botón para eliminar material */}
      <FormControl mt="9">
        <FormLabel>Título del material a eliminar</FormLabel>
        <Input
          type="text"
          value={tituloEliminar}
          onChange={(e) => setTituloEliminar(e.target.value)}
        />
      </FormControl>
      <Button
        onClick={handleDelete}
        ml="4"
        border="2px solid red"
        color="red"
        mt="9"
        width="auto"
        _hover={{
          bg: "red.500",
          color: "white",
        }}
      >
        Eliminar Material
      </Button>

      <Box maxW="xl" mx="auto" p={6}>
        <VStack spacing={4}>
          <FormControl>
            <FormLabel>Contenido del correo masivo</FormLabel>
            <Textarea
              placeholder="Escribe el subjet del email"
              value={emailSubjectContent}
              onChange={(e) => setEmailSubjectContent(e.target.value)}
              resize="vertical"
              height="150px" // Altura ajustada
            />
            <Textarea
              placeholder="Escribe el contenido del correo aquí..."
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              resize="vertical"
              height="150px" // Altura ajustada
            />
          </FormControl>

          <Button onClick={handleMesage} colorScheme="green" width="auto">
            Mandar email a todos
          </Button>

          <Button onClick={countEmails} colorScheme="green" width="auto">
            mandar siguiente email en newletters
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default MaterialForm;
