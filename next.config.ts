import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Pièce d'identité et photo du véhicule transitent par des Server
      // Actions : l'API accepte jusqu'à 4 Mo (+ marge pour le multipart).
      bodySizeLimit: "5mb",
    },
  },
};

export default nextConfig;
