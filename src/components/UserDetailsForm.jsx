import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale';

const initialValues = {
  nombre: '',
  apellido: '',
  fechaDeCumpleanios: null
};

const validationSchema = Yup.object({
  nombre: Yup.string().required('El nombre es requerido'),
  apellido: Yup.string().required('El apellido es requerido'),
  fechaDeCumpleanios: Yup.date()
    .required('La fecha de cumpleaños es requerida')
    .max(new Date(Date.now() - 31536000000), 'La fecha debe ser al menos un año antes de la fecha actual')
});

const UserDetailsForm = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }}
      >
        {({ setFieldValue, values, isSubmitting, setFieldTouched, touched, errors }) => (
          <Form>
            <Box sx={{ margin: 2 }}>
              <Field as={TextField}
                name="nombre"
                label="Nombre"
                fullWidth
                error={touched.nombre && Boolean(errors.nombre)}
                helperText={<ErrorMessage name="nombre" />}
                onBlur={() => setFieldTouched("nombre", true, true)}
              />
            </Box>
            <Box sx={{ margin: 2 }}>
              <Field as={TextField}
                name="apellido"
                label="Apellido"
                fullWidth
                error={touched.apellido && Boolean(errors.apellido)}
                helperText={<ErrorMessage name="apellido" />}
                onBlur={() => setFieldTouched("apellido", true, true)}
              />
            </Box>
            <Box sx={{ margin: 2 }}>
              <Field name="fechaDeCumpleanios">
                {({ field }) => (
                  <DatePicker
                    label="Fecha de cumpleaños"
                    inputFormat="dd/MM/yyyy"
                    value={field.value}
                    onChange={(value) => {
                      setFieldValue("fechaDeCumpleanios", value);
                      setFieldTouched("fechaDeCumpleanios", true);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        error={touched.fechaDeCumpleanios && Boolean(errors.fechaDeCumpleanios)}
                        helperText={touched.fechaDeCumpleanios && errors.fechaDeCumpleanios}
                        onBlur={() => setFieldTouched("fechaDeCumpleanios", true, true)}
                      />
                    )}
                  />
                )}
              </Field>
            </Box>
            <Box sx={{ margin: 2 }}>
              <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                Enviar
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </LocalizationProvider>
  );
};

export default UserDetailsForm;
