# 📝 Sistema de Transcripciones de Clases - Instrucciones Completas

## 🎯 **¿Qué se ha creado?**

He implementado un sistema completo para gestionar transcripciones de clases en tu aplicación de MongoDB. El sistema incluye:

### ✅ **Archivos Creados:**

1. **`src/models/transcripcion.js`** - Modelo de MongoDB para transcripciones
2. **`src/app/api/transcripciones/route.js`** - API REST para CRUD de transcripciones
3. **`src/formulario/TranscripcionForm.js`** - Formulario completo para gestionar transcripciones
4. **Modificado `src/app/page.js`** - Página principal con pestañas para ambos formularios

---

## 🚀 **Cómo usar el sistema:**

### **1. Acceder al formulario:**

- Ejecuta tu aplicación: `npm run dev`
- Ve a `http://localhost:3002`
- Verás dos pestañas: "📚 Materiales Generales" y "📝 Transcripciones de Clases"
- Haz clic en la pestaña "📝 Transcripciones de Clases"

### **2. Crear una nueva transcripción:**

#### **Campos obligatorios:**

- **Título de la Clase** (ej: "Clase de Present Perfect")
- **Nivel** (A1, A2, B1, B2, C1, C2)
- **Profesor** (nombre del profesor)
- **Alumno** (nombre del estudiante)
- **Idioma Nativo del Alumno** (Español, Inglés, Francés, etc.)
- **Materia** (Gramática, Conversación, Vocabulario, etc.)
- **Transcripción de la Clase** (el contenido principal)

#### **Campos opcionales:**

- **Duración** (en minutos)
- **Transcripción en Inglés** (traducción opcional)
- **Palabras Clave** (separadas por comas)
- **Puntos Gramaticales** (separados por comas)
- **Vocabulario Nuevo** (separado por comas)
- **Ejercicios Propuestos** (separados por comas)
- **Tareas Asignadas** (separadas por comas)
- **URLs de archivos** (audio/video)
- **Premium** (marcar si es contenido premium)
- **Notas Adicionales**

### **3. Funcionalidades disponibles:**

#### **🔍 Buscar y cargar transcripción:**

- Ingresa el título exacto en "Título de la transcripción a cargar"
- Haz clic en "Cargar Transcripción"
- Se llenarán automáticamente todos los campos

#### **✏️ Actualizar transcripción:**

- Carga una transcripción existente
- Modifica los campos necesarios
- Haz clic en "Actualizar Transcripción"

#### **🗑️ Eliminar transcripción:**

- Ingresa el título exacto en la sección de eliminación
- Haz clic en "Eliminar Transcripción"

#### **💾 Crear nueva transcripción:**

- Llena los campos requeridos
- Haz clic en "Crear Transcripción"

#### **🗑️ Limpiar formulario:**

- Haz clic en "Limpiar Formulario" para vaciar todos los campos

---

## 📊 **Estructura de datos en MongoDB:**

### **Colección: `transcripcions`**

```javascript
{
  titulo: "Clase de Present Perfect",
  nivel: "B1",
  fecha: "2024-01-15T10:30:00.000Z",
  tipo: "transcripcion",
  profesor: "María García",
  alumno: "Juan Pérez",
  idiomaNativo: "Español",
  materia: "Gramática",
  duracion: 45,
  transcripcion: "Hoy vamos a estudiar el Present Perfect...",
  transcripcionIngles: "Today we are going to study Present Perfect...",
  palabrasClave: ["present perfect", "have been", "experiences"],
  puntosGramaticales: ["present perfect structure", "irregular verbs"],
  vocabularioNuevo: ["accomplish", "achieve", "experience"],
  ejercicios: ["Complete the sentences", "Write about your experiences"],
  tareas: ["Homework: page 45", "Practice conversation"],
  archivoAudio: "https://...",
  archivoVideo: "https://...",
  premium: false,
  sequentialNumber: 1,
  puntos: 0,
  notasAdicionales: "Recordar repasar irregular verbs",
  fechaCreacion: "2024-01-15T10:30:00.000Z",
  fechaActualizacion: "2024-01-15T10:30:00.000Z"
}
```

---

## 🔌 **API Endpoints disponibles:**

### **GET** `/api/transcripciones`

- Obtener todas las transcripciones
- Parámetros opcionales: `?titulo=`, `?nivel=`, `?profesor=`, `?alumno=`, `?idiomaNativo=`

### **POST** `/api/transcripciones`

- Crear nueva transcripción
- Envía JSON con los datos

### **PUT** `/api/transcripciones?titulo=TITULO`

- Actualizar transcripción existente
- Envía JSON con los datos actualizados

### **DELETE** `/api/transcripciones?titulo=TITULO`

- Eliminar transcripción por título

---

## 💡 **Consejos de uso:**

### **Para transcripciones efectivas:**

1. **Títulos descriptivos:** "Clase de Present Perfect - Nivel B1"
2. **Palabras clave útiles:** Incluye términos técnicos y vocabulario relevante
3. **Puntos gramaticales:** Anota reglas y estructuras importantes
4. **Vocabulario nuevo:** Lista palabras que los estudiantes deben aprender
5. **Ejercicios y tareas:** Documenta actividades para repaso
6. **Idioma nativo:** Selecciona el idioma nativo del alumno para personalizar la enseñanza

### **Idiomas nativos disponibles:**

- Español, Inglés, Francés, Alemán, Italiano, Portugués
- Ruso, Chino, Japonés, Coreano, Árabe, Hindi
- Opción "Otro" para idiomas no listados

### **Organización:**

- Usa el **Número Secuencial** para ordenar las clases
- Marca contenido **Premium** para suscriptores
- Agrega **URLs de archivos** para audio/video de las clases
- Incluye **Notas Adicionales** para recordatorios importantes

---

## 🛠️ **Mantenimiento:**

### **Verificar funcionamiento:**

1. Ejecuta `npm run dev`
2. Ve a la pestaña "📝 Transcripciones de Clases"
3. Prueba crear, buscar, actualizar y eliminar transcripciones
4. Verifica que los datos se guarden en MongoDB

### **Variables de entorno necesarias:**

- Asegúrate de tener `MONGODB_URI` configurada en tu `.env.local`

---

## 🎉 **¡Listo para usar!**

Tu sistema de transcripciones está completamente funcional. Puedes empezar a crear transcripciones de tus clases inmediatamente. El sistema es independiente del sistema de materiales existente, por lo que ambos pueden coexistir sin problemas.

**¡Disfruta organizando tus clases de manera profesional! 📚✨**
