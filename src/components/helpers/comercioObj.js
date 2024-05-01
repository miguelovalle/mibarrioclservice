export const comercioObj = () => {
  const tipo = sessionStorage.getItem('tipo');
  const nit = sessionStorage.getItem('nit');
  const name = sessionStorage.getItem('name');
  const emblem = sessionStorage.getItem('emblem');
  const specialty = sessionStorage.getItem('specialty');
  const cat = sessionStorage.getItem('categories');
  let categories = cat?.split(',');
  categories = categories?.map(item => item.trim());
  const contact = sessionStorage.getItem('contact');
  const phone = sessionStorage.getItem('phone');
  const email = sessionStorage.getItem('email');
  const passwd = sessionStorage.getItem('passwd');
  let lat = sessionStorage.getItem('lat');
  lat = Number(lat);
  let long = sessionStorage.getItem('long');
  long = Number(long);
  const address = sessionStorage.getItem('address');
  const cross = sessionStorage.getItem('cross');
  const principal = sessionStorage.getItem('principal');
  const cruceA = sessionStorage.getItem('cruceA');
  const cruceB = sessionStorage.getItem('cruceB');
  const puerta = sessionStorage.getItem('puerta');
  const detalles = sessionStorage.getItem('detalles');
  const imgName = sessionStorage.getItem('imgName');
  const daysno = sessionStorage.getItem('daysno');
  const hInicio = sessionStorage.getItem('hInicio');
  const hFinal = sessionStorage.getItem('hFinal');

  const commerce = {
    tipo,
    nit,
    name,
    emblem,
    specialty,
    categories,
    contact,
    phone,
    email,
    passwd,
    lat,
    long,
    location: { type: 'Point', coordinates: [long, lat] },
    address,
    cross,
    addrritems: { principal, cruceA, cruceB, puerta, detalles },
    imgName,
    daysno,
    hInicio,
    hFinal,
  };

  return commerce;
};
