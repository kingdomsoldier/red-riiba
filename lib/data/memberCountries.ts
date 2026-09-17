// Tipo de cada institución miembro
export interface Institution {
  name: string;
  website: string;
  logo: string;
}

// Tipo de cada país miembro
export interface MemberCountry {
  country: string;
  flag: string;
  institutions: Institution[];
}

export const memberCountries: MemberCountry[] = [
  {
    country: "Cuba",
    flag: "🇨🇺",
    institutions: [
      {
        name: "Universidad de Ciego de Ávila",
        website: "https://unica.edu.cu",
        logo: "/images/institutions/unica.png",
      },
      {
        name: "Centro de Bioplantas",
        website: "",
        logo: "/images/institutions/bioplantas.png",
      },
      {
        name: "CITMA Ciego de Ávila",
        website: "",
        logo: "/images/institutions/citma.png",
      },
      {
        name: "Universidad de Camagüey",
        website: "https://reduc.edu.cu",
        logo: "/images/institutions/reduc.png",
      },
      {
        name: "Universidad Central de Las Villas",
        website: "https://uclv.edu.cu",
        logo: "/images/institutions/uclv.png",
      },
      {
        name: "Universidad de Matanzas",
        website: "https://umcc.cu",
        logo: "/images/institutions/umcc.png",
      },
    ],
  },
  {
    country: "México",
    flag: "🇲🇽",
    institutions: [
      {
        name: "Universidad Nacional Autónoma de México",
        website: "https://unam.mx",
        logo: "/images/institutions/unam.png",
      },
      {
        name: "Universidad Autónoma de Nayarit",
        website: "https://uan.edu.mx",
        logo: "/images/institutions/uan.png",
      },
    ],
  },
  {
    country: "Uruguay",
    flag: "🇺🇾",
    institutions: [
      {
        name: "Universidad de la República",
        website: "https://udelar.edu.uy",
        logo: "/images/institutions/udelar.png",
      },
    ],
  },
  {
    country: "Ecuador",
    flag: "🇪🇨",
    institutions: [
      {
        name: "Escuela Superior Politécnica de Chimborazo",
        website: "https://espoch.edu.ec",
        logo: "/images/institutions/espoch.png",
      },
    ],
  },
  {
    country: "Argelia",
    flag: "🇩🇿",
    institutions: [
      {
        name: "Universidad de Tlemcen",
        website: "",
        logo: "/images/institutions/tlemcen.png",
      },
    ],
  },
  {
    country: "Guatemala",
    flag: "🇬🇹",
    institutions: [
      {
        name: "Centro Universitario de Nor Occidente",
        website: "",
        logo: "/images/institutions/cunoroc.png",
      },
    ],
  },
];