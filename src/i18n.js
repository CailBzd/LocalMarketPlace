import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { appWithTranslation } from 'next-i18next';

const resources = {
  en: {
    common: 
    {
      "welcome": "Welcome to Local Products",
      "description": "Discover local products directly from producers in your region.",
      "login": "Login",
      "profile": "Profile",
      "admin": "Admin",
      "merchant": "Merchant",
      "client": "Client",
      "manage_users": "Manage Users",
      "manage_products_slots": "Manage Products and Slots",
      "discover_producers": "Discover Producers near you",
      "address": "Address",
      "radius": "Radius (km)",
      "search": "Search",
      "producer_name": "Producer Name",
      "distance": "Distance (km)",
      "home": "Home"
    } 
  },
  fr: {
    common: 
    {
      "welcome": "Bienvenue sur Local Products",
      "description": "Découvrez des produits locaux directement auprès des producteurs de votre région.",
      "login": "Connexion",
      "profile": "Profil",
      "admin": "Admin",
      "merchant": "Marchand",
      "client": "Client",
      "manage_users": "Gérer les Utilisateurs",
      "manage_products_slots": "Gérer les Produits et les Créneaux",
      "discover_producers": "Découvrez les producteurs proches de chez vous",
      "address": "Adresse",
      "radius": "Rayon (km)",
      "search": "Rechercher",
      "producer_name": "Nom du Producteur",
      "distance": "Distance (km)",
      "home": "Accueil" 
    } 
  }
};

i18n
  .use(initReactI18next)
  .init({    
    compatibilityJSON: 'v3',
    resources,
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
  });

export { appWithTranslation };
export default i18n;
