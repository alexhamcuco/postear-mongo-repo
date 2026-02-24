import mongoose, { Schema } from 'mongoose';

const transcripcionSchema = new Schema({
	titulo: { type: String, required: true },
	nivel: { type: String, required: true }, // A1, A2, B1, B2, C1, C2
	fecha: { type: Date, default: Date.now },
	tipo: { type: String, default: 'transcripcion' },
	profesor: { type: String, required: true },
	alumno: { type: String, required: true }, // nombre del alumno
	idiomaNativo: { type: String, required: true }, // idioma nativo del alumno
	materia: { type: String, required: true }, // ej: "Gramática", "Conversación", "Vocabulario"
	duracion: { type: Number }, // en minutos
	transcripcion: { type: String, required: true },
	transcripcionIngles: { type: String },
	palabrasClave: [String],
	puntosGramaticales: [String], // puntos clave de gramática mencionados
	vocabularioNuevo: [String], // palabras nuevas aprendidas
	ejercicios: [String], // ejercicios propuestos en clase
	tareas: [String], // tareas asignadas
	archivoAudio: { type: String }, // URL del archivo de audio si existe
	archivoVideo: { type: String }, // URL del archivo de video si existe
	premium: { type: Boolean, default: false },
	sequentialNumber: { type: Number, required: true },
	puntos: { type: Number, default: 0 },
	notasAdicionales: { type: String },
	fechaCreacion: { type: Date, default: Date.now },
	fechaActualizacion: { type: Date, default: Date.now },
});

// Middleware para actualizar fechaActualizacion antes de guardar
transcripcionSchema.pre('save', function (next) {
	this.fechaActualizacion = new Date();
	// Verificar que los campos requeridos estén presentes
	if (!this.alumno) {
		return next(new Error('El campo alumno es requerido'));
	}
	if (!this.idiomaNativo) {
		return next(new Error('El campo idiomaNativo es requerido'));
	}
	next();
});

const Transcripcion =
	mongoose.models.Transcripcion ||
	mongoose.model('Transcripcion', transcripcionSchema);

export default Transcripcion;
