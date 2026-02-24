import { useState } from 'react';
import {
	Box,
	Button,
	Checkbox,
	Input,
	Textarea,
	VStack,
	HStack,
	FormControl,
	FormLabel,
	Select,
	useToast,
	Divider,
	Heading,
	Badge,
	Text,
} from '@chakra-ui/react';

const TranscripcionForm = () => {
	// Estados principales
	const [titulo, setTitulo] = useState('');
	const [nivel, setNivel] = useState('');
	const [profesor, setProfesor] = useState('');
	const [alumno, setAlumno] = useState('');
	const [idiomaNativo, setIdiomaNativo] = useState('');
	const [materia, setMateria] = useState('');
	const [duracion, setDuracion] = useState('');
	const [transcripcion, setTranscripcion] = useState('');
	const [transcripcionIngles, setTranscripcionIngles] = useState('');
	const [premium, setPremium] = useState(false);
	const [sequentialNumber, setSequentialNumber] = useState(1);
	const [puntos, setPuntos] = useState(0);
	const [notasAdicionales, setNotasAdicionales] = useState('');

	// Estados para arrays
	const [palabrasClave, setPalabrasClave] = useState('');
	const [puntosGramaticales, setPuntosGramaticales] = useState('');
	const [vocabularioNuevo, setVocabularioNuevo] = useState('');
	const [ejercicios, setEjercicios] = useState('');
	const [tareas, setTareas] = useState('');

	// URLs de archivos
	const [archivoAudio, setArchivoAudio] = useState('');
	const [archivoVideo, setArchivoVideo] = useState('');

	// Estados para operaciones
	const [tituloACargar, setTituloACargar] = useState('');
	const [tituloEliminar, setTituloEliminar] = useState('');

	const toast = useToast();

	// Función para convertir string a array
	const stringToArray = (str) => {
		return str
			.split(',')
			.map((item) => item.trim())
			.filter((item) => item.length > 0);
	};

	// Función para manejar el envío del formulario
	const handleSubmit = async (e) => {
		e.preventDefault();

		// Validar campos requeridos
		if (
			!titulo ||
			!nivel ||
			!profesor ||
			!alumno ||
			!idiomaNativo ||
			!materia ||
			!transcripcion
		) {
			toast({
				title: 'Error',
				description:
					'Los campos: Título, Nivel, Profesor, Alumno, Idioma Nativo, Materia y Transcripción son obligatorios',
				status: 'error',
				duration: 3000,
				isClosable: true,
				position: 'bottom',
			});
			return;
		}

		try {
			const data = {
				titulo,
				nivel,
				profesor,
				alumno,
				idiomaNativo,
				materia,
				duracion: duracion ? parseInt(duracion) : undefined,
				transcripcion,
				transcripcionIngles,
				palabrasClave: stringToArray(palabrasClave),
				puntosGramaticales: stringToArray(puntosGramaticales),
				vocabularioNuevo: stringToArray(vocabularioNuevo),
				ejercicios: stringToArray(ejercicios),
				tareas: stringToArray(tareas),
				archivoAudio,
				archivoVideo,
				premium,
				sequentialNumber,
				puntos,
				notasAdicionales,
			};

			const respuesta = await fetch('/api/transcripciones', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			if (respuesta.ok) {
				toast({
					title: 'Transcripción creada con éxito',
					status: 'success',
					duration: 3000,
					isClosable: true,
					position: 'bottom',
				});
				// Limpiar formulario
				limpiarFormulario();
			} else {
				const error = await respuesta.json();
				throw new Error(error.message || 'Error al crear la transcripción');
			}
		} catch (error) {
			toast({
				title: 'Error al crear la transcripción',
				description: error.message,
				status: 'error',
				duration: 3000,
				isClosable: true,
				position: 'bottom',
			});
		}
	};

	// Función para limpiar el formulario
	const limpiarFormulario = () => {
		setTitulo('');
		setNivel('');
		setProfesor('');
		setAlumno('');
		setIdiomaNativo('');
		setMateria('');
		setDuracion('');
		setTranscripcion('');
		setTranscripcionIngles('');
		setPalabrasClave('');
		setPuntosGramaticales('');
		setVocabularioNuevo('');
		setEjercicios('');
		setTareas('');
		setArchivoAudio('');
		setArchivoVideo('');
		setPremium(false);
		setSequentialNumber(1);
		setPuntos(0);
		setNotasAdicionales('');
	};

	// Función para cargar una transcripción existente
	const handleGetTranscripcion = async () => {
		if (!tituloACargar) {
			toast({
				title: 'Debes ingresar un título',
				status: 'error',
				duration: 3000,
				isClosable: true,
				position: 'bottom',
			});
			return;
		}

		try {
			const response = await fetch(
				`/api/transcripciones?titulo=${encodeURIComponent(tituloACargar)}`
			);

			if (response.ok) {
				const transcripciones = await response.json();
				const transcripcion = Array.isArray(transcripciones)
					? transcripciones[0]
					: transcripciones;

				if (transcripcion) {
					// Rellenar los estados con los datos obtenidos
					setTitulo(transcripcion.titulo || '');
					setNivel(transcripcion.nivel || '');
					setProfesor(transcripcion.profesor || '');
					setAlumno(transcripcion.alumno || '');
					setIdiomaNativo(transcripcion.idiomaNativo || '');
					setMateria(transcripcion.materia || '');
					setDuracion(transcripcion.duracion || '');
					setTranscripcion(transcripcion.transcripcion || '');
					setTranscripcionIngles(transcripcion.transcripcionIngles || '');
					setPalabrasClave((transcripcion.palabrasClave || []).join(', '));
					setPuntosGramaticales(
						(transcripcion.puntosGramaticales || []).join(', ')
					);
					setVocabularioNuevo(
						(transcripcion.vocabularioNuevo || []).join(', ')
					);
					setEjercicios((transcripcion.ejercicios || []).join(', '));
					setTareas((transcripcion.tareas || []).join(', '));
					setArchivoAudio(transcripcion.archivoAudio || '');
					setArchivoVideo(transcripcion.archivoVideo || '');
					setPremium(transcripcion.premium || false);
					setSequentialNumber(transcripcion.sequentialNumber || 1);
					setPuntos(transcripcion.puntos || 0);
					setNotasAdicionales(transcripcion.notasAdicionales || '');

					toast({
						title: 'Transcripción cargada con éxito',
						status: 'success',
						duration: 3000,
						isClosable: true,
						position: 'bottom',
					});
				} else {
					toast({
						title: 'No se encontró la transcripción',
						status: 'error',
						duration: 3000,
						isClosable: true,
						position: 'bottom',
					});
				}
			} else {
				throw new Error('Error al obtener la transcripción');
			}
		} catch (error) {
			toast({
				title: 'Error al obtener la transcripción',
				description: error.message,
				status: 'error',
				duration: 3000,
				isClosable: true,
				position: 'bottom',
			});
		}
	};

	// Función para actualizar una transcripción
	const handleUpdateTranscripcion = async () => {
		if (!titulo) {
			toast({
				title: 'El título es obligatorio para modificar',
				status: 'error',
				duration: 3000,
				isClosable: true,
				position: 'bottom',
			});
			return;
		}

		try {
			const data = {
				nivel,
				profesor,
				alumno,
				idiomaNativo,
				materia,
				duracion: duracion ? parseInt(duracion) : undefined,
				transcripcion,
				transcripcionIngles,
				palabrasClave: stringToArray(palabrasClave),
				puntosGramaticales: stringToArray(puntosGramaticales),
				vocabularioNuevo: stringToArray(vocabularioNuevo),
				ejercicios: stringToArray(ejercicios),
				tareas: stringToArray(tareas),
				archivoAudio,
				archivoVideo,
				premium,
				sequentialNumber,
				puntos,
				notasAdicionales,
			};

			const response = await fetch(
				`/api/transcripciones?titulo=${encodeURIComponent(titulo)}`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
				}
			);

			if (response.ok) {
				toast({
					title: 'Transcripción modificada con éxito',
					status: 'success',
					duration: 3000,
					isClosable: true,
					position: 'bottom',
				});
			} else {
				throw new Error('Error al modificar la transcripción');
			}
		} catch (error) {
			toast({
				title: 'Error al modificar la transcripción',
				description: error.message,
				status: 'error',
				duration: 3000,
				isClosable: true,
				position: 'bottom',
			});
		}
	};

	// Función para eliminar una transcripción
	const handleDelete = async () => {
		if (!tituloEliminar) {
			toast({
				title: 'Debes ingresar un título para eliminar',
				status: 'error',
				duration: 3000,
				isClosable: true,
				position: 'bottom',
			});
			return;
		}

		try {
			const response = await fetch(
				`/api/transcripciones?titulo=${encodeURIComponent(tituloEliminar)}`,
				{
					method: 'DELETE',
				}
			);

			if (response.ok) {
				toast({
					title: 'Transcripción eliminada con éxito',
					status: 'success',
					duration: 3000,
					isClosable: true,
					position: 'bottom',
				});
				setTituloEliminar('');
			} else {
				throw new Error('Error al eliminar la transcripción');
			}
		} catch (error) {
			toast({
				title: 'Error al eliminar la transcripción',
				description: error.message,
				status: 'error',
				duration: 3000,
				isClosable: true,
				position: 'bottom',
			});
		}
	};

	// Función para incrementar puntos
	const handlePointsButtonClick = () => {
		setPuntos(puntos + 1);
	};

	return (
		<Box maxW='6xl' mx='auto' p={6}>
			<Heading as='h1' size='lg' mb={6} textAlign='center' color='blue.600'>
				📝 Formulario de Transcripciones de Clases
			</Heading>

			<VStack spacing={6}>
				{/* Sección de búsqueda y carga */}
				<Box w='100%' p={4} bg='gray.50' borderRadius='md'>
					<Heading as='h2' size='md' mb={4}>
						🔍 Buscar Transcripción
					</Heading>
					<FormControl>
						<FormLabel>Título de la transcripción a cargar</FormLabel>
						<Input
							type='text'
							value={tituloACargar}
							onChange={(e) => setTituloACargar(e.target.value)}
							placeholder='Ingresa el título exacto de la transcripción'
						/>
					</FormControl>
					<Button
						onClick={handleGetTranscripcion}
						mt={2}
						colorScheme='blue'
						variant='outline'>
						Cargar Transcripción
					</Button>
				</Box>

				<Divider />

				{/* Campos principales */}
				<HStack spacing={4} w='100%' align='flex-start'>
					<VStack spacing={4} flex={1}>
						<FormControl isRequired>
							<FormLabel>Título de la Clase</FormLabel>
							<Input
								type='text'
								value={titulo}
								onChange={(e) => setTitulo(e.target.value)}
								placeholder='ej: Clase de Present Perfect'
							/>
						</FormControl>

						<HStack spacing={4} w='100%'>
							<FormControl isRequired>
								<FormLabel>Nivel</FormLabel>
								<Select
									value={nivel}
									onChange={(e) => setNivel(e.target.value)}>
									<option value=''>Selecciona nivel</option>
									<option value='A1'>A1</option>
									<option value='A2'>A2</option>
									<option value='B1'>B1</option>
									<option value='B2'>B2</option>
									<option value='C1'>C1</option>
									<option value='C2'>C2</option>
								</Select>
							</FormControl>

							<FormControl isRequired>
								<FormLabel>Profesor</FormLabel>
								<Input
									type='text'
									value={profesor}
									onChange={(e) => setProfesor(e.target.value)}
									placeholder='Nombre del profesor'
								/>
							</FormControl>
						</HStack>

						<HStack spacing={4} w='100%'>
							<FormControl isRequired>
								<FormLabel>Alumno</FormLabel>
								<Input
									type='text'
									value={alumno}
									onChange={(e) => setAlumno(e.target.value)}
									placeholder='Nombre del alumno'
								/>
							</FormControl>

							<FormControl isRequired>
								<FormLabel>Idioma Nativo del Alumno</FormLabel>
								<Select
									value={idiomaNativo}
									onChange={(e) => setIdiomaNativo(e.target.value)}>
									<option value=''>Selecciona idioma nativo</option>
									<option value='Español'>Español</option>
									<option value='Inglés'>Inglés</option>
									<option value='Francés'>Francés</option>
									<option value='Alemán'>Alemán</option>
									<option value='Italiano'>Italiano</option>
									<option value='Portugués'>Portugués</option>
									<option value='Ruso'>Ruso</option>
									<option value='Chino'>Chino</option>
									<option value='Japonés'>Japonés</option>
									<option value='Coreano'>Coreano</option>
									<option value='Árabe'>Árabe</option>
									<option value='Hindi'>Hindi</option>
									<option value='Otro'>Otro</option>
								</Select>
							</FormControl>
						</HStack>

						<HStack spacing={4} w='100%'>
							<FormControl isRequired>
								<FormLabel>Materia</FormLabel>
								<Select
									value={materia}
									onChange={(e) => setMateria(e.target.value)}>
									<option value=''>Selecciona materia</option>
									<option value='Gramática'>Gramática</option>
									<option value='Conversación'>Conversación</option>
									<option value='Vocabulario'>Vocabulario</option>
									<option value='Pronunciación'>Pronunciación</option>
									<option value='Comprensión'>Comprensión</option>
									<option value='Escritura'>Escritura</option>
									<option value='Lectura'>Lectura</option>
									<option value='Cultura'>Cultura</option>
								</Select>
							</FormControl>

							<FormControl>
								<FormLabel>Duración (minutos)</FormLabel>
								<Input
									type='number'
									value={duracion}
									onChange={(e) => setDuracion(e.target.value)}
									placeholder='45'
								/>
							</FormControl>
						</HStack>
					</VStack>

					<VStack spacing={4} flex={1}>
						<FormControl>
							<FormLabel>Número Secuencial</FormLabel>
							<Input
								type='number'
								value={sequentialNumber}
								onChange={(e) =>
									setSequentialNumber(parseInt(e.target.value) || 1)
								}
								min='1'
							/>
						</FormControl>

						<FormControl>
							<FormLabel>Puntos</FormLabel>
							<HStack>
								<Text fontWeight='bold'>{puntos}</Text>
								<Button
									size='sm'
									onClick={handlePointsButtonClick}
									colorScheme='green'>
									+1 Punto
								</Button>
							</HStack>
						</FormControl>

						<FormControl>
							<FormLabel>Premium</FormLabel>
							<Checkbox
								isChecked={premium}
								onChange={(e) => setPremium(e.target.checked)}>
								Contenido Premium
							</Checkbox>
						</FormControl>

						<FormControl>
							<FormLabel>URL Archivo de Audio</FormLabel>
							<Input
								type='url'
								value={archivoAudio}
								onChange={(e) => setArchivoAudio(e.target.value)}
								placeholder='https://...'
							/>
						</FormControl>

						<FormControl>
							<FormLabel>URL Archivo de Video</FormLabel>
							<Input
								type='url'
								value={archivoVideo}
								onChange={(e) => setArchivoVideo(e.target.value)}
								placeholder='https://...'
							/>
						</FormControl>
					</VStack>
				</HStack>

				{/* Campos de arrays separados por comas */}
				<HStack spacing={4} w='100%' align='flex-start'>
					<VStack spacing={4} flex={1}>
						<FormControl>
							<FormLabel>Palabras Clave</FormLabel>
							<Textarea
								value={palabrasClave}
								onChange={(e) => setPalabrasClave(e.target.value)}
								placeholder='present perfect, have been, experiences (separadas por comas)'
								resize='vertical'
								height='80px'
							/>
						</FormControl>

						<FormControl>
							<FormLabel>Puntos Gramaticales</FormLabel>
							<Textarea
								value={puntosGramaticales}
								onChange={(e) => setPuntosGramaticales(e.target.value)}
								placeholder='present perfect structure, irregular verbs (separados por comas)'
								resize='vertical'
								height='80px'
							/>
						</FormControl>

						<FormControl>
							<FormLabel>Vocabulario Nuevo</FormLabel>
							<Textarea
								value={vocabularioNuevo}
								onChange={(e) => setVocabularioNuevo(e.target.value)}
								placeholder='accomplish, achieve, experience (separadas por comas)'
								resize='vertical'
								height='80px'
							/>
						</FormControl>
					</VStack>

					<VStack spacing={4} flex={1}>
						<FormControl>
							<FormLabel>Ejercicios Propuestos</FormLabel>
							<Textarea
								value={ejercicios}
								onChange={(e) => setEjercicios(e.target.value)}
								placeholder='Complete the sentences, Write about your experiences (separados por comas)'
								resize='vertical'
								height='80px'
							/>
						</FormControl>

						<FormControl>
							<FormLabel>Tareas Asignadas</FormLabel>
							<Textarea
								value={tareas}
								onChange={(e) => setTareas(e.target.value)}
								placeholder='Homework: page 45, Practice conversation (separadas por comas)'
								resize='vertical'
								height='80px'
							/>
						</FormControl>

						<FormControl>
							<FormLabel>Notas Adicionales</FormLabel>
							<Textarea
								value={notasAdicionales}
								onChange={(e) => setNotasAdicionales(e.target.value)}
								placeholder='Observaciones importantes, recordatorios...'
								resize='vertical'
								height='80px'
							/>
						</FormControl>
					</VStack>
				</HStack>

				{/* Transcripción principal */}
				<FormControl isRequired>
					<FormLabel>Transcripción de la Clase</FormLabel>
					<Textarea
						value={transcripcion}
						onChange={(e) => setTranscripcion(e.target.value)}
						placeholder='Aquí va la transcripción completa de la clase...'
						resize='vertical'
						height='300px'
					/>
				</FormControl>

				<FormControl>
					<FormLabel>Transcripción en Inglés (opcional)</FormLabel>
					<Textarea
						value={transcripcionIngles}
						onChange={(e) => setTranscripcionIngles(e.target.value)}
						placeholder='English translation of the class transcription...'
						resize='vertical'
						height='300px'
					/>
				</FormControl>

				{/* Botones de acción */}
				<HStack spacing={4} w='100%' justify='center'>
					<Button
						onClick={handleSubmit}
						colorScheme='green'
						size='lg'
						leftIcon={<Text>💾</Text>}>
						Crear Transcripción
					</Button>

					<Button
						onClick={handleUpdateTranscripcion}
						colorScheme='orange'
						size='lg'
						leftIcon={<Text>✏️</Text>}>
						Actualizar Transcripción
					</Button>

					<Button
						onClick={limpiarFormulario}
						colorScheme='gray'
						size='lg'
						leftIcon={<Text>🗑️</Text>}>
						Limpiar Formulario
					</Button>
				</HStack>

				<Divider />

				{/* Sección de eliminación */}
				<Box w='100%' p={4} bg='red.50' borderRadius='md'>
					<Heading as='h2' size='md' mb={4} color='red.600'>
						🗑️ Eliminar Transcripción
					</Heading>
					<FormControl>
						<FormLabel>Título de la transcripción a eliminar</FormLabel>
						<Input
							type='text'
							value={tituloEliminar}
							onChange={(e) => setTituloEliminar(e.target.value)}
							placeholder='Ingresa el título exacto'
						/>
					</FormControl>
					<Button
						onClick={handleDelete}
						mt={2}
						colorScheme='red'
						variant='outline'
						leftIcon={<Text>🗑️</Text>}>
						Eliminar Transcripción
					</Button>
				</Box>
			</VStack>
		</Box>
	);
};

export default TranscripcionForm;
