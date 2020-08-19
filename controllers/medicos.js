const { response } = require('express');
const Medico = require('../models/medico');

const getMedicos = async(req, res = response) => {

    const medicos = await Medico.find()
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre img ');

    res.json({
        ok: true,
        medicos
    });
};

const crearMedico = async(req, res = response) => {

    const uid = req.uid;
    const medico = new Medico({

        usuario: uid,
        ...req.body

    });

    try {

        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Error de creacion de registro para medico'
        });
    }
};


const actualizarMedico = async(req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;
    const uh = req.uh;

    try {
        const medico = await Medico.findById(id);

        if (!medico) {
            return res.status(404).json({
                ok: true,
                msg: 'Medico no encontrado por id'
            });
        }

        const cambiosMedico = {
            ...req.body,
            usuario: uid,
            hospital: uh
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true });

        res.json({

            ok: true,
            msg: 'Actualizar Medico',
            medico: medicoActualizado

        });

    } catch (error) {
        res.status(500).json({
            ok: true,
            msg: 'Hable con el administrador'
        });
    }
};

const borrarMedico = async(req = response, res = response) => {
    const id = req.params.id;

    try {
        const medico = await Medico.findById(id);

        if (!medico) {
            return res.status(404).json({
                ok: true,
                msg: 'Hospital no encontrado por id'
            });
        }

        await Medico.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Medico eliminado'
        });

    } catch (error) {
        res.stratus(json({
            ok: false,
            msg: 'Hable con el administrador'
        }));
    }
};


module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}