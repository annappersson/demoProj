import { jwtDecode } from "jwt-decode";

export const decodeAndMapUser = (token: string | null) => {
  if (!token) return null;

  const decoded: any = jwtDecode(token);

  return {
    email:
      decoded[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
      ] || "",
    name:
      decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] ||
      "",
    phone:
      decoded[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mobilephone"
      ] || "",
    personalNumber: decoded.personalNumber || "",
    startpage: decoded.startpage || "/",
    raw: decoded,
  };
};
