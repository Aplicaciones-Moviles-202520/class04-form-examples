// FileUploadForm.jsx — React 19 + MUI 6 + Formik/Yup (validación de archivo)
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Chip,
  FormControl,
  FormHelperText,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

const MAX_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/heic',
  'image/heif',
];

const validationSchema = Yup.object({
  description: Yup.string()
    .min(10, 'El texto descriptivo debe tener al menos 10 caracteres')
    .required('Campo requerido'),
  photo: Yup.mixed()
    .required('Es necesario adjuntar una fotografía')
    .test('file-type', 'Formato no soportado', (file) =>
      file ? ALLOWED_TYPES.includes(file.type) || file.type.startsWith('image/') : false
    )
    .test('file-size', 'La imagen no debe exceder 5MB', (file) =>
      file ? file.size <= MAX_BYTES : false
    ),
});

export default function FileUploadForm() {
  const formik = useFormik({
    initialValues: {
      description: '',
      photo: null,
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        // Ejemplo: enviar con FormData
        const fd = new FormData();
        fd.append('description', values.description);
        fd.append('photo', values.photo);

        // await axios.post('/api/upload', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        console.log('Payload listo para envío:', { description: values.description, photo: values.photo });

        alert('Formulario válido. (Simulación de envío)');
        resetForm();
      } catch {
        alert('Hubo un problema al enviar el formulario.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleFileChange = (event) => {
    const file = event.currentTarget.files?.[0] ?? null;
    formik.setFieldValue('photo', file, true);
    formik.setFieldTouched('photo', true, true);
  };

  const clearFile = () => {
    formik.setFieldValue('photo', null, true);
    formik.setFieldTouched('photo', true, true);
  };

  const hasDescError = Boolean(formik.touched.description && formik.errors.description);
  const hasPhotoError = Boolean(formik.touched.photo && formik.errors.photo);

  return (
    <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ maxWidth: 560 }}>
      <Typography variant="h6" gutterBottom>
        Adjuntar Fotografía
      </Typography>

      <TextField
        fullWidth
        id="description"
        name="description"
        label="Descripción"
        variant="outlined"
        margin="normal"
        multiline
        rows={4}
        value={formik.values.description}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={hasDescError}
        helperText={hasDescError ? formik.errors.description : ' '}
        autoComplete="off"
      />

      <FormControl error={hasPhotoError} sx={{ mt: 1 }}>
        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
          <Button variant="contained" component="label">
            Adjuntar Fotografía
            <input
              hidden
              id="photo"
              name="photo"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </Button>

          {formik.values.photo && (
            <>
              <Chip
                label={formik.values.photo.name}
                variant="outlined"
                onDelete={clearFile}
                sx={{ maxWidth: 320 }}
              />
              <Typography variant="caption">
                {(formik.values.photo.size / 1024).toFixed(0)} KB
              </Typography>
            </>
          )}
        </Stack>

        <FormHelperText sx={{ minHeight: 24 }}>
          {hasPhotoError ? formik.errors.photo : ' '}
        </FormHelperText>
      </FormControl>

      <Box mt={2}>
        <Button
          color="primary"
          variant="contained"
          type="submit"
          disabled={formik.isSubmitting}
        >
          Enviar
        </Button>
      </Box>
    </Box>
  );
}
