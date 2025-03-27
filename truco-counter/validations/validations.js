export const validateTeamName = (name) => {
  if (!name.trim()) {
    return 'El nombre no puede estar vacío';
  }
  if (name.trim().length < 3) {
    return 'El nombre debe tener al menos 3 caracteres';
  }
  if (name.trim().length > 15) {
    return 'El nombre no puede tener más de 15 caracteres';
  }
  return null;
};

export const validateScore = (score) => {
  if (isNaN(score)) {
    return 'El puntaje debe ser un número válido';
  }
  if (score < 2 || score > 50) {
    return 'El puntaje debe estar entre 2 y 50';
  }
  return null;
};

export const validateUniqueNames = (name1, name2) => {
  if (name1.trim().toLowerCase() === name2.trim().toLowerCase()) {
    return 'Los nombres de los equipos no pueden ser iguales';
  }
  return null;
};
