// CardFormA.jsx — React 19 + MUI 6 (manual validation, no Yup)

import { useState } from 'react';
import { Box, Stack, TextField, Button, CssBaseline } from '@mui/material';
import axios from 'axios';

const initialState = {
  cardholderName: '',
  cardNumber: '',
  expiryDate: '', // MM/YY
  cvc: '',
};

function isValidExpiry(exp) {
  // Expect MM/YY
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(exp)) return { ok: false, msg: 'Formato inválido (MM/AA)' };

  const [mm, yy] = exp.split('/');
  const month = Number(mm);
  const year = 2000 + Number(yy);

  const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999); // last day of that month
  const now = new Date();
  if (endOfMonth < now) return { ok: false, msg: 'La tarjeta está expirada' };

  return { ok: true };
}

export default function CardFormA() {
  const [cardData, setCardData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const setFieldError = (name, msg) =>
    setErrors(prev => ({ ...prev, [name]: msg || '' }));

  const validateField = (name, value) => {
    switch (name) {
      case 'cardholderName':
        return value.trim() ? '' : 'El nombre del titular es necesario';

      case 'cardNumber': {
        const onlyDigits = value.replace(/\D/g, '');
        if (onlyDigits.length !== 16) return 'El número debe tener 16 dígitos';
        return '';
      }

      case 'expiryDate': {
        const check = isValidExpiry(value);
        return check.ok ? '' : check.msg;
      }

      case 'cvc': {
        const onlyDigits = value.replace(/\D/g, '');
        if (!/^\d{3}$/.test(onlyDigits)) return 'El CVC debe tener 3 dígitos';
        return '';
      }

      default:
        return '';
    }
  };

  const validateAll = () => {
    const nextErrors = Object.fromEntries(
      Object.entries(cardData).map(([k, v]) => [k, validateField(k, v)])
    );
    setErrors(nextErrors);
    return nextErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Gentle normalization while typing:
    let next = value;
    if (name === 'cardNumber') next = value.replace(/\D/g, '').slice(0, 16);
    if (name === 'cvc') next = value.replace(/\D/g, '').slice(0, 3);

    if (name === 'expiryDate') {
      // Allow user to type; add slash after 2 digits if missing
      const digits = value.replace(/\D/g, '').slice(0, 4);
      next = digits.length >= 3 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
    }

    setCardData(prev => ({ ...prev, [name]: next }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setFieldError(name, validateField(name, value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validateAll();
    const hasErrors = Object.values(errs).some(Boolean);
    if (hasErrors) return alert('Por favor, corrija los errores antes de enviar.');

    try {
      await axios.post('/api/creditcard', cardData);
      alert('Datos enviados con éxito');
      setCardData(initialState);
      setErrors({});
    } catch {
      alert('Error al enviar datos');
    }
  };

  return (
    <>
      <CssBaseline />
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ maxWidth: 420 }}>
        <Stack spacing={2}>
          <TextField
            label="Nombre del Titular"
            name="cardholderName"
            value={cardData.cardholderName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(errors.cardholderName)}
            helperText={errors.cardholderName || ' '}
            fullWidth
            autoComplete="cc-name"
          />

          <TextField
            label="Número de Tarjeta"
            name="cardNumber"
            value={cardData.cardNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(errors.cardNumber)}
            helperText={errors.cardNumber || ' '}
            fullWidth
            inputMode="numeric"
            autoComplete="cc-number"
          />

          <TextField
            label="Fecha de Expiración (MM/AA)"
            name="expiryDate"
            value={cardData.expiryDate}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(errors.expiryDate)}
            helperText={errors.expiryDate || ' '}
            fullWidth
            inputProps={{ inputMode: 'numeric' }}
            autoComplete="cc-exp"
          />

          <TextField
            label="CVC"
            name="cvc"
            value={cardData.cvc}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(errors.cvc)}
            helperText={errors.cvc || ' '}
            fullWidth
            inputMode="numeric"
            autoComplete="cc-csc"
          />

          <Button type="submit" variant="contained">Enviar</Button>
        </Stack>
      </Box>
    </>
  );
}
