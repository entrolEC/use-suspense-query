export async function fetchUsers() {
  // await delay(2000);
  return fetch('https://fakestoreapi.com/users').then((res) => res.json());
}

export function fetchProducts() {
  return fetch('https://fakestoreapi.com/products').then((res) => res.json());
}