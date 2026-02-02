document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('.btn-submit');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const successMessage = document.getElementById('formSuccess');

    // Validación en tiempo real
    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const telefono = document.getElementById('telefono');
    const objetivo = document.getElementById('objetivo');
    const mensaje = document.getElementById('mensaje');
    const privacidad = document.getElementById('privacidad');

    // Funciones de validación
    function validarNombre() {
        const nombreError = document.getElementById('nombreError');
        if (nombre.value.trim().length < 2) {
            nombre.classList.add('error');
            nombreError.textContent = 'El nombre debe tener al menos 2 caracteres';
            return false;
        }
        nombre.classList.remove('error');
        nombreError.textContent = '';
        return true;
    }

    function validarEmail() {
        const emailError = document.getElementById('emailError');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            email.classList.add('error');
            emailError.textContent = 'Introduce un email válido';
            return false;
        }
        email.classList.remove('error');
        emailError.textContent = '';
        return true;
    }

    function validarTelefono() {
        const telefonoError = document.getElementById('telefonoError');
        // Teléfono es opcional, pero si se rellena debe ser válido
        if (telefono.value.trim() !== '') {
            const telefonoRegex = /^[+]?[\d\s-]{9,}$/;
            if (!telefonoRegex.test(telefono.value.trim())) {
                telefono.classList.add('error');
                telefonoError.textContent = 'Introduce un teléfono válido';
                return false;
            }
        }
        telefono.classList.remove('error');
        telefonoError.textContent = '';
        return true;
    }

    function validarObjetivo() {
        const objetivoError = document.getElementById('objetivoError');
        if (objetivo.value === '') {
            objetivo.classList.add('error');
            objetivoError.textContent = 'Selecciona un objetivo';
            return false;
        }
        objetivo.classList.remove('error');
        objetivoError.textContent = '';
        return true;
    }

    function validarMensaje() {
        const mensajeError = document.getElementById('mensajeError');
        if (mensaje.value.trim().length < 10) {
            mensaje.classList.add('error');
            mensajeError.textContent = 'El mensaje debe tener al menos 10 caracteres';
            return false;
        }
        mensaje.classList.remove('error');
        mensajeError.textContent = '';
        return true;
    }

    function validarPrivacidad() {
        const privacidadError = document.getElementById('privacidadError');
        if (!privacidad.checked) {
            privacidadError.textContent = 'Debes aceptar la política de privacidad';
            return false;
        }
        privacidadError.textContent = '';
        return true;
    }

    // Eventos de validación en tiempo real
    nombre.addEventListener('blur', validarNombre);
    email.addEventListener('blur', validarEmail);
    telefono.addEventListener('blur', validarTelefono);
    objetivo.addEventListener('change', validarObjetivo);
    mensaje.addEventListener('blur', validarMensaje);
    privacidad.addEventListener('change', validarPrivacidad);

    // Envío del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validar todos los campos
        const nombreValido = validarNombre();
        const emailValido = validarEmail();
        const telefonoValido = validarTelefono();
        const objetivoValido = validarObjetivo();
        const mensajeValido = validarMensaje();
        const privacidadValida = validarPrivacidad();

        // Si todo es válido, "enviar" el formulario
        if (nombreValido && emailValido && telefonoValido && objetivoValido && mensajeValido && privacidadValida) {
            // Deshabilitar botón y mostrar loading
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline';

            // Simular envío (aquí conectarías con tu backend)
            setTimeout(function() {
                // Ocultar loading
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
                submitBtn.disabled = false;

                // Mostrar mensaje de éxito
                successMessage.style.display = 'block';

                // Limpiar formulario
                form.reset();

                // Ocultar mensaje después de 5 segundos
                setTimeout(function() {
                    successMessage.style.display = 'none';
                }, 5000);

                // Scroll al mensaje de éxito
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 2000);
        } else {
            // Scroll al primer error
            const primerError = form.querySelector('.error');
            if (primerError) {
                primerError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
});