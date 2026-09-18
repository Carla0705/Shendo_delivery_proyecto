import api from './api';

// esto sirve para obtener los prodcutos del restaurante.
export const getProducts = async () => {
  const response = await api.get('/products/');
  return response.data;
};

export const createProduct = async (productData) => {
  // 1. Creamos un objeto FormData
  const formData = new FormData();
  
  formData.append('nombre', productData.nombre);
  formData.append('precio', productData.precio);
  formData.append('descripcion', productData.descripcion || '');
  formData.append('stock', productData.stock || 0);
  formData.append('disponible', productData.disponible ?? true);
  formData.append('emoji', productData.emoji || '');

  // 2. Si viene el archivo de la imagen (File nativo), lo adjuntamos
  if (productData.imageFile) {
    formData.append('imagen', productData.imageFile); 
  }

  // 3. Enviamos el formData en lugar del objeto JSON
  // Axios detecta FormData y establece automáticamente el header 'content-type: multipart/form-data'
  const response = await api.post('/products/', formData);
  
  return response.data;
};