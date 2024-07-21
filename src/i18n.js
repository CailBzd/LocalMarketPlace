import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { appWithTranslation } from 'next-i18next';

const resources = {
  en: {
    common: {
      "about": "About",
      "address": "Address",
      "admin": "Admin",
      "client": "Client",
      "contact": "Contact",
      "date": "Date",
      "description": "Discover local products directly from producers in your region.",
      "discover_producers": "Discover Producers near you",
      "distance": "Distance (km)",
      "email": "Email",
      "email_required": "Email is required",
      "forgot_password": "Forgot Password?",
      "home": "Home",
      "internal_server_error": "Internal server error",
      "invalid_email": "Invalid email",
      "loading": "Loading...",
      "login": "Login",
      "login_error": "Login Error",
      "login_required": "You need to be logged in to view this page.",
      "login_success": "Login Successful",
      "logout": "Logout",
      "manage_products_slots": "Manage Products and Slots",
      "manage_users": "Manage Users",
      "merchant": "Merchant",
      "name": "Name",
      "name_required": "Name is required",
      "nearby_producers": "Nearby Producers",
      "order": "Order",
      "orders": "Past Orders",
      "password": "Password",
      "password_reset_email_sent": "Password reset email sent",
      "password_reset_error": "Password reset error",
      "profile": "Profile",
      "profile_update_error": "Error updating profile",
      "profile_updated": "Profile updated successfully",
      "producer_name": "Producer Name",
      "radius": "Radius (km)",
      "role": "Role",
      "search": "Search",
      "send_reset_link": "Send Reset Link",
      "signup": "Sign Up",
      "signup_error": "Signup Error",
      "signup_success": "Signup Successful",
      "total": "Total",
      "update_profile": "Update Profile",
      "user_already_exists": "User already exists",
      "welcome": "Welcome to Local Products"
    }
  },
  fr: {
    common: {
      "about": "À propos",
      "address": "Adresse",
      "admin": "Admin",
      "client": "Client",
      "contact": "Contact",
      "date": "Date",
      "description": "Découvrez des produits locaux directement auprès des producteurs de votre région.",
      "discover_producers": "Découvrez les producteurs proches de chez vous",
      "distance": "Distance (km)",
      "email": "Email",
      "email_required": "L'email est obligatoire",
      "forgot_password": "Mot de passe oublié ?",
      "home": "Accueil",
      "internal_server_error": "Erreur interne du serveur",
      "invalid_email": "Email invalide",
      "loading": "Chargement...",
      "login": "Connexion",
      "login_error": "Erreur de connexion",
      "login_required": "Vous devez être connecté pour voir cette page.",
      "login_success": "Connexion réussie",
      "logout": "Déconnexion",
      "manage_products_slots": "Gérer les Produits et les Créneaux",
      "manage_users": "Gérer les Utilisateurs",
      "merchant": "Marchand",
      "name": "Nom",
      "name_required": "Le nom est obligatoire",
      "nearby_producers": "Producteurs à proximité",
      "order": "Commande",
      "orders": "Commandes passées",
      "password": "Mot de passe",
      "password_reset_email_sent": "Email de réinitialisation du mot de passe envoyé",
      "password_reset_error": "Erreur de réinitialisation du mot de passe",
      "profile": "Profil",
      "profile_update_error": "Erreur lors de la mise à jour du profil",
      "profile_updated": "Profil mis à jour avec succès",
      "producer_name": "Nom du Producteur",
      "radius": "Rayon (km)",
      "role": "Rôle",
      "search": "Rechercher",
      "send_reset_link": "Envoyer le lien de réinitialisation",
      "signup": "S'inscrire",
      "signup_error": "Erreur d'inscription",
      "signup_success": "Inscription réussie",
      "total": "Total",
      "update_profile": "Mettre à jour le profil",
      "user_already_exists": "L'utilisateur existe déjà",
      "welcome": "Bienvenue sur Local Products"
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
