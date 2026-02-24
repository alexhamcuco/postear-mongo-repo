import connectMongoDB from '@/libs/mongodb';
import Transcripcion from '@/models/transcripcion';
import { NextResponse } from 'next/server';

export const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
	'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// GET - Obtener transcripciones
export const GET = async (req) => {
	const { searchParams } = new URL(req.url);
	const titulo = searchParams.get('titulo');
	const nivel = searchParams.get('nivel');
	const profesor = searchParams.get('profesor');
	const alumno = searchParams.get('alumno');
	const idiomaNativo = searchParams.get('idiomaNativo');

	await connectMongoDB();

	try {
		let query = {};

		if (titulo) {
			query.titulo = { $regex: titulo, $options: 'i' }; // búsqueda insensible a mayúsculas
		}
		if (nivel) {
			query.nivel = nivel;
		}
		if (profesor) {
			query.profesor = { $regex: profesor, $options: 'i' };
		}
		if (alumno) {
			query.alumno = { $regex: alumno, $options: 'i' };
		}
		if (idiomaNativo) {
			query.idiomaNativo = { $regex: idiomaNativo, $options: 'i' };
		}

		const transcripciones = await Transcripcion.find(query).sort({
			fechaCreacion: -1,
		});
		return NextResponse.json(transcripciones, { headers: corsHeaders });
	} catch (error) {
		return NextResponse.json(
			{ message: 'Error al obtener transcripciones', error: error.message },
			{ status: 500, headers: corsHeaders }
		);
	}
};

// POST - Crear nueva transcripción
export const POST = async (req) => {
	try {
		const data = await req.json();
		console.log('Datos recibidos:', data);
		console.log('Campo alumno recibido:', data.alumno);
		console.log('Campo idiomaNativo recibido:', data.idiomaNativo);

		await connectMongoDB();

		// Validar campos requeridos
		if (
			!data.titulo ||
			!data.nivel ||
			!data.profesor ||
			!data.alumno ||
			!data.idiomaNativo ||
			!data.materia ||
			!data.transcripcion
		) {
			return NextResponse.json(
				{
					message:
						'Faltan campos requeridos: titulo, nivel, profesor, alumno, idiomaNativo, materia, transcripcion',
				},
				{ status: 400, headers: corsHeaders }
			);
		}

		const nuevaTranscripcion = await Transcripcion.create(data);
		console.log('Transcripción creada:', nuevaTranscripcion);
		console.log('Alumno en transcripción creada:', nuevaTranscripcion.alumno);
		console.log('Idioma nativo en transcripción creada:', nuevaTranscripcion.idiomaNativo);

		return NextResponse.json(
			{
				message: 'Transcripción creada exitosamente',
				transcripcion: nuevaTranscripcion,
			},
			{ status: 201, headers: corsHeaders }
		);
	} catch (error) {
		console.error('Error al crear transcripción:', error);
		return NextResponse.json(
			{ message: 'Error al crear transcripción', error: error.message },
			{ status: 500, headers: corsHeaders }
		);
	}
};

// PUT - Actualizar transcripción existente
export const PUT = async (req) => {
	const { searchParams } = new URL(req.url);
	const tituloToUpdate = searchParams.get('titulo');

	if (!tituloToUpdate) {
		return NextResponse.json(
			{ message: 'El título es requerido para actualizar la transcripción' },
			{ status: 400, headers: corsHeaders }
		);
	}

	try {
		const data = await req.json();
		await connectMongoDB();

		const transcripcionActualizada = await Transcripcion.findOneAndUpdate(
			{ titulo: tituloToUpdate },
			{ ...data, fechaActualizacion: new Date() },
			{ new: true }
		);

		if (transcripcionActualizada) {
			return NextResponse.json(
				{
					message: 'Transcripción actualizada exitosamente',
					transcripcion: transcripcionActualizada,
				},
				{ status: 200, headers: corsHeaders }
			);
		} else {
			return NextResponse.json(
				{ message: 'Transcripción no encontrada' },
				{ status: 404, headers: corsHeaders }
			);
		}
	} catch (error) {
		return NextResponse.json(
			{ message: 'Error al actualizar transcripción', error: error.message },
			{ status: 500, headers: corsHeaders }
		);
	}
};

// DELETE - Eliminar transcripción
export const DELETE = async (req) => {
	const { searchParams } = new URL(req.url);
	const tituloToDelete = searchParams.get('titulo');

	if (!tituloToDelete) {
		return NextResponse.json(
			{ message: 'El título es requerido para eliminar la transcripción' },
			{ status: 400, headers: corsHeaders }
		);
	}

	try {
		await connectMongoDB();

		const transcripcionEliminada = await Transcripcion.deleteOne({
			titulo: tituloToDelete,
		});

		if (transcripcionEliminada.deletedCount === 1) {
			return NextResponse.json(
				{ message: 'Transcripción eliminada exitosamente' },
				{ status: 200, headers: corsHeaders }
			);
		} else {
			return NextResponse.json(
				{ message: 'Transcripción no encontrada' },
				{ status: 404, headers: corsHeaders }
			);
		}
	} catch (error) {
		return NextResponse.json(
			{ message: 'Error al eliminar transcripción', error: error.message },
			{ status: 500, headers: corsHeaders }
		);
	}
};
