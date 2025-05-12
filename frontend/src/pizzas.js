
export const pizzas = [
    {
      id: 1,
      name: "Napolitana",
      price: 5950,
      ingredients: ["mozzarella", "tomates", "jamón", "orégano"],
      img: "https://firebasestorage.googleapis.com/v0/b/apis-varias-mias.appspot.com/o/pizzeria%2Fpizza-1239077_640_cl.jpg?alt=media&token=6a9a33da-5c00-49d4-9080-784dcc87ec2c"
    },
    {
      id: 2,
      name: "Española",
      price: 6950,
      ingredients: ["mozzarella", "gorgonzola", "parmesano", "provolone"],
      img: "https://firebasestorage.googleapis.com/v0/b/apis-varias-mias.appspot.com/o/pizzeria%2Fcheese-164872_640_com.jpg?alt=media&token=18b2b821-4d0d-43f2-a1c6-8c57bc388fab"
    },
    {
      id: 3,
      name: "Pepperoni",
      price: 6950,
      ingredients: ["mozzarella", "pepperoni", "orégano"],
      img: "https://firebasestorage.googleapis.cSom/v0/b/apis-varias-mias.appspot.com/o/pizzeria%2Fpizza-1239077_640_com.jpg?alt=media&token=e7cde87a-08d5-4040-ac54-90f6c31eb3e3"
    },
    {
      id: 4,
      name: "Cuatro Quesos",
      price: 7450,
      ingredients: ["mozzarella", "gorgonzola", "parmesano", "ricotta"],
      img: "https://images.unsplash.com/photo-1601924582971-fe31c8f1d30e?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 5,
      name: "Hawaiana",
      price: 6650,
      ingredients: ["mozzarella", "jamón", "piña"],
      img: "https://images.pexels.com/photos/4109086/pexels-photo-4109086.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    },
    {
      id: 6,
      name: "Veggie",
      price: 6250,
      ingredients: ["mozzarella", "pimientos", "cebolla", "champiñones", "aceitunas"],
      img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800"
    }
  ];
  
  export const pizzaCart = [
    { id: 1, name: "Napolitana", price: 5950, quantity: 2, img: pizzas[0].img },
    { id: 2, name: "Española",  price: 6950, quantity: 1, img: pizzas[1].img },
    { id: 5, name: "Hawaiana",  price: 6650, quantity: 3, img: pizzas[4].img }
  ];
  