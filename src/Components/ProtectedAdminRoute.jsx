import { Navigate } from "react-router-dom";

function ProtectedAdminRoute ({user, profile, loadingUser, loadingProfile, children}) {

    if (loadingUser || loadingProfile) {
        return <p>Chargement...</p>;
    }

    if (!user) {
        console.log("Aucun compte n'est associé à ces identifiants")
        return <Navigate to="/LoginPage" replace />
    }

     if (profile?.role !== "admin") {
        console.log("le profil n'est pas associé à un compte admin")
        return <Navigate to="/" replace />
    }
    


    return children;


}

export default ProtectedAdminRoute;