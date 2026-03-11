import { useState } from "react";
import { ProductApi } from "./ProductApi";

const ProductsData = ({children}) => {
     const [open , setOpen]= useState(false)
   
     
   const productData = [
    {
        id: 1,
        title: "Super Mario Odyssey",
        genre: "Platformer",
        price: 3899,
        discount: 15,
        finalPrice: 3314,
        quantity: 1,
        description: "Join Mario on a massive, globe-trotting 3D adventure using his new ally Cappy to control enemies and objects.",
        image: "https://i.pinimg.com/1200x/6d/4a/9f/6d4a9f9767d15a7458d9511137312694.jpg"
    },
    {
        id: 2,
        title: "The Legend of Zelda: Breath of the Wild",
        genre: "Adventure",
        price: 4999,
        discount: 10,
        finalPrice: 4499,
        quantity: 1,
        description: "Explore a vast open world of discovery, exploration, and adventure in this boundary-breaking new game in the acclaimed series.",
        image: "https://i.pinimg.com/1200x/0d/79/d5/0d79d570c5f5042f1ef91869589a065e.jpg"
    },
    {
        id: 3,
        title: "Grand Theft Auto V",
        genre: "Action",
        price: 1999,
        discount: 50,
        finalPrice: 999,
        quantity: 1,
        description: "Experience the interweaving stories of three very different criminals as they risk everything in a series of daring heists.",
        image: "https://i.pinimg.com/1200x/ca/57/e3/ca57e3f0d678370f2fe21754ed2cf992.jpg"
    },
    {
        id: 4,
        title: "Minecraft",
        genre: "Sandbox",
        price: 2499,
        discount: 20,
        finalPrice: 1999,
        quantity: 1,
        description: "Build anything you can imagine in the ultimate sandbox game. Explore randomly generated worlds and survive dangerous mobs.",
        image: "https://i.pinimg.com/1200x/50/b9/08/50b90805e6f82c8feb5199b31801da90.jpg"
    },
    {
        id: 5,
        title: "The Witcher 3: Wild Hunt",
        genre: "RPG",
        price: 1599,
        discount: 70,
        finalPrice: 479,
        quantity: 1,
        description: "Become a professional monster slayer and embark on an epic journey to find the child of prophecy in a war-torn world.",
        image: "https://i.pinimg.com/1200x/ef/1c/18/ef1c18270411f4fcaa0b3e6312c06234.jpg"
    },
    {
        id: 6,
        title: "Red Dead Redemption 2",
        genre: "Action-Adventure",
        price: 3299,
        discount: 40,
        finalPrice: 1979,
        quantity: 1,
        description: "An epic tale of life in America's unforgiving heartland. The gang must rob, steal and fight their way across the rugged land.",
        image: "https://i.pinimg.com/1200x/61/6f/52/616f52a7f370060c729e0f19cde4e3eb.jpg"
    },
    {
        id: 7,
        title: "Elden Ring",
        genre: "Action RPG",
        price: 3599,
        discount: 15,
        finalPrice: 3059,
        quantity: 1,
        description: "Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.",
        image: "https://i.pinimg.com/1200x/40/7c/35/407c35641359ca9988faf5f157b60513.jpg"
    },
    {
        id: 8,
        title: "Among Us",
        genre: "Social Deduction",
        price: 199,
        discount: 25,
        finalPrice: 149,
        quantity: 1,
        description: "A game of teamwork and betrayal for 4-15 players... in space! Play with friends and try to find the Impostors.",
        image: "https://i.pinimg.com/1200x/1e/06/5c/1e065cb0cfb8e593a221589d1ed7f315.jpg"
    },
    {
        id: 9,
        title: "Fortnite",
        genre: "Battle Royale",
        price: 1999,
        discount: 99,
        finalPrice: 0,
        quantity: 1,
        description: "Drop into the island and compete to be the last one standing—or work together with friends to build your dream world.",
        image: "https://i.pinimg.com/1200x/34/ea/0a/34ea0abfd1e2a0b9155db38577259883.jpg"
    },
    {
        id: 10,
        title: "God of War",
        genre: "Action-Adventure",
        price: 3299,
        discount: 50,
        finalPrice: 1649,
        quantity: 1,
        description: "His vengeance against the Gods of Olympus years behind him, Kratos now lives as a man in the realm of Norse Deities and monsters.",
        image: "https://i.pinimg.com/1200x/73/76/16/7376161d93cba6f27a286d593bbc3e5a.jpg"
    },
    {
        id: 11,
        title: "Cyberpunk 2077",
        genre: "Action RPG",
        price: 2999,
        discount: 40,
        finalPrice: 1799,
        quantity: 1,
        description: "An open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification.",
        image: "https://i.pinimg.com/1200x/db/f6/b4/dbf6b4c7c27f20ed17522110fcc54e5d.jpg"
    },
    {
        id: 12,
        title: "Hades",
        genre: "Roguelike",
        price: 1100,
        discount: 30,
        finalPrice: 770,
        quantity: 1,
        description: "Defy the god of the dead as you hack and slash out of the Underworld in this rogue-like dungeon crawler from the creators of Bastion.",
        image: "https://i.pinimg.com/736x/56/39/41/563941c080e8b41919aacc9744a25539.jpg"
    },
    {
        id: 13,
        title: "Stardew Valley",
        genre: "Simulation",
        price: 479,
        discount: 20,
        finalPrice: 383,
        quantity: 1,
        description: "You've inherited your grandfather's old farm plot in Stardew Valley. Armed with hand-me-down tools, can you live off the land?",
        image: "https://i.pinimg.com/736x/68/4c/d1/684cd1e4024214a98f35f5dfe8cc2387.jpg"
    },
    {
        id: 14,
        title: "Halo Infinite",
        genre: "FPS",
        price: 3499,
        discount: 10,
        finalPrice: 3149,
        quantity: 1,
        description: "When all hope is lost and humanity’s fate hangs in the balance, the Master Chief is ready to confront the most ruthless foe.",
        image: "https://i.pinimg.com/1200x/ac/28/13/ac2813911d927607d0ab0b0f0123f31b.jpg"
    },
    {
        id: 15,
        title: "Animal Crossing: New Horizons",
        genre: "Simulation",
        price: 3899,
        discount: 10,
        finalPrice: 3509,
        quantity: 1,
        description: "Escape to a deserted island and create your own paradise as you explore, create, and customize in this relaxing life sim.",
        image: "https://i.pinimg.com/736x/24/c0/04/24c004f2ad8b218f0688e2f12ae1210f.jpg"
    },
    {
        id: 16,
        title: "Ghost of Tsushima",
        genre: "Action-Adventure",
        price: 3999,
        discount: 25,
        finalPrice: 2999,
        quantity: 1,
        description: "In the late 13th century, the Mongol empire has laid waste to entire nations. Samurai Jin Sakai must forge a new way of fighting.",
        image: "https://i.pinimg.com/736x/aa/65/be/aa65be39f98195b92ee2239b97c9866e.jpg"
    },
    {
        id: 17,
        title: "Resident Evil Village",
        genre: "Survival Horror",
        price: 2499,
        discount: 40,
        finalPrice: 1499,
        quantity: 1,
        description: "Experience survival horror like never before in the eighth major installment in the storied Resident Evil franchise.",
        image: "https://i.pinimg.com/736x/34/68/c8/3468c89a4354039d14a731df226f6c3c.jpg"
    },
    {
        id: 18,
        title: "Hollow Knight",
        genre: "Metroidvania",
        price: 479,
        discount: 50,
        finalPrice: 239,
        quantity: 1,
        description: "Forge your own path in Hollow Knight! An epic action adventure through a vast ruined kingdom of insects and heroes.",
        image: "https://i.pinimg.com/1200x/a8/52/da/a852da548162bd3a90b0ab1293ac49e3.jpg"
    },
    {
        id: 19,
        title: "Forza Horizon 5",
        genre: "Racing",
        price: 4799,
        discount: 50,
        finalPrice: 2399,
        quantity: 1,
        description: "Forge your own path in Hollow Knight! An epic action adventure through a vast ruined kingdom of insects and heroes.",
        image: "https://i.pinimg.com/1200x/cb/6f/e3/cb6fe35de2c4cdbf039ed2cb56ca58ad.jpg"
    },
    {
        id: 20,
        title: "Assetto Corsa",
        genre: "Racing",
        price: 4799,
        discount: 50,
        finalPrice: 2399,
        quantity: 1,
        description: "Forge your own path in Hollow Knight! An epic action adventure through a vast ruined kingdom of insects and heroes.",
        image: "https://i.pinimg.com/736x/c0/fa/52/c0fa52a3f90b6433827c0ca334241c77.jpg"
    }
];


     const [products,setProducts] = useState(productData)
      const [newProduct, setNewProduct] = useState([]);
     
    return <>
          <ProductApi.Provider value={{products,setProducts,open,setOpen,newProduct,setNewProduct}} >
            {children}
          </ProductApi.Provider>
    </>;
};

export default ProductsData;
